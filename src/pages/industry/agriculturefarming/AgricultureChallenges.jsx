import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  CloudSun,
  Home,
  RefreshCcw,
  Sprout,
  TrendingUp,
  UsersRound,
  Wheat,
} from "lucide-react";

const challenges = [
  {
    title: "Seasonal Labor Shortages",
    challenge:
      "Farms struggle finding enough workers during planting and harvesting seasons.",
    solution: "Rapid access to dependable agricultural talent.",
    icon: UsersRound,
    color: "#FFE994",
  },
  {
    title: "Weather-Sensitive Operations",
    challenge: "Delays can significantly impact crop quality and yield.",
    solution: "Flexible workforce deployment aligned with harvest timing.",
    icon: CloudSun,
    color: "#CFF7BC",
  },
  {
    title: "Accommodation Logistics",
    challenge: "Coordinating housing for seasonal teams can be difficult.",
    solution: "Workforce planning and deployment support.",
    icon: Home,
    color: "#A6E6EC",
  },
  {
    title: "High Turnover",
    challenge: "Frequent worker changes reduce efficiency.",
    solution: "Reliable sourcing and replacement support.",
    icon: RefreshCcw,
    color: "#FFF6C8",
  },
  {
    title: "Productivity Pressure",
    challenge: "Meeting harvest targets within limited windows.",
    solution: "Workforce scaling based on operational demand.",
    icon: TrendingUp,
    color: "#FFE994",
  },
  {
    title: "Rural Recruitment Difficulties",
    challenge: "Attracting workers to remote farming areas can be challenging.",
    solution: "Extensive agricultural talent networks.",
    icon: Sprout,
    color: "#CFF7BC",
  },
];

const stats = [
  { value: "72 Hours", label: "Shortlisting" },
  { value: "8000+", label: "Workers" },
  { value: "96%", label: "Satisfaction" },
  { value: "22+", label: "Countries" },
];

