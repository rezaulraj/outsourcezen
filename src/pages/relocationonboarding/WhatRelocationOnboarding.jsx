import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Building2,
  Home,
  MapPinCheck,
  PlaneLanding,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const points = [
  {
    title: "Arrival Coordination",
    text: "We help organize airport arrival, worker receiving and first movement after landing.",
    icon: PlaneLanding,
  },
  {
    title: "Accommodation Guidance",
    text: "Workers receive guidance on housing rules, shared living and daily routines.",
    icon: Home,
  },
  {
    title: "Workplace Onboarding",
    text: "We support first-day orientation, employer coordination and workplace introduction.",
    icon: Building2,
  },
  {
    title: "Post-Placement Support",
    text: "Follow-up communication helps reduce early confusion and adjustment issues.",
    icon: ShieldCheck,
  },
];

const WhatRelocationOnboarding = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".relocate-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".relocate-what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".relocate-what-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".relocate-what-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
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

    const drawPlane = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.2) * 5);
      ctx.rotate(-0.15 + Math.sin(time) * 0.05);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(20, -8);
      ctx.lineTo(8, 3);
      ctx.lineTo(20, 12);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-3, 3);
      ctx.lineTo(-13, 14);
      ctx.moveTo(-4, -1);
      ctx.lineTo(-13, -13);
      ctx.stroke();

      ctx.restore();
    };

    const drawHome = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.2) * 4);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(-40, -2);
      ctx.lineTo(0, -38);
      ctx.lineTo(40, -2);
      ctx.stroke();

      rr(-31, -2, 62, 55, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.stroke();

      rr(-9, 18, 18, 35, 5);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawBuilding = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      rr(-52, -80, 104, 160, 15);
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(-38, -62, 76, 124, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
          rr(-25 + col * 25, -45 + row * 24, 12, 12, 3);
          ctx.fillStyle = `rgba(244,197,66,${
            0.35 + 0.35 * Math.sin(time * 2 + row + col)
          })`;
          ctx.fill();
        }
      }

      rr(-15, 35, 30, 45, 6);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawHub = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 58, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        58,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 + time * 0.45 + Math.PI * 2 * (0.58 + Math.sin(time) * 0.2)
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 36, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SETTLE", x, y - 4);
      ctx.fillText("START", x, y + 13);

      drawCheck(x + 40, y + 36, 0.7);
    };

    const flow = (x1, y1, x2, y2, color) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 42, x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 48;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const planeX = w * 0.16;
      const hubX = w * 0.48;
      const hubY = h * 0.5;
      const homeX = w * 0.76;
      const buildingX = w * 0.86;

      drawPlane(planeX, h * 0.3, 1);
      drawHome(homeX, h * 0.32, Math.min(w, h) / 700);
      drawBuilding(buildingX, h * 0.65, Math.min(w, h) / 620);

      flow(planeX + 38, h * 0.3, hubX - 66, hubY, "rgba(0,0,0,0.13)");
      flow(hubX + 66, hubY - 16, homeX - 52, h * 0.32, "#F4C542");
      flow(hubX + 66, hubY + 18, buildingX - 70, h * 0.65, "#67D946");

      for (let i = 0; i < 24; i++) {
        const p = (time * 0.13 + i / 24) % 1;
        const x = planeX + 44 + (hubX - planeX - 110) * p;
        const y = h * 0.38 + Math.sin(p * Math.PI) * -32 + Math.sin(i) * 18;

        drawWorker(x, y, 3, p > 0.72 ? "#F4C542" : "rgba(0,0,0,0.48)");
      }

      drawHub(hubX, hubY);

      for (let i = 0; i < 16; i++) {
        const p = (time * 0.16 + i / 16) % 1;
        const x = hubX + 72 + (buildingX - hubX - 140) * p;
        const y =
          hubY +
          Math.sin(p * Math.PI) * -32 +
          (i % 2 === 0 ? -42 : 42) * p;

        drawWorker(x, y, 3.1, i % 2 === 0 ? "#F4C542" : "#67D946");
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
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
        <div>
          <p className="relocate-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
            What Is Relocation & Onboarding?
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Helping", "workers", "settle", "and", "start"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="relocate-what-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="relocate-what-line mt-3 h-5 w-[340px] max-w-full"
            viewBox="0 0 340 24"
            fill="none"
          >
            <path
              d="M12 15C75 5 135 8 170 13C230 21 285 10 328 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="relocate-what-reveal mt-5 max-w-xl text-base leading-7 text-black/75">
            Relocation & Onboarding is the support provided after workers arrive
            in the destination country. It helps them move from airport arrival
            to accommodation, workplace orientation and a smoother first working
            day.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="relocate-what-card rounded-3xl border border-black/10 bg-[#FFF9E6] p-5"
              >
                <Icon size={22} className="mb-4" />
                <h3 className="text-base font-bold text-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/70">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relocate-what-reveal relative h-[390px] sm:h-[480px] lg:h-[560px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
      </div>
    </section>
  );
};

export default WhatRelocationOnboarding;