# The Guide — Brand Specification

**Status:** Approved identity guidance  
**Companion:** `reference/the-guide-brand-guide.pdf` (human-readable brand guide)  
**Source of truth for artwork:** the approved files in `assets/`, not descriptions or AI-generated approximations.

## 1. Identity

**Name:** The Guide  
**Visual tagline:** *A light offered. A path chosen.*  
**Personal metaphor:** *I can’t walk your path, but I can help you see it.*  
**Philosophical foundation:** **Trust freely. Seek understanding. Keep learning.**

The Guide represents guidance without control. A guide does not choose another person's path. A guide offers perspective, asks questions, makes obstacles visible, and trusts others to find their own way.

Trust is given at the beginning, not earned through compliance. Honest feedback expresses belief in someone's capability, not a judgment of their worth.

The lantern represents **clarity, not certainty**. It illuminates what can be seen while acknowledging what remains unknown. When new understanding emerges, the path can change.

The guide's purpose is not to become indispensable. It is to help others grow confident and capable enough to navigate without the guide.

This is a **personal identity**, not a corporate brand or a management-only identity. The principles can inform leadership, creative work, writing, and technical projects without making every expression about professional management.

## 2. Core principles

| Principle | Meaning |
| --- | --- |
| **Trust Freely** | Begin with belief in people's competence and good faith. |
| **Seek Reality** | Make truth, obstacles, and tradeoffs visible before deciding how to proceed. |
| **Learn Together** | Stay curious, welcome feedback, acknowledge mistakes, and adapt. |
| **Enable Growth** | Ask questions, share understanding, and help others develop their own judgment. |

These principles are grounded in **trust, learning, and humility**. Do not reduce them to vague positivity: direct feedback, accountability, and adapting to evidence are compatible with trust.

## 3. Approved assets and their roles

| File | Role | Typical uses |
| --- | --- | --- |
| `assets/approved-a5.svg` | **Primary identity mark**; preferred scalable source | Website identity, avatars, signatures, app tiles, compact brand placements |
| `assets/approved-a5.png` | Raster version of primary mark | Platforms that cannot use SVG, social profiles, previews |
| `assets/approved-a1.webp` | **Hero / narrative artwork** | Article splash images, landing-page hero sections, presentation covers, editorial features |

**A.5 — Identity.** A deliberately simplified emblem. Its silhouette, shape language, composition, and limited palette are intentional. It is not an unfinished version of A.1. Preserve the supplied asset exactly unless the user explicitly requests a revision.

**A.1 — Expression.** A more detailed, narrative interpretation of the same identity. Use when the image has enough room to tell a story. It should not replace A.5 in small or utilitarian placements.

**Asset precedence:** Use the approved files, not images generated from a verbal description of them. If the SVG and PNG differ, flag the discrepancy rather than silently selecting or altering one. For a new A.1-style illustration, use `approved-a1.webp` as the visual reference, and distinguish *new derivative artwork* from the approved original.

## 4. Color system

The approved palette has **exactly four core colors**:

| Token | Hex | Function |
| --- | --- | --- |
| **Night** | `#031315` | Primary background and silhouette |
| **Lantern** | `#EFB83F` | Warmth, possibility, keystone, fantasy-side accents |
| **Horizon** | `#5E8BD6` | Discovery, future, sci-fi-side accents |
| **Parchment** | `#FEF6E1` | Arch, path, negative space, light surfaces |

The gold is the **refined, approved value**; older values `#FEBE38` and `#1AB7F1` are superseded. Horizon `#5E8BD6` is the current site-accent trial. Approved artwork remains unchanged and retains its original Horizon blue `#26A9DB`.

### Color usage

- Favor **Night** and **Parchment** as the dominant supporting colors in layouts.
- Use **Lantern** and **Horizon** as purposeful accents rather than flooding every interface with both.
- In the primary A.5 mark, preserve the existing assignments of colors to shapes.
- Do **not** introduce gradients, additional hues, textures, or shading into A.5.
- Do not recolor isolated regions of the approved mark to suit a page. Instead, adjust the page around the mark.
- Supporting layouts may use typographic hierarchy and spacing for variety; avoid inventing new brand colors without approval.

## 5. Visual language

The imagery balances two worlds: a warm fantasy landscape and a cool futuristic skyline. A central guide holds a lantern; diverging paths express choice and agency. The arch and keystone provide structure, continuity, and a recognizable framing device.

