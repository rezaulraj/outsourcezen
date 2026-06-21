import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  ClipboardList,
  FileCheck,
  PackageCheck,
  Plane,
  SearchCheck,
  Settings,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Requirement Analysis",
    text: "We understand factory roles, shift needs, quantity, timeline and production requirements.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Candidate Sourcing",
    text: "We source reliable production workers, operators, helpers and technical staff.",
    icon: UsersRound,
  },
  {
    number: "03",
    title: "Screening & Interview",
    text: "Candidates are reviewed for experience, discipline, availability and role fit.",
    icon: SearchCheck,
  },
  {
    number: "04",
    title: "Skills Assessment",
    text: "Machine, assembly, packaging and quality-related skills are checked where needed.",
    icon: Settings,
  },
  {
    number: "05",
    title: "Compliance Check",
    text: "We review basic safety awareness, workplace behavior, SOP and hygiene readiness.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    title: "Employer Approval",
    text: "Shortlisted profiles are shared with employers for final selection.",
    icon: BadgeCheck,
  },
  {
    number: "07",
    title: "Documentation",
    text: "Contracts, visa files, medical reports and deployment papers are organized.",
    icon: FileCheck,
  },
  {
    number: "08",
    title: "Deployment",
    text: "Workers are prepared for travel, arrival, onboarding and factory start.",
    icon: Plane,
  },
];

const ManufacturingRecruitmentProcess = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mfg-process-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".mfg-process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".mfg-process-card", {
        y: 38,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.07,
        delay: 0.4,
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
      ctx.arc(x, y - r * 1.12, r * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y + r * 0.75, r, Math.PI, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(2, r * 0.55);
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const drawBox = (x, y, s, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-18, -14, 36, 28, 6);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.4;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -3);
      ctx.lineTo(18, -3);
      ctx.moveTo(0, -14);
      ctx.lineTo(0, 14);
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawGear = (x, y, r, speed, reverse = false) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(time * speed * (reverse ? -1 : 1));

      ctx.strokeStyle = "#111";
      ctx.fillStyle = "#FFF9E6";
      ctx.lineWidth = 3;

      ctx.beginPath();
      for (let i = 0; i < 18; i++) {
        const a = (Math.PI * 2 * i) / 18;
        const rad = i % 2 === 0 ? r : r * 0.78;
        const px = Math.cos(a) * rad;
        const py = Math.sin(a) * rad;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.33, 0, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawNode = (x, y, index) => {
      const pulse = 0.5 + 0.5 * Math.sin(time * 1.8 + index);

      ctx.beginPath();
      ctx.arc(x, y, 27 + pulse * 5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(244,197,66,0.34)";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        26,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 + time * 0.45 + Math.PI * 2 * (0.45 + pulse * 0.34),
      );
      ctx.strokeStyle = index === steps.length - 1 ? "#67D946" : "#F4C542";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 11px Arimo";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(index + 1).padStart(2, "0"), x, y);

      if (index === steps.length - 1) drawCheck(x + 25, y - 25, 0.6);
    };

    const drawConveyorPath = (points) => {
      points.forEach((p, index) => {
        if (index === points.length - 1) return;

        const next = points[index + 1];

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = "rgba(0,0,0,0.16)";
        ctx.lineWidth = 12;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = "#FFF9E6";
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.setLineDash([10, 14]);
        ctx.lineDashOffset = -time * 60;
        ctx.stroke();
        ctx.setLineDash([]);
      });
    };

    const getPointOnPath = (points, t) => {
      const total = points.length - 1;
      const exact = t * total;
      const index = Math.min(total - 1, Math.floor(exact));
      const local = exact - index;

      const a = points[index];
      const b = points[index + 1];

      return {
        x: a.x + (b.x - a.x) * local,
        y: a.y + (b.y - a.y) * local,
        index,
      };
    };

    const drawFactoryEnd = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-58, -45, 116, 90, 14);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-58, -45);
      ctx.lineTo(-25, -75);
      ctx.lineTo(5, -45);
      ctx.lineTo(35, -75);
      ctx.lineTo(58, -45);
      ctx.stroke();

      rr(-35, -96, 20, 50, 6);
      ctx.fillStyle = "#111";
      ctx.fill();

      for (let i = 0; i < 4; i++) {
        rr(-38 + i * 25, -20, 14, 14, 4);
        ctx.fillStyle = `rgba(244,197,66,${
          0.35 + 0.3 * Math.sin(time * 2 + i)
        })`;
        ctx.fill();
      }

      rr(-14, 10, 28, 35, 5);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;

      for (let x = 0; x < w; x += 42) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = 0; y < h; y += 42) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.restore();

      const pad = Math.min(w, h) * 0.1;

      const points = [
        { x: pad, y: h * 0.32 },
        { x: w * 0.32, y: h * 0.32 },
        { x: w * 0.47, y: h * 0.55 },
        { x: w * 0.68, y: h * 0.55 },
        { x: w - pad, y: h * 0.75 },
      ];

      drawConveyorPath(points);

      steps.forEach((_, i) => {
        const p = getPointOnPath(points, i / (steps.length - 1));
        drawNode(p.x, p.y, i);
      });

      for (let i = 0; i < 18; i++) {
        const p = (time * 0.11 + i / 18) % 1;
        const pos = getPointOnPath(points, p);

        drawBox(
          pos.x,
          pos.y - 34 + Math.sin(time * 2 + i) * 3,
          0.85,
          p > 0.65 ? "#CFF7BC" : p > 0.35 ? "#A6E6EC" : "#FFE994",
        );
      }

      for (let i = 0; i < 16; i++) {
        const p = (time * 0.09 + i / 16) % 1;
        const pos = getPointOnPath(points, p);

        drawWorker(pos.x, pos.y + 46, 3, p > 0.7 ? "#67D946" : "#F4C542");
      }

      drawGear(w * 0.18, h * 0.76, 28, 0.8);
      drawGear(w * 0.38, h * 0.72, 24, 0.9, true);
      drawGear(w * 0.78, h * 0.33, 30, 0.75);

      drawFactoryEnd(w * 0.84, h * 0.28, Math.min(w, h) / 650);

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
      className="font-arimo bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mfg-process-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Recruitment Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "From",
              "factory",
              "need",
              "to",
              "production-ready",
              "workers",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="mfg-process-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            A clear manufacturing hiring workflow that moves from requirement
            planning to screening, compliance, approval, documentation and
            deployment.
          </p>
        </div>

        <div className="mfg-process-reveal relative mb-12 h-[340px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[430px] lg:h-[520px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map(({ icon: Icon, ...step }) => (
            <article
              key={step.number}
              className="mfg-process-card min-h-[250px] rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE994]">
                  <Icon size={24} strokeWidth={2.4} />
                </div>

                <span className="text-5xl font-black leading-none text-black/[0.06]">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-black/70">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManufacturingRecruitmentProcess;
