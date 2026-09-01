---
name: Legacy Link Studio
description: Every love story deserves its own film
colors:
  ivory: "#F9F5F1"
  bone: "#F1EBE0"
  charcoal: "#301F00"
  espresso: "#2A211A"
  forest: "#2A4B22"
  forest-light: "#CEF5CA"
  forest-deep: "#1B3316"
  grey: "#898D8F"
  filmpanel-warm: "#3A2F26"
  filmpanel-mid: "#241D18"
  filmpanel-deep: "#14100D"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "normal"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.1
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  none: "0px"
  media: "20px"
  pill: "9999px"
  full: "9999px"
spacing:
  xs: "12px"
  sm: "24px"
  md: "40px"
  lg: "64px"
  xl: "112px"
  2xl: "144px"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.forest-deep}"
    textColor: "{colors.ivory}"
  button-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  button-on-dark-hover:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.forest-deep}"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "0px 0px 12px 0px"
  eyebrow:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    typography: "{typography.label}"
    padding: "0px"
---

# Design System: Legacy Link Studio

## Overview

**Creative North Star: "The Darkroom Archive"**

Legacy Link Studio looks like warm paper prints developing out of cinematic darkness. The whole site alternates between two states: a lit reading room — ivory and bone paper, deep-brown ink, hairline rules like a ledger — and the darkroom itself, full-bleed espresso panels graded with warm black, where the emotional moments live. Nothing is glossy, nothing is boxed. The image is always the point; the interface is the safelight.

The mood is **restrained and literary**. Emotion is carried by editorial typography, full-bleed imagery, and a slow dissolve of motion — never by decoration. A single deep accent, Forest Green, is the only color that isn't paper or shadow, and it is rationed like a signature. Structure is drawn, not built: a 1px rule and a generous margin do the work that a card and a shadow would do elsewhere. Serifs are heavy and set light, with key words pulled to bold inside a headline. Imagery and the two primary buttons carry a soft radius; everything else stays square. The result should feel printed, catalogued, and made to be kept.

The explicit anti-reference is **generic SaaS**: no drop shadows, no gradient-stroked buttons, no second accent, no friendly illustration, no boxed content on paper. If a screen could belong to a startup dashboard, it has drifted.

**Key Characteristics:**
- Two grounds only: lit paper (ivory/bone) or darkroom (espresso + warm-black gradient); one warm rose→purple gradient band is reserved for the reveal moment.
- One accent, Forest Green, on ≤10% of any screen.
- Fraunces serif for headlines, prices, pull-quotes and lead paragraphs — set light, with emphasis words at 700; Inter for everything administrative.
- Zero elevation — flat by conviction, depth from tonal contrast and hairlines.
- Square corners everywhere except film stills / image blocks (20px) and the two primary pill buttons.
- All-caps 13px eyebrows at 0.18em tracking as connective tissue.
- Motion is a 1.1s film dissolve, never a bounce.

> **Migration note (2026-09-01):** the accent shifted from Aged Brass (`#AD8A56`) to Forest Green (`#2A4B22`), primary buttons went from square outlines to filled green pills, image blocks gained a 20px radius, and headline emphasis moved to a bold word. This is now applied site-wide; the `gold` token has been removed. `/about` and `/examples` also carry the fuller editorial treatment (oversized centred title, frosted-glass cards on a gradient band, giant closing wordmark).

## Colors

A warm monochrome — paper and shadow on one temperature axis — interrupted only by a single deep green.

### Primary
- **Forest Green** (`#2A4B22`): the only accent in the system. Section and field eyebrows, prices, the primary pill button, the active state of one radio or checkbox at a time, the focus underline on inputs, the animated progress-bar fill. It is a deep botanical green, never bright, and it fills only the two primary buttons — nowhere else large.
- **Forest Light** (`#CEF5CA`): accent text seen against the darkroom — eyebrows and the "unlocks in" line on espresso, where the base green would go muddy.
- **Forest Deep** (`#1B3316`): the hover/pressed step for the green pill and borders on green elements.
- **Grey** (`#898D8F`): the only neutral grey, for hairline borders and the faintest metadata. Never a text or fill color for anything that must be read.

### Neutral — Paper
- **Ivory** (`#F9F5F1`): the default page background and the body base. The lit reading room.
- **Bone** (`#F1EBE0`): a half-tone shift down from ivory for the site header, footer, and closing CTA bands — enough to separate a zone without a border.
- **Charcoal** (`#301F00`): primary ink, a warm near-black brown. Body copy runs at 70% opacity, headings at full, labels at 50–60%.

