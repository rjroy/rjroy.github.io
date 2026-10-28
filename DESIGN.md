---
name: Assume the Possible
description: The Guide identity applied to Ron's existing public working notebook.
colors:
  night: "#031315"
  lantern: "#EFB83F"
  horizon: "#26A9DB"
  parchment: "#FEF6E1"
typography:
  display:
    fontFamily: "IM Fell English SC, serif"
    fontSize: "60px"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0.04em"
  body:
    fontFamily: "Vollkorn, Georgia, serif"
    fontSize: "17px"
    lineHeight: 1.55
  mono:
    fontFamily: "JetBrains Mono, monospace"
rounded:
  default: "6px"
  card: "10px"
spacing:
  small: "8px"
  medium: "16px"
  large: "24px"
components:
  button-primary:
    backgroundColor: "{colors.lantern}"
    textColor: "{colors.night}"
    rounded: "{rounded.default}"
    padding: "12px 24px"
---

# Design System: Assume the Possible

## Overview

**Creative North Star: "The Guide"**

This is an identity and palette application, not a homepage redesign. The approved mark and supporting palette join the existing workshop imagery, editorial typography, page hierarchy, and interactions. Product scope is recorded in `PRODUCT.md`; artwork authority is `brand/BRAND.md` with phase-specific exceptions in `brand/README.md`.

## Colors

Night and Parchment are the foundations. Lantern carries warm actions and restrained accents; Horizon carries dark-mode links and cool accents. Supporting surfaces, secondary text, and borders mix these core colors rather than introduce additional brand hues. `src/styles/tokens.css` owns semantic assignments; Tailwind references those variables.

In light mode, text and links use Night or readable Night/Parchment mixtures. Do not use unmodified Lantern or Horizon as small text on Parchment. Actions use Night labels on Lantern in both themes. Status labels retain explicit words so their meaning never depends on color.

## Typography

Existing locally hosted IM Fell English SC display, Vollkorn body, and JetBrains Mono metadata/code remain by explicit approval. The upstream guide's newer font pairing is not adopted in this phase. Article body is 20px/1.7 on desktop and 17px on narrow screens. Hero and reading headings retain their existing fluid sizes.

## Layout

Existing routes and page composition remain. Shared containers are 1180px maximum with 24px side padding; reading columns are 720px maximum. Navigation remains 64px tall. Breakpoints at 920px and 560px preserve the existing stacking behavior. At the narrow breakpoint only the longer identity lockup receives compact spacing/type treatment so the unchanged 34px mark and both controls fit.

## Elevation & Depth

Existing cards retain restrained offset shadows and tonal layers. Hero overlays now use Night to keep the original light text readable in both themes. Global grain and the logo's drop shadow are removed: no overlay, filter, opacity adjustment, or new decoration changes the mark. Existing transitions and reduced-motion handling remain.

## Shapes

Existing component radii remain. The approved A.5 artwork keeps its native square canvas and supplied rounded Night-background rectangle, with transparent corners visible in light mode. The rounding belongs to the revised approved SVG; do not add CSS rounding, cropping, or another silhouette.

## Components

The shared home link uses A.5 beside **Assume the Possible** and the existing notebook subtitle. Active navigation remains explicit with an underline. Buttons and selected project filters use Lantern with Night labels; essential light-mode boundaries use Night. Links retain underlines, and keyboard focus uses a 2px Night/light-mode or Horizon/dark-mode outline with 4px offset. Hero focus stays Parchment.

## Do's and Don'ts

- Use `src/site.ts` for shared identity and default metadata.
- Keep the portable and published approved SVG byte-identical.
- Preserve the saved light/dark choice, content, navigation, typography, and homepage composition.
- Exclude brand artwork from the written-content CC BY license.
- Do not add A.1, new artwork, raster derivatives, or a font migration without separate approval.

Pre-existing eyebrow labels, 3px accent strips, and pull-quote/callout borders remain outside this identity-only change; they are not new design-system recommendations. Independent final verification and review are pending.
