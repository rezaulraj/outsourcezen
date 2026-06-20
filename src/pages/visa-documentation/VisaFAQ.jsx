import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const faqs = [
  {
    q: "What documents are usually required?",
    a: "Common documents include passport copy, employment contract, medical report, police clearance, visa application file and deployment checklist.",
  },
  {
    q: "Do you check documents before visa processing?",
    a: "Yes. We review documents for completeness, consistency, validity and missing information before the file moves forward.",
  },
  {
    q: "Can you help with missing documents?",
    a: "Yes. We identify missing documents early and guide the candidate or employer on what needs to be prepared.",
  },
  {
    q: "Do you support work permit documentation?",
    a: "Yes. We help organize work permit related papers based on employer and destination requirements.",
  },
  {
    q: "How long does file preparation take?",
    a: "It depends on document readiness, but initial file review can often begin within 72 hours after receiving the required papers.",
  },
];

const VisaFAQ = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-word", {
        y: 50,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".faq-card", {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative bg-[#CFF7BC] py-24 lg:py-32"
    >
      <svg
        className="absolute left-0 top-0 h-[120px] w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H1440V48C1160 86 960 22 720 55C470 95 230 74 0 30V0Z"
          fill="var(--color-primary-bg)"
        />
      </svg>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            FAQs
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Visa", "Documentation", "FAQs"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="faq-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Clear answers for employers before starting documentation support.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((item, index) => (
            <FAQItem
              key={item.q}
              item={item}
              index={index}
              active={active === index}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ item, index, active, onClick }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.to(contentRef.current, {
      height: active ? "auto" : 0,
      opacity: active ? 1 : 0,
      marginTop: active ? 14 : 0,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [active]);

  return (
    <button
      onClick={onClick}
      className={`faq-card block w-full rounded-[26px] border p-5 text-left transition-all duration-500 ${
        active
          ? "border-black bg-[#FFF9E6]"
          : "border-black/10 bg-white/45 hover:bg-[#FFF9E6]"
      }`}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-start gap-4">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              active ? "bg-[#67D946] text-black" : "bg-black/10 text-black"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <h3 className="pt-2 text-base font-bold leading-6 text-black">
              {item.q}
            </h3>

            <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
              <p className="text-sm leading-6 text-black/70">{item.a}</p>
            </div>
          </div>
        </div>

        <span className="shrink-0 text-2xl leading-none text-black">
          {active ? "−" : "+"}
        </span>
      </div>
    </button>
  );
};

export default VisaFAQ;
