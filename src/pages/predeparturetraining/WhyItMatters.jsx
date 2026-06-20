import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { BadgeCheck, BriefcaseBusiness, HardHat, Plane } from "lucide-react";

const stats = [
  { value: "95%", label: "Faster Adaptation" },
  { value: "89%", label: "Retention Rate" },
  { value: "72hr", label: "Faster Onboarding" },
];

const benefits = [
  { title: "Safety Ready", icon: HardHat },
  { title: "Job Ready", icon: BriefcaseBusiness },
  { title: "Culture Ready", icon: BadgeCheck },
  { title: "Travel Ready", icon: Plane },
];

const WhyItMatters = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-matter-word", {
        y: 60,
        opacity: 0,
        rotateX: 70,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.from(".why-matter-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".why-matter-stat", {
        y: 30,
        opacity: 0,
        scale: 0.92,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.55,
        ease: "back.out(1.6)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h, frame;
    let time = 0;

    const particles = Array.from({ length: 48 }, (_, i) => ({
      angle: (Math.PI * 2 * i) / 48,
      radius: 0.2 + (i % 5) * 0.04,
      speed: 0.1 + (i % 6) * 0.015,
      size: 2.5 + (i % 3) * 0.9,
      phase: i * 0.5,
    }));

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

    const drawWorker = (x, y, r, color) => {
      ctx.beginPath();
      ctx.arc(x, y - r * 1.15, r * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y + r * 0.75, r, Math.PI, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(2, r * 0.55);
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const drawCheck = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.lineTo(-3, 6);
      ctx.lineTo(10, -9);
      ctx.stroke();
      ctx.restore();
    };

    const drawHub = (cx, cy, scale) => {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (52 + i * 30) * scale, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,0,0,${0.1 - i * 0.018})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, 68 * scale, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.13)";
      ctx.lineWidth = 11 * scale;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        68 * scale,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 + time * 0.45 + Math.PI * 2 * (0.6 + Math.sin(time) * 0.2),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 11 * scale;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        44 * scale,
        Math.PI / 2 - time * 0.55,
        Math.PI / 2 - time * 0.55 - Math.PI * 2 * 0.55,
        true,
      );
      ctx.strokeStyle = "#67D946";
      ctx.lineWidth = 7 * scale;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 36 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      drawCheck(cx, cy + 1, 1.15 * scale);

      ctx.fillStyle = "#111";
      ctx.font = `700 ${12 * scale}px Arimo`;
      ctx.textAlign = "center";
      ctx.fillText("READY", cx, cy + 82 * scale);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(1, Math.min(w, h) / 420);

      particles.forEach((p) => {
        const r = Math.min(w, h) * p.radius;
        const angle = p.angle + time * p.speed;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r * 0.72;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(0,0,0,0.055)";
        ctx.lineWidth = 1.4;
        ctx.stroke();

        const approved = Math.sin(time + p.phase) > -0.2;
        drawWorker(
          x,
          y,
          p.size * scale,
          approved ? "#F4C542" : "rgba(0,0,0,0.35)",
        );
      });

      drawHub(cx, cy, scale);

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
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-14 sm:py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-full w-full opacity-40 sm:opacity-60 lg:w-[52%] lg:opacity-80">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="why-matter-reveal mb-3 inline-block border-b border-black text-xs font-medium text-black sm:text-sm">
          Why It Matters
        </p>

        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <h2 className="max-w-6xl text-[clamp(1.75rem,5vw,3.25rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 sm:leading-[0.88] sm:tracking-[-0.08em]">
              {[
                "Workers",
                "arrive",
                "ready,",
                "confident",
                "&",
                "productive",
              ].map((word) => (
                <span key={word} className="block overflow-hidden pb-1 sm:pb-2">
                  <span className="why-matter-word inline-block">{word}</span>
                </span>
              ))}
            </h2>

            <p className="why-matter-reveal mt-5 max-w-xl text-sm leading-6 text-black/70 sm:mt-8 sm:text-base sm:leading-7">
              Training helps workers understand the job, safety rules, workplace
              culture and travel expectations before they arrive. That means
              faster onboarding and fewer early-stage problems for employers.
            </p>
          </div>

          <div className="why-matter-reveal hidden h-[420px] lg:block" />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2.5 sm:mt-12 sm:gap-4 lg:mt-14 lg:gap-5">
          {stats.map((item) => (
            <div
              key={item.label}
              className="why-matter-stat rounded-2xl border border-black/10 bg-[#FFF9E6] p-3 sm:rounded-[30px] sm:p-6"
            >
              <p className="text-2xl font-normal tracking-[-0.04em] text-black sm:text-4xl sm:tracking-[-0.06em] lg:text-5xl">
                {item.value}
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-black/55 sm:mt-2 sm:text-sm sm:tracking-[0.14em]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="why-matter-reveal mt-5 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
          {benefits.map(({ title, icon: Icon }) => (
            <div
              key={title}
              className="flex items-center gap-1.5 rounded-full border border-black/10 bg-[#FFE994] px-3.5 py-2 text-xs font-bold text-black sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
            >
              <Icon size={15} strokeWidth={2.4} className="sm:hidden" />
              <Icon size={17} strokeWidth={2.4} className="hidden sm:block" />
              {title}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;
