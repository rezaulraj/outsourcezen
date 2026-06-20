import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  BriefcaseBusiness,
  FileCheck,
  Languages,
  MessageSquareText,
  ShieldCheck,
  UserRoundCheck,
  Wrench,
  CalendarCheck,
} from "lucide-react";

const checks = [
  {
    title: "Identity Verification",
    text: "Confirm candidate identity and basic details.",
    icon: ShieldCheck,
  },
  {
    title: "Work Experience",
    text: "Review job history and practical background.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Technical Skills",
    text: "Check role-specific ability and skill match.",
    icon: Wrench,
  },
  {
    title: "Trade Skills",
    text: "Verify practical workforce capability.",
    icon: BadgeCheck,
  },
  {
    title: "Language Ability",
    text: "Assess basic communication readiness.",
    icon: Languages,
  },
  {
    title: "Communication",
    text: "Review attitude, clarity and response quality.",
    icon: MessageSquareText,
  },
  {
    title: "Reference Checks",
    text: "Validate previous work and reliability.",
    icon: UserRoundCheck,
  },
  {
    title: "Document Authenticity",
    text: "Check document consistency and completeness.",
    icon: FileCheck,
  },
  {
    title: "Availability",
    text: "Confirm joining timeline and deployment readiness.",
    icon: CalendarCheck,
  },
];

const WeCheck = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".we-check-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".we-check-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".we-check-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.06,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".we-check-line", {
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

    const nodes = Array.from({ length: 9 }, (_, i) => ({
      angle: -Math.PI / 2 + (Math.PI * 2 * i) / 9,
      phase: i * 0.7,
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

    const drawCheck = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-9, 0);
      ctx.lineTo(-3, 7);
      ctx.lineTo(11, -10);
      ctx.stroke();

      ctx.restore();
    };

    const drawNode = (x, y, i) => {
      const pulse = 0.5 + 0.5 * Math.sin(time * 1.6 + i);

      ctx.beginPath();
      ctx.arc(x, y, 18 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(244,197,66,0.35)";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 17, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      drawCheck(x, y + 1, 0.62);
    };

    const drawHub = (cx, cy) => {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, 52 + i * 24, 0, Math.PI * 2);
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
      ctx.arc(cx, cy, 36, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      drawCheck(cx, cy + 1, 1.15);

      ctx.fillStyle = "#111";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("VERIFIED", cx, cy + 66);
    };

    const drawMovingDot = (x1, y1, x2, y2, i) => {
      const p = (time * 0.18 + i * 0.09) % 1;
      const x = x1 + (x2 - x1) * p;
      const y = y1 + (y2 - y1) * p;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? "#F4C542" : "#67D946";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.34;

      nodes.forEach((node, i) => {
        const x = cx + Math.cos(node.angle) * radius;
        const y =
          cy +
          Math.sin(node.angle) * radius * 0.8 +
          Math.sin(time * 1.4 + node.phase) * 5;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(0,0,0,0.10)";
        ctx.lineWidth = 2;
        ctx.setLineDash([7, 10]);
        ctx.lineDashOffset = -time * 38;
        ctx.stroke();
        ctx.setLineDash([]);

        drawMovingDot(cx, cy, x, y, i);
        drawNode(x, y, i);
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
        <div className="we-check-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            What We Check
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Every", "candidate", "is", "verified"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="we-check-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="we-check-line mx-auto mt-3 h-5 w-[330px] max-w-full"
            viewBox="0 0 330 24"
            fill="none"
          >
            <path
              d="M12 15C70 5 130 8 165 13C225 21 275 10 318 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Every candidate passes through multiple verification stages before
            entering the shortlist.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.1fr_0.8fr]">
          <div className="space-y-5">
            {checks.slice(0, 4).map((item, index) => (
              <CheckCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <div className="we-check-reveal relative h-[420px] sm:h-[520px] lg:h-[620px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="space-y-5">
            {checks.slice(4, 8).map((item, index) => (
              <CheckCard key={item.title} item={item} index={index + 4} />
            ))}

            <CheckCard item={checks[8]} index={8} />
          </div>
        </div>
      </div>
    </section>
  );
};

const CheckCard = ({ item, index }) => {
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
      className="we-check-card rounded-[26px] border border-black/10 bg-[#FFF9E6] p-5"
    >
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFE994]">
          <Icon size={22} strokeWidth={2.4} />
        </div>

        <div>
          <h3 className="text-base font-bold tracking-[-0.02em] text-black">
            {item.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-black/70">{item.text}</p>
        </div>
      </div>
    </article>
  );
};

export default WeCheck;
