import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Globe2,
  Handshake,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const highlights = [
  {
    title: "Global workforce partner",
    text: "We help employers find reliable workers across multiple countries and industries.",
    icon: Globe2,
    color: "#FFE994",
  },
  {
    title: "People-first recruitment",
    text: "We focus on matching the right people with the right companies and roles.",
    icon: UsersRound,
    color: "#CFF7BC",
  },
  {
    title: "Trusted hiring process",
    text: "Our process supports sourcing, screening, coordination and deployment.",
    icon: ShieldCheck,
    color: "#A6E6EC",
  },
];

const WhoWeAre = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".who-word", {
        y: 50,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".who-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".who-card", {
        y: 35,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.4,
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
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="who-reveal lg:sticky lg:top-24">
            <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
              Who We Are
            </p>

            <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
              {[
                "A",
                "global",
                "recruitment",
                "partner",
                "built",
                "for",
                "workforce",
                "growth",
              ].map((word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="who-word inline-block">{word}</span>
                </span>
              ))}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-black/75">
              OutsourceZen is a workforce and recruitment partner helping
              employers connect with dependable workers across key industries.
              We support companies that need reliable people, clear
              communication and practical hiring solutions.
            </p>
          </div>

          <div>
            <div className="who-reveal rounded-[36px] border border-black/10 bg-[#FFF9E6] p-7 sm:p-9">
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <Building2 size={28} strokeWidth={2.4} />
              </div>

              <h3 className="text-3xl font-bold tracking-[-0.045em] text-black">
                We bridge employers, candidates and global opportunities.
              </h3>

              <p className="mt-5 text-sm leading-7 text-black/70">
                Our work is simple: understand what employers need, identify
                suitable candidates, support screening and coordination, and
                help create a smoother path from hiring requirement to workforce
                deployment.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {[
                  [Handshake, "Employer support"],
                  [ClipboardCheck, "Candidate screening"],
                  [BadgeCheck, "Placement coordination"],
                ].map(([Icon, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-black/10 bg-white/55 p-4"
                  >
                    <Icon size={21} />
                    <p className="mt-3 text-sm font-bold text-black">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, ...item }) => (
                <article
                  key={item.title}
                  className="who-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={22} strokeWidth={2.4} />
                  </div>

                  <h4 className="text-lg font-bold tracking-[-0.03em] text-black">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-black/70">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="who-card mt-5 rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6">
              <p className="text-sm leading-7 text-black/70">
                We work across sectors such as construction, manufacturing,
                hospitality, healthcare, agriculture, logistics, cleaning,
                facility management and skilled trades — helping companies build
                teams that keep operations moving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
