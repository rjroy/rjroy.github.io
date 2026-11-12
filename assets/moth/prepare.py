#!/usr/bin/env python3
"""Prepare the approved moth derivatives. Python stdlib + pinned local tools only."""

import argparse
from collections import deque
import hashlib
import json
import math
from pathlib import Path
import subprocess
import tempfile


SOURCES = [
    {
        "file": "moth-sprite-sheet.png",
        "sha256": "d6d02e8fb7998015d6a83f1ebcd95459129b619694af570ae3f1bf9da04da079",
        "prefix": "flight",
        # Manually reviewed thorax/wing-root landmarks, in source pixels.
        "anchors": [(201, 337), (508, 348), (819, 357), (1126, 370),
                    (197, 942), (508, 929), (819, 910), (1127, 895)],
    },
    {
        "file": "moth-rotation-sprite-sheet.png",
        "sha256": "4b9d1e5d06eb3dde643de7216e6177d4010efce294d535fd298026fda298955d",
        "prefix": "turn",
        "anchors": [(211, 337), (525, 341), (813, 341), (1103, 343),
                    (140, 920), (437, 918), (735, 913), (1047, 909)],
    },
]
CELL = (416, 320)
PIVOT = (208, 176)
EXAMPLE_WIDTH = 104
TOOL_VERSIONS = {"magick": "ImageMagick 7.1.2-34", "cwebp": "1.6.0"}
REPO_ROOT = Path(__file__).resolve().parents[2]


def run(command, data=None):
    print("RUN", " ".join(map(str, command)), flush=True)
    result = subprocess.run(list(map(str, command)), input=data, capture_output=True)
    if result.returncode:
        raise RuntimeError(f"exit {result.returncode}: {result.stderr.decode(errors='replace')}")
    print("OK", command[0], flush=True)
    return result.stdout


def check_tools():
    versions = {
        "magick": run(["magick", "-version"]).decode().splitlines()[0],
        "cwebp": run(["cwebp", "-version"]).decode().strip(),
    }
    for tool, expected in TOOL_VERSIONS.items():
        if expected not in versions[tool]:
            raise RuntimeError(f"{tool}: expected {expected!r}, found {versions[tool]!r}")
    return versions


