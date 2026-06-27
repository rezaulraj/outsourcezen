import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Globe2,
  Handshake,
  HelpCircle,
  Mail,
  ShieldCheck,
  Sparkles,
  UserPlus,
  UsersRound,
} from "lucide-react";

const faqs = [
  {
    question: "Who can become a recruitment agent?",
    answer:
      "Professionals with recruitment, sales, HR, staffing, immigration support, candidate sourcing, business development or employer relationship experience can apply to become an agent.",
  },
  {
    question: "Do agents need previous recruitment experience?",
    answer:
      "Previous experience is helpful, but not always required. Strong communication skills, professionalism, local market knowledge and the ability to connect employers or candidates are very important.",
  },
  {
    question: "What industries can agents work with?",
    answer:
      "Agents can support industries such as construction, manufacturing, hospitality, healthcare, agriculture, logistics, cleaning, facility management, retail, food processing and skilled trades.",
  },
  {
    question: "Can agents work remotely?",
    answer:
      "Yes. Many agent activities can be managed remotely through calls, email, video meetings and online coordination, depending on the country, client type and recruitment process.",
  },
  {
    question: "What support will agents receive?",
    answer:
      "Agents receive guidance for employer communication, candidate coordination, industry understanding, documentation flow and professional recruitment support.",
  },
  {
    question: "How can I apply to become an agent?",
    answer:
      "You can apply by contacting the team, sharing your background, country, experience and the industries or regions you can support.",
  },
];

const ctaPoints = [
  {
    title: "Global opportunity",
    text: "Work with employers and candidates across multiple countries.",
    icon: Globe2,
  },
  {
    title: "Trusted support",
    text: "Receive guidance from an experienced recruitment support team.",
    icon: ShieldCheck,
  },
  {
    title: "Industry coverage",
    text: "Support key sectors with real workforce demand.",
    icon: UsersRound,
  },
];

const AgentFAQCTA = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".agent-faq-word", {
        y: 45,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".agent-faq-item", {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".agent-cta-card", {
        y: 35,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.35,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo bg-[var(--color-primary-bg)] pb-36"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-5 py-2">
                <HelpCircle size={17} />
                <span className="text-sm font-semibold text-black">
                  Agent FAQ
                </span>
              </div>

              <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
                {["Questions", "about", "becoming", "an", "agent?"].map(
                  (word) => (
                    <span
                      key={word}
                      className="inline-block overflow-hidden px-1"
                    >
                      <span className="agent-faq-word inline-block">
                        {word}
                      </span>
                    </span>
                  ),
                )}
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-black/70">
                Learn how recruitment agents work with employers, candidates and
                workforce projects across different countries and industries.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((item, index) => {
                const isActive = active === index;

                return (
                  <div
                    key={item.question}
                    className="agent-faq-item overflow-hidden rounded-[26px] border border-black/10 bg-[#FFF9E6]"
                  >
                    <button
                      type="button"
                      onClick={() => setActive(isActive ? null : index)}
                      className="flex w-full items-center justify-between gap-5 p-5 text-left sm:p-6"
                    >
                      <span className="text-lg font-bold tracking-[-0.03em] text-black">
                        {item.question}
                      </span>

                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#CFF7BC] transition-transform duration-300 ${
                          isActive ? "rotate-180" : ""
                        }`}
                      >
                        <ChevronDown size={20} />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-6 text-sm leading-6 text-black/70 sm:px-6">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="agent-cta-card relative overflow-hidden rounded-[42px] border border-black bg-[#FFF9E6] p-7 sm:p-9 lg:sticky lg:top-24 lg:self-start">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#CFF7BC]/70 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#FFE994]/70 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-7 flex h-18 w-18 items-center justify-center rounded-[24px] bg-black text-white">
                <UserPlus size={34} strokeWidth={2.3} />
              </div>

              <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
                Become an Agent
              </p>

              <h3 className="text-4xl font-normal tracking-[-0.055em] text-black sm:text-5xl">
                Join our global recruitment network
              </h3>

              <p className="mt-5 text-sm leading-6 text-black/70">
                Build relationships with employers and candidates, support
                workforce projects and grow with a recruitment platform focused
                on practical staffing solutions.
              </p>

              <div className="mt-8 space-y-4">
                {ctaPoints.map(({ icon: Icon, ...item }) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-black/10 bg-white/55 p-4 backdrop-blur-md"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#CFF7BC]">
                        <Icon size={20} strokeWidth={2.4} />
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-black">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm leading-5 text-black/65">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
                >
                  Apply to Become an Agent
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="mailto:talk@outsourcezen.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-all duration-300 hover:bg-black hover:text-white"
                >
                  <Mail size={16} />
                  Email Us
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  [Handshake, "Partnership"],
                  [BadgeCheck, "Guidance"],
                  [Sparkles, "Growth"],
                ].map(([Icon, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl bg-white/55 p-4 text-center"
                  >
                    <Icon size={20} className="mx-auto mb-2" />
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-black/55">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentFAQCTA;