### Neutral — Darkroom
- **Espresso** (`#2E2620`): the base of every full-bleed film panel and the capsule page.
- **Film Panel gradient** (`#3A2F26` → `#241D18` → `#14100D`): the warm radial grade laid over espresso — `radial-gradient(120% 90% at 20% 20%, ...)`. The capsule page uses a slightly warmer, centered variant (`#4A392B` → `#2B2019` → `#17110C`).
- On the darkroom, text is Ivory at 100 / 70 / 60 / 50%, and borders are Ivory at 15–50%.

### Named Rules
**The Single Voice Rule.** Forest Green appears on no more than ~10% of any screen. It may fill the primary pill button and sit as an eyebrow or a price in the same view — but never as a third or fourth green element competing for the same glance. Its scarcity is what makes it read as intention.

**The Two Grounds Rule.** Every surface is either paper (ivory or bone, charcoal ink) or darkroom (espresso + warm-black gradient, ivory ink). The one sanctioned exception is a single warm rose→purple gradient band (`#E8A58C → #D98BB0 → #B68ECB`) used once, for the reveal / time-capsule moment. No other third background, and no neutral-gray ground.

## Typography

**Display Font:** Fraunces (with Georgia, serif)
**Body Font:** Inter (with system-ui, sans-serif)

**Character:** Fraunces is a warm, high-contrast old-style serif with a slight optical wobble; set light (300–400) and large it feels literary and hand-set rather than corporate. Inter is the quiet counterweight — it never competes, and in all-caps at wide tracking it becomes pure structure. The pairing is "a printed book introduced by a filing label."

### Hierarchy
- **Display** (Fraunces 400, `clamp(2.75rem, 6vw, 5rem)`, line-height ~1.05): hero, section openers, and closing statements. Broken across lines by hand with `<br>`, and one or two key words pulled to **700** inside the line ("deserves its **own film**", "Some moments you **lived**"). The bold word is the only emphasis device in a headline — no italic, no color, no underline.
- **Headline** (Fraunces 400, `clamp(1.875rem, 4vw, 3rem)`, line-height ~1.1): page titles and section headers.
- **Title** (Fraunces 400, 1.5rem): sub-section headings, tier names, FAQ questions, and — set at 1.5–1.875rem — the text a visitor types into form fields.
- **Body** (Inter 400, 0.9375rem / 15px, line-height 1.7): default copy, at `text-charcoal/70`. Longer reads (About) step up to 17px. Hold prose to `max-w-2xl` (~65ch).
- **Label / Eyebrow** (Inter 400, 0.8125rem / 13px, letter-spacing 0.18em, uppercase): every section and field opener, navigation, buttons, metadata, the "Step 2 of 5" counter.

### Named Rules
**The Serif-Speaks Rule.** Fraunces carries everything with emotional weight — headlines, prices, pull-quotes, the lead paragraph under a headline, even form inputs. Inter carries everything administrative — labels, nav, button text, running body copy, controls. Neither font does the other's job.

**The Eyebrow Rule.** Every section and every form field opens with a 13px all-caps Inter label at 0.18em tracking, in Aged Brass or muted charcoal. It is the single most repeated element in the system.

## Layout

A centered single-column model with width chosen by reading intent, not by breakpoint:
- `max-w-2xl` — prose, intake steps, legal documents, empty states.
- `max-w-3xl` — hero copy.
- `max-w-6xl` — pricing and checkout.
- `max-w-7xl` — wide multi-column section grids and the header/footer.

Horizontal padding is `px-6` rising to `md:px-10`. Vertical section rhythm is large and consistent: `py-24` / `py-28` / `md:py-36`. Content blocks within a section are separated by a top hairline plus `pt-8` to `pt-16`, never by a background change or a box.

Multi-column content (the three steps, proof quotes, pricing tiers) is a `md:grid-cols-3` grid with `gap-10` to `gap-16`, collapsing to a single stack below `md` (768px). `md` is effectively the only breakpoint the system uses.

Full-height sections use `svh` units: `100svh` hero, `85svh` interior film panels, `min-h-[70svh]` for standard page mains. Film panels and full-bleed samples escape the container with the `.full-bleed` utility (`width: 100vw; margin-left: calc(50% - 50vw)`).

### Named Rules
**The Hairline Rule.** Structure is drawn with `border-t` at charcoal 14% (`rgba(48,31,0,0.14)`, the `.hairline` utility), or ivory 18% on the darkroom (`.hairline-dark`), followed by generous top padding. Sections are ruled off like entries in a ledger, not floated as panels.

## Elevation & Depth

