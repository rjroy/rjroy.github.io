#!/usr/bin/env python3
"""Integration check: regenerate in scratch, byte-compare, inspect alpha/sequences."""

import hashlib
import json
from pathlib import Path
import tempfile

import prepare


def verify_regeneration(regenerated, published, run):
    """Compare published files and inspect previews generated in scratch."""
    for name, original in (("moth-atlas.webp", published),
                           ("moth-atlas.json", published.with_suffix(".json"))):
        if original.read_bytes() != (regenerated / name).read_bytes():
            raise AssertionError(f"nonidentical regeneration: {name}")
    if not (regenerated / "moth-atlas.png").is_file():
        raise AssertionError("regenerated reference PNG missing")
    for name, count in (("flight", 8), ("turn-both-directions", 14)):
        for theme in ("light", "dark"):
            preview = regenerated / "review" / f"{name}-{theme}.webp"
            details = run(["magick", preview, "-coalesce", "-format", "%wx%h:%T\n", "info:"])
            if details.decode().splitlines() != ["104x80:10"] * count:
                raise AssertionError(f"wrong preview canvas, duration or frame count: {preview}")


def verify():
    root = Path(__file__).resolve().parent
    sources = root / "sources"
    published = prepare.REPO_ROOT / "public" / "assets" / "moth-atlas.webp"
    metadata_path = published.with_suffix(".json")
    with tempfile.TemporaryDirectory(prefix="moth-reproduce-", dir="/tmp/opencode") as scratch:
        regenerated = Path(scratch)
        prepare.prepare(sources, regenerated)
        verify_regeneration(regenerated, published, prepare.run)
        print("PASS: published atlas and metadata reproduced byte-for-byte; transient previews checked")
    metadata = json.loads(metadata_path.read_text())
    if (metadata_path.parent / metadata["image"]).resolve() != published.resolve():
        raise AssertionError("metadata image does not resolve to published atlas")
    if metadata["referenceImage"] != "assets/moth/candidate/moth-atlas.png":
        raise AssertionError("unexpected historical reference image path")
    width, height = metadata["width"], metadata["height"]
    rgba = prepare.run(["magick", published, "-depth", "8", "rgba:-"])
    alphas = set(rgba[3::4])
    if not ({0, 255} <= alphas and any(0 < a < 255 for a in alphas)):
        raise AssertionError("expected transparent, opaque and partial-alpha pixels")
    ids = {frame["id"] for frame in metadata["frames"]}
    if len(ids) != 16:
        raise AssertionError("expected sixteen unique frames")
    for sequence in metadata["sequences"].values():
        if any(frame not in ids for frame in sequence["frames"]):
            raise AssertionError("sequence references an unknown frame")
    for frame in metadata["frames"]:
        x, y, w, h = frame["atlasRect"]
        if x < 0 or y < 0 or x + w > width or y + h > height:
            raise AssertionError("atlas rectangle out of bounds")
        cell = b"".join(rgba[((y + row) * width + x) * 4:
                             ((y + row) * width + x + w) * 4] for row in range(h))
        bounds = prepare.alpha_bounds(cell, w, h)
        if list(bounds) != frame["visibleBounds"]:
            raise AssertionError(f"bounds disagree: {frame['id']}")
        if min(bounds[0], bounds[1], w - bounds[2], h - bounds[3]) < 2:
            raise AssertionError("frame touches cell boundary")
        if frame["pivot"] != metadata["pivot"]:
            raise AssertionError("inconsistent registration pivot")
    for source in prepare.SOURCES:
        digest = hashlib.sha256((sources / source["file"]).read_bytes()).hexdigest()
        if digest != source["sha256"]:
            raise AssertionError("original source changed")
    print("PASS: alpha, frame bounds/padding, pivots, sequences, preview timing, original hashes")
    print("PASS: PNG/WebP RGBA identical (checked during regeneration)")


if __name__ == "__main__":
    verify()
