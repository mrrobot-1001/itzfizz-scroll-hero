# Welcome Itzfizz — Scroll-Driven Hero Animation

A scroll-driven hero section, inspired by [this car scroll animation](https://paraschaturvedi.github.io/car-scroll-animation). A car drives across the hero as you scroll. It paints a green trail behind it, and the trail reveals the `W E L C O M E  I T Z F I Z Z` headline.

**Live demo:** https://mrrobot-1001.github.io/itzfizz-scroll-hero/

**Stack:** Next.js (App Router, static export) · React · Tailwind CSS v4 · GSAP + ScrollTrigger (`@gsap/react`) · GitHub Pages

## Features

- **Hero layout above the fold.** A pinned, full-viewport panel holds the letter-spaced headline on a "road", with four impact metrics below it.
- **Intro animation on load.** The road sweeps in. Then the headline letters rise in a stagger, the car rolls in to its starting mark, and the stat cards arrive one by one while their numbers count up.
- **Scroll-driven animation.** One GSAP timeline is tied to scroll progress (`scrub: 1.1`), so motion follows the scroll position rather than playing on a timer. The scrub smoothing gives it eased, fluid motion. As you scroll:
  - the car drives from left to right,
  - the green trail follows it and reveals a dark, "lit" copy of the headline,
  - each stat card's meter fills during its quarter of the journey,
  - a progress bar tracks the overall drive.
- **Accessibility.** A real `<h1>` is provided for screen readers, and the decorative layers are hidden from them. With `prefers-reduced-motion`, the intro is skipped and the final state shows immediately. The scroll interaction is still user-driven.

## Performance notes

- **Only transforms animate.** The car, the trail and the lit headline all move with `translateX`. The trail is a wide `overflow: hidden` window whose right edge follows the car. Its contents are counter-translated by the same amount, so the lit headline stays fixed while it's revealed. This avoids animating `width` or `clip-path`, so nothing triggers layout during scroll.
- **No per-scroll layout reads.** Element sizes are read only when ScrollTrigger builds or refreshes the timeline: on load, and on resize via `invalidateOnRefresh`. There are no scroll event handlers.
- **Sticky pinning.** The hero uses CSS `position: sticky` (no pin-spacer reflow). GSAP only maps scroll progress to the timeline.
- **No flash before the intro.** The panel is hidden until GSAP starts the intro. If the script bundle never runs, a CSS fallback reveals it.

## Project structure

```
src/
  app/
    layout.tsx       # fonts, metadata, JS-ready flag
    page.tsx         # hero + follow-up section
    globals.css      # Tailwind theme tokens, road markings
  components/
    Hero.tsx         # layout + all GSAP intro / scroll animation
    Car.tsx          # top-down car as inline SVG
  data/
    hero.ts          # headline text + stats content
.github/workflows/deploy.yml   # build & deploy to GitHub Pages
```

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Build the static site, using the same base path as GitHub Pages:

```bash
GITHUB_PAGES=true npm run build   # outputs to ./out
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`. It lints the code, builds the static export with `basePath: /itzfizz-scroll-hero`, and publishes `out/` to GitHub Pages.
