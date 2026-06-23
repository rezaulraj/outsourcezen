import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Clock3,
  Route,
  ShieldCheck,
  TrendingUp,
  Truck,
  UserCheck,
  Warehouse,
} from "lucide-react";

const challenges = [
  {
    title: "Driver Shortages",
    problem: "Routes delayed because qualified drivers are unavailable.",
    solution: "Fast sourcing of licensed and experienced drivers.",
    icon: Truck,
    color: "#FFE994",
    alert: "Missing Drivers",
    fixed: "Drivers Assigned",
  },
  {
    title: "Warehouse Staffing Gaps",
    problem: "Packing and loading operations slow during peak demand.",
    solution: "Rapid deployment of warehouse workers and pickers.",
    icon: Warehouse,
    color: "#CFF7BC",
    alert: "Low Warehouse Staff",
    fixed: "Workforce Deployed",
  },
  {
    title: "High Employee Turnover",
    problem: "Constant hiring cycles reduce operational efficiency.",
    solution: "Better screening and workforce matching.",
    icon: UserCheck,
    color: "#A6E6EC",
    alert: "Turnover Risk",
    fixed: "Reliable Team Ready",
  },
  {
    title: "Delivery Delays",
    problem: "Late deliveries affect customer satisfaction.",
    solution: "Reliable staffing for fleet and dispatch teams.",
    icon: Route,
    color: "#FFF6C8",
    alert: "Delayed Routes",
    fixed: "Routes Covered",
  },
  {
    title: "Seasonal Demand Surges",
    problem: "Operations struggle during peak seasons.",
    solution: "Scalable workforce support for temporary demand.",
    icon: TrendingUp,
    color: "#FFE994",
    alert: "Peak Pressure",
    fixed: "Scaled Workforce",
  },
  {
    title: "Compliance & Safety",
    problem: "Workers must meet safety and operational standards.",
    solution: "Pre-screened candidates and documentation checks.",
    icon: ShieldCheck,
    color: "#CFF7BC",
    alert: "Safety Check Needed",
    fixed: "Compliance Ready",
  },
];

const stats = [
  { value: "92%", label: "Route Coverage" },
  { value: "48h", label: "Shortlisting" },
  { value: "7000+", label: "Workers" },
  { value: "96%", label: "Client Satisfaction" },
];

