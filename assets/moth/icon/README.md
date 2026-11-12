# Approved moth outline

Status: exact-version artwork approved by the user's “works for me” response to the local review preview, with explicit go-ahead to replace the text label. The integrated navigation control and runtime have since been accepted.

The user approved an original single-color moth outline with open wings, a small body and antennae, matching the navigation theme icon. This is a separate UI drawing, not a recreation or modification of the approved brand mark.

- Source/master: `moth-outline.svg`, authored directly at this path through `codex exec --skip-git-repo-check -` on 2026-11-11.
- Authoring tools: Codex CLI 0.167.1, reported model `gpt-6-luna`.
- SHA-256: `912e1e7494744506b8e0621ee98ba2419f61106ccd82043cb0874eac48ff28bf`.
- Format: editable self-contained SVG, 686 bytes, square `viewBox="0 0 24 24"`, no fill or background, `currentColor` stroke 1.75 with rounded joins/caps.
- Intended display: 20 × 20 CSS pixels, matching the existing theme icon. File-size budget unknown.
- Color: supplied by consumer CSS through `currentColor`; light/dark inspection uses the site's sRGB palette relationships. No baked theme colors.
- Selected inspection preview: `../review/icon-preview.png`, showing actual 20px icons beside the existing theme symbols and a 96px enlargement. This is optional, ignored local review evidence, not a runtime derivative; inspection renders can be recreated from the SVG.
- Inclusion: `src/components/Nav.astro` imports the unchanged SVG with Vite's `?raw` loader into an `aria-hidden` wrapper. There is no second hand-authored icon source. Runtime changes the button's accessible label, title, and pressed state without replacing its artwork.

Verification: Python XML parsing and source inspection found no scripts, event handlers, external references, embedded raster, text, or dependencies. Chromium 155.0.8059.84 rendered both themes. A native 20px transparent render contained alpha 0 and alpha 1; ink bounds were 18 × 17px at offset +1,+1, without edge clipping. Designer inspected the selected preview at actual size and enlargement. The small silhouette is intentionally abstract. The approved master and source hash remain unchanged during integration.

Integration inspection: Chromium renders at 1280/390/320px show a single 64px navigation row, 20px icon, and 44px button targets without horizontal overflow. Browser probes confirmed identical approved path data before and after Hide/Show, with accessible labels, title, and pressed state updating. Screenshots: `/tmp/opencode/moth-poc-design-nav-icon-{1280,390,320}-{dark,light}.png`. At 320px, the full site name wraps and the secondary notebook tagline is omitted to preserve control space.

Additional reproducible transparent inspection render, verified with ImageMagick 7.1.2-34:

```sh
magick -background none assets/moth/icon/moth-outline.svg -resize 20x20 /tmp/opencode/moth-icon-inspect.png
```

The secondary renderer completed with system Fontconfig warnings; the selected preview uses Chromium, not that renderer. No production derivatives or additional sprites were created.
