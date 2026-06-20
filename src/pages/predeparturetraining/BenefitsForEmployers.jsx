import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Clock3,
  HardHat,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const benefits = [
  {
    title: "Faster Onboarding",
    text: "Workers arrive with basic job understanding, workplace discipline and employer expectations already explained.",
    icon: Clock3,
    stat: "72hr",
    label: "quicker readiness",
    color: "#FFE994",
  },
  {
    title: "Safer Workforce",
    text: "Safety orientation helps workers understand PPE, site rules and responsible workplace behavior.",
    icon: HardHat,
    stat: "95%",
    label: "safety prepared",
    color: "#CFF7BC",
  },
  {
    title: "Better Productivity",
    text: "Prepared workers adapt faster, follow instructions more clearly and start contributing sooner.",
    icon: TrendingUp,
    stat: "2x",
    label: "smoother start",
    color: "#A6E6EC",
  },
  {
    title: "Lower Early Risk",
    text: "Training reduces confusion around culture, communication, travel, accommodation and job conduct.",
    icon: ShieldCheck,
    stat: "89%",
    label: "retention focus",
    color: "#FFF6C8",
  },
  {
    title: "Professional Conduct",
    text: "Workers are guided on attendance, respect, company rules, reporting flow and workplace expectations.",
    icon: BriefcaseBusiness,
    stat: "100%",
    label: "role clarity",
    color: "#FFE994",
  },
  {
    title: "Deployment Confidence",
    text: "Employers receive workers who are mentally prepared for travel, arrival and job start.",
    icon: BadgeCheck,
    stat: "Ready",
    label: "before arrival",
    color: "#CFF7BC",
  },
];

const BenefitsForEmployers = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".benefit-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".benefit-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".benefit-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.08,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".benefit-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center",
        duration: 1,
        delay: 0.55,
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

    const particles = Array.from({ length: 44 }, (_, i) => ({
      angle: (Math.PI * 2 * i) / 44,
      radius: 0.23 + (i % 4) * 0.045,
      speed: 0.11 + (i % 5) * 0.018,
      phase: i * 0.45,
      size: 2.5 + (i % 3) * 0.8,
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
      ctx.arc(x, y - r * 1.1, r * 0.75, 0, Math.PI * 2);
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

    const drawHub = (cx, cy) => {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, 50 + i * 28, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,0,0,${0.1 - i * 0.018})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, 64, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.13)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        64,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 +
          time * 0.45 +
          Math.PI * 2 * (0.62 + Math.sin(time) * 0.2),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        42,
        Math.PI / 2 - time * 0.55,
        Math.PI / 2 - time * 0.55 - Math.PI * 2 * 0.55,
        true,
      );
      ctx.strokeStyle = "#67D946";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 34, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      drawCheck(cx, cy + 1, 1.1);

      ctx.fillStyle = "#111";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("EMPLOYER", cx, cy + 66);
      ctx.fillText("BENEFIT", cx, cy + 82);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const cx = w / 2;
      const cy = h / 2;

      particles.forEach((p, i) => {
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

        const approved = Math.sin(time + p.phase) > -0.15;
        drawWorker(x, y, p.size, approved ? "#F4C542" : "rgba(0,0,0,0.35)");
      });

      drawHub(cx, cy);

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
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="benefit-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Benefits For Employers
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Prepared", "workers,", "stronger", "outcomes"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="benefit-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="benefit-line mx-auto mt-3 h-5 w-[360px] max-w-full"
            viewBox="0 0 360 24"
            fill="none"
          >
            <path
              d="M12 15C80 5 145 8 180 13C245 21 300 10 348 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Pre-departure training helps employers receive workers who are more
            confident, safer, better informed and easier to onboard.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.1fr_0.85fr]">
          <div className="space-y-5">
            {benefits.slice(0, 3).map((item, index) => (
              <BenefitCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <div className="benefit-reveal relative h-[420px] sm:h-[520px] lg:h-[620px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="space-y-5">
            {benefits.slice(3).map((item, index) => (
              <BenefitCard key={item.title} item={item} index={index + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BenefitCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const Icon = item.icon;

  const onEnter = () => {
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.018,
      rotate: index % 2 === 0 ? -1 : 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="benefit-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
    >
      <div className="flex gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: item.color }}
        >
          <Icon size={22} strokeWidth={2.4} />
        </div>

        <div>
          <h3 className="text-base font-bold tracking-[-0.02em] text-black">
            {item.title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-black/70">{item.text}</p>

          <div className="mt-4 border-t border-black/10 pt-3">
            <p className="text-3xl font-normal tracking-[-0.05em] text-black">
              {item.stat}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-black/50">
              {item.label}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BenefitsForEmployers;
