import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Crown, Search, ShieldCheck, Users } from "lucide-react";

const points = [
  {
    icon: Search,
    title: "Targeted leadership search",
    text: "We identify qualified senior talent instead of waiting for random applications.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential hiring",
    text: "Ideal for sensitive replacement, leadership expansion or specialist hiring.",
  },
  {
    icon: Crown,
    title: "Executive-level fit",
    text: "We focus on experience, decision-making, culture fit and long-term impact.",
  },
  {
    icon: Users,
    title: "Shortlisted candidates",
    text: "You receive carefully filtered profiles aligned with your business goals.",
  },
];

const WhatExcuitveSearch = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".what-ex-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".what-ex-reveal", {
        y: 38,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".what-ex-card", {
        y: 45,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.45,
        ease: "power3.out",
      });

      gsap.from(".what-ex-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center",
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h, frame;
    let time = 0;

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

    const drawCrown = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-20, 12);
      ctx.lineTo(-14, -10);
      ctx.lineTo(-4, 5);
      ctx.lineTo(5, -14);
      ctx.lineTo(15, 5);
      ctx.lineTo(22, -9);
      ctx.lineTo(18, 12);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    };

    const drawProfile = (x, y, r, color, i) => {
      const floatY = Math.sin(time * 1.4 + i) * 7;

      ctx.save();
      ctx.translate(x, y + floatY);

      ctx.beginPath();
      ctx.arc(0, 0, r + 8, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        0,
        0,
        r + 8,
        -Math.PI / 2 + time * 0.4,
        -Math.PI / 2 +
          time * 0.4 +
          Math.PI * 2 * (0.45 + Math.sin(time + i) * 0.18),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.arc(0, -8, r * 0.26, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, r * 0.28, r * 0.42, Math.PI, 0);
      ctx.stroke();

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.015;

      const cx = w / 2;
      const cy = h / 2;

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, Math.min(w, h) * (0.18 + i * 0.12), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,0,0,${0.09 - i * 0.02})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      const positions = [
        [cx, cy - 90, 35, "#67D946"],
        [cx - 110, cy + 20, 30, "#A6E6EC"],
        [cx + 110, cy + 20, 30, "#F4C542"],
        [cx, cy + 118, 32, "#111"],
      ];

      positions.forEach(([x, y, r, color], i) => {
        drawProfile(x, y, r, color, i);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(0,0,0,0.10)";
        ctx.lineWidth = 2;
        ctx.setLineDash([7, 9]);
        ctx.lineDashOffset = -time * 35;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      ctx.beginPath();
      ctx.arc(cx, cy, 54, 0, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 54, 0, Math.PI * 2);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      drawCrown(cx, cy + 3, 1);

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
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <p className="what-ex-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
            What is Executive Search?
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Strategic", "hiring", "for", "senior", "roles"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="what-ex-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="what-ex-line mt-3 h-5 w-[320px] max-w-full"
            viewBox="0 0 320 24"
            fill="none"
          >
            <path
              d="M12 15C70 5 125 8 160 13C215 21 260 10 308 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="what-ex-reveal mt-5 max-w-xl text-base leading-7 text-black/75">
            Executive Search is a focused recruitment service for hiring
            managers, directors, senior specialists and leadership talent. It is
            more targeted, confidential and quality-driven than normal hiring.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="what-ex-card rounded-3xl border border-black/10 bg-[#FFF9E6] p-5"
              >
                <Icon size={22} className="mb-4" />
                <h3 className="text-base font-bold text-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/70">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="what-ex-reveal relative h-[380px] sm:h-[460px] lg:h-[560px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
      </div>
    </section>
  );
};

export default WhatExcuitveSearch;
