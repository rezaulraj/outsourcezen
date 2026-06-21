import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  Building2,
  ClipboardCheck,
  HardHat,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const points = [
  {
    title: "Skilled workforce sourcing",
    text: "We help employers find reliable construction workers for project-based and long-term hiring needs.",
    icon: UsersRound,
  },
  {
    title: "Trade-based screening",
    text: "Candidates are reviewed based on role experience, practical ability and job-site readiness.",
    icon: ClipboardCheck,
  },
  {
    title: "Safety-focused hiring",
    text: "Workers are checked for basic safety awareness, discipline and ability to follow site rules.",
    icon: ShieldCheck,
  },
  {
    title: "Project workforce support",
    text: "From small teams to bulk hiring, we support construction projects with scalable manpower solutions.",
    icon: Building2,
  },
];

const WhatConstructionRecruitment = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".construction-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".construction-what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".construction-what-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".construction-what-line", {
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

    let w;
    let h;
    let frame;
    let time = 0;

    const workers = Array.from({ length: 32 }, (_, i) => ({
      t: Math.random(),
      lane: i % 5,
      speed: 0.0012 + Math.random() * 0.0018,
      phase: Math.random() * Math.PI * 2,
      size: 2.8 + Math.random() * 1.4,
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

    const drawBlueprint = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.1) * 5);
      ctx.rotate(-0.08 + Math.sin(time) * 0.04);
      ctx.scale(scale, scale);

      rr(-74, -54, 148, 108, 16);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 1.4;
      for (let i = -52; i <= 52; i += 18) {
        ctx.beginPath();
        ctx.moveTo(-62, i);
        ctx.lineTo(62, i);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i, -42);
        ctx.lineTo(i, 42);
        ctx.stroke();
      }

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-42, 28);
      ctx.lineTo(-42, -22);
      ctx.lineTo(42, -22);
      ctx.lineTo(42, 28);
      ctx.closePath();
      ctx.stroke();

      drawCheck(48, 34, 0.6);

      ctx.restore();
    };

    const drawHelmet = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.3 + 1) * 5);
      ctx.rotate(0.08 + Math.sin(time) * 0.04);
      ctx.scale(scale, scale);

      ctx.beginPath();
      ctx.arc(0, 5, 36, Math.PI, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-44, 4, 88, 16, 8);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -30);
      ctx.lineTo(0, 8);
      ctx.stroke();

      ctx.restore();
    };

    const drawBuilding = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      rr(-58, -90, 116, 180, 16);
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(-42, -70, 84, 140, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          rr(-27 + col * 27, -52 + row * 24, 12, 12, 3);
          ctx.fillStyle = `rgba(244,197,66,${
            0.32 + 0.32 * Math.sin(time * 2 + row + col)
          })`;
          ctx.fill();
        }
      }

      rr(-16, 42, 32, 48, 6);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.restore();
    };

    const flow = (x1, y1, x2, y2, color) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 45, x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 48;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const drawHub = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 62, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        62,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 +
          time * 0.45 +
          Math.PI * 2 * (0.58 + Math.sin(time) * 0.2),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("MATCH", x, y - 4);
      ctx.fillText("WORKERS", x, y + 13);

      drawCheck(x + 43, y + 38, 0.75);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const hubX = w * 0.5;
      const hubY = h * 0.52;

      drawHelmet(w * 0.18, h * 0.28, Math.min(w, h) / 720);
      drawBlueprint(w * 0.18, h * 0.72, Math.min(w, h) / 650);
      drawBuilding(w * 0.82, h * 0.52, Math.min(w, h) / 640);

      flow(w * 0.24, h * 0.3, hubX - 70, hubY - 18, "rgba(0,0,0,0.13)");
      flow(w * 0.25, h * 0.72, hubX - 70, hubY + 18, "rgba(0,0,0,0.13)");
      flow(hubX + 70, hubY, w * 0.72, h * 0.52, "#F4C542");

      workers.forEach((worker, i) => {
        worker.t += worker.speed;
        if (worker.t > 1) worker.t = 0;

        const fromLeft = i % 2 === 0;
        const x1 = fromLeft ? w * 0.1 : hubX + 78;
        const x2 = fromLeft ? hubX - 78 : w * 0.76;

        const x = x1 + (x2 - x1) * worker.t;
        const y =
          h * (0.24 + worker.lane * 0.12) +
          Math.sin(worker.t * Math.PI) * -30 +
          Math.sin(time * 2 + worker.phase) * 3;

        const active = !fromLeft || worker.t > 0.75;

        drawWorker(x, y, worker.size, active ? "#F4C542" : "rgba(0,0,0,0.42)");
      });

      drawHub(hubX, hubY);

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
          <p className="construction-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
            What Is Construction Recruitment?
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Right", "workers", "for", "every", "site"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="construction-what-word inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <svg
            className="construction-what-line mt-3 h-5 w-[340px] max-w-full"
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

          <p className="construction-what-reveal mt-5 max-w-xl text-base leading-7 text-black/75">
            Construction recruitment connects employers with skilled workers for
            building, infrastructure and industrial projects. It focuses on
            sourcing, screening and deploying people who can work safely,
            reliably and productively on site.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="construction-what-card rounded-3xl border border-black/10 bg-[#FFF9E6] p-5"
              >
                <Icon size={22} className="mb-4" />
                <h3 className="text-base font-bold text-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/70">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="construction-what-reveal relative h-[390px] sm:h-[480px] lg:h-[560px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
      </div>
    </section>
  );
};

export default WhatConstructionRecruitment;
