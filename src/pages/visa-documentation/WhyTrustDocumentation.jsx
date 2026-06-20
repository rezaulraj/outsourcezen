import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  Clock3,
  FileCheck,
  FolderCheck,
  ShieldCheck,
  Stamp,
} from "lucide-react";

const benefits = [
  {
    title: "Cleaner visa files",
    text: "Documents are organized clearly before submission or deployment steps.",
    icon: FolderCheck,
    value: "95%",
    label: "File Accuracy",
    color: "#FFE994",
  },
  {
    title: "Fewer document delays",
    text: "Missing, expired or inconsistent documents are flagged early.",
    icon: Clock3,
    value: "72hr",
    label: "Initial File Review",
    color: "#CFF7BC",
  },
  {
    title: "Better compliance control",
    text: "We support cleaner paperwork for safer and more structured hiring.",
    icon: ShieldCheck,
    value: "5K+",
    label: "Files Processed",
    color: "#A6E6EC",
  },
  {
    title: "Deployment-ready support",
    text: "Final documents are prepared for visa, travel and workforce mobilization.",
    icon: BadgeCheck,
    value: "50+",
    label: "Employer Projects",
    color: "#FFF6C8",
  },
];

const AnimatedBookButton = () => {
  const canvasRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame;
    let time = 0;
    let hover = 0;

    const w = 320;
    const h = 140;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const lerp = (a, b, t) => a + (b - a) * t;

    const drawArrow = (x, y, angle, scale = 1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.quadraticCurveTo(-8, -10, 8, -4);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(8, -4);
      ctx.lineTo(0, -13);
      ctx.moveTo(8, -4);
      ctx.lineTo(0, 6);
      ctx.stroke();

      ctx.restore();
    };

    const drawDot = (x, y, r) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      time += 0.02;
      hover += ((hoverRef.current ? 1 : 0) - hover) * 0.09;

      const clickPulse = hoverRef.current
        ? 1 + Math.sin(time * 12) * 0.08
        : 1 + Math.sin(time * 2) * 0.03;

      const arrows = [
        {
          from: [50, 35, 0.15],
          to: [110, 55, 0.45],
        },
        {
          from: [270, 35, Math.PI - 0.15],
          to: [210, 55, Math.PI - 0.45],
        },
        {
          from: [70, 105, -0.45],
          to: [112, 85, -0.15],
        },
        {
          from: [250, 105, Math.PI + 0.45],
          to: [208, 85, Math.PI + 0.15],
        },
      ];

      arrows.forEach((item, i) => {
        const wave = Math.sin(time * 2 + i) * (1 - hover) * 6;
        const x = lerp(item.from[0], item.to[0], hover);
        const y = lerp(item.from[1], item.to[1], hover) + wave;
        const angle = lerp(item.from[2], item.to[2], hover);

        drawArrow(x, y, angle, clickPulse);
      });

      const dots = [
        {
          from: [42, 78],
          to: [120, 70],
        },
        {
          from: [118, 18],
          to: [145, 48],
        },
        {
          from: [278, 78],
          to: [200, 70],
        },
        {
          from: [180, 118],
          to: [170, 92],
        },
      ];

      dots.forEach((item, i) => {
        const x = lerp(item.from[0], item.to[0], hover);
        const y =
          lerp(item.from[1], item.to[1], hover) +
          Math.sin(time * 2.5 + i) * (1 - hover) * 4;

        drawDot(x, y, 4 + hover * 1.5);
      });

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      className="relative mx-auto mt-12 flex h-[140px] w-[320px] items-center justify-center overflow-visible"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
      />

      <a
        href="/contact"
        className="group relative z-10 inline-flex overflow-hidden rounded-full bg-black px-7 py-3 text-sm font-bold text-white transition-all duration-500 hover:scale-110 active:scale-95"
      >
        <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-700 ease-out group-hover:w-full" />
        <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
          Build your Team
        </span>
      </a>
    </div>
  );
};

const WhyTrustDocumentation = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".doc-trust-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".doc-trust-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".doc-trust-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.09,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".doc-trust-line", {
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

    const docs = Array.from({ length: 44 }, (_, i) => ({
      angle: (Math.PI * 2 * i) / 44,
      radius: 0.23 + (i % 4) * 0.045,
      speed: 0.11 + (i % 5) * 0.018,
      phase: i * 0.45,
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

    const rr = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
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

    const drawMiniDoc = (x, y, s, approved) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-10, -14, 20, 28, 4);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = approved ? "#111" : "rgba(0,0,0,0.35)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(3, -14);
      ctx.lineTo(10, -7);
      ctx.lineTo(3, -7);
      ctx.closePath();
      ctx.fillStyle = approved ? "#F4C542" : "rgba(0,0,0,0.12)";
      ctx.fill();
      ctx.stroke();

      if (approved) drawCheck(4, 5, 0.35);

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

      rr(cx - 34, cy - 42, 68, 84, 12);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 12, cy - 42);
      ctx.lineTo(cx + 34, cy - 20);
      ctx.lineTo(cx + 12, cy - 20);
      ctx.closePath();
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      drawCheck(cx + 14, cy + 14, 0.72);

      ctx.fillStyle = "#111";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("TRUSTED FILE", cx, cy + 76);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const cx = w / 2;
      const cy = h / 2;

      docs.forEach((doc, i) => {
        const r = Math.min(w, h) * doc.radius;
        const angle = doc.angle + time * doc.speed;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r * 0.72;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(0,0,0,0.055)";
        ctx.lineWidth = 1.4;
        ctx.stroke();

        drawMiniDoc(x, y, 0.72, Math.sin(time + doc.phase) > -0.25);
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
        <div className="doc-trust-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Why Employers Trust Our Documentation Support
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Cleaner", "files,", "smoother", "deployment"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="doc-trust-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="doc-trust-line mx-auto mt-3 h-5 w-[360px] max-w-full"
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
            Employers rely on organized documentation support to reduce delays,
            improve file clarity and keep deployment moving smoothly.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr_0.9fr]">
          <div className="space-y-6">
            {benefits.slice(0, 2).map((item, index) => (
              <TrustCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <div className="doc-trust-reveal relative h-[390px] sm:h-[480px] lg:h-[560px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="space-y-6">
            {benefits.slice(2).map((item, index) => (
              <TrustCard key={item.title} item={item} index={index + 2} />
            ))}
          </div>
        </div>
        <div className="why-reveal">
          <AnimatedBookButton />
        </div>
      </div>
    </section>
  );
};

const TrustCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const Icon = item.icon;

  const onEnter = () => {
    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.02,
      rotate: index % 2 === 0 ? -1 : 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="doc-trust-card relative overflow-hidden rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6"
    >
      <div
        className="absolute -right-3 top-8 h-[calc(100%-64px)] w-5 rounded-r-2xl"
        style={{ backgroundColor: item.color }}
      />

      <div className="relative z-10">
        <div
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-black/10"
          style={{ backgroundColor: item.color }}
        >
          <Icon size={24} strokeWidth={2.4} />
        </div>

        <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-black/70">{item.text}</p>

        <div className="mt-6 border-t border-black/10 pt-5">
          <p className="text-4xl font-normal tracking-[-0.05em] text-black">
            {item.value}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-black/50">
            {item.label}
          </p>
        </div>
      </div>
    </article>
  );
};

export default WhyTrustDocumentation;