There is no elevation on paper. `box-shadow` appears in exactly one component — the **frosted-glass card** (`FrostedCard`), which lives only on a gradient band and whose soft shadow and blur are part of the glass metaphor. Radius is allowed in three places: **image / film-still blocks and video players at 20px**, the **primary pill buttons**, and the **frosted card at ~16px** (`rounded-2xl`). Everything else — inputs, checkboxes, containers on paper, dividers — stays square. The radio dot's 10px `rounded-full` remains the only round control.

Depth is created two ways only:
1. **The paper/darkroom cut** — a full-bleed espresso panel against ivory reads as a different plane without any border.
2. **The 1px hairline** — charcoal at ~14% on paper, ivory at 18–50% on the darkroom.

### Named Rules
**The Flat Rule.** No shadow, no glow, no layered "card on card." Radius is for images and the primary pills only. If a surface needs to feel separate, change its ground or rule it off — never lift it.

## Shapes

Rectangular and sharp, with two exceptions: image / film-still blocks and video players carry a 20px radius, and the primary buttons are full pills. Inputs, checkboxes, and containers stay square. Borders are always exactly 1px.

Form language:
- **Primary button** — a filled Forest Green pill, ivory label, no border; hover darkens to Forest Deep.
- **Buttons on the darkroom** — a 1px ivory-outline pill with no fill at rest; hover floods to ivory with forest-deep text.
- **Text inputs** — a bottom border only; no box, no background.
- **Checkboxes** — a 20px hard square; when checked, an 8px solid ivory square sits inside a green-filled square.
- **Radio** — the one exception: a 10px `rounded-full` dot, green-filled when active.
- **Image placeholders** — 20px-radius blocks carrying a warm radial grade (`.grade-warm` / `.grade-forest` / `.grade-dark`) at `aspect-[4/3]`, `aspect-[3/4]`, `aspect-[4/5]`, or `aspect-video`, pending real film stills. A caption may sit in the lower-left in Fraunces ivory.

## Components

### Buttons
- **Shape:** full pill (`rounded-full`), `padding: 14px 32px`; smaller nav/inline variant `padding: 8px 20px`.
- **Label:** Inter 13px, uppercase, `letter-spacing: 0.18em`.
- **Primary (on paper):** filled `bg-forest` (`#2A4B22`), ivory text, no border. **Hover:** `bg-forest-deep` (`#1B3316`). `transition: background/color 300ms`.
- **On darkroom:** `border: 1px solid rgba(249,245,241,0.45)`, transparent fill, ivory text. **Hover:** fill floods to ivory, text to forest-deep.
- **Header CTA:** `rounded-full`, `border: 1px solid currentColor/40`, no fill, `padding: 8px 20px` — a compact outline pill that inherits ivory or charcoal from the header mode.
- **Disabled:** fill drops to forest at 30%, text to ivory 60%, hover suppressed.
- **Text link:** underline at `decoration` 20–30% opacity, `underline-offset: 4px`; hover shifts color to charcoal or Forest Green.

### Inputs / Fields
- **Style:** `border: 0`, `border-bottom: 1px solid rgba(35,31,28,0.12)`, transparent background, `padding-bottom: 12px`. Input text set in **Fraunces at 1.5–1.875rem**; placeholder is charcoal at 25%.
- **Textarea:** same, but Inter at 1.125rem, `resize: none`.
- **Select:** same underline, with a hand-drawn Forest Green chevron as an inline SVG background.
- **Focus:** `outline: none`; the bottom border shifts to Forest Green. No ring, no box, no glow.
- **Field label:** 13px uppercase Inter at 0.18em, charcoal 60%; required marker is a green asterisk; hint text is Fraunces italic 13px at charcoal 40%.

### Radio & Checkbox rows
- Full-width rows separated by a bottom hairline; the row is the hit target.
- Active row: bottom border becomes Forest Green; the marker fills green.
- Option label in Fraunces 1.25rem; optional description in Inter 14px at charcoal 60%.

### Navigation
- **Header:** wordmark in Fraunces 1.125rem, uppercase, 0.18em tracking. Links in Inter 13px uppercase 0.18em at `currentColor/80`, hover to full `currentColor`.
- **Two modes:** `overlay` (transparent, ivory text, sits over the hero film panel) and solid (bone background, `border-b` hairline, charcoal text).
- **Mobile:** nav links collapse; a single "Begin" text link remains. No hamburger, no drawer.
- **Footer:** bone ground, `border-t` hairline, columns of Inter 13px links, wordmark and tagline in Fraunces.

### Progress Line (signature)
A baseline-aligned row — "Step 2 of 5" in Inter caps on the left, the step name in Fraunces italic on the right — above a 1px charcoal/10 track. The fill is a `h-px` Forest Green bar that animates its width over 700ms on the `dissolve` curve.

