import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ClipboardList,
  ShieldCheck,
  Truck,
  UserSearch,
  Users,
  Warehouse,
} from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Requirement Analysis",
    text: "Understand workforce quantity, roles, shifts and operational needs.",
    icon: ClipboardList,
    color: "#FFE994",
  },
  {
    step: "02",
    title: "Candidate Sourcing",
    text: "Identify suitable logistics, warehouse and transport candidates.",
    icon: UserSearch,
    color: "#CFF7BC",
  },
  {
    step: "03",
    title: "Screening & Verification",
    text: "Evaluate experience, licenses, documentation and readiness.",
    icon: ShieldCheck,
    color: "#A6E6EC",
  },
  {
    step: "04",
    title: "Employer Selection",
    text: "Present shortlisted candidates for review and approval.",
    icon: Users,
    color: "#FFF6C8",
  },
  {
    step: "05",
    title: "Deployment",
    text: "Workers are mobilized and integrated into logistics operations.",
    icon: Truck,
    color: "#FFE994",
  },
];

const LogisticsRecruitmentProcess = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".logi-process-word", {
        y: 50,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".logi-process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".logi-process-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.35,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % processSteps.length);
    }, 2800);

    return () => clearInterval(timer);
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

    const drawGrid = () => {
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = "#111";

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
    };

    const drawBox = (x, y, s, color = "#FFF6C8") => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + x) * 2);
      ctx.scale(s, s);

      rr(-18, -14, 36, 28, 5);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -3);
      ctx.lineTo(18, -3);
      ctx.moveTo(0, -14);
      ctx.lineTo(0, 14);
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      ctx.restore();
    };

    const drawWorker = (x, y, s, color) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.5 + x) * 3);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(0, -20, 8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(0, 22);
      ctx.moveTo(0, -2);
      ctx.lineTo(-16, 10 + Math.sin(time * 4 + x) * 3);
      ctx.moveTo(0, -2);
      ctx.lineTo(17, 10 + Math.cos(time * 4 + x) * 3);
      ctx.moveTo(0, 22);
      ctx.lineTo(-11, 42);
      ctx.moveTo(0, 22);
      ctx.lineTo(11, 42);
      ctx.stroke();

      ctx.restore();
    };

    const drawTruck = (x, y, s, color = "#FFE994") => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-62, -28, 82, 42, 10);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(18, -18, 42, 32, 8);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      [-35, 35].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 18, 11, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wx, 18, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawWarehouse = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(-95, -55);
      ctx.lineTo(0, -100);
      ctx.lineTo(95, -55);
      ctx.lineTo(95, 80);
      ctx.lineTo(-95, 80);
      ctx.closePath();

      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("WAREHOUSE", 0, -42);

      [-48, 0, 48].forEach((bx) => {
        rr(bx - 18, 8, 36, 72, 7);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.restore();
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

    const drawNode = (x, y, label, color, index) => {
      const isActive = index === activeRef.current;
      const pulse = isActive ? Math.sin(time * 4) * 5 : 0;

      ctx.beginPath();
      ctx.arc(x, y, 48 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? color : "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = isActive ? 3 : 2.5;
      ctx.stroke();

      if (index < activeRef.current || isActive) {
        ctx.beginPath();
        ctx.arc(x + 30, y - 30, 13, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        drawCheck(x + 30, y - 30, 0.55);
      }

      ctx.fillStyle = "#111";
      ctx.font = "900 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(label, x, y + 4);
    };

    const drawRoute = (points) => {
      ctx.beginPath();

      points.forEach(([x, y], index) => {
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.setLineDash([9, 12]);
      ctx.lineDashOffset = -time * 48;
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 5; i++) {
        const p = (time * 0.14 + i / 5) % 1;
        const total = points.length - 1;
        const seg = Math.min(Math.floor(p * total), total - 1);
        const local = p * total - seg;

        const [x1, y1] = points[seg];
        const [x2, y2] = points[seg + 1];

        const x = x1 + (x2 - x1) * local;
        const y = y1 + (y2 - y1) * local;

        drawBox(x, y, 0.45, i % 2 ? "#FFE994" : "#CFF7BC");
      }
    };

    const drawFloatingMetric = (x, y, title, value, color) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.5 + x) * 5);

      rr(-80, -32, 160, 64, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-52, 0, 17, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 11px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(title, 20, -6);

      ctx.font = "900 15px Arimo";
      ctx.fillText(value, 20, 14);

      ctx.restore();
    };

    const drawActiveBadge = (x, y) => {
      const step = processSteps[activeRef.current];

      rr(x - 130, y - 52, 260, 104, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x - 92, y, 24, 0, Math.PI * 2);
      ctx.fillStyle = step.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(`STEP ${step.step}`, x + 25, y - 14);

      ctx.font = "900 18px Arimo";
      ctx.fillText(step.title.toUpperCase(), x + 25, y + 16);

      ctx.beginPath();
      ctx.arc(x + 112, y - 38, 7 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();

      const points = [
        [w * 0.18, h * 0.28],
        [w * 0.34, h * 0.4],
        [w * 0.5, h * 0.48],
        [w * 0.68, h * 0.38],
        [w * 0.84, h * 0.58],
      ];

      drawRoute(points);

      drawNode(points[0][0], points[0][1], "NEED", "#FFE994", 0);
      drawNode(points[1][0], points[1][1], "SOURCE", "#CFF7BC", 1);
      drawNode(points[2][0], points[2][1], "VERIFY", "#A6E6EC", 2);
      drawNode(points[3][0], points[3][1], "SELECT", "#FFF6C8", 3);
      drawNode(points[4][0], points[4][1], "DEPLOY", "#FFE994", 4);

      drawWarehouse(w * 0.5, h * 0.67, Math.min(w, h) / 900);

      drawWorker(w * 0.28, h * 0.72, Math.min(w, h) / 850, "#F4C542");
      drawWorker(w * 0.65, h * 0.72, Math.min(w, h) / 850, "#67D946");

      drawTruck(
        w * 0.08 + ((time * 55) % (w * 0.78)),
        h * 0.89,
        Math.min(w, h) / 890,
        "#FFE994",
      );

      drawActiveBadge(w * 0.5, h * 0.13);

      drawFloatingMetric(w * 0.22, h * 0.55, "Shortlisting", "48h", "#CFF7BC");
      drawFloatingMetric(w * 0.78, h * 0.78, "Workers", "7000+", "#A6E6EC");

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
        <div className="logi-process-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Recruitment Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["A", "clear", "workflow", "for", "logistics", "deployment"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="logi-process-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            From requirement analysis to worker deployment, our process keeps
            transportation and logistics hiring structured, fast and practical.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="logi-process-reveal relative h-[460px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[560px] lg:sticky lg:top-24 lg:h-[650px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="space-y-5">
            {processSteps.map(({ icon: Icon, ...item }, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.step}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`logi-process-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "border-black bg-[#FFF9E6]"
                      : "border-black/10 bg-[#FFF9E6]/75 hover:border-black/30"
                  }`}
                >
                  <div className="flex gap-5">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon size={24} strokeWidth={2.4} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">
                        Step {item.step}
                      </p>

                      <h3 className="mt-1 text-xl font-bold tracking-[-0.03em] text-black">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-black/70">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="logi-process-reveal mt-10 flex flex-col items-center justify-between gap-5 rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#CFF7BC]">
              <Warehouse size={24} strokeWidth={2.4} />
            </div>

            <p className="max-w-2xl text-sm leading-6 text-black/70">
              This process supports drivers, warehouse staff, dispatch workers,
              forklift operators, packers, loaders and logistics supervisors.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
          >
            Request Workers
          </a>
        </div>
      </div>
    </section>
  );
};

export default LogisticsRecruitmentProcess;
