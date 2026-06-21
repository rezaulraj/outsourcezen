import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  ClipboardList,
  FileCheck,
  HardHat,
  Plane,
  SearchCheck,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Requirement Analysis",
    text: "We understand project type, worker roles, quantity, timeline and job-site expectations.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Candidate Sourcing",
    text: "We source construction workers from trusted talent pools based on trade and experience.",
    icon: UsersRound,
  },
  {
    number: "03",
    title: "Screening & Interview",
    text: "Candidates are checked for experience, discipline, communication and role suitability.",
    icon: SearchCheck,
  },
  {
    number: "04",
    title: "Trade Testing",
    text: "Practical skills are reviewed for key construction roles before final shortlisting.",
    icon: HardHat,
  },
  {
    number: "05",
    title: "Safety Readiness",
    text: "Workers are briefed on PPE, site conduct, workplace discipline and safety awareness.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    title: "Documentation",
    text: "Visa files, contracts, medical reports and required deployment papers are organized.",
    icon: FileCheck,
  },
  {
    number: "07",
    title: "Final Approval",
    text: "Employer reviews shortlisted candidates and confirms selected workers for deployment.",
    icon: BadgeCheck,
  },
  {
    number: "08",
    title: "Deployment Support",
    text: "We support travel coordination, arrival guidance and post-placement communication.",
    icon: Plane,
  },
];

const ConstructionRecruitmentProcess = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".construction-process-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".construction-process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".construction-process-card", {
        y: 42,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.38,
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

    const drawArrow = (x, y, rot, scale, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + i) * 4);
      ctx.rotate(rot + Math.sin(time + i) * 0.08);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-22, 0);
      ctx.quadraticCurveTo(-6, -10, 14, -2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(14, -2);
      ctx.lineTo(4, -12);
      ctx.moveTo(14, -2);
      ctx.lineTo(5, 8);
      ctx.stroke();

      ctx.restore();
    };

    const drawNode = (x, y, i) => {
      const pulse = 0.5 + 0.5 * Math.sin(time * 1.8 + i);

      ctx.beginPath();
      ctx.arc(x, y, 24 + pulse * 5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(244,197,66,0.36)";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 23, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        23,
        -Math.PI / 2 + time * 0.4,
        -Math.PI / 2 + time * 0.4 + Math.PI * 2 * (0.45 + pulse * 0.34),
      );
      ctx.strokeStyle = i === steps.length - 1 ? "#67D946" : "#F4C542";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.stroke();

      drawCheck(x, y + 1, 0.72);
    };

    const drawMovingArrowLine = (x1, y1, x2, y2, i) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 30, x2, y2);
      ctx.strokeStyle = "rgba(0,0,0,0.14)";
      ctx.lineWidth = 3;
      ctx.setLineDash([9, 12]);
      ctx.lineDashOffset = -time * 55 - i * 10;
      ctx.stroke();
      ctx.setLineDash([]);

      const p = (time * 0.22 + i * 0.12) % 1;

      const cx =
        (1 - p) * (1 - p) * x1 + 2 * (1 - p) * p * ((x1 + x2) / 2) + p * p * x2;

      const cy =
        (1 - p) * (1 - p) * y1 + 2 * (1 - p) * p * (y1 - 30) + p * p * y2;

      drawArrow(cx, cy, Math.atan2(y2 - y1, x2 - x1) * 0.35, 0.5, i);
    };

    const drawBlueprintPath = () => {
      const padding = Math.min(w, h) * 0.08;
      const usableW = w - padding * 2;
      const centerY = h * 0.5;

      const points = steps.map((_, i) => ({
        x: padding + (usableW / (steps.length - 1)) * i,
        y: centerY + Math.sin(i * 1.2) * 48,
      }));

      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;

      const grid = 42;
      for (let x = 0; x < w; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, h * 0.1);
        ctx.lineTo(x, h * 0.9);
        ctx.stroke();
      }

      for (let y = h * 0.1; y < h * 0.9; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.restore();

      points.forEach((p, i) => {
        if (i < points.length - 1) {
          drawMovingArrowLine(
            p.x + 30,
            p.y,
            points[i + 1].x - 30,
            points[i + 1].y,
            i,
          );
        }
      });

      points.forEach((p, i) => {
        drawNode(p.x, p.y, i);
      });

      for (let i = 0; i < 28; i++) {
        const p = (time * 0.08 + i / 28) % 1;
        const exact = p * (points.length - 1);
        const index = Math.min(points.length - 2, Math.floor(exact));
        const local = exact - index;

        const a = points[index];
        const b = points[index + 1];

        const x = a.x + (b.x - a.x) * local;
        const y = a.y + (b.y - a.y) * local + Math.sin(local * Math.PI) * -24;

        drawWorker(x, y, 3, p > 0.72 ? "#67D946" : "#F4C542");
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawBlueprintPath();

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
        <div className="construction-process-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Recruitment Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["From", "project", "need", "to", "site-ready", "workers"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="construction-process-word inline-block">
                    {word}
                  </span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            A clear construction hiring workflow that moves from requirement
            analysis to sourcing, testing, documentation and deployment support.
          </p>
        </div>

        <div className="construction-process-reveal relative mb-12 h-[300px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[380px] lg:h-[460px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map(({ icon: Icon, ...step }) => (
            <article
              key={step.number}
              className="construction-process-card min-h-[250px] rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6"
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

export default ConstructionRecruitmentProcess;