### Film Panel (signature)
A `.full-bleed` espresso `<section>`, `min-height` in `svh`, content bottom-aligned (`items-end`). Background is an autoplaying muted video, a poster image, or one of the warm/forest radial grades (`gradeClass` prop), with a three-stop dark linear overlay on top for text legibility. Children fade up on scroll — `opacity 0→1`, `y 24px→0`, `duration 1.1s`, `ease cubic-bezier(0.45, 0, 0.15, 1)`, once. The hero instance sets `revealOnScroll={false}` so its copy is present on first paint.

### Frosted Card (signature)
A translucent white card — `bg-white/35`, `border-white/45`, `backdrop-blur-md`, a single soft `0 18px 50px -20px` charcoal shadow, `rounded-2xl`, `p-6` — carrying one short statement in Inter 15px charcoal, never a full paragraph. It appears **only on a gradient band** (the reveal moment, the About "why this exists" section), laid out in a 2-up grid with alternating `translate-y` so the cluster reads as loosely stacked glass. Never on paper, never with a second card layered on it.

### Giant Wordmark (signature)
An interior-page closing element: "Legacy Link Studio" set in Fraunces at `~18vw`, one line, `whitespace-nowrap`, allowed to bleed past both edges inside an `overflow-hidden` ivory band ruled off with a top hairline. Sits between the closing CTA and the footer on `/about` and `/examples`.

### Oversized Page Title
Interior hero titles (About, Examples) are set larger than the homepage — Fraunces `clamp(3rem, …, 6rem)`, centred, with `pt-32`/`md:pt-44` of air above and one bold word — then the page proper begins. FAQ, pricing, legal keep the standard `text-4xl`/`md:text-5xl` left-aligned title.

### Capsule Reveal (signature)
A centered full-viewport darkroom screen, `max-w-md`. The locked state shows names in a forest-light eyebrow, an italic Fraunces "Your story unlocks in" line, and a countdown set in Fraunces `clamp(3rem, ..., 4.5rem)` light (`D : HH : MM : SS`). Unlock is a single ivory-outline pill; there is no chrome, no header, no footer on this page.

### Motion
- **Easing:** one curve, `cubic-bezier(0.45, 0, 0.15, 1)` (the `dissolve` token). Never spring, bounce, or overshoot.
- **Hover:** `transition: 300ms`, color properties only — no transform, no scale.
- **Scroll reveal:** fade + 24px rise, 1.1s, triggered once at 40% in view.
- **Step change:** fade + 16px directional slide, 0.55s.
- `html { scroll-behavior: smooth }`.

## Do's and Don'ts

### Do:
- **Do** open every section and form field with a 13px uppercase eyebrow at 0.18em tracking, in Forest Green or muted charcoal.
- **Do** draw structure with `border-t` hairlines (charcoal ~14% on paper, ivory 18% on darkroom) plus large top padding — a ledger, not a set of cards.
- **Do** set headlines, prices, pull-quotes, lead paragraphs, and form-input text in Fraunces; keep the base light (400) and pull one or two words to 700.
- **Do** make the primary call to action a filled Forest Green pill; keep on-dark buttons ivory-outline pills. Hover is 300ms, color only, no movement.
- **Do** run full-bleed film panels — espresso warm-radial or forest-radial grade — with a fade-up-on-scroll reveal (hero excepted).
- **Do** give images and video players a 20px radius and let them bleed to the viewport edge or split the full width.
- **Do** give text a real measure — `max-w-2xl` for prose and intake, wider containers only for grids.
- **Do** animate everything on the `dissolve` curve, `cubic-bezier(0.45, 0, 0.15, 1)`.

### Don't:
- **Don't** add a `box-shadow` or elevation on paper, and don't apply radius outside images/video, the primary pills, and the frosted card. Flatness is the identity; the frosted card is the one sanctioned exception, and only on a gradient.
- **Don't** introduce a second accent color, or let Forest Green fill anything larger than the primary pill — it is a ≤10% voice.
- **Don't** put UI in cards or panels on paper; rule it off with a hairline instead.
- **Don't** give inputs a focus ring or box outline — shift the bottom hairline to Forest Green.
- **Don't** reach for SaaS conventions: gradient-filled buttons, pill *tags*, drop-shadowed modals, blob illustrations, a blue or pink accent.
- **Don't** set running body copy in Fraunces or headlines in Inter — the two fonts have fixed jobs.
- **Don't** animate with bounce, spring overshoot, or snappy easing; motion is always a slow dissolve.
