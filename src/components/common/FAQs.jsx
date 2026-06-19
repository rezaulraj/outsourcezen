import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const faqs = [
  {
    question: "How fast can you provide shortlisted candidates?",
    answer:
      "For common roles, we can usually start sharing suitable profiles within a few days after receiving job details, quantity, skill needs and selection criteria.",
  },
  {
    question: "Do you support bulk workforce recruitment?",
    answer:
      "Yes. We support bulk hiring for construction, manufacturing, hospitality, cleaning, logistics, agriculture and other essential sectors.",
  },
  {
    question: "Do you verify candidate skills before selection?",
    answer:
      "Yes. We check experience, documents, job fit and can arrange trade testing or practical assessment depending on the role.",
  },
  {
    question: "Can you help with visa and documentation?",
    answer:
      "Yes. We coordinate visa files, contracts, required documents and deployment preparation so employers can manage hiring more smoothly.",
  },
  {
    question: "Which industries do you recruit for?",
    answer:
      "We recruit for construction, manufacturing, hospitality, healthcare, agriculture, logistics, cleaning, oil and gas, retail, food processing, marine, security and skilled trades.",
  },
  {
    question: "Do you provide post-placement support?",
    answer:
      "Yes. We support communication, onboarding coordination and follow-up after deployment to help reduce hiring risk.",
  },
];

const FAQs = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-word", {
        y: 55,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".faq-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".faq-item", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.35,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w;
    let h;
    let frame;
    let time = 0;
    let current = 1;

    const resize = () => {
      const parent = canvas.parentElement;
      const dpr = window.devicePixelRatio || 1;

      w = parent.offsetWidth;
      h = parent.offsetHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ring = (cx, cy, r, color, p, start, lw) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, start, start + Math.PI * 2 * p);
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const target = activeRef.current + 1;
      current += (target - current) * 0.08;

      const cx = w / 2;
      const cy = h / 2;
      const big = Math.min(w, h) * 0.31;
      const small = big * 0.62;

      ring(cx, cy, big, "rgba(0,0,0,0.12)", 1, 0, 12);
      ring(
        cx,
        cy,
        big,
        "#F4C542",
        0.38 + activeRef.current * 0.08,
        -Math.PI / 2 + time * 0.35,
        12,
      );

      ring(cx, cy, small, "rgba(0,0,0,0.10)", 1, 0, 8);
      ring(
        cx,
        cy,
        small,
        "#67D946",
        0.55 + Math.sin(time) * 0.14,
        Math.PI / 2 - time * 0.45,
        8,
      );

      ctx.fillStyle = "#111";
      ctx.font = `700 ${big * 0.9}px Arimo`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(Math.round(current)).padStart(2, "0"), cx, cy - 4);

      ctx.font = `600 ${big * 0.13}px Arimo`;
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillText("FAQ STEP", cx, cy + big * 0.58);

      for (let i = 0; i < faqs.length; i++) {
        const angle =
          -Math.PI / 2 + (Math.PI * 2 * i) / faqs.length + time * 0.06;

        const px = cx + Math.cos(angle) * (big + 45);
        const py = cy + Math.sin(angle) * (big + 45);

        ctx.beginPath();
        ctx.arc(px, py, i === activeRef.current ? 8 : 5, 0, Math.PI * 2);
        ctx.fillStyle =
          i === activeRef.current ? "#F4C542" : "rgba(0,0,0,0.22)";
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative overflow-visible bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="faq-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Questions & Answers
          </p>

          <h1 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Frequently", "Asked", "Questions"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="faq-word inline-block">{word}</span>
              </span>
            ))}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Everything employers usually ask before starting a workforce
            recruitment project with us.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                index={index}
                active={active === index}
                onClick={() => setActive(index)}
              />
            ))}
          </div>

          <div className="faq-reveal sticky top-28 h-[340px] sm:h-[430px] lg:h-[540px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ faq, index, active, onClick }) => {
  const itemRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.to(contentRef.current, {
      height: active ? "auto" : 0,
      opacity: active ? 1 : 0,
      marginTop: active ? 16 : 0,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [active]);

  return (
    <button
      ref={itemRef}
      onClick={onClick}
      className={`faq-item block w-full rounded-[24px] border p-5 text-left transition-colors duration-500 ${
        active
          ? "border-black bg-[#FFE994]"
          : "border-black/10 bg-[#FFF9E6] hover:bg-[#FFF4C7]"
      }`}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-start gap-4">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
              active ? "bg-black text-white" : "bg-black/10 text-black"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <h3 className="pt-2 text-base font-bold leading-6 text-black">
            {faq.question}
          </h3>
        </div>

        <span className="shrink-0 text-2xl leading-none text-black">
          {active ? "−" : "+"}
        </span>
      </div>

      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <p className="pl-14 text-sm leading-6 text-black/70">{faq.answer}</p>
      </div>
    </button>
  );
};

export default FAQs;
