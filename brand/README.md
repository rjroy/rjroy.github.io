# The Guide on Assume the Possible

`BRAND.md` is copied from the approved personal-brand specification. The current approved artwork master is `assets/approved-a5.svg`; its public copy is `public/assets/approved-a5.svg`. Keep those two files byte-identical. The initial master came from `/home/rjroy/Projects/writing/personal-brand/brand/assets/approved-a5.svg`; that external path is no longer available.

The user approved the rounded-corner revision already supplied in the portable master. Only the Night-background rectangle gained `rx="156.75"`; paths, palette, title, and canvas are unchanged. Revised master/public SHA256: `1695e5b29cea6ea84a0cc18e147f150b30f12e4075ca9dcc486c62a9bd9ce0d4`. Navigation, browser icon, and project fallback all consume this exact SVG, without CSS rounding or raster derivatives.

The user approved the site name **Assume the Possible**, unchanged A.5 publication, and supporting palette application. Content, typography, navigation, URLs, homepage composition, and light/dark choice are preserved. The source kit's PNG uses superseded colors and is deliberately omitted. A.1 and the companion PDF are not part of this phase.

The upstream guide acquired Libre Baskerville / Source Sans 3 typography during implementation. This phase's explicit instruction to preserve existing typography takes precedence: IM Fell English SC, Vollkorn, and JetBrains Mono remain. No font files are copied or migrated.

Brand artwork is all rights reserved, not CC BY; see `public/brand-artwork-license.txt`. The declared browser icon remains the unchanged SVG. The Apple-touch declaration remains absent; updating the two raster files below does not change page-head behavior. Social previews retain the earlier `/assets/two-cities.webp` landscape rather than the previously missing `/og-image.png`.

The user subsequently supplied and authorized `bg.webp` as the homepage background. It was moved losslessly to `public/assets/guide-landscape.webp` after copy verification (SHA256 `145ed921467c09d02d36ddd4bdf15b886408dfb64e6583f4e0af1d746bc4cc6f`). This is the exact supplied artwork, not generated art or an A.5 modification. The mobile background position keeps the guide in view, with a stronger mobile overlay for text contrast; composition, content, fonts, and social metadata are unchanged. Runtime acceptance remains the user's decision.

## Authorized raster icons

The user separately authorized replacing `public/apple-touch-icon.png` (180×180) and `public/favicon.webp` (48×48), preserving their existing dimensions. Both derive only from the exact local `public/assets/approved-a5.svg` with input SHA256 `1695e5b29cea6ea84a0cc18e147f150b30f12e4075ca9dcc486c62a9bd9ce0d4`. Neither SVG nor the local brand guide was refreshed. The current external guide at `~/Projects/personal-brand/brand/BRAND.md` was consulted.

Reproduce from the repository root with **rsvg-convert 2.63.3** (Cairo 1.18.6) and **cwebp 1.6.0**:

```bash
workdir=$(mktemp -d /tmp/opencode/brand-icons.XXXXXX)
rsvg-convert --format png --width 180 --height 180 --output public/apple-touch-icon.png public/assets/approved-a5.svg
rsvg-convert --format png --width 48 --height 48 --output "$workdir/favicon.png" public/assets/approved-a5.svg
cwebp -lossless -exact -q 100 -alpha_q 100 -m 6 -metadata none "$workdir/favicon.png" -o public/favicon.webp
```

Native SVG rasterization preserves the artwork's proportions and transparent rounded corners; no background flattening, cropping, recoloring, shadows, or additional masks are applied. WebP encoding preserves the 48px PNG's decoded RGBA pixels exactly. Two independent conversions produced byte-identical outputs. Output SHA256: PNG `77a77c18e0dd7c16a10a29787346bd81b95d5f83af11a7067f09f08759fdbcfd`; WebP `cc1374f5508ced54ef8fc7eb9ec94e3984a8f30e7d4c23280879639437bcb956`. Independent verification and user runtime acceptance remain separate.