const AgricultureChallenges = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".agri-ch-title", {
        y: 70,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".agri-ch-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".agri-ch-card", {
        y: 45,
        opacity: 0,
        scale: 0.95,
        duration: 0.85,
        stagger: 0.07,
        delay: 0.45,
        ease: "power3.out",
      });

      gsap.from(".agri-ch-stat", {
        y: 25,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.55,
        ease: "back.out(1.5)",
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

    const labels = [
      "SHORTAGES",
      "HARVEST",
      "WEATHER",
      "HOUSING",
      "TURNOVER",
      "TARGETS",
    ];

    const colors = [
      "#FFE994",
      "#CFF7BC",
      "#A6E6EC",
      "#FFF6C8",
      "#FFE994",
      "#CFF7BC",
    ];

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

    const drawFarmer = (x, y, s, color, tool = 0) => {
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
      ctx.moveTo(-18, -28);
      ctx.lineTo(18, -28);
      ctx.moveTo(-11, -28);
      ctx.quadraticCurveTo(0, -43, 11, -28);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(0, 22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(-16, 10 + Math.sin(time * 4 + tool) * 4);
      ctx.moveTo(0, -2);
      ctx.lineTo(17, 10 + Math.cos(time * 4 + tool) * 4);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 22);
      ctx.lineTo(-11, 42);
      ctx.moveTo(0, 22);
      ctx.lineTo(11, 42);
      ctx.stroke();

      if (tool === 0) {
        ctx.beginPath();
        ctx.moveTo(18, 8);
        ctx.lineTo(40, -5);
        ctx.stroke();
      }

      if (tool === 1) {
        rr(16, 4, 28, 20, 6);
        ctx.fillStyle = "#FFF6C8";
        ctx.fill();
        ctx.stroke();
      }

      if (tool === 2) {
        ctx.beginPath();
        ctx.moveTo(-20, 9);
        ctx.lineTo(-38, 25);
        ctx.moveTo(-38, 25);
        ctx.lineTo(-22, 25);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawField = () => {
      const groundY = h * 0.66;

      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.quadraticCurveTo(w * 0.5, groundY - 42, w, groundY);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();

      for (let i = 0; i < 11; i++) {
        const y = groundY + i * 24;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.quadraticCurveTo(w * 0.5, y - 34, w, y);
        ctx.strokeStyle = "rgba(0,0,0,0.12)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      for (let i = 0; i < 85; i++) {
        const x = (i * 53 + Math.sin(time + i) * 5) % w;
        const y = groundY + 20 + ((i * 37) % (h * 0.23));
        const height = 14 + (i % 5) * 4;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 5, y - height);
        ctx.moveTo(x, y);
        ctx.lineTo(x + 5, y - height * 0.9);
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.lineWidth = 1.35;
        ctx.stroke();
      }
    };

    const drawSunCloudsBirds = () => {
      const sx = w * 0.84;
      const sy = h * 0.13;
      const r = 24 + Math.sin(time * 1.4) * 3;

      ctx.beginPath();
      ctx.arc(sx, sy, r + 16, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,233,148,0.25)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      const cloud = (x, y, s) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(s, s);

        ctx.fillStyle = "#FFF9E6";
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.2;

        ctx.beginPath();
        ctx.arc(-25, 8, 16, Math.PI, 0);
        ctx.arc(-4, -4, 22, Math.PI, 0);
        ctx.arc(24, 8, 16, Math.PI, 0);
        ctx.lineTo(38, 20);
        ctx.lineTo(-42, 20);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      };

      cloud(w * 0.16 + Math.sin(time * 0.4) * 18, h * 0.14, 0.7);
      cloud(w * 0.42 + Math.cos(time * 0.35) * 16, h * 0.2, 0.55);

      for (let i = 0; i < 5; i++) {
        const x = ((time * 26 + i * 138) % (w + 120)) - 60;
        const y = h * 0.17 + Math.sin(time + i) * 17;

        ctx.beginPath();
        ctx.moveTo(x - 8, y);
        ctx.quadraticCurveTo(x, y - 8, x + 8, y);
        ctx.moveTo(x + 8, y);
        ctx.quadraticCurveTo(x + 16, y - 8, x + 24, y);
        ctx.strokeStyle = "rgba(0,0,0,0.28)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const drawTractor = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-50, -23, 75, 40, 10);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(2, -53, 43, 33, 8);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(45, -18);
      ctx.lineTo(68, -5);
      ctx.lineTo(65, 15);
      ctx.stroke();

      [-30, 32].forEach((wx, i) => {
        ctx.beginPath();
        ctx.arc(wx, 21, i === 0 ? 17 : 12, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wx, 21, i === 0 ? 7 : 5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawIrrigation = () => {
      const y = h * 0.86;

      ctx.beginPath();
      ctx.moveTo(w * 0.1, y);
      ctx.lineTo(w * 0.9, y);
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i < 16; i++) {
        const x = w * 0.12 + i * ((w * 0.76) / 15);
        const dropY = y + 10 + ((time * 52 + i * 17) % 34);

        ctx.beginPath();
        ctx.arc(x, dropY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
      }
    };

    const drawCenter = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 88 + Math.sin(time * 1.8) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(103,217,70,0.26)";
      ctx.lineWidth = 12;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 68, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 8;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        68,
        -Math.PI / 2 + time * 0.48,
        -Math.PI / 2 + time * 0.48 + Math.PI * 2 * 0.66,
      );
      ctx.strokeStyle = "#67D946";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.stroke();

      rr(x - 110, y - 58, 220, 116, 34);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 15px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("FARM", x, y - 18);

      ctx.font = "900 25px Arimo";
      ctx.fillText("OPERATIONS", x, y + 12);

      ctx.font = "800 13px Arimo";
      ctx.fillText("READY", x, y + 36);

      drawCheck(x + 92, y - 44, 0.72);
    };

    const drawNodeIcon = (x, y, i, color) => {
      if (i === 0 || i === 4) {
        drawFarmer(x, y + 8, 0.28, color, i % 3);
      }

      if (i === 1) {
        ctx.beginPath();
        ctx.moveTo(x - 8, y + 14);
        ctx.lineTo(x - 15, y - 10);
        ctx.moveTo(x, y + 14);
        ctx.lineTo(x, y - 14);
        ctx.moveTo(x + 8, y + 14);
        ctx.lineTo(x + 15, y - 10);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      if (i === 2) {
        ctx.beginPath();
        ctx.arc(x - 8, y - 8, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x + 8, y + 6, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.stroke();
      }

      if (i === 3) {
        rr(x - 16, y - 10, 32, 24, 5);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - 20, y - 10);
        ctx.lineTo(x, y - 28);
        ctx.lineTo(x + 20, y - 10);
        ctx.stroke();
      }

      if (i === 5) {
        ctx.beginPath();
        ctx.moveTo(x - 18, y + 16);
        ctx.lineTo(x - 18, y - 4);
        ctx.lineTo(x - 4, y - 10);
        ctx.lineTo(x + 8, y - 20);
        ctx.lineTo(x + 18, y - 30);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + 18, y - 30);
        ctx.lineTo(x + 18, y - 18);
        ctx.moveTo(x + 18, y - 30);
        ctx.lineTo(x + 6, y - 30);
        ctx.stroke();
      }
    };

    const drawNode = (x, y, label, color, i) => {
      ctx.beginPath();
      ctx.arc(x, y, 48, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        48,
        -Math.PI / 2 + time * 0.42,
        -Math.PI / 2 + time * 0.42 + Math.PI * 2 * 0.64,
      );
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.stroke();

      drawNodeIcon(x, y - 3, i, color);

      ctx.fillStyle = "#111";
      ctx.font = "800 9px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(label, x, y + 34);
    };

    const drawOrbitWorkers = (cx, cy, radius) => {
      for (let i = 0; i < 14; i++) {
        const p = (time * 0.07 + i / 14) % 1;
        const angle = p * Math.PI * 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.6;

        drawFarmer(
          x,
          y,
          Math.min(w, h) / 1050,
          i % 2 ? "#67D946" : "#F4C542",
          i % 3,
        );
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawSunCloudsBirds();
      drawField();

      const cx = w / 2;
      const cy = h * 0.48;
      const radius = Math.min(w, h) * 0.32;

      labels.forEach((label, i) => {
        const angle = time * 0.2 + (Math.PI * 2 * i) / labels.length;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.68;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = "rgba(0,0,0,0.12)";
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 12]);
        ctx.lineDashOffset = -time * 42;
        ctx.stroke();
        ctx.setLineDash([]);

        drawNode(x, y, label, colors[i], i);
      });

      drawOrbitWorkers(cx, cy, radius * 0.86);
      drawCenter(cx, cy);

      const tractorX = w * 0.1 + ((time * 55) % (w * 0.78));
      drawTractor(tractorX, h * 0.78, Math.min(w, h) / 850);

      drawIrrigation();

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
        <div className="grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="agri-ch-reveal mb-4 inline-block border-b border-black text-sm font-medium text-black">
              Agriculture Challenges We Solve
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black sm:text-7xl lg:text-8xl">
              {["Protecting", "productivity", "during", "seasons"].map(
                (word) => (
                  <span key={word} className="block overflow-hidden pb-2">
                    <span className="agri-ch-title inline-block">{word}</span>
                  </span>
                ),
              )}
            </h2>
          </div>

          <p className="agri-ch-reveal max-w-xl text-base leading-7 text-black/70 lg:pb-3">
            From seasonal labor shortages to weather-sensitive harvest windows,
            we help farms overcome workforce challenges and maintain operational
            continuity.
          </p>
        </div>

        <div className="agri-ch-reveal relative mt-12 h-[380px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[500px] lg:h-[590px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {challenges.map(
            ({ title, challenge, solution, icon: Icon, color }, index) => (
              <article
                key={title}
                className="agri-ch-card rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6"
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
                      Challenge
                    </p>
                    <p className="text-sm leading-6 text-black/70">
                      {challenge}
                    </p>
                  </div>

                  <div className="border-t border-black/10 pt-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-black/45">
                      Solution
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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="agri-ch-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

export default AgricultureChallenges;
