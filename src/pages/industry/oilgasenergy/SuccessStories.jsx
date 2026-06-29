import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Flame,
  Gauge,
  HardHat,
  Quote,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";

const stories = [
  {
    company: "Offshore Platform Expansion",
    location: "Saudi Arabia",
    result: "120 workers deployed",
    time: "Completed in 18 days",
    title: "Offshore crew mobilized for platform expansion",
    quote:
      "The recruitment support helped us organize a skilled offshore crew quickly, with strong attention to safety and document readiness.",
    image:
      "https://images.unsplash.com/photo-1578356058390-f58c575337a2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    person:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop&crop=face",
    name: "Daniel R.",
    role: "Project Workforce Manager",
    icon: Flame,
    color: "#FFE994",
  },
  {
    company: "Wind Farm Project",
    location: "Romania",
    result: "85 technicians supplied",
    time: "Mobilized successfully",
    title: "Renewable energy technicians for wind farm operations",
    quote:
      "We needed qualified technicians for renewable energy work. The process was structured, responsive and aligned with our project timeline.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop",
    person:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop&crop=face",
    name: "Elena M.",
    role: "Renewables Operations Lead",
    icon: Wind,
    color: "#CFF7BC",
  },
  {
    company: "Oil Refinery Shutdown",
    location: "UAE",
    result: "200 specialists mobilized",
    time: "Mobilized in 12 days",
    title: "Shutdown staffing for refinery maintenance window",
    quote:
      "The team supported urgent shutdown staffing with clear communication and fast shortlisting for maintenance and technical roles.",
    image:
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=1200&h=800&fit=crop",
    person:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&crop=face",
    name: "Omar H.",
    role: "Maintenance Planning Head",
    icon: Gauge,
    color: "#A6E6EC",
  },
];

const stats = [
  { value: "120", label: "Offshore Workers" },
  { value: "85", label: "Wind Technicians" },
  { value: "200", label: "Shutdown Specialists" },
];

const SuccessStories = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const progressRefs = useRef([]);
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % stories.length);

  const prev = () =>
    setActive((prev) => (prev - 1 + stories.length) % stories.length);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".energy-story-word", {
        y: 50,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".energy-story-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".energy-story-stat", {
        y: 25,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.55,
        ease: "back.out(1.5)",
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

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 35, scale: 0.96, rotate: -1 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.75,
        ease: "power3.out",
      },
    );

    const current = progressRefs.current[active];

    if (current) {
      gsap.to(current, {
        width: "100%",
        duration: 5,
        ease: "none",
        onComplete: next,
      });
    }
  }, [active]);

  const item = stories[active];
  const Icon = item.icon;

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[#FBD6D2]" />

      <svg
        className="absolute left-0 top-0 h-[120px] w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H1440V45C1180 95 900 20 720 55C470 100 230 70 0 25V0Z"
          fill="var(--color-primary-bg)"
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 h-[150px] w-full"
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
      >
        <path
          d="M0 150V95C210 35 470 75 720 52C980 28 1210 55 1440 105V150H0Z"
          fill="#FBD6D2"
        />
      </svg>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="energy-story-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Success Stories
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Energy",
              "workforce",
              "projects",
              "delivered",
              "with",
              "confidence",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="energy-story-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Realistic project examples showing how we support offshore,
            refinery, shutdown, EPC and renewable energy workforce needs.
          </p>
        </div>

        <div
          ref={cardRef}
          className="energy-story-reveal mx-auto grid max-w-6xl overflow-hidden rounded-[42px] border border-black bg-[#FFF9E6] lg:grid-cols-[1fr_1fr]"
        >
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[600px]">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 backdrop-blur-md">
              <Icon size={16} />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-black/70">
                Energy Project
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 rounded-[30px] border border-white/25 bg-white/85 p-6 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/50">
                {item.location}
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-black sm:text-3xl">
                {item.title}
              </h3>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-black/[0.05] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/40">
                    Result
                  </p>
                  <p className="mt-1 text-sm font-bold text-black">
                    {item.result}
                  </p>
                </div>

                <div className="rounded-2xl bg-black/[0.05] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/40">
                    Timeline
                  </p>
                  <p className="mt-1 text-sm font-bold text-black">
                    {item.time}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-between p-7 sm:p-10 lg:p-12">
            <Quote
              size={58}
              className="absolute right-8 top-8 text-black/10"
              fill="currentColor"
            />

            <div>
              <div
                className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ backgroundColor: item.color }}
              >
                <HardHat size={28} strokeWidth={2.4} />
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-black/45">
                {item.company}
              </p>

              <p className="mt-8 max-w-xl text-xl leading-9 tracking-[-0.02em] text-black sm:text-2xl sm:leading-10">
                “{item.quote}”
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <img
                src={item.person}
                alt={item.name}
                className="h-16 w-16 rounded-full border-4 border-[#CFF7BC] object-cover"
              />

              <div>
                <h4 className="text-lg font-bold text-black">{item.name}</h4>
                <p className="mt-1 text-sm text-black/65">{item.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="energy-story-reveal mx-auto mt-8 flex max-w-2xl items-center gap-4">
          <button
            type="button"
            onClick={prev}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#CFF7BC] text-black"
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
            onClick={next}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#CFF7BC] text-black"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="energy-story-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <p className="text-4xl font-normal tracking-[-0.06em] text-black">
                {stat.value}
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {stat.label}
              </p>
            </article>
          ))}
        </div>

        <div className="energy-story-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <ShieldCheck size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Need energy workforce support for your next project?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We support offshore crews, shutdown teams, renewable energy
                  technicians, HSE roles, engineers and technical maintenance
                  professionals.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Request Energy Staff
              <BadgeCheck size={16} />
            </a>
          </div>
        </div>

        <div className="energy-story-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Offshore projects",
            "Shutdown staffing",
            "Renewable energy",
            "HSE focused",
            "Fast mobilization",
          ].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2 text-sm font-bold text-black/65"
            >
              <Sparkles size={14} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
