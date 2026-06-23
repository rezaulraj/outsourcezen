import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  Clock3,
  Globe2,
  Handshake,
  Headphones,
  ShieldCheck,
  UsersRound,
  Workflow,
} from "lucide-react";

const reasons = [
  {
    title: "Fast Response",
    text: "Get quick guidance from our recruitment support team for urgent hiring needs.",
    icon: Clock3,
    color: "#FFE994",
  },
  {
    title: "Workforce Experts",
    text: "Speak with specialists who understand bulk hiring, skilled roles and industry demand.",
    icon: UsersRound,
    color: "#CFF7BC",
  },
  {
    title: "Global Reach",
    text: "Our office network supports workforce solutions across multiple regions and markets.",
    icon: Globe2,
    color: "#A6E6EC",
  },
  {
    title: "Compliance Support",
    text: "We help guide hiring conversations around documentation, screening and deployment needs.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
  {
    title: "Industry Specialists",
    text: "Construction, manufacturing, hospitality, healthcare, agriculture and more.",
    icon: Workflow,
    color: "#FFE994",
  },
  {
    title: "Ongoing Assistance",
    text: "From first inquiry to worker deployment, our team stays connected with your needs.",
    icon: Handshake,
    color: "#CFF7BC",
  },
];

const WhyContactUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-contact-word", {
        y: 45,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".why-contact-card", {
        y: 35,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".why-contact-strip", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Why Contact Us
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Clear", "answers", "for", "your", "workforce", "needs"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="why-contact-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Contact us when you need dependable workers, recruitment guidance,
            documentation support, or a clear hiring plan for your business.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="why-contact-card rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6"
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: item.color }}
              >
                <Icon size={24} strokeWidth={2.4} />
              </div>

              <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-black/70">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <div className="why-contact-strip mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <Headphones size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Need help choosing the right recruitment solution?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  Share your industry, country, job roles and number of workers
                  needed. Our team will guide you with the most suitable hiring
                  pathway.
                </p>
              </div>
            </div>

            <a
              href="#contact-form"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Talk to our team
              <BadgeCheck size={17} strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyContactUs;