def crop_boxes(width, height):
    """Integer, exhaustive partition. Original column boundaries are fractional."""
    return [(round(c * width / 4), r * (height // 2),
             round((c + 1) * width / 4), (r + 1) * (height // 2))
            for r in range(2) for c in range(4)]


def crop_rgb(rgb, width, box):
    left, top, right, bottom = box
    return b"".join(rgb[(y * width + left) * 3:(y * width + right) * 3]
                    for y in range(top, bottom))


def binary_morphology(mask, width, height, radius, dilate):
    """Disk dilation/erosion using bit rows, with zero beyond the image."""
    full = int.from_bytes(bytes([1]) * width, "little")
    rows = [int.from_bytes(mask[y * width:(y + 1) * width], "little") for y in range(height)]
    offsets = [(dx, dy) for dy in range(-radius, radius + 1)
               for dx in range(-math.isqrt(radius ** 2 - dy ** 2),
                               math.isqrt(radius ** 2 - dy ** 2) + 1)]
    result = bytearray(width * height)
    for y in range(height):
        row = 0 if dilate else full
        for dx, dy in offsets:
            source = rows[y + dy] if 0 <= y + dy < height else 0
            shifted = (source << (8 * dx) if dx >= 0 else source >> (-8 * dx)) & full
            row = row | shifted if dilate else row & shifted
        result[y * width:(y + 1) * width] = row.to_bytes(width, "little")
    return result


def matte(rgb, width, height):
    """Connected dark-teal removal, then local edge unmatting. No drawn pixels."""
    count = width * height
    pixels = [tuple(rgb[i:i + 3]) for i in range(0, len(rgb), 3)]
    border = [y * width + x for y in (0, height - 1) for x in range(width)]
    border += [y * width + x for x in (0, width - 1) for y in range(height)]
    background = tuple(sorted(pixels[i][c] for i in border)[len(border) // 2]
                       for c in range(3))
    solid = bytearray(sum((p[c] - background[c]) ** 2 for c in range(3)) > 28 ** 2
                      for p in pixels)
    # Seal narrow shadow paths before the exterior flood. Without this, the
    # teal-black original shadows between layered wings are mistaken for backdrop.
    expanded = binary_morphology(solid, width, height, radius=5, dilate=True)
    closed = binary_morphology(expanded, width, height, radius=5, dilate=False)
    keyable = bytearray(not (solid[i] or closed[i]) for i in range(count))
    outside = bytearray(count)
    queue = deque()
    for i in border:
        if keyable[i] and not outside[i]:
            outside[i] = 1
            queue.append(i)
    while queue:
        i = queue.popleft()
        x, y = i % width, i // width
        for j in ((i - 1 if x else -1), (i + 1 if x + 1 < width else -1),
                  (i - width if y else -1), (i + width if y + 1 < height else -1)):
            if j >= 0 and keyable[j] and not outside[j]:
                outside[j] = 1
                queue.append(j)

    rgba = bytearray(count * 4)
    for i, pixel in enumerate(pixels):
        if outside[i]:
            continue
        x, y = i % width, i // width
        neighbors = [yy * width + xx
                     for yy in range(max(0, y - 1), min(height, y + 2))
                     for xx in range(max(0, x - 1), min(width, x + 2))]
        alpha = 1.0
        if solid[i] and any(outside[j] for j in neighbors):
            nearby = [pixels[yy * width + xx]
                      for yy in range(max(0, y - 2), min(height, y + 3))
                      for xx in range(max(0, x - 2), min(width, x + 3))
                      if not outside[yy * width + xx]]
            # Estimate solid edge color locally; invert the original teal composite.
            reference = max(nearby, key=lambda p: sum((p[c] - background[c]) ** 2
                                                      for c in range(3)))
            vector = [reference[c] - background[c] for c in range(3)]
            denominator = sum(v * v for v in vector)
            if denominator:
                alpha = max(0.12, min(1.0, sum((pixel[c] - background[c]) * vector[c]
                                              for c in range(3)) / denominator))
        color = [max(0, min(255, round(background[c] +
                                      (pixel[c] - background[c]) / alpha)))
                 for c in range(3)]
        rgba[i * 4:i * 4 + 4] = bytes([*color, round(alpha * 255)])
    return rgba, background


def alpha_bounds(rgba, width, height):
    points = [i for i in range(width * height) if rgba[i * 4 + 3]]
    if not points:
        raise ValueError("empty frame")
    xs, ys = [i % width for i in points], [i // width for i in points]
    return (min(xs), min(ys), max(xs) + 1, max(ys) + 1)


def register(rgba, width, height, anchor, cell=CELL, pivot=PIVOT):
    left, top, right, bottom = alpha_bounds(rgba, width, height)
    dx, dy = pivot[0] - anchor[0], pivot[1] - anchor[1]
    bounds = (left + dx, top + dy, right + dx, bottom + dy)
    if bounds[0] < 2 or bounds[1] < 2 or bounds[2] > cell[0] - 2 or bounds[3] > cell[1] - 2:
        raise ValueError(f"insufficient padding: {bounds}")
    result = bytearray(cell[0] * cell[1] * 4)
    for y in range(top, bottom):
        source = (y * width + left) * 4
        target = ((y + dy) * cell[0] + left + dx) * 4
        result[target:target + (right - left) * 4] = rgba[source:source + (right - left) * 4]
    return result, bounds


def write_png(path, rgba, width, height):
    run(["magick", "-size", f"{width}x{height}", "-depth", "8", "rgba:-",
         "-strip", "-define", "png:exclude-chunks=date,time", "-define",
         "png:compression-level=9", f"PNG32:{path}"], bytes(rgba))


def pack(frames, cell=CELL, columns=4):
    width, height = cell[0] * columns, cell[1] * math.ceil(len(frames) / columns)
    atlas = bytearray(width * height * 4)
    for index, frame in enumerate(frames):
        if len(frame) != cell[0] * cell[1] * 4:
            raise ValueError("frame dimensions differ from cell dimensions")
        x, y = index % columns * cell[0], index // columns * cell[1]
        for row in range(cell[1]):
            target = ((y + row) * width + x) * 4
            source = row * cell[0] * 4
            atlas[target:target + cell[0] * 4] = frame[source:source + cell[0] * 4]
    return atlas, width, height


def sequences():
    return {
        "flight": {"frames": [f"flight-{i}" for i in range(1, 9)], "loop": True,
                   "exampleFrameDurationMs": 100},
        "turnRightToLeft": {"frames": [f"turn-{i}" for i in range(1, 9)], "loop": False,
                            "exampleFrameDurationMs": 100},
        "turnLeftToRight": {"frames": [f"turn-{i}" for i in range(8, 0, -1)], "loop": False,
                            "exampleFrameDurationMs": 100},
    }


def make_previews(output, temp, frames):
    previews = output / "review"
    previews.mkdir(exist_ok=True)
    for index, frame in enumerate(frames):
        write_png(temp / f"{index:02}.png", frame, *CELL)
    for name, indexes in (("flight", list(range(8))),
                          ("turn-both-directions", [*range(8, 16), *range(14, 8, -1)])):
        for theme, color in (("light", "#fef6e1"), ("dark", "#031315")):
            command = ["magick", "-delay", "10"]
            for index in indexes:
                command += ["(", temp / f"{index:02}.png", "-resize", "104x80",
                            "-background", color, "-alpha", "remove", "-alpha", "off", ")"]
            command += ["-loop", "0", "-define", "webp:lossless=true",
                        previews / f"{name}-{theme}.webp"]
            run(command)
    write_review_html(output)


def write_review_html(output):
    # Standalone review only. Deliberately outside Astro routes and public assets.
    html = '''<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>Moth atlas candidate review</title>
<style>
body{margin:0;padding:24px;background:#e8e4da;color:#182527;font:16px Georgia,serif}
h1{font-size:28px;margin:0 0 8px}h2{font-size:20px;margin:20px 0 10px}p{margin:8px 0}
.grid{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;max-width:1200px}
.tile{min-width:0;padding:8px;text-align:center;border:1px solid #8886;border-radius:4px}
.sprite{width:104px;height:80px;margin:auto;background-image:url('../moth-atlas.png');
background-size:416px 320px;background-repeat:no-repeat}
.checker{background-color:#eee;background-image:conic-gradient(#c7c7c7 25%,transparent 0 50%,#c7c7c7 0 75%,transparent 0);background-size:16px 16px}
.light{background:#fef6e1}.dark{background:#031315;color:#fef6e1}
.label{font:12px monospace;margin-top:8px}.animations{display:flex;gap:16px;flex-wrap:wrap}
.animations figure{margin:0;padding:12px;text-align:center;border:1px solid #8886}
.animations img{width:104px;height:80px;display:block;margin:auto}
@media(max-width:850px){.grid{grid-template-columns:repeat(4,1fr)}}
</style>
<h1>Moth atlas: candidate, not integrated</h1>
<p>Original art preserved. Shared thorax pivot; flight and reversible turn, not a full rotation.</p>
<p>Example only: 104 × 80 CSS pixels per cell, 10 frames/second. Actual site size and timing remain open.</p>
<div id="contacts"></div><h2>Animated review</h2><p>Turns ping-pong for review. Runtime turn sequences are one-shot, not looping.</p>
<div class="animations" id="animations"></div>
<script>
for(const theme of ['checker','light','dark']){
 const heading=document.createElement('h2');heading.textContent=theme+' contact sheet';contacts.append(heading);
 const grid=document.createElement('div');grid.className='grid';contacts.append(grid);
 for(let i=0;i<16;i++){
  const tile=document.createElement('div');tile.className='tile '+theme;
  const sprite=document.createElement('div');sprite.className='sprite';
  sprite.style.backgroundPosition=`${-(i%4)*104}px ${-Math.floor(i/4)*80}px`;
  const label=document.createElement('div');label.className='label';label.textContent=(i<8?'flight-':'turn-')+(i%8+1);
  tile.append(sprite,label);grid.append(tile);
 }
}
for(const theme of ['light','dark'])for(const name of ['flight','turn-both-directions']){
 const figure=document.createElement('figure');figure.className=theme;
 const image=document.createElement('img');image.src=name+'-'+theme+'.webp';image.alt=name+' animation on '+theme;
 const caption=document.createElement('figcaption');caption.textContent=name+' / '+theme;figure.append(image,caption);animations.append(figure);
}
</script></html>
'''
    (output / "review" / "index.html").write_text(html)


def prepare(source_dir, output):
    if output.resolve().is_relative_to(REPO_ROOT):
        raise ValueError("output must be outside the repository; published assets are never overwritten")
    versions = check_tools()
    output.mkdir(parents=True, exist_ok=True)
    frames, records = [], []
    for source in SOURCES:
        path = source_dir / source["file"]
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        if digest != source["sha256"]:
            raise ValueError(f"unapproved/changed input: {path}")
        dimensions = run(["magick", "identify", "-format", "%wx%h", path]).decode()
        if dimensions != "1254x1254":
            raise ValueError(f"unexpected dimensions: {dimensions}")
        rgb = run(["magick", path, "-depth", "8", "rgb:-"])
        for index, (box, anchor) in enumerate(zip(crop_boxes(1254, 1254), source["anchors"])):
            width, height = box[2] - box[0], box[3] - box[1]
            rgba, background = matte(crop_rgb(rgb, 1254, box), width, height)
            local_anchor = (anchor[0] - box[0], anchor[1] - box[1])
            registered, bounds = register(rgba, width, height, local_anchor)
            frame_index = len(frames)
            frames.append(registered)
            records.append({"id": f"{source['prefix']}-{index + 1}", "source": source["file"],
                            "sourceCrop": list(box), "sourcePivot": list(anchor),
                            "atlasRect": [frame_index % 4 * CELL[0], frame_index // 4 * CELL[1], *CELL],
                            "pivot": list(PIVOT), "visibleBounds": list(bounds),
                            "estimatedBackgroundRGB": list(background)})
    atlas, width, height = pack(frames)
    png, webp = output / "moth-atlas.png", output / "moth-atlas.webp"
    write_png(png, atlas, width, height)
    run(["cwebp", "-lossless", "-exact", "-q", "100", "-m", "6", "-alpha_q", "100",
         "-metadata", "none", png, "-o", webp])
    decoded_png = run(["magick", png, "-depth", "8", "rgba:-"])
    decoded_webp = run(["magick", webp, "-depth", "8", "rgba:-"])
    if decoded_png != bytes(atlas) or decoded_webp != decoded_png:
        raise ValueError("lossless RGBA roundtrip failed")
    metadata = {
        "status": "placed-for-delivery-not-integrated", "schemaVersion": 1,
        "image": "moth-atlas.webp", "referenceImage": "assets/moth/candidate/moth-atlas.png",
        "imagePathBasis": "relative to this metadata file", "referenceImagePathBasis": "repository root",
        "sourcePathBasis": "assets/moth/sources/ relative to repository root",
        "width": width, "height": height, "columns": 4, "rows": 4,
        "cell": list(CELL), "pivot": list(PIVOT), "coordinateSystem": "top-left, pixels, x-right y-down",
        "scale": "1 source pixel = 1 atlas pixel; translation only; matte edge uncompositing, no repainting",
        "sourceHashes": {s["file"]: s["sha256"] for s in SOURCES},
        "tools": versions, "frames": records, "sequences": sequences(),
        "matte": {"backgroundDistanceRGB": 28, "shadowClosingDiskRadiusPixels": 5,
                  "edgeReferenceRadiusPixels": 2, "minimumEdgeAlpha": 0.12},
        "delivery": {"pngBytes": png.stat().st_size, "webpBytes": webp.stat().st_size,
                     "decodedRGBAIdentical": True, "decodedRGBABytes": width * height * 4},
        "preview": {"cellWidthCSSPixels": EXAMPLE_WIDTH, "cellHeightCSSPixels": 80,
                    "frameDurationMs": 100, "note": "example only, not a site size/timing decision"},
        "limitations": ["Turning covers right to front to left, not 360 degrees.",
                        "Original frame drawing differences remain; anchors are manually reviewed landmarks.",
                        "Teal-composited source cannot reveal exact original edge coverage or hidden colors.",
                        "Switching flight to turn is not a guaranteed seamless pose match.",
                        "No site integration or runtime acceptance is implied."],
    }
    (output / "moth-atlas.json").write_text(json.dumps(metadata, indent=2) + "\n")
    with tempfile.TemporaryDirectory(prefix="moth-", dir="/tmp/opencode") as temp:
        make_previews(output, Path(temp), frames)
    for source in SOURCES:
        if hashlib.sha256((source_dir / source["file"]).read_bytes()).hexdigest() != source["sha256"]:
            raise ValueError("source changed during preparation")
    print(json.dumps(metadata["delivery"], indent=2))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-dir", type=Path,
                        default=Path(__file__).resolve().parent / "sources")
    parser.add_argument("--output", type=Path, required=True,
                        help="scratch output directory outside the repository")
    args = parser.parse_args()
    prepare(args.source_dir, args.output)
