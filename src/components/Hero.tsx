"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Car from "./Car";
import { HEADLINE, STATS } from "@/data/hero";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Fraction of the car's width hidden off the left edge before the drive starts. */
const START_OFFSET = 0.35;
/** Fraction of the car's width past the right edge where the drive ends. */
const END_OFFSET = 0.15;
/** Point along the car (from its tail) that the trail edge follows — just behind the cabin.
 *  Equal to START_OFFSET so the trail begins exactly at the road's left edge. */
const TRAIL_ANCHOR = START_OFFSET;

function Headline({ tone }: { tone: "base" | "lit" }) {
  const toneClass =
    tone === "base"
      ? "text-transparent [-webkit-text-stroke:1.5px_rgb(244_242_236/0.42)]"
      : "text-ink";

  return (
    <div aria-hidden className="absolute inset-0 flex items-center justify-center px-[4vw]">
      <span
        className={`flex font-display font-bold leading-none text-[clamp(1.55rem,6.1vw,6.75rem)] gap-[0.12em] ${toneClass}`}
      >
        {HEADLINE.split("").map((char, i) =>
          char === " " ? (
            <span key={i} className="w-[0.45em]" />
          ) : (
            <span key={i} data-letter={tone} className="inline-block will-change-transform">
              {char}
            </span>
          ),
        )}
      </span>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const panel = q("[data-panel]")[0] as HTMLElement;
      const road = q("[data-road]")[0] as HTMLElement;
      const car = q("[data-car]")[0] as HTMLElement;
      const carBody = q("[data-car-body]")[0] as HTMLElement;
      const trail = q("[data-trail]")[0] as HTMLElement;
      const trailInner = q("[data-trail-inner]")[0] as HTMLElement;

      // Layout is read only when ScrollTrigger (re)builds the timeline (on load and
      // on resize via invalidateOnRefresh), never on individual scroll events.
      const carWidth = () => carBody.offsetWidth;
      const startX = () => -carWidth() * START_OFFSET;
      const endX = () => road.offsetWidth + carWidth() * END_OFFSET;
      const trailEdge = (x: number) => x + carWidth() * TRAIL_ANCHOR;

      /* ---------- Scroll-driven drive (core feature) ----------
       * The car, the green trail and the "lit" copy of the headline all move with
       * transforms only. The trail is a wide clip window whose right edge follows the
       * car (just behind the cabin); its contents are counter-translated so the dark headline stays
       * fixed in place, giving a pixel-perfect reveal without animating width/clip-path. */
      const drive = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1, // interpolates toward the scroll position for a fluid, eased feel
          invalidateOnRefresh: true,
        },
      });

      drive
        .fromTo(car, { x: startX }, { x: endX }, 0)
        .fromTo(trail, { x: () => trailEdge(startX()) }, { x: () => trailEdge(endX()) }, 0)
        .fromTo(trailInner, { x: () => -trailEdge(startX()) }, { x: () => -trailEdge(endX()) }, 0)
        .fromTo(q("[data-progress]"), { scaleX: 0 }, { scaleX: 1 }, 0)
        .fromTo(q("[data-scroll-hint]"), { opacity: 1 }, { opacity: 0, duration: 0.12 }, 0);

      // Each stat card's meter fills during its quarter of the journey.
      q("[data-meter]").forEach((meter, i, all) => {
        const slice = 1 / all.length;
        drive.fromTo(meter, { scaleX: 0 }, { scaleX: 1, duration: slice }, i * slice);
      });

      /* ---------- Intro on load ---------- */
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counters = q("[data-count]");
        counters.forEach((el) => (el.textContent = "0"));

        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .set(panel, { autoAlpha: 1 })
          .from(q("[data-topbar] > *"), { y: -18, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0)
          .from(q("[data-surface]"), { scaleX: 0, duration: 1.1, ease: "expo.inOut" }, 0.1)
          .from(q("[data-eyebrow] > *"), { y: 14, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.55)
          // Staggered headline reveal: both layers move together so they stay aligned.
          .from(q('[data-letter="base"]'), { yPercent: 70, autoAlpha: 0, duration: 0.9, stagger: 0.045 }, 0.65)
          .from(q('[data-letter="lit"]'), { yPercent: 70, autoAlpha: 0, duration: 0.9, stagger: 0.045 }, 0.65)
          // The car rolls in from off-screen to its starting mark.
          .from(carBody, { x: () => -carWidth() * 1.1, duration: 1.5, ease: "power4.out" }, 0.75)
          // Stats arrive one by one, each counting up to its value.
          .from(q("[data-stat]"), { y: 48, autoAlpha: 0, duration: 0.9, stagger: 0.15 }, 1.15);

        counters.forEach((el, i) => {
          const target = Number(el.dataset.count);
          const state = { value: 0 };
          intro.to(
            state,
            {
              value: target,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(state.value));
              },
            },
            1.25 + i * 0.15,
          );
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(panel, { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative h-[320vh] bg-paper">
      <div
        data-panel
        className="intro-hidden sticky top-0 flex h-svh min-h-[560px] flex-col overflow-hidden"
      >
        {/* Top bar */}
        <header data-topbar className="flex items-center justify-between px-4 pt-5 md:px-8 md:pt-7">
          <span className="font-display text-lg font-bold tracking-tight text-ink md:text-xl">
            itzfizz<span className="text-ember">.</span>
          </span>
          <span className="hidden text-xs uppercase tracking-[0.3em] text-ink/60 md:block">
            Logistics · Mobility · Data
          </span>
          {/* Wrapper takes the intro fade; the inner pill fades out on scroll. */}
          <span>
            <span
              data-scroll-hint
              className="flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink/70"
            >
              Scroll to drive
              <span className="animate-nudge" aria-hidden>
                ↓
              </span>
            </span>
          </span>
        </header>

        {/* Road + headline */}
        <div className="flex flex-1 flex-col justify-center gap-3 md:gap-4">
          <div
            data-eyebrow
            className="flex items-end justify-between px-4 text-[11px] uppercase tracking-[0.25em] text-ink/60 md:px-8 md:text-xs"
          >
            <span>(01) — The journey starts here</span>
            <span className="hidden sm:block">Est. 2026</span>
          </div>

          <div data-road className="relative h-[clamp(104px,min(24vh,30vw),220px)] w-full overflow-hidden">
            <h1 id="hero-title" className="sr-only">
              Welcome Itzfizz
            </h1>

            {/* Asphalt with lane markings */}
            <div data-surface className="road-surface absolute inset-0 origin-left bg-road" />

            {/* Outlined headline, visible before the car passes */}
            <Headline tone="base" />

            {/* Green trail: a clip window whose right edge tracks the car */}
            <div
              data-trail
              className="absolute inset-y-0 right-full w-[200%] overflow-hidden bg-trail will-change-transform"
            >
              <div data-trail-inner className="absolute inset-y-0 left-full w-1/2 will-change-transform">
                <Headline tone="lit" />
              </div>
            </div>

            {/* Car: outer element is scroll-driven, inner one handles the intro roll-in */}
            <div data-car className="absolute inset-y-0 left-0 z-10 flex items-center will-change-transform">
              <div data-car-body className="aspect-[22/10] h-[min(78%,21vw)] will-change-transform">
                <Car className="h-full w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Impact metrics */}
        <ul className="grid grid-cols-2 gap-2.5 px-4 pb-6 pt-4 md:grid-cols-4 md:gap-4 md:px-8 md:pb-9">
          {STATS.map((stat) => (
            <li
              key={stat.label}
              data-stat
              className={`relative overflow-hidden rounded-2xl p-4 md:p-6 ${stat.tone}`}
            >
              <p className="font-display text-4xl font-semibold leading-none tracking-tight md:text-6xl">
                <span data-count={stat.value}>{stat.value}</span>
                <span className="text-[0.6em] align-top">%</span>
              </p>
              <p className="mt-2 text-xs leading-snug opacity-80 md:mt-3 md:text-sm">{stat.label}</p>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-current/15">
                <span data-meter className="block h-full origin-left bg-current" />
              </span>
            </li>
          ))}
        </ul>

        {/* Overall scroll progress */}
        <span data-progress aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-ink" />
      </div>
    </section>
  );
}
