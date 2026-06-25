import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  AlarmClock,
  Building2,
  ClipboardCheck,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";

const challenges = [
  {
    title: "Staff Shortages",
    problem:
      "Unexpected absences and turnover can disrupt daily cleaning operations.",
    solution: "Fast access to reliable cleaning and facility workers.",
    icon: UsersRound,
    color: "#FFE994",
    alert: "Staff Gap",
    fixed: "Team Assigned",
  },
  {
    title: "Multi-Site Coverage",
    problem:
      "Managing cleaners across offices, buildings and facilities is difficult.",
    solution: "Workforce support for multiple locations and shift needs.",
    icon: Building2,
    color: "#CFF7BC",
    alert: "Site Coverage Issue",
    fixed: "Sites Covered",
  },
  {
    title: "Quality Consistency",
    problem: "Maintaining the same cleaning standards across every shift.",
    solution:
      "Screened workers focused on hygiene, checklist and service quality.",
    icon: ClipboardCheck,
    color: "#A6E6EC",
    alert: "Quality Check Needed",
    fixed: "Checklist Complete",
  },
  {
    title: "Emergency Replacements",
    problem: "Urgent staffing needs require rapid worker deployment.",
    solution: "Quick replacement support for absent or unavailable workers.",
    icon: AlarmClock,
    color: "#FFF6C8",
    alert: "Urgent Replacement",
    fixed: "Replacement Ready",
  },
  {
    title: "Safety & Compliance",
    problem: "Workers must understand hygiene, safety and facility procedures.",
    solution:
      "Candidates are matched with safety and workplace expectations in mind.",
    icon: ShieldCheck,
    color: "#FFE994",
    alert: "Safety Review",
    fixed: "Compliance Ready",
  },
  {
    title: "Peak Demand Periods",
    problem: "Large events and busy periods require workforce scaling.",
    solution:
      "Flexible staffing support for high-traffic and seasonal facility demand.",
    icon: TrendingUp,
    color: "#CFF7BC",
    alert: "Peak Demand",
    fixed: "Workforce Scaled",
  },
];

const stats = [
  { value: "96%", label: "Client Satisfaction" },
  { value: "24/7", label: "Coverage" },
  { value: "6000+", label: "Facility Workers" },
  { value: "48h", label: "Shortlisting" },
];