const LogisticsChallenges = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".logi-ch-word", {
        y: 60,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".logi-ch-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".logi-ch-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % challenges.length);
    }, 2600);

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
      ctx.translate(x, y + Math.sin(time * 1.5 + x) * 2);
      ctx.scale(s, s);

      rr(-18, -14, 36, 28, 5);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -3);
      ctx.lineTo(18, -3);
      ctx.moveTo(0, -14);
      ctx.lineTo(0, 14);
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.stroke();

      ctx.restore();
    };

    const drawWarehouse = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(-100, -58);
      ctx.lineTo(0, -105);
      ctx.lineTo(100, -58);
      ctx.lineTo(100, 80);
      ctx.lineTo(-100, 80);
      ctx.closePath();
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("WAREHOUSE", 0, -45);

      [-52, 0, 52].forEach((bx) => {
        rr(bx - 19, 5, 38, 75, 7);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.restore();
    };

    const drawTruck = (x, y, s, color = "#FFE994", dir = 1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s * dir, s);

      rr(-60, -26, 82, 42, 10);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(18, -18, 42, 32, 8);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      [-34, 35].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 18, 11, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wx, 18, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawForklift = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4) * 2);
      ctx.scale(s, s);

      rr(-38, -20, 55, 34, 8);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(0, -48, 30, 30, 6);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(32, -42);
      ctx.lineTo(32, 16);
      ctx.moveTo(32, 12);
      ctx.lineTo(66, 12);
      ctx.stroke();

      drawBox(76, 5, 0.7, "#CFF7BC");

      [-20, 18].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 18, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawWorker = (x, y, s, color) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + x) * 3);
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
      ctx.lineTo(-16, 10 + Math.sin(time * 4) * 3);
      ctx.moveTo(0, -2);
      ctx.lineTo(17, 10 + Math.cos(time * 4) * 3);
      ctx.moveTo(0, 22);
      ctx.lineTo(-11, 42);
      ctx.moveTo(0, 22);
      ctx.lineTo(11, 42);
      ctx.stroke();

      rr(16, 0, 28, 22, 5);
      ctx.fillStyle = "#FFF6C8";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawRoute = (points, color = "#67D946") => {
      ctx.beginPath();

      points.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 48;
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 5; i++) {
        const p = (time * 0.13 + i / 5) % 1;
        const total = points.length - 1;
        const seg = Math.min(Math.floor(p * total), total - 1);
        const local = p * total - seg;

        const [x1, y1] = points[seg];
        const [x2, y2] = points[seg + 1];

        const x = x1 + (x2 - x1) * local;
        const y = y1 + (y2 - y1) * local;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }
    };

    const drawDashboard = (x, y) => {
      const item = challenges[activeRef.current];
      const swap = Math.sin(time * 1.8) > -0.15;

      rr(x - 135, y - 58, 270, 116, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x - 96, y, 24, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(swap ? "ISSUE DETECTED" : "SOLUTION ACTIVE", x + 28, y - 14);

      ctx.font = "900 20px Arimo";
      ctx.fillText(
        swap ? `⚠ ${item.alert}` : `✓ ${item.fixed}`,
        x + 28,
        y + 17,
      );

      ctx.beginPath();
      ctx.arc(x + 118, y - 42, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = swap ? "#FFE994" : "#67D946";
      ctx.fill();
    };

    const drawStatusCard = (x, y, title, value, color) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + x) * 5);

      rr(-82, -33, 164, 66, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-55, 0, 17, 0, Math.PI * 2);
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

    const drawConveyor = (x, y, width) => {
      ctx.beginPath();
      ctx.moveTo(x - width / 2, y);
      ctx.lineTo(x + width / 2, y);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      for (let i = 0; i < 7; i++) {
        const bx = x - width / 2 + ((time * 52 + i * 64) % width);
        drawBox(bx, y - 12, 0.55, i % 2 ? "#FFE994" : "#CFF7BC");
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();

      drawRoute([
        [w * 0.16, h * 0.28],
        [w * 0.34, h * 0.38],
        [w * 0.5, h * 0.48],
        [w * 0.72, h * 0.34],
        [w * 0.86, h * 0.56],
      ]);

      drawWarehouse(w * 0.5, h * 0.48, Math.min(w, h) / 840);
      drawDashboard(w * 0.5, h * 0.18);

      drawConveyor(w * 0.5, h * 0.66, Math.min(w * 0.55, 370));

      drawWorker(w * 0.28, h * 0.72, Math.min(w, h) / 800, "#F4C542");
      drawWorker(w * 0.66, h * 0.72, Math.min(w, h) / 800, "#67D946");

      drawForklift(
        w * 0.2 + ((time * 42) % (w * 0.32)),
        h * 0.8,
        Math.min(w, h) / 880,
      );

      drawTruck(
        w * 0.08 + ((time * 55) % (w * 0.78)),
        h * 0.9,
        Math.min(w, h) / 860,
        "#FFE994",
      );

      drawStatusCard(w * 0.2, h * 0.48, "Fleet", "Coverage ✓", "#CFF7BC");
      drawStatusCard(w * 0.8, h * 0.44, "Dispatch", "Active ✓", "#A6E6EC");

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
      className="font-arimo relative bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[#CFF7BC]" />

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
          fill="#CFF7BC"
        />
      </svg>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="logi-ch-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Logistics Challenges We Solve
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Solving",
              "pressure",
              "across",
              "every",
              "delivery",
              "stage",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="logi-ch-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We help logistics employers reduce staffing gaps, route delays,
            warehouse pressure and operational risk with reliable workforce
            support.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="logi-ch-reveal relative h-[460px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[560px] lg:sticky lg:top-24 lg:h-[650px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="space-y-5">
            {challenges.map(({ icon: Icon, ...item }, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`logi-ch-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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
                      <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
                        {item.title}
                      </h3>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">
                            Problem
                          </p>
                          <p className="mt-1 text-sm leading-6 text-black/70">
                            {item.problem}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">
                            Solution
                          </p>
                          <p className="mt-1 text-sm leading-6 text-black/70">
                            {item.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="logi-ch-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <p className="text-4xl font-normal tracking-[-0.06em] text-black">
                {item.value}
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {item.label}
              </p>
            </article>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default LogisticsChallenges;
