"""Controlled synthetic tests. Real-asset reproduction is a separate verification."""

import unittest
import hashlib
import json
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch

import prepare
import verify


class PreparationTests(unittest.TestCase):
    def test_read_source_is_registered_after_existing_sources(self):
        sources = prepare.SOURCES
        self.assertEqual([source["prefix"] for source in sources], ["flight", "turn", "read"])
        self.assertEqual(sources[2]["file"], "moth-read-sprite-sheet.png")
        self.assertEqual(len(sources[2]["anchors"]), 8)

    def test_prepare_packs_three_synthetic_sheets_without_moving_original_frames(self):
        with TemporaryDirectory() as temp:
            root = Path(temp)
            sources = []
            for prefix in ("flight", "turn", "read"):
                data = prefix.encode()
                filename = f"{prefix}.png"
                (root / filename).write_bytes(data)
                sources.append({"file": filename, "sha256": hashlib.sha256(data).hexdigest(),
                                "prefix": prefix, "anchors": [(0, 0)] * 8})

            encoded = {}

            def write_png(path, rgba, width, height):
                encoded["rgba"] = bytes(rgba)
                path.write_bytes(b"png")

            def run(command):
                if command[0] == "cwebp":
                    Path(command[-1]).write_bytes(b"webp")
                    return b""
                if command[1] == "identify":
                    return b"1254x1254"
                if str(command[1]).endswith(("moth-atlas.png", "moth-atlas.webp")):
                    return encoded["rgba"]
                return b"synthetic source"

            with (patch.object(prepare, "SOURCES", sources),
                  patch.object(prepare, "check_tools", return_value={}),
                  patch.object(prepare, "run", side_effect=run),
                  patch.object(prepare, "crop_boxes", return_value=[(0, 0, 1, 1)] * 8),
                  patch.object(prepare, "crop_rgb", return_value=b"rgb"),
                  patch.object(prepare, "matte", return_value=(bytes([1, 2, 3, 255]), (0, 0, 0))),
                  patch.object(prepare, "write_png", side_effect=write_png),
                  patch.object(prepare, "make_previews")):
                output = root / "output"
                prepare.prepare(root, output)

            metadata = json.loads((output / "moth-atlas.json").read_text())
            self.assertEqual((metadata["columns"], metadata["rows"]), (4, 6))
            self.assertEqual((metadata["width"], metadata["height"]), (1664, 1920))
            self.assertEqual(metadata["cell"], [416, 320])
            self.assertEqual(metadata["pivot"], [208, 176])
            frames = metadata["frames"]
            self.assertEqual([frame["id"] for frame in frames],
                             [f"{prefix}-{i}" for prefix in ("flight", "turn", "read")
                              for i in range(1, 9)])
            for index, frame in enumerate(frames):
                self.assertEqual(frame["atlasRect"], [index % 4 * 416, index // 4 * 320, 416, 320])
                self.assertEqual(frame["pivot"], [208, 176])
                self.assertEqual(frame["visibleBounds"], [208, 176, 209, 177])
                self.assertEqual(frame["source"], sources[index // 8]["file"])
            sequences = metadata["sequences"]
            self.assertEqual(sequences["flight"]["frames"], [f"flight-{i}" for i in range(1, 9)])
            self.assertTrue(sequences["flight"]["loop"])
            self.assertEqual(sequences["turnRightToLeft"]["frames"], [f"turn-{i}" for i in range(1, 9)])
            self.assertEqual(sequences["turnLeftToRight"]["frames"], [f"turn-{i}" for i in range(8, 0, -1)])
            self.assertFalse(sequences["turnRightToLeft"]["loop"])
            self.assertFalse(sequences["turnLeftToRight"]["loop"])
            self.assertEqual(sequences["read"]["frames"], [f"read-{i}" for i in range(1, 9)])

    def test_verification_uses_scratch_previews_without_local_artifacts(self):
        with TemporaryDirectory() as temp:
            root = Path(temp)
            scratch, public = root / "scratch", root / "public"
            scratch.mkdir()
            public.mkdir()
            (scratch / "moth-atlas.png").write_bytes(b"reference")
            for suffix in ("webp", "json"):
                for directory in (scratch, public):
                    (directory / f"moth-atlas.{suffix}").write_bytes(suffix.encode())
            calls = []

            def run(command):
                preview = command[1]
                calls.append(preview)
                count = 8 if preview.name.startswith("flight-") else 14
                return b"104x80:10\n" * count

            verify.verify_regeneration(scratch, public / "moth-atlas.webp", run)
            self.assertEqual(len(calls), 4)
            self.assertTrue(all(path.parent == scratch / "review" for path in calls))
            self.assertFalse((root / "candidate").exists())
            self.assertFalse((root / "review").exists())
            (public / "moth-atlas.webp").write_bytes(b"different")
            with self.assertRaisesRegex(AssertionError, "nonidentical regeneration"):
                verify.verify_regeneration(scratch, public / "moth-atlas.webp", run)
            (public / "moth-atlas.webp").write_bytes(b"webp")
            with self.assertRaisesRegex(AssertionError, "wrong preview"):
                verify.verify_regeneration(scratch, public / "moth-atlas.webp", lambda _: b"wrong\n")

    def test_prepare_rejects_repository_output_before_running_tools(self):
        with self.assertRaisesRegex(ValueError, "outside the repository"):
            prepare.prepare(Path("unused"), prepare.REPO_ROOT / "public" / "assets")

    def test_partition_covers_fractional_columns_without_overlap(self):
        boxes = prepare.crop_boxes(14, 10)
        self.assertEqual(boxes[:4], [(0, 0, 4, 5), (4, 0, 7, 5),
                                     (7, 0, 10, 5), (10, 0, 14, 5)])
        self.assertEqual(sum((r - l) * (b - t) for l, t, r, b in boxes), 140)

    def test_crop_preserves_row_order(self):
        pixels = bytes(range(36))
        self.assertEqual(prepare.crop_rgb(pixels, 4, (1, 1, 3, 3)),
                         pixels[15:21] + pixels[27:33])

    def test_matte_preserves_enclosed_dark_details_and_removes_exterior(self):
        background = (2, 23, 27)
        pixels = [background] * 81
        for y in range(2, 7):
            for x in range(2, 7):
                pixels[y * 9 + x] = (240, 185, 70)
        pixels[4 * 9 + 4] = background  # enclosed dark eye, not background
        rgba, estimated = prepare.matte(bytes(v for p in pixels for v in p), 9, 9)
        self.assertEqual(estimated, background)
        self.assertEqual(rgba[3], 0)
        self.assertEqual(rgba[(4 * 9 + 4) * 4 + 3], 255)
        self.assertEqual(rgba[(5 * 9 + 5) * 4:(5 * 9 + 5) * 4 + 4], bytes([240, 185, 70, 255]))

    def test_edge_unmatting_produces_partial_alpha_not_a_teal_outline(self):
        bg = (2, 23, 27)
        pixels = [bg] * 49
        for y in range(2, 5):
            for x in range(2, 5):
                pixels[y * 7 + x] = (242, 183, 67)
        pixels[3 * 7 + 1] = (122, 103, 47)  # exact half-coverage edge
        rgba, _ = prepare.matte(bytes(v for p in pixels for v in p), 7, 7)
        edge = rgba[(3 * 7 + 1) * 4:(3 * 7 + 1) * 4 + 4]
        self.assertEqual(list(edge), [242, 183, 67, 128])

    def test_closing_retains_narrow_dark_shadow_paths(self):
        width, height = 35, 35
        bg, gold = (2, 23, 27), (242, 183, 67)
        pixels = [bg] * (width * height)
        for y in range(10, 25):
            for x in range(10, 25):
                pixels[y * width + x] = gold
        for y in range(10, 20):
            pixels[y * width + 17] = bg
        rgba, _ = prepare.matte(bytes(v for p in pixels for v in p), width, height)
        self.assertEqual(rgba[(15 * width + 17) * 4 + 3], 255)
        self.assertEqual(rgba[(4 * width + 17) * 4 + 3], 0)

    def test_binary_morphology_on_controlled_mask(self):
        mask = bytearray(49)
        mask[3 * 7 + 3] = 1
        expanded = prepare.binary_morphology(mask, 7, 7, 1, True)
        self.assertEqual(sum(expanded), 5)
        self.assertEqual(expanded[2 * 7 + 2], 0)  # disk, not a square
        closed = prepare.binary_morphology(expanded, 7, 7, 1, False)
        self.assertEqual(closed, mask)

    def test_register_moves_anchor_once_and_preserves_all_visible_pixels(self):
        rgba = bytearray(6 * 6 * 4)
        rgba[(2 * 6 + 2) * 4:(2 * 6 + 2) * 4 + 4] = bytes([10, 20, 30, 255])
        result, bounds = prepare.register(rgba, 6, 6, (2, 2), cell=(10, 10), pivot=(5, 5))
        self.assertEqual(bounds, (5, 5, 6, 6))
        self.assertEqual(result[(5 * 10 + 5) * 4:(5 * 10 + 5) * 4 + 4], bytes([10, 20, 30, 255]))
        self.assertEqual(sum(result[3::4]), 255)

    def test_register_rejects_clipping_and_empty_frames(self):
        rgba = bytes([10, 20, 30, 255]) * 9
        with self.assertRaisesRegex(ValueError, "padding"):
            prepare.register(rgba, 3, 3, (0, 0), cell=(4, 4), pivot=(0, 0))
        with self.assertRaisesRegex(ValueError, "empty"):
            prepare.alpha_bounds(bytes(16), 2, 2)

    def test_reverse_turn_is_exact_and_not_a_loop(self):
        sequences = prepare.sequences()
        forward, reverse = sequences["turnRightToLeft"], sequences["turnLeftToRight"]
        self.assertEqual(forward["frames"], list(reversed(reverse["frames"])))
        self.assertFalse(forward["loop"])
        self.assertFalse(reverse["loop"])
        self.assertTrue(sequences["flight"]["loop"])

    def test_pack_keeps_frame_rows_and_rgba_channels(self):
        first = bytes([10, 20, 30, 128]) * 4
        second = bytes([40, 50, 60, 255]) * 4
        atlas, width, height = prepare.pack([first, second], cell=(2, 2), columns=2)
        self.assertEqual((width, height), (4, 2))
        self.assertEqual(atlas, (first[:8] + second[:8]) * 2)
        with self.assertRaisesRegex(ValueError, "dimensions"):
            prepare.pack([bytes(3)], cell=(2, 2), columns=2)


if __name__ == "__main__":
    unittest.main()