**For the primary mark:** prioritize clear silhouettes, bold negative space, geometric forms, simple shapes, and readability at small sizes. **Do not equate higher resolution with more detail.** If asked to enlarge A.5, preserve the original geometry and detail level; do not regenerate a richer illustration.

**For hero artwork:** more environmental detail, depth, and atmosphere are acceptable, provided the story remains readable. Keep the guide, lantern, paths, and contrasting worlds recognizable. Narrative richness belongs here, not in the primary logo.

### Typography

Font files are included in `assets/fonts/`, under `Libre_Baskerville/` and `Source_Sans_3/` (repository-relative path: `brand/assets/fonts/`).

| Typeface / treatment | Use |
| --- | --- |
| **Libre Baskerville** | Brand name, prominent headlines, and quotations |
| **Source Sans 3** | Body text, functional headings, and supporting information |
| **Source Sans 3 Semibold**, uppercase with increased letterspacing | Section labels, captions, and brand-system annotations |

## 6. Voice and prose

Write with clarity, curiosity, humility, and respect for other people's agency. Be specific and grounded. Ask useful questions; avoid pretending to have certainty where none exists.

**Prefer:** trust, inquiry, evidence, shared learning, useful feedback, possibility, and the freedom to choose one's path.

**Avoid:** savior language, guru-like certainty, commands that imply the guide owns another person's choices, empty inspiration, self-importance, or framing the guide as indispensable.

The brand's key lines have different jobs:

- *A light offered. A path chosen.* — short visual tagline.
- *I can’t walk your path, but I can help you see it.* — personal metaphor and explanation.
- *Trust freely. Seek understanding. Keep learning.* — philosophical foundation.

Do not force all three into the same design. Use the line appropriate to the context.

## 7. Application rules

**Do**

- Use the supplied SVG at its original proportions when scalable artwork is supported.
- Preserve A.5's silhouette, spacing, four-color palette, and visual simplicity.
- Leave generous clear space around the emblem.
- Use A.5 for GitHub/social avatars, website navigation, app tiles, and compact identity placements.
- Test avatar/icon legibility at **32 px and 64 px**.
- Use A.1 for splash artwork, title slides, and large editorial placements; place copy outside the artwork's visual center.
- Use A.5 as the consistent signature in presentations, reserving A.1 for covers and section transitions.

**Do not**

- Add texture, stars, architecture, clothing details, or extra visual complexity to A.5.
- Stretch, skew, recolor, redraw, or crop the primary mark without explicit direction.
- Substitute A.1 for A.5 in a tiny avatar.
- Generate a new logo merely because an image model can make a more polished illustration.
- Claim a traced or generated derivative is an exact approved master without verification.

## 8. Agent workflow and acceptance criteria

When creating branded work:

1. **Identify the use case.** Compact identity → A.5. Large narrative expression → A.1.
2. **Load the real asset.** Do not rely on this Markdown description as a substitute for opening the artwork.
3. **Use the exact palette.** Keep the approved logo unchanged; apply colors selectively to surrounding layouts.
4. **Preserve intent.** Communicate guidance without control, trust, inquiry, learning, and humility.
5. **Validate visually.** Inspect the actual output at its intended size, including 32–64 px for icons. Check for clipping, distorted proportions, insufficient clear space, and unexpected recoloring.
6. **Report deviations.** If a requested format or medium requires changing the approved artwork, explain the tradeoff and obtain approval before changing it.

For tasks explicitly requesting **new illustrations**, derivatives may explore composition and atmosphere while retaining the identity's narrative principles. Label them as new artwork; never overwrite the approved assets automatically.

## 9. File layout and integration

Recommended portable kit:

```text
brand/
├── BRAND.md
├── assets/
│   ├── approved-a1.webp
│   ├── approved-a5.png
│   └── approved-a5.svg
└── reference/
    └── the-guide-brand-guide.pdf
```

In a project's `AGENTS.md` (or equivalent agent instructions), include:

```markdown
## Brand identity
Follow `brand/BRAND.md` for brand philosophy, voice, palette, and usage.
Use the approved artwork in `brand/assets/` rather than recreating it.
Do not alter approved brand assets without explicit authorization.
```

## 10. Scope and source notes

This document operationalizes the approved **The Guide** brand guide and the subsequently agreed refined palette. It is not a license to infer missing artwork details. If the visual files, this specification, and a request conflict, **surface the conflict** instead of silently inventing a new identity.

The approved A.5 SVG's title is **“Personal Brand - The Guide.”** The supplied SVG is the artwork reference; its title does not imply that all prior tracing concerns have been independently resolved. Validate contours and legibility in the target context.
