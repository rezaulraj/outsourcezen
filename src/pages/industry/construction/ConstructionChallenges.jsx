import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlertTriangle,
  CalendarClock,
  ClipboardX,
  HardHat,
  ShieldAlert,
  UsersRound,
} from "lucide-react";

const challenges = [
  {
    title: "Skilled Labor Shortage",
    problem:
      "Projects slow down when qualified workers are not available on time.",
    solution:
      "We source verified construction workers based on role, trade and project demand.",
    icon: UsersRound,
    color: "#FFE994",
  },
  {
    title: "Skill Mismatch",
    problem: "Unverified workers may not match the real site requirements.",
    solution:
      "We screen candidates by experience, trade ability and job-readiness.",
    icon: ClipboardX,
    color: "#CFF7BC",
  },
  {
    title: "Delayed Mobilization",
    problem: "Late hiring can affect project deadlines and site productivity.",
    solution:
      "We support faster shortlisting, documentation and deployment planning.",
    icon: CalendarClock,
    color: "#A6E6EC",
  },
  {
    title: "Safety Concerns",
    problem: "Workers without safety awareness can increase site risk.",
    solution: "We focus on safety-ready candidates and basic site discipline.",
    icon: ShieldAlert,
    color: "#FFF6C8",
  },
  {
    title: "High Turnover",
    problem: "Poor fit and unclear expectations can cause early dropout.",
    solution:
      "We match workers with clear job expectations and better project fit.",
    icon: AlertTriangle,
    color: "#FFE994",
  },
  {
    title: "Bulk Hiring Pressure",
    problem: "Large projects need many workers across different roles quickly.",
    solution:
      "We provide scalable workforce sourcing for teams, trades and supervisors.",
    icon: HardHat,
    color: "#CFF7BC",
  },
];

const ConstructionChallenges = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".construction-ch-title", {
        y: 70,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".construction-ch-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".construction-ch-card", {
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

    let w, h, frame;
    let time = 0;

    const workers = Array.from({ length: 34 }, (_, i) => ({
      t: Math.random(),
      lane: i % 5,
      speed: 0.0013 + Math.random() * 0.0018,
      phase: Math.random() * Math.PI * 2,
      size: 2.8 + Math.random() * 1.2,
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
      ctx.arc(x, y, 38, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SOLVE", x, y - 4);
      ctx.fillText("RISKS", x, y + 13);

      drawCheck(x + 42, y + 38, 0.75);
    };

    const drawBuilding = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      rr(-54, -82, 108, 164, 14);
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(-39, -64, 78, 128, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          rr(-25 + col * 25, -48 + row * 22, 11, 11, 3);
          ctx.fillStyle = `rgba(244,197,66,${
            0.32 + 0.32 * Math.sin(time * 2 + row + col)
          })`;
          ctx.fill();
        }
      }

      rr(-15, 35, 30, 47, 6);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
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

      drawWarning(w * 0.16, h * 0.28, Math.min(w, h) / 720, 1);
      drawWarning(w * 0.2, h * 0.72, Math.min(w, h) / 820, 2);
      drawBuilding(w * 0.82, h * 0.52, Math.min(w, h) / 650);

      flow(w * 0.23, h * 0.3, hubX - 70, hubY - 16, "rgba(0,0,0,0.13)");
      flow(w * 0.25, h * 0.72, hubX - 70, hubY + 18, "rgba(0,0,0,0.13)");
      flow(hubX + 70, hubY, w * 0.72, h * 0.52, "#67D946");

      workers.forEach((worker, i) => {
        worker.t += worker.speed;
        if (worker.t > 1) worker.t = 0;

        const fromLeft = i % 2 === 0;
        const x1 = fromLeft ? w * 0.11 : hubX + 76;
        const x2 = fromLeft ? hubX - 78 : w * 0.77;

        const x = x1 + (x2 - x1) * worker.t;
        const y =
          h * (0.25 + worker.lane * 0.11) +
          Math.sin(worker.t * Math.PI) * -28 +
          Math.sin(time * 2 + worker.phase) * 3;

        const solved = !fromLeft || worker.t > 0.72;

        drawWorker(x, y, worker.size, solved ? "#67D946" : "rgba(0,0,0,0.42)");
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
      className="font-arimo bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div>
            <p className="construction-ch-reveal mb-4  inline-block border-b border-black text-sm font-medium text-black">
              Construction Challenges We Solve
            </p>

            <h2 className="text-5xl text-center font-medium uppercase leading-[0.9] tracking-[-0.07em] text-black sm:text-5xl lg:text-6xl mb-4">
              <span className="construction-ch-title inline-block">
                Less risk on every site
              </span>
            </h2>
          </div>

          <p className="construction-ch-reveal max-w-xl mx-auto text-base leading-7 text-center text-black/70 lg:pb-3 ">
            Construction projects need the right workers at the right time. We
            help employers reduce hiring delays, skill mismatch, safety concerns
            and workforce instability.
          </p>
        </div>

        <div className="construction-ch-reveal relative mt-12 h-[330px] sm:h-[430px] lg:h-[520px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {challenges.map(
            ({ title, problem, solution, icon: Icon, color }, index) => (
              <article
                key={title}
                className="construction-ch-card rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6"
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

export default ConstructionChallenges;
