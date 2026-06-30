import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Anchor,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Clock3,
  HardHat,
  Quote,
  ShieldCheck,
  Ship,
  Sparkles,
  Star,
  UsersRound,
  Wrench,
} from "lucide-react";

const stories = [
  {
    company: "European Shipyard Expansion",
    location: "Romania",
    title: "180 skilled shipyard workers deployed for a large vessel build",
    result: "180 workers deployed",
    time: "14-day mobilization",
    quote:
      "We needed welders, pipe fitters and ship fitters within a tight project schedule. The recruitment support helped us keep production moving smoothly.",
    manager: "Shipyard Operations Manager",
    icon: Ship,
    color: "#FFE994",
  },
  {
    company: "Offshore Maintenance Project",
    location: "Norway",
    title: "Certified marine technicians supplied for offshore maintenance",
    result: "65 technicians placed",
    time: "Fast offshore readiness",
    quote:
      "The candidates arrived with the right technical background and safety mindset. It made project onboarding much easier.",
    manager: "Marine Project Lead",
    icon: ShieldCheck,
    color: "#CFF7BC",
  },
  {
    company: "Dry Dock Repair Program",
    location: "Netherlands",
    title: "Multi-trade crew hired for urgent dry dock repair work",
    result: "95 trades hired",
    time: "Repair window covered",
    quote:
      "We had a limited repair window and needed reliable trades quickly. The team helped us fill welding, rigging and QA/QC gaps.",
    manager: "Dry Dock Manager",
    icon: Wrench,
    color: "#A6E6EC",
  },
];

const stats = [
  { value: "340+", label: "Marine Projects Supported" },
  { value: "2200+", label: "Workers Deployed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Recruitment Support" },
];

const SuccessStories = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const progressRefs = useRef([]);
  const [active, setActive] = useState(0);

  const nextStory = () => {
    setActive((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setActive((prev) => (prev - 1 + stories.length) % stories.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".marine-story-word", {
        y: 60,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".marine-story-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".marine-story-stat", {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.45,
        ease: "back.out(1.5)",
      });

      gsap.to(".marine-story-float", {
        y: -12,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    progressRefs.current.forEach((bar) => {
      if (!bar) return;
      gsap.killTweensOf(bar);
      gsap.set(bar, { width: "0%" });
    });

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
        },
      );
    }

    const currentBar = progressRefs.current[active];

    if (currentBar) {
      gsap.to(currentBar, {
        width: "100%",
        duration: 5,
        ease: "none",
        onComplete: nextStory,
      });
    }
  }, [active]);

  const story = stories[active];
  const Icon = story.icon;

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[7%] top-[12%] h-52 w-52 rounded-full bg-[#CFF7BC]/35 blur-3xl" />
        <div className="absolute right-[7%] top-[20%] h-56 w-56 rounded-full bg-[#FFE994]/45 blur-3xl" />
        <div className="absolute bottom-[10%] left-[30%] h-52 w-52 rounded-full bg-[#A6E6EC]/30 blur-3xl" />

        <div className="absolute inset-0 opacity-[0.07]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="marine-story-reveal mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Success Stories
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Real", "marine", "workforce", "project", "results"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="marine-story-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-black/70">
            Practical recruitment success across shipbuilding, offshore
            maintenance, dry dock repair and marine technical workforce needs.
          </p>
        </div>

        <div
          ref={cardRef}
          className="marine-story-reveal mx-auto grid max-w-6xl overflow-hidden rounded-[42px] border border-black/10 bg-[#FFF9E6] shadow-xl lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="relative min-h-[420px] overflow-hidden bg-black p-8">
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:36px_36px]" />
            </div>

            <div className="relative z-10">
              <div
                className="marine-story-float mb-8 flex h-20 w-20 items-center justify-center rounded-3xl"
                style={{ backgroundColor: story.color }}
              >
                <Icon size={34} strokeWidth={2.3} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                {story.location}
              </p>

              <h3 className="mt-4 max-w-xl text-4xl font-bold tracking-[-0.055em] text-white sm:text-5xl">
                {story.company}
              </h3>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                  <UsersRound className="mb-4 text-[#67D946]" size={24} />
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/45">
                    Result
                  </p>
                  <p className="mt-2 text-lg font-bold text-white">
                    {story.result}
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                  <Clock3 className="mb-4 text-[#67D946]" size={24} />
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/45">
                    Timeline
                  </p>
                  <p className="mt-2 text-lg font-bold text-white">
                    {story.time}
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-[26px] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <div className="flex items-center gap-1 text-yellow-300">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Star key={item} size={15} fill="currentColor" />
                  ))}
                </div>

                <p className="mt-4 text-sm leading-6 text-white/65">
                  Verified shipyard and marine workforce support
                </p>
              </div>
            </div>

            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#67D946]/20 blur-3xl" />
          </div>

          <div className="relative flex flex-col justify-between p-7 sm:p-10 lg:p-12">
            <Quote
              size={62}
              className="absolute right-8 top-8 text-black/10"
              fill="currentColor"
            />

            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2">
                <Anchor size={15} />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-black/60">
                  Marine Case Study
                </span>
              </div>

              <h3 className="max-w-xl text-3xl font-bold tracking-[-0.045em] text-black sm:text-4xl">
                {story.title}
              </h3>

              <p className="mt-8 max-w-xl text-xl leading-9 tracking-[-0.02em] text-black/80 sm:text-2xl sm:leading-10">
                “{story.quote}”
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between gap-6">
              <div>
                <p className="text-lg font-bold text-black">{story.manager}</p>
                <p className="mt-1 text-sm text-black/55">{story.company}</p>
              </div>

              <div className="hidden h-16 w-16 items-center justify-center rounded-full bg-[#CFF7BC] sm:flex">
                <BadgeCheck size={28} />
              </div>
            </div>
          </div>
        </div>

        <div className="marine-story-reveal mx-auto mt-8 flex max-w-2xl items-center gap-4">
          <button
            type="button"
            onClick={prevStory}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#CFF7BC] text-black transition-transform hover:scale-105"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-black/10">
            {stories.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActive(index)}
                className="relative flex-1"
              >
                <span
                  ref={(el) => (progressRefs.current[index] = el)}
                  className="absolute left-0 top-0 h-full w-0 bg-black"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={nextStory}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#CFF7BC] text-black transition-transform hover:scale-105"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="marine-story-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center shadow-sm"
            >
              <p className="text-4xl font-normal tracking-[-0.06em] text-black">
                {item.value}
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {item.label}
              </p>
            </article>
          ))}
        </div>

        {/* <div className="marine-story-reveal mt-12 rounded-[36px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <HardHat size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Need similar results for your shipyard?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We help marine employers hire welders, pipe fitters, ship
                  fitters, marine electricians, riggers, QA/QC inspectors, HSE
                  officers and offshore-ready crew.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform hover:scale-105"
            >
              Start Hiring
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div> */}

        {/* <div className="marine-story-reveal mt-6 flex flex-wrap justify-center gap-3">
          {[
            "Shipyard projects",
            "Offshore maintenance",
            "Dry dock repair",
            "Certified trades",
            "Marine technicians",
          ].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2 text-sm font-bold text-black/65"
            >
              <Sparkles size={14} />
              {tag}
            </span>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default SuccessStories;
