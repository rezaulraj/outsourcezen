import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const clients = [
  {
    logo: "∞ Meta",
    name: "Jason T.",
    role: "Director, Global Supplier Diversity",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    quote:
      "We’re constantly trying to bring the best the market has to offer to support our global business operations by identifying suppliers with the exact solution we need.",
  },
  {
    logo: "◐ consensys",
    name: "Chris M.",
    role: "Chief Operating Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    quote:
      "Everyone on our team could have successfully interviewed for our team in Brooklyn. That is important to me. We’re getting top-tier talent without the big city price tag.",
  },
  {
    logo: "Google",
    name: "Sarah K.",
    role: "Head of Global Operations",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    quote:
      "The process was smooth from day one. We were able to scale faster, reduce hiring pressure, and build a dependable remote workforce.",
  },
];

const Cliend = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const progressRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".client-reveal", {
        y: 45,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const current = progressRefs.current[active];

    progressRefs.current.forEach((bar, index) => {
      if (!bar) return;
      gsap.killTweensOf(bar);
      gsap.set(bar, { width: index < active ? "100%" : "0%" });
    });

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 25, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
    );

    if (current) {
      gsap.to(current, {
        width: "100%",
        duration: 5,
        ease: "none",
        onComplete: () => {
          setActive((prev) => (prev + 1) % clients.length);
        },
      });
    }
  }, [active]);

  const item = clients[active];

  return (
    <section
      ref={sectionRef}
      className="font-arimo bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className="client-reveal mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.4fr]"
        >
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-56 w-56 sm:h-64 sm:w-64">
              <div className="absolute inset-0 rounded-full border-[14px] border-[#FFCC00]" />
              <div className="absolute inset-[28px] overflow-hidden rounded-full bg-[#A6E6EC]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute -right-5 bottom-8 h-20 w-20 rounded-full border-[12px] border-[#FFCC00] bg-[var(--color-primary-bg)] sm:h-24 sm:w-24" />
            </div>
          </div>

          <div>
            <h3 className="mb-8 text-3xl font-bold text-black">{item.logo}</h3>

            <div className="relative">
              <span className="absolute -left-12 -top-5 text-7xl font-black leading-none text-black">
                “
              </span>

              <p className="max-w-3xl text-lg leading-8 text-black/85">
                {item.quote}
              </p>

              <span className="absolute -right-6 bottom-0 text-7xl font-black leading-none text-black">
                ”
              </span>
            </div>

            <div className="mt-8">
              <h4 className="text-base font-bold text-black">{item.name}</h4>
              <p className="mt-1 text-sm text-black/75">{item.role}</p>
            </div>
          </div>
        </div>

        <div className="client-reveal mx-auto mt-14 flex max-w-xl items-center overflow-hidden rounded-full bg-[#FFCC00]">
          {clients.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className="relative h-2 flex-1 bg-[#FFCC00]"
            >
              <div
                ref={(el) => (progressRefs.current[index] = el)}
                className="absolute left-0 top-0 h-full w-0 rounded-full bg-black"
              />

              <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#FFCC00]" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cliend;
