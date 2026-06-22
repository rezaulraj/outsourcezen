import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Leaf,
  Sprout,
  Tractor,
  UsersRound,
  Wheat,
} from "lucide-react";

const points = [
  {
    title: "Seasonal workforce",
    text: "Reliable workers for planting, harvesting and peak farm operations.",
    icon: UsersRound,
    color: "#FFE994",
  },
  {
    title: "Field-ready screening",
    text: "Candidates are checked for farm work readiness, discipline and reliability.",
    icon: BadgeCheck,
    color: "#CFF7BC",
  },
  {
    title: "Farm productivity",
    text: "We help farms keep operations moving during busy agricultural seasons.",
    icon: Wheat,
    color: "#A6E6EC",
  },
  {
    title: "Rural deployment",
    text: "Support for farms needing workers in rural, greenhouse and livestock settings.",
    icon: Tractor,
    color: "#FFF6C8",
  },
];

const stats = [
  { value: "72 Hours", label: "Initial Shortlisting" },
  { value: "8000+", label: "Workers Available" },
  { value: "96%", label: "Employer Satisfaction" },
  { value: "22+", label: "Countries Served" },
];

const WhatAgricultureFarmingRecruitment = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".agri-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".agri-what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".agri-what-card", {
        y: 35,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.08,
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

    const drawSun = () => {
      const x = w * 0.82;
      const y = h * 0.13;
      const r = 28 + Math.sin(time * 1.5) * 4;

      ctx.beginPath();
      ctx.arc(x, y, r + 16, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 233, 148, 0.26)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    const drawCloud = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.fillStyle = "#FFF9E6";
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.arc(-28, 8, 18, Math.PI, 0);
      ctx.arc(-5, -4, 24, Math.PI, 0);
      ctx.arc(25, 8, 18, Math.PI, 0);
      ctx.lineTo(42, 22);
      ctx.lineTo(-45, 22);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawBirds = () => {
      for (let i = 0; i < 5; i++) {
        const x = ((time * 28 + i * 140) % (w + 120)) - 60;
        const y = h * 0.16 + Math.sin(time + i) * 18;

        ctx.beginPath();
        ctx.moveTo(x - 8, y);
        ctx.quadraticCurveTo(x, y - 8, x + 8, y);
        ctx.moveTo(x + 8, y);
        ctx.quadraticCurveTo(x + 16, y - 8, x + 24, y);
        ctx.strokeStyle = "rgba(0,0,0,0.35)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const drawField = () => {
      const groundY = h * 0.68;

      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.quadraticCurveTo(w * 0.5, groundY - 42, w, groundY);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();

      for (let i = 0; i < 12; i++) {
        const y = groundY + i * 22;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.quadraticCurveTo(w * 0.5, y - 34, w, y);
        ctx.strokeStyle = "rgba(0,0,0,0.12)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      for (let i = 0; i < 70; i++) {
        const x = (i * 57 + Math.sin(time + i) * 6) % w;
        const y = groundY + 25 + ((i * 39) % (h * 0.23));
        const height = 14 + (i % 5) * 4;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 5, y - height);
        ctx.moveTo(x, y);
        ctx.lineTo(x + 5, y - height * 0.9);
        ctx.strokeStyle = "rgba(0,0,0,0.34)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
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

    const drawCheckpoint = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-68, -42, 136, 84, 22);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 15px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("VERIFY", 0, -8);

      drawCheck(-28, 22, 0.55);
      drawCheck(0, 22, 0.55);
      drawCheck(28, 22, 0.55);

      ctx.restore();
    };

    const drawGreenhouse = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(-62, 42);
      ctx.lineTo(-62, 0);
      ctx.quadraticCurveTo(0, -62, 62, 0);
      ctx.lineTo(62, 42);
      ctx.closePath();

      ctx.fillStyle = "rgba(166, 230, 236, 0.45)";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = -35; i <= 35; i += 35) {
        ctx.beginPath();
        ctx.moveTo(i, 42);
        ctx.lineTo(i, -28);
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      for (let i = -35; i <= 35; i += 24) {
        ctx.beginPath();
        ctx.arc(i, 23, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawBasket = (x, y, s, filled = true) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-26, -10, 52, 30, 8);
      ctx.fillStyle = "#FFF6C8";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      if (filled) {
        [-13, 3, 17].forEach((cx, i) => {
          ctx.beginPath();
          ctx.arc(cx, -15 - (i % 2) * 4, 8, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 ? "#67D946" : "#FFE994";
          ctx.fill();
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 1.3;
          ctx.stroke();
        });
      }

      ctx.restore();
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

    const drawRouting = () => {
      const startX = w * 0.5;
      const startY = h * 0.48;

      const targets = [
        [w * 0.22, h * 0.63],
        [w * 0.5, h * 0.68],
        [w * 0.78, h * 0.62],
      ];

      targets.forEach(([tx, ty], i) => {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo((startX + tx) / 2, startY + 65, tx, ty);
        ctx.strokeStyle = "rgba(0,0,0,0.16)";
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 12]);
        ctx.lineDashOffset = -time * 45;
        ctx.stroke();
        ctx.setLineDash([]);

        const p = (time * 0.16 + i * 0.2) % 1;
        const x =
          (1 - p) * (1 - p) * startX +
          2 * (1 - p) * p * ((startX + tx) / 2) +
          p * p * tx;

        const y =
          (1 - p) * (1 - p) * startY +
          2 * (1 - p) * p * (startY + 65) +
          p * p * ty;

        drawFarmer(x, y, Math.min(w, h) / 980, i % 2 ? "#67D946" : "#F4C542", i);
      });
    };

    const drawIrrigation = () => {
      const y = h * 0.85;

      ctx.beginPath();
      ctx.moveTo(w * 0.12, y);
      ctx.lineTo(w * 0.9, y);
      ctx.strokeStyle = "rgba(0,0,0,0.28)";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i < 15; i++) {
        const x = w * 0.14 + i * (w * 0.74 / 14);
        const dropY = y + 10 + ((time * 50 + i * 17) % 32);

        ctx.beginPath();
        ctx.arc(x, dropY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
      }
    };

    const drawHarvestBoxes = () => {
      for (let i = 0; i < 6; i++) {
        const x = w * 0.18 + ((time * 42 + i * 76) % (w * 0.64));
        const y = h * 0.78 + Math.sin(time + i) * 5;

        rr(x - 18, y - 13, 36, 26, 6);
        ctx.fillStyle = i % 2 ? "#FFE994" : "#FFF6C8";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawSun();
      drawCloud(w * 0.17 + Math.sin(time * 0.4) * 20, h * 0.14, 0.75);
      drawCloud(w * 0.48 + Math.cos(time * 0.35) * 18, h * 0.19, 0.62);
      drawBirds();

      drawField();

      drawCheckpoint(w * 0.5, h * 0.35, Math.min(w, h) / 760);
      drawRouting();

      drawGreenhouse(w * 0.22, h * 0.56, Math.min(w, h) / 820);
      drawTractor(w * 0.52, h * 0.65, Math.min(w, h) / 850);
      drawBasket(w * 0.8, h * 0.61, Math.min(w, h) / 760);

      drawHarvestBoxes();
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
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="agri-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
              What Is Agriculture & Farming Recruitment?
            </p>

            <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
              {["Connecting", "farms", "with", "reliable", "agricultural", "talent"].map(
                (word) => (
                  <span key={word} className="inline-block overflow-hidden px-1">
                    <span className="agri-what-word inline-block">{word}</span>
                  </span>
                )
              )}
            </h2>

            <p className="agri-what-reveal mt-6 max-w-xl text-base leading-7 text-black/75">
              Agriculture & farming recruitment focuses on sourcing, screening
              and deploying dependable workers who help farms maintain
              productivity during planting, harvesting and seasonal peak
              operations.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map(({ icon: Icon, ...item }) => (
                <article
                  key={item.title}
                  className="agri-what-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={22} strokeWidth={2.4} />
                  </div>

                  <h3 className="text-lg font-bold tracking-[-0.03em] text-black">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-black/70">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="agri-what-reveal relative h-[460px] overflow-hidden bg-[#FFF9E6] sm:h-[560px] lg:h-[640px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="agri-what-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

export default WhatAgricultureFarmingRecruitment;