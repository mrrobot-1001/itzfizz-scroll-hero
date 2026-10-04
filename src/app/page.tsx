import Hero from "@/components/Hero";

const REPO_URL = "https://github.com/mrrobot-1001/itzfizz-scroll-hero";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="bg-ink px-4 py-24 text-paper md:px-8 md:py-36">
        <p className="text-xs uppercase tracking-[0.3em] text-paper/50">(02) — What&apos;s next</p>
        <h2 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          Every scroll moves the needle. Every delivery moves a customer.
        </h2>
        <p className="mt-8 max-w-xl text-paper/60 md:text-lg">
          The hero above is driven entirely by scroll progress — the car, the trail and the
          headline reveal are scrubbed with GSAP ScrollTrigger and animated using transforms only.
        </p>
      </section>

      <footer className="flex flex-col gap-2 border-t border-paper/10 bg-ink px-4 py-8 text-sm text-paper/50 md:flex-row md:justify-between md:px-8">
        <span>Built with Next.js, Tailwind CSS &amp; GSAP.</span>
        <a href={REPO_URL} className="text-paper/80 underline-offset-4 hover:underline">
          View source on GitHub ↗
        </a>
      </footer>
    </main>
  );
}
