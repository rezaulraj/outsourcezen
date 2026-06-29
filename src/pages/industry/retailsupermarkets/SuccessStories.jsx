import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Boxes,
  CreditCard,
  Quote,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";

const stories = [
  {
    company: "Supermarket Chain Expansion",
    location: "Portugal",
    result: "95 store workers hired",
    time: "Shortlisted in 10 days",
    title: "Retail staff supplied for new supermarket branches",
    quote:
      "We needed cashiers, shelf staff and supervisors for new branches. The hiring support was fast, organized and practical.",
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200&h=800&fit=crop",
    person:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop&crop=face",
    name: "Maria L.",
    role: "Store Operations Manager",
    icon: Store,
    color: "#FFE994",
  },
  {
    company: "Holiday Retail Rush",
    location: "United Kingdom",
    result: "140 seasonal staff placed",
    time: "Completed before peak week",
    title: "Seasonal workforce support for high-demand shopping period",
    quote:
      "The team helped us cover checkout, stockroom and customer service roles during our busiest trading period.",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=800&fit=crop",
    person:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop&crop=face",
    name: "Daniel C.",
    role: "Retail Workforce Lead",
    icon: ShoppingCart,
    color: "#CFF7BC",
  },
  {
    company: "Warehouse & Delivery Support",
    location: "Romania",
    result: "70 logistics workers supplied",
    time: "Mobilized in 7 days",
    title: "Backroom, warehouse and delivery staff for retail operations",
    quote:
      "We needed reliable warehouse assistants and delivery support. The process was clear, responsive and aligned with our timeline.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop",
    person:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&crop=face",
    name: "Omar H.",
    role: "Distribution Manager",
    icon: Truck,
    color: "#A6E6EC",
  },
];

const stats = [
  { value: "95", label: "Store Workers" },
  { value: "140", label: "Seasonal Staff" },
  { value: "70", label: "Warehouse Staff" },
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
      gsap.from(".retail-story-word", {
        y: 50,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".retail-story-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".retail-story-stat", {
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
      className="font-arimo overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="retail-story-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Success Stories
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Retail",
              "teams",
              "delivered",
              "for",
              "real",
              "store",
              "needs",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="retail-story-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Practical retail recruitment examples for supermarkets, seasonal
            hiring, store operations, warehouse support and delivery coverage.
          </p>
        </div>

        <div
          ref={cardRef}
          className="retail-story-reveal mx-auto grid max-w-6xl overflow-hidden rounded-[42px] border border-black bg-[#FFF9E6] lg:grid-cols-[1fr_1fr]"
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
                Retail Project
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
                <Store size={28} strokeWidth={2.4} />
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

        <div className="retail-story-reveal mx-auto mt-8 flex max-w-2xl items-center gap-4">
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

        {/* <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="retail-story-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <p className="text-4xl font-normal tracking-[-0.06em] text-black">
                {stat.value}
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {stat.label}
              </p>
            </article>
          ))}
        </div> */}

        {/* <div className="retail-story-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <ShieldCheck size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Need retail workforce support for your store?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We support cashiers, shelf stackers, supervisors, warehouse
                  assistants, delivery drivers, fresh food teams and seasonal
                  retail staff.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Request Retail Staff
              <BadgeCheck size={16} />
            </a>
          </div>
        </div> */}

        {/* <div className="retail-story-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Supermarkets",
            "Seasonal hiring",
            "Store operations",
            "Warehouse support",
            "Delivery teams",
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
