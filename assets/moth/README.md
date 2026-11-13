# Moth atlas

Status: the atlas and metadata are delivered from `public`, the page animation is integrated, and the user has accepted the runtime. Preparation review: `rjroy_github_io-6xf`.

The user authorized transparent, body-aligned derivatives of the supplied flight and turn sheets, and later authorized adding and activating the supplied read poses. No new artwork was generated or painted. The original source files and approved brand mark remain unchanged. Source authorship and licensing beyond the supplied artwork are not established here.

## Review

Generate a scratch package as described below, then open `/tmp/opencode/moth-regenerated/review/index.html` in a browser. It shows every frame on checkerboard, Parchment and Night, plus flight and reversible-turn animated WebP previews on both solid backgrounds. Optional local copies in `candidate/` and a captured overview in `review/` are ignored and not required.

The example cell is **104 × 80 CSS pixels at 10 frames/second**, not a settled site size or timing. The visible moth occupies roughly 53–77 × 65–73 pixels inside that padded cell. Full-resolution cells are 416 × 320 pixels.

### Visual findings

- The original flight and turn frames have at least 8 source pixels of transparent cell padding. The read frames have at least 2 pixels. The shared registration pivot removes source-sheet placement drift without rescaling the drawings.
- Flight reads as open → lowered → reopened wings. Small head/body drawing changes remain and can produce slight motion independent of wing flapping.
- Turning reads right → front → left. The reverse sequence is exactly the opposite order. This is not a full 360-degree rotation. Turning previews ping-pong for convenient review; the metadata specifies one-shot turns.
- Original dark shadows were retained between overlapping wings and body parts. Simple global color removal lost these shadows and was rejected during preparation.
- At native resolution, some tiny dark edge flecks and short dark bridges remain around fine fur/antenna gaps, most visible on light backgrounds. These are less apparent at the example size. Teal-composited input cannot reveal exact original coverage or hidden edge colors. This candidate favors retaining the supplied character over aggressive erosion of its dark details.
- Pivot registration is consistent, but a flight-to-turn pose switch is not guaranteed seamless. Actual page size, timing, reduced-motion treatment, movement and transition behavior were separate integration decisions.

## Delivery choice

One **4 × 6 atlas, 1664 × 1920 pixels**, holds the eight flight frames, eight turn frames, then eight read poses. The first 16 frame rectangles and decoded pixels remain unchanged. Equal integer-sized cells avoid the originals' fractional 313.5-pixel columns. A single request loads all frames.

| File | Bytes | Role |
| --- | ---: | --- |
| `../../public/assets/moth-atlas.webp` | 1,588,980 | Public delivery, lossless RGBA |
| Scratch `moth-atlas.png` | 2,035,496 | Regenerable full-resolution transparent reference |
| `../../public/assets/moth-atlas.json` | — | Exact crops, source pivots, atlas rectangles, bounds, sequences and tools |

Lossless WebP is **21.94% smaller** than PNG, with **byte-identical decoded RGBA, including partial alpha and transparent-pixel RGB**. No lossy or indexed-color compromise was needed. Both decode to 12,779,520 RGBA bytes; this is an image storage calculation, not measured browser/GPU memory. Full source detail was retained during preparation rather than deciding the UI size at that stage.

The atlas and JSON metadata are tracked in `public/assets`; the original PNG sheets, recipe and tests are tracked in `assets/moth`. Generated `candidate/` and `review/` directories are ignored optional local artifacts, outside `public`. The atlas is now used by the accepted page animation.

## Assembly contract

- Top-left pixel coordinates, positive x right and y down.
- Cell dimensions: `[416, 320]`; pivot in every cell: `[208, 176]`.
- Translation only: one source pixel remains one atlas pixel. No scaling, mirroring, rotation or repainting of frame artwork. Edge RGB is uncomposited from the estimated teal background where partial alpha is inferred.
- Source crops are `[left, top, rightExclusive, bottomExclusive]`. Atlas rectangles are `[x, y, width, height]`. Visible bounds are cell-local `[left, top, rightExclusive, bottomExclusive]`.
- `flight`: `flight-1` through `flight-8`, looping.
- `turnRightToLeft`: `turn-1` through `turn-8`, one-shot.
- `turnLeftToRight`: `turn-8` through `turn-1`, one-shot.
- `read`: `read-1` through `read-8`, looping in source order during investigation of a usable target, after any arrival turn. Initial idle and targetless wandering retain flight frames. Runtime holds the poses for 400, 250, 250, 600, 250, 250, 250 and 950 ms respectively; departure does not wait for the cycle.
- The user approved placing `read-3` 3 pixels and `read-4` 5 pixels lower than their anatomical landmarks would place them, preserving antennae and the minimum 2-pixel padding. Their recorded source pivots are registration anchors, not the anatomical landmarks.
- The 100 ms frame duration is an example only, recorded separately in metadata.

