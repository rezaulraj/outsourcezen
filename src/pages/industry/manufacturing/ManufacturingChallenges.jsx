import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlertTriangle,
  CalendarClock,
  ClipboardX,
  Factory,
  PackageX,
  ShieldAlert,
  TrendingDown,
  UsersRound,
} from "lucide-react";

const challenges = [
  {
    title: "Labor Shortage",
    problem:
      "Production slows down when factories cannot find enough reliable workers.",
    solution:
      "We source dependable production workers, helpers and operators based on shift and volume needs.",
    icon: UsersRound,
    color: "#FFE994",
  },
  {
    title: "High Turnover",
    problem:
      "Unprepared workers may leave early, creating pressure on production schedules.",
    solution:
      "We focus on better role matching, expectation setting and worker readiness before deployment.",
    icon: TrendingDown,
    color: "#CFF7BC",
  },
  {
    title: "Skill Mismatch",
    problem:
      "Wrong candidates can affect machine operation, quality control and line efficiency.",
    solution:
      "We screen candidates by experience, factory discipline and role suitability.",
    icon: ClipboardX,
    color: "#A6E6EC",
  },
  {
    title: "Production Delays",
    problem:
      "Late hiring can create gaps in assembly, packaging and shipment timelines.",
    solution:
      "We support faster shortlisting and scalable workforce supply for urgent factory needs.",
    icon: CalendarClock,
    color: "#FFF6C8",
  },
  {
    title: "Quality Issues",
    problem: "Poorly prepared workers can increase errors, waste and rework.",
    solution:
      "We help employers hire workers who understand quality focus, SOPs and basic production discipline.",
    icon: PackageX,
    color: "#FFE994",
  },
  {
    title: "Safety & Compliance Risk",
    problem:
      "Factories need workers who respect PPE, hygiene, SOPs and workplace rules.",
    solution:
      "We prioritize safety-aware candidates and support pre-deployment orientation.",
    icon: ShieldAlert,
    color: "#CFF7BC",
  },
];

const ManufacturingChallenges = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mfg-ch-title", {
        y: 70,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".mfg-ch-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".mfg-ch-card", {
        y: 45,
        opacity: 0,
        scale: 0.95,
        duration: 0.85,
        stagger: 0.07,
        delay: 0.45,
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

    const drawWarning = (x, y, s, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.3 + i) * 6);
      ctx.rotate(Math.sin(time + i) * 0.08);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(0, -34);
      ctx.lineTo(38, 30);
      ctx.lineTo(-38, 30);
      ctx.closePath();
      ctx.fillStyle = "#FFF6C8";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 34px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("!", 0, 18);

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

    const drawFactory = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-110, -28, 220, 122, 18);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-110, -28);
      ctx.lineTo(-60, -72);
      ctx.lineTo(-12, -28);
      ctx.lineTo(38, -72);
      ctx.lineTo(110, -28);
      ctx.stroke();

      [-72, -32, 62].forEach((sx, i) => {
        rr(sx, -116, 26, 88, 8);
        ctx.fillStyle = "#111";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
          sx + 13 + Math.sin(time * 1.2 + i) * 8,
          -136 - Math.sin(time * 1.1 + i) * 7,
          9 + Math.sin(time + i) * 3,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "rgba(0,0,0,0.12)";
        ctx.fill();
      });

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
          rr(-74 + col * 44, 2 + row * 28, 22, 17, 5);
          ctx.fillStyle = `rgba(244,197,66,${
            0.3 + 0.35 * Math.sin(time * 2 + row + col)
          })`;
          ctx.fill();
        }
      }

      rr(-20, 45, 40, 49, 7);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.4;
      ctx.stroke();

      ctx.restore();
    };

    const drawHub = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 64, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        64,
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
      ctx.fillText("SOLVE", x, y - 4);
      ctx.fillText("FACTORY", x, y + 13);

      drawCheck(x + 43, y + 39, 0.75);
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

      const hubX = w * 0.5;
      const hubY = h * 0.52;

      drawWarning(w * 0.16, h * 0.28, Math.min(w, h) / 730, 1);
      drawWarning(w * 0.2, h * 0.72, Math.min(w, h) / 850, 2);
      drawFactory(w * 0.82, h * 0.5, Math.min(w, h) / 700);

      drawGear(w * 0.16, h * 0.5, 28, 0.8);
      drawGear(w * 0.86, h * 0.78, 24, 0.9, true);

      flow(w * 0.23, h * 0.3, hubX - 70, hubY - 16, "rgba(0,0,0,0.13)");
      flow(w * 0.25, h * 0.72, hubX - 70, hubY + 18, "rgba(0,0,0,0.13)");
      flow(hubX + 70, hubY, w * 0.72, h * 0.5, "#67D946");

      for (let i = 0; i < 34; i++) {
        const p = (time * 0.12 + i / 34) % 1;
        const fromLeft = i % 2 === 0;
        const x1 = fromLeft ? w * 0.11 : hubX + 76;
        const x2 = fromLeft ? hubX - 78 : w * 0.76;

        const x = x1 + (x2 - x1) * p;
        const y =
          h * (0.25 + (i % 5) * 0.11) +
          Math.sin(p * Math.PI) * -28 +
          Math.sin(time * 2 + i) * 3;

        const solved = !fromLeft || p > 0.72;

        drawWorker(x, y, 3, solved ? "#67D946" : "rgba(0,0,0,0.42)");
      }

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
      className="font-arimo relative bg-[var(--color-primary-bg)] py-20"
    >
      <div className="absolute inset-0 bg-[#FFF9E6]" />

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
          fill="#FFF9E6"
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mfg-ch-reveal mb-4 inline-block border-b border-black text-sm font-medium text-black">
              Manufacturing Challenges We Solve
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black sm:text-7xl lg:text-8xl">
              {["Less", "downtime", "more", "output"].map((word) => (
                <span key={word} className="block overflow-hidden pb-2">
                  <span className="mfg-ch-title inline-block">{word}</span>
                </span>
              ))}
            </h2>
          </div>

          <p className="mfg-ch-reveal max-w-xl text-base leading-7 text-black/70 lg:pb-3">
            Manufacturing businesses need steady workers, consistent quality and
            smooth production flow. We help reduce hiring gaps, skill mismatch
            and early workforce instability.
          </p>
        </div>

        <div className="mfg-ch-reveal relative mt-12 h-[330px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[430px] lg:h-[520px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {challenges.map(
            ({ title, problem, solution, icon: Icon, color }, index) => (
              <article
                key={title}
                className="mfg-ch-card rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-5">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: color }}
                  >
                    <Icon size={24} strokeWidth={2.4} />
                  </div>

                  <span className="text-5xl font-black leading-none text-black/[0.06]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
                  {title}
                </h3>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-black/45">
                      Problem
                    </p>
                    <p className="text-sm leading-6 text-black/70">{problem}</p>
                  </div>

                  <div className="border-t border-black/10 pt-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-black/45">
                      Our solution
                    </p>
                    <p className="text-sm leading-6 text-black/70">
                      {solution}
                    </p>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default ManufacturingChallenges;
