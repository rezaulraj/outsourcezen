import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Award,
  ShieldAlert,
  Globe2,
  Scale,
  Compass,
  CheckSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const CERTIFICATIONS = [
  {
    id: 1,
    title: "Licensed Recruiter",
    icon: Award,
    desc: "State-validated recruitment authority credentials.",
    code: "LIC-REC-01",
  },
  {
    id: 2,
    title: "HR Professional",
    icon: CheckSquare,
    desc: "Advanced operational human resources optimization matrix.",
    code: "HRP-CORE-99",
  },
  {
    id: 3,
    title: "International Recruitment",
    icon: Globe2,
    desc: "Cross-border organizational placement validation parameters.",
    code: "INT-STAFF-X",
  },
  {
    id: 4,
    title: "Labour Compliance",
    icon: Scale,
    desc: "Adherence checking mechanisms for continuous protection.",
    code: "LAB-COMP-M",
  },
  {
    id: 5,
    title: "Immigration Knowledge",
    icon: Compass,
    desc: "Verified mastery over global mobility authorization mechanics.",
    code: "IMM-KNOW-V",
  },
  {
    id: 6,
    title: "ISO Training",
    icon: ShieldAlert,
    desc: "Certified baseline quality assurance processing workflows.",
    code: "ISO-QA-9001",
  },
];