## Sources and reproducible preparation

Inputs are in `assets/moth/sources/`; the recipe rejects changed input hashes:

```text
d6d02e8fb7998015d6a83f1ebcd95459129b619694af570ae3f1bf9da04da079  moth-sprite-sheet.png
4b9d1e5d06eb3dde643de7216e6177d4010efce294d535fd298026fda298955d  moth-rotation-sprite-sheet.png
d97bce65c15327fcb07384ff1a7b11f3cafca6fa53e311080b8d4e1d37f8e685  moth-read-sprite-sheet.png
```

All three are 1254 × 1254 opaque RGB PNGs. The recipe uses explicit hand-reviewed thorax landmarks, with the two approved read-pose registration adjustments noted above, integer partition crops, a border-median teal estimate, a radius-28 RGB-distance key, radius-5 disk closing to retain connected dark shadows, an exterior flood, and local radius-2 edge uncompositing. These settings and registration anchors are in `prepare.py`; key settings are also recorded in JSON. It creates separate derivative files and never writes its source inputs.

Installed tools used: Python **3.14.8**, ImageMagick **7.1.2-34 Q16-HDRI**, libwebp/cwebp **1.6.0**. The recipe checks ImageMagick and cwebp release versions before execution and uses only Python's standard library. No dependencies were installed. Python code follows standard-library style; tests use `unittest` and synthetic, test-owned pixels rather than mutable artwork values.

From the repository root:

```sh
python -B -m unittest discover -s assets/moth -p 'test_*.py' -v
python -B assets/moth/prepare.py --output /tmp/opencode/moth-regenerated
python -B assets/moth/verify.py
sha256sum public/assets/moth-atlas.webp assets/moth/sources/moth-sprite-sheet.png assets/moth/sources/moth-rotation-sprite-sheet.png assets/moth/sources/moth-read-sprite-sheet.png
```

Preparation requires an explicit output directory outside the repository. It writes a complete scratch package, including the PNG reference, review previews, WebP and JSON, and never overwrites the published assets. The standalone review uses the scratch PNG reference. Metadata's image path is relative to the JSON and resolves to the public WebP; source filenames are relative to `assets/moth/sources`. Its historical repository-relative `referenceImage` points to an optional ignored local copy and may not exist; regenerate the PNG in scratch instead.

Unit tests cover crop partitioning, row order, disk morphology, dark-detail preservation, edge alpha, pivot translation, clipping rejection, packing, reverse-turn ordering, the scratch-only output guard and verification without local artifacts. `verify.py` regenerates the package in a temporary directory and compares the public WebP and JSON **byte-for-byte**. It checks the generated PNG, metadata paths, PNG/WebP RGBA equivalence, real alpha, frame bounds/padding, pivots, sequence references, original hashes, and transient animated-preview frame counts/canvases/timing, without comparing saved previews. Preview files contain eight flight frames or fourteen ping-pong turn frames, each with a 100 ms delay and a 104 × 80 logical canvas.

### Browser/image inspection

Chromium **155.0.8059.84** rendered the standalone review page. All checker/light/dark contact frames were inspected at the example size; the full-resolution atlas was also composited and inspected on Parchment and Night. Animated WebP files were decoded/coalesced to validate their full frame canvases and sequence timing, and all decoded frames were visually inspected as ordered strips at the example size. Chromium capture confirms browser rendering, not subjective real-time playback acceptance or performance on the actual site.

Capture command, run from the repository root (exit **0**):

```sh
chromium --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --allow-file-access-from-files --window-size=1280,1340 \
  --virtual-time-budget=1800 \
  --screenshot=/tmp/opencode/moth-review-final.png \
  "file:///tmp/opencode/moth-regenerated/review/index.html"
```

The historical `review/contact-sheet.png`, if retained locally, is a 1280 × 1340 overview; the animated area represents one sampled moment. It is optional review evidence, not required for reproduction. Scratch full-resolution inspection composites may remain in `/tmp/opencode/moth-atlas-light-final.png` and `/tmp/opencode/moth-atlas-dark-final.png` from the original session.

At the time of the original relocation, no page integration or runtime acceptance had taken place.