const CleaningFacilityChallenges = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".clean-ch-word", {
        y: 60,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".clean-ch-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".clean-ch-card", {
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
      ctx.globalAlpha = 0.07;
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

    const drawBuilding = (x, y, s, label, status, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-58, -70, 116, 140, 18);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 11px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(label, 0, -48);

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 2; col++) {
          rr(-32 + col * 40, -25 + row * 30, 24, 18, 5);
          ctx.fillStyle = "rgba(166,230,236,0.45)";
          ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.22)";
          ctx.lineWidth = 1.3;
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(38, -52, 13 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
      ctx.fillStyle = status === "warn" ? "#FFE994" : "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (status !== "warn") drawCheck(38, -52, 0.45);

      ctx.restore();
    };

    const drawPerson = (x, y, s, color, tool = "mop") => {
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
      ctx.lineTo(0, 24);
      ctx.moveTo(0, -2);
      ctx.lineTo(-16, 10 + Math.sin(time * 4 + x) * 4);
      ctx.moveTo(0, -2);
      ctx.lineTo(18, 10 + Math.cos(time * 4 + x) * 4);
      ctx.moveTo(0, 24);
      ctx.lineTo(-12, 44);
      ctx.moveTo(0, 24);
      ctx.lineTo(12, 44);
      ctx.stroke();

      if (tool === "mop") {
        ctx.beginPath();
        ctx.moveTo(20, 8);
        ctx.lineTo(42, 48);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(31, 48);
        ctx.lineTo(54, 48);
        ctx.strokeStyle = "#67D946";
        ctx.lineWidth = 5;
        ctx.stroke();
      }

      if (tool === "window") {
        ctx.beginPath();
        ctx.moveTo(18, 6);
        ctx.lineTo(40, -18 + Math.sin(time * 5) * 8);
        ctx.stroke();

        rr(34, -26 + Math.sin(time * 5) * 8, 22, 10, 4);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (tool === "wrench") {
        ctx.beginPath();
        ctx.moveTo(17, 8);
        ctx.lineTo(38, -8);
        ctx.moveTo(38, -8);
        ctx.lineTo(44, 2);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawCleaningMachine = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4) * 2);
      ctx.scale(s, s);

      rr(-52, -20, 96, 38, 15);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(10, -45, 34, 28, 8);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-12, -18);
      ctx.lineTo(-36, -55);
      ctx.stroke();

      [-28, 26].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 21, 9, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      });

      ctx.beginPath();
      ctx.ellipse(-56, 20, 24, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(166,230,236,0.5)";
      ctx.fill();

      ctx.restore();
    };

    const drawCart = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.3) * 2);
      ctx.scale(s, s);

      rr(-34, -30, 68, 54, 12);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-22, -50, 20, 22, 6);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      rr(8, -54, 20, 26, 6);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(34, -18);
      ctx.lineTo(52, -44);
      ctx.stroke();

      [-20, 20].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 28, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawFlow = (points) => {
      points.forEach((point, index) => {
        if (index === points.length - 1) return;

        const next = points[index + 1];

        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = "rgba(0,0,0,0.16)";
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 12]);
        ctx.lineDashOffset = -time * 42;
        ctx.stroke();
        ctx.setLineDash([]);

        const p = (time * 0.16 + index * 0.2) % 1;
        const x = point.x + (next.x - point.x) * p;
        const y = point.y + (next.y - point.y) * p;

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = index % 2 ? "#67D946" : "#F4C542";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    const drawDashboard = (x, y) => {
      const item = challenges[activeRef.current];
      const fixed = Math.sin(time * 1.8) > -0.15;

      rr(x - 138, y - 58, 276, 116, 30);
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
      ctx.fillText(
        fixed ? "SOLUTION ACTIVE" : "ISSUE DETECTED",
        x + 30,
        y - 14,
      );

      ctx.font = "900 19px Arimo";
      ctx.fillText(
        fixed ? `✓ ${item.fixed}` : `⚠ ${item.alert}`,
        x + 30,
        y + 16,
      );

      ctx.beginPath();
      ctx.arc(x + 122, y - 42, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = fixed ? "#67D946" : "#FFE994";
      ctx.fill();
    };

    const drawQualityPanel = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4) * 5);

      rr(-92, -52, 184, 104, 26);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("QUALITY CHECK", 0, -25);

      ["Clean", "Safe", "Ready"].forEach((item, i) => {
        const yy = 2 + i * 24;

        ctx.beginPath();
        ctx.arc(-52, yy, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        drawCheck(-52, yy, 0.38);

        ctx.fillStyle = "#111";
        ctx.font = "800 11px Arimo";
        ctx.textAlign = "left";
        ctx.fillText(item, -34, yy + 4);
      });

      ctx.restore();
    };

    const drawSparkles = () => {
      for (let i = 0; i < 34; i++) {
        const x = ((i * 79) % w) + Math.sin(time + i) * 9;
        const y = ((i * 43) % h) + Math.cos(time * 1.2 + i) * 7;
        const r = 2 + Math.sin(time * 3 + i) * 1;

        ctx.beginPath();
        ctx.moveTo(x, y - r * 2);
        ctx.lineTo(x, y + r * 2);
        ctx.moveTo(x - r * 2, y);
        ctx.lineTo(x + r * 2, y);
        ctx.strokeStyle = "rgba(103,217,70,0.42)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    const drawFloor = () => {
      const y = h * 0.82;

      ctx.beginPath();
      ctx.moveTo(w * 0.08, y);
      ctx.lineTo(w * 0.92, y);
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.ellipse(
          w * 0.16 + i * w * 0.11,
          y + 28 + Math.sin(time + i) * 4,
          42,
          10,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "rgba(166,230,236,0.25)";
        ctx.fill();
      }
    };

    const drawStatusCard = (x, y, title, value, color) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + x) * 5);

      rr(-82, -34, 164, 68, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-54, 0, 18, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 11px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(title, 20, -7);

      ctx.font = "900 15px Arimo";
      ctx.fillText(value, 20, 14);

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();
      drawSparkles();
      drawFloor();

      const points = [
        { x: w * 0.2, y: h * 0.32 },
        { x: w * 0.5, y: h * 0.39 },
        { x: w * 0.8, y: h * 0.32 },
        { x: w * 0.5, y: h * 0.66 },
      ];

      drawFlow(points);

      drawBuilding(
        w * 0.2,
        h * 0.32,
        Math.min(w, h) / 890,
        "SITE A",
        "ok",
        "#CFF7BC",
      );
      drawBuilding(
        w * 0.5,
        h * 0.39,
        Math.min(w, h) / 890,
        "SITE B",
        "ok",
        "#A6E6EC",
      );
      drawBuilding(
        w * 0.8,
        h * 0.32,
        Math.min(w, h) / 890,
        "SITE C",
        "warn",
        "#FFE994",
      );

      drawPerson(w * 0.25, h * 0.61, Math.min(w, h) / 820, "#F4C542", "mop");
      drawPerson(w * 0.48, h * 0.6, Math.min(w, h) / 830, "#A6E6EC", "window");
      drawPerson(w * 0.7, h * 0.61, Math.min(w, h) / 830, "#67D946", "wrench");

      drawCleaningMachine(
        w * 0.1 + ((time * 46) % (w * 0.74)),
        h * 0.9,
        Math.min(w, h) / 870,
      );

      drawCart(
        w * 0.82 - ((time * 28) % (w * 0.24)),
        h * 0.83,
        Math.min(w, h) / 840,
      );

      drawDashboard(w * 0.5, h * 0.14);
      drawQualityPanel(w * 0.5, h * 0.66);

      drawStatusCard(w * 0.22, h * 0.78, "Coverage", "24/7 ✓", "#CFF7BC");
      drawStatusCard(w * 0.78, h * 0.78, "Facility", "Ready ✓", "#FFE994");

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
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="clean-ch-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Cleaning & Facility Challenges We Solve
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Keeping", "facilities", "clean", "safe", "and", "covered"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="clean-ch-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We help employers solve cleaning staff shortages, quality gaps,
            emergency replacements, site coverage and facility support pressure.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="clean-ch-reveal relative h-[460px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[560px] lg:sticky lg:top-24 lg:h-[650px]">
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
                  className={`clean-ch-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="clean-ch-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <p className="text-4xl font-normal tracking-[-0.06em] text-black">
                {item.value}
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CleaningFacilityChallenges;