const AgentCertifications = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const stateRef = useRef({ activeStep: 0 });

  useEffect(() => {
    stateRef.current.activeStep = activeStep;
  }, [activeStep]);

  // Entrance Split Text Reveal Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cert-word", {
        y: 50,
        opacity: 0,
        rotateX: 40,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
      });

      gsap.from(".cert-reveal", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // HTML5 Interactive Physics & Carved Curved Path Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frameId;
    let time = 0;

    // Array to manage flowing data stream micro-particles along the curved track
    const particles = Array.from({ length: 12 }, () => ({
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.002,
      radius: 2 + Math.random() * 2,
    }));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.parentElement.offsetWidth;
      const height = canvas.parentElement.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener("resize", resize);
    resize();

    // Map mathematical points dynamically along a beautiful continuous S-Curve
    const getSPathPoint = (t, w, h) => {
      const startX = w * 0.15;
      const endX = w * 0.85;
      const totalWidth = endX - startX;

      const x = startX + t * totalWidth;
      // Beautiful harmonic sine configuration to construct an elegant curving layout track
      const y = h * 0.5 + Math.sin(t * Math.PI * 2) * (h * 0.22);

      return { x, y };
    };

    const drawLoop = () => {
      time += 0.015;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      const currentActive = stateRef.current.activeStep;

      // 1. Render the Base Structural S-Curve Pathway Infrastructure
      ctx.beginPath();
      for (let t = 0; t <= 1; t += 0.01) {
        const pt = getSPathPoint(t, w, h);
        if (t === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = "rgba(17, 17, 17, 0.06)";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.stroke();

      const maxActiveProgress = currentActive / (CERTIFICATIONS.length - 1);
      ctx.beginPath();
      for (let t = 0; t <= maxActiveProgress; t += 0.005) {
        const pt = getSPathPoint(t, w, h);
        if (t === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = "#FFE994";
      ctx.lineWidth = 4;
      ctx.stroke();

      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const pPt = getSPathPoint(p.progress, w, h);
        ctx.beginPath();
        ctx.arc(pPt.x, pPt.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          p.progress <= maxActiveProgress ? "#111111" : "rgba(17, 17, 17, 0.2)";
        ctx.fill();
      });

      CERTIFICATIONS.forEach((cert, idx) => {
        const t = idx / (CERTIFICATIONS.length - 1);
        const pt = getSPathPoint(t, w, h);

        const isActive = currentActive === idx;
        const bobbingY = Math.sin(time * 2.5 + idx) * 4;

        ctx.save();
        ctx.translate(pt.x, pt.y + (isActive ? bobbingY : 0));

        ctx.beginPath();
        ctx.arc(0, 0, isActive ? 28 : 18, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? "#FFE994" : "#FFFFFF";
        ctx.fill();
        ctx.strokeStyle = isActive ? "#111111" : "rgba(17, 17, 17, 0.15)";
        ctx.lineWidth = isActive ? 2.5 : 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -6, 4, 0, Math.PI * 2); // Head
        ctx.fillStyle = isActive ? "#111111" : "rgba(17,17,17,0.7)";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(0, 8);
        ctx.moveTo(-5, 2);
        ctx.lineTo(5, 2);
        ctx.moveTo(0, 8);
        ctx.lineTo(-4, 15);
        ctx.moveTo(0, 8);
        ctx.lineTo(4, 15);
        ctx.strokeStyle = isActive ? "#111111" : "rgba(17,17,17,0.7)";
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.font = isActive ? "bold 10px sans-serif" : "500 9px sans-serif";
        ctx.fillStyle = isActive ? "#111111" : "rgba(17,17,17,0.5)";
        ctx.textAlign = "center";
        ctx.fillText(cert.title.split(" ")[0], 0, -22);

        if (idx < currentActive) {
          ctx.beginPath();
          ctx.arc(12, 12, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#1f7a2e";
          ctx.fill();
        }

        ctx.restore();
      });

      frameId = requestAnimationFrame(drawLoop);
    };

    drawLoop();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % CERTIFICATIONS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden font-arimo px-4 py-20 sm:px-6 lg:px-8 bg-white"
    >
      <div className="absolute inset-0 bg-[#CFF7BC]" />

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
          fill="#CFF7BC"
        />
      </svg>
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-black/5 pb-8 lg:flex-row lg:items-end">
          <div>
            <span className="cert-reveal inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-black/40">
              <Sparkles size={12} className="text-black/60" /> Compliance
              Framework
            </span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              {["Agent", "Certifications", "&", "Badges"].map((word, i) => (
                <span
                  key={i}
                  className="mr-3 inline-block overflow-hidden pb-1"
                >
                  <span className="cert-word inline-block">{word}</span>
                </span>
              ))}
            </h2>
          </div>
          <p className="cert-reveal max-w-sm text-sm leading-relaxed text-black/50">
            Every verification cluster runs synchronized legal matching,
            continuous compliance auditing, and global clearance standards
            parameters.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-stretch">
          <div className="cert-reveal relative lg:col-span-7 min-h-[380px] lg:min-h-0 w-full rounded-3xl border border-black/[0.06] bg-[#FFF9E6] overflow-hidden">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#FFE994]backdrop-blur-md px-3 py-1.5 rounded-full border border-black/5">
              <span className="h-2 w-2 rounded-full bg-[#FFE994] animate-pulse" />
              <span className="text-[9px] font-mono tracking-wider uppercase text-black/60">
                Verification Highway Engine
              </span>
            </div>
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <div className="cert-reveal lg:col-span-5 flex flex-col gap-2.5 justify-center">
            {CERTIFICATIONS.map((cert, index) => {
              const IconComp = cert.icon;
              const isSelected = index === activeStep;

              return (
                <button
                  key={cert.id}
                  onClick={() => setActiveStep(index)}
                  className={`group relative flex items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-black bg-[#FAFAFA] shadow-sm translate-x-1"
                      : "border-black/5 bg-white hover:border-black/20 hover:bg-black/[0.005]"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 border ${
                      isSelected
                        ? "bg-[#FFE994] text-black border-black"
                        : "bg-black/5 text-black/50 border-transparent"
                    }`}
                  >
                    <IconComp size={18} strokeWidth={isSelected ? 2.5 : 2} />
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold tracking-tight text-black">
                        {cert.title}
                      </h4>
                      <span
                        className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded transition-all duration-300 ${
                          isSelected
                            ? "bg-black text-white"
                            : "bg-black/5 text-black/40"
                        }`}
                      >
                        {cert.code}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-black/60">
                      {cert.desc}
                    </p>
                  </div>
                </button>
              );
            })}

            <div className="mt-2 flex items-center justify-end">
              <button
                onClick={() =>
                  setActiveStep((prev) => (prev + 1) % CERTIFICATIONS.length)
                }
                className="inline-flex items-center gap-2 text-xs font-bold text-black/40 hover:text-black transition-colors"
              >
                Advance Process Step
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentCertifications;
