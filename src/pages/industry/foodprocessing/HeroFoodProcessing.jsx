import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Factory,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  UsersRound,
} from "lucide-react";

const stats = [
  { value: "3500+", label: "Food Processing Workers" },
  { value: "280+", label: "Factories Supported" },
  { value: "40+", label: "Production Projects" },
];

const HeroFoodProcessing = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".food-word", {
        y: 70,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".food-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".food-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
        duration: 1,
        delay: 0.75,
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

    const drawBackground = () => {
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#FFF9E6");
      bg.addColorStop(0.62, "#F6EEDB");
      bg.addColorStop(1, "#DCCFB0");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const floorY = h * 0.78;
      ctx.fillStyle = "#D7C8A8";
      ctx.fillRect(0, floorY, w, h - floorY);

      ctx.strokeStyle = "rgba(0,0,0,0.13)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(w, floorY);
      ctx.stroke();

      ctx.save();
      ctx.globalAlpha = 0.075;
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

      for (let i = 0; i < 34; i++) {
        const x = ((i * 89) % w) + Math.sin(time + i) * 8;
        const y = ((i * 47) % h) + Math.cos(time * 1.1 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.25)";
        ctx.fill();
      }
    };

    const drawMachine = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-118, -120, 236, 138, 18);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-92, -92, 72, 56, 10);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      rr(12, -96, 72, 66, 12);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(
          48 + i * 18,
          -14,
          6 + Math.sin(time * 3 + i) * 1.5,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = i === 0 ? "#67D946" : "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(-118, -28);
      ctx.lineTo(118, -28);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();
    };

    const drawConveyor = (x, y, s, length = 360) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-length / 2, -20, length, 42, 16);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-length / 2 + 18, 0);
      ctx.lineTo(length / 2 - 18, 0);
      ctx.strokeStyle = "#67D946";
      ctx.lineWidth = 3;
      ctx.setLineDash([14, 14]);
      ctx.lineDashOffset = -time * 58;
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 6; i++) {
        const px = -length / 2 + 45 + ((time * 48 + i * 70) % (length - 90));

        rr(px - 22, -42, 44, 30, 8);
        ctx.fillStyle = "#CFF7BC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(px - 15, -27);
        ctx.lineTo(px + 15, -27);
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(px + 13, -17, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
      }

      ctx.restore();
    };

    const drawWorker = (
      x,
      y,
      s,
      apron = "#F4F4F4",
      action = "inspect",
      flip = false,
      phase = 0,
    ) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.25 + phase) * 2);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(s, s);

      const t = time + phase;

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.lineTo(-13, 28);
      ctx.moveTo(8, 0);
      ctx.lineTo(13, 28);
      ctx.stroke();

      rr(-18, -45, 36, 48, 8);
      ctx.fillStyle = apron;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      rr(-15, -40, 30, 42, 7);
      ctx.fillStyle = "#DDF4FF";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;
      ctx.stroke();

      let rightX = 38;
      let rightY = -26 + Math.sin(t * 3.5) * 4;

      if (action === "inspect") {
        rightX = 44;
        rightY = -42;
      }

      if (action === "pack") {
        rightX = 42;
        rightY = -26;
      }

      if (action === "clipboard") {
        rightX = 38;
        rightY = -32;
      }

      ctx.beginPath();
      ctx.moveTo(-15, -34);
      ctx.lineTo(-34, -18 + Math.sin(t * 3) * 3);
      ctx.moveTo(15, -34);
      ctx.lineTo(rightX, rightY);
      ctx.strokeStyle = apron;
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-34, -18 + Math.sin(t * 3) * 3, 5, 0, Math.PI * 2);
      ctx.arc(rightX, rightY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (action === "inspect") {
        ctx.save();
        ctx.translate(rightX + 15, rightY - 4);
        ctx.rotate(-0.15);
        rr(-7, -5, 28, 12, 4);
        ctx.fillStyle = "#1C1810";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(21, 0);
        ctx.lineTo(48, 0);
        ctx.strokeStyle = "rgba(103,217,70,0.65)";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
      }

      if (action === "pack") {
        rr(rightX + 6, rightY - 14, 28, 24, 5);
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      if (action === "clipboard") {
        ctx.save();
        ctx.translate(rightX + 12, rightY);
        ctx.rotate(-0.18);
        rr(-10, -16, 20, 26, 4);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-4, -6);
        ctx.lineTo(5, -6);
        ctx.moveTo(-4, 1);
        ctx.lineTo(6, 1);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.moveTo(0, -45);
      ctx.lineTo(0, -52);
      ctx.strokeStyle = "#E7B58B";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -66, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-16, -73);
      ctx.quadraticCurveTo(0, -96, 16, -73);
      ctx.lineTo(16, -62);
      ctx.quadraticCurveTo(0, -70, -16, -62);
      ctx.closePath();
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rr(-12, -60, 24, 8, 4);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-5, -65, 2, 0, Math.PI * 2);
      ctx.arc(5, -65, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -58, 4, 0.1, Math.PI - 0.1);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawForklift = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.2) * 2);
      ctx.scale(s, s);

      rr(-52, -36, 90, 42, 10);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-28, -72, 42, 36, 8);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(42, -72);
      ctx.lineTo(42, 16);
      ctx.moveTo(42, 12);
      ctx.lineTo(88, 12);
      ctx.moveTo(42, -2);
      ctx.lineTo(82, -2);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      [-32, 22].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 15, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      });

      rr(78, -26, 42, 38, 5);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    const drawProcessPanel = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.35) * 5);

      rr(-132, -62, 264, 124, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("LIVE PRODUCTION HIRING", 0, -34);

      const steps = ["Source", "Screen", "Safety", "Place"];

      steps.forEach((step, i) => {
        const px = -78 + i * 52;
        const active = i <= Math.floor((time * 0.7) % steps.length);

        ctx.beginPath();
        ctx.arc(px, 6, 17, 0, Math.PI * 2);
        ctx.fillStyle = active ? "#67D946" : "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        if (active) drawCheck(px, 6, 0.45);

        ctx.fillStyle = "#111";
        ctx.font = "800 9px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(step, px, 38);

        if (i < steps.length - 1) {
          ctx.beginPath();
          ctx.moveTo(px + 22, 6);
          ctx.lineTo(px + 32, 6);
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      ctx.restore();
    };

    const drawLiveChart = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4) * 6);

      rr(-108, -70, 216, 140, 28);
      ctx.fillStyle = "#111";
      ctx.fill();
      ctx.strokeStyle = "#CFF7BC";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = "#CFF7BC";
      ctx.font = "900 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("LIVE PRODUCTION", 0, -42);

      ctx.beginPath();
      for (let i = 0; i < 9; i++) {
        const px = -70 + i * 18;
        const py = -6 - Math.sin(time * 1.2 + i) * 14 - i * 2;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "#67D946";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#67D946";
      ctx.font = "900 26px Arimo";
      ctx.fillText(`${12400 + Math.floor((Math.sin(time) + 1) * 80)}`, 0, 28);

      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.font = "800 11px Arimo";
      ctx.fillText("units processed today", 0, 50);

      ctx.restore();
    };

    const drawFloatingCard = (x, y, title, value, color, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.45 + phase) * 6);

      rr(-90, -32, 180, 64, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-58, 0, 17, 0, Math.PI * 2);
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

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawBackground();

      const s = Math.min(w, h) / 800;

      drawMachine(w * 0.22, h * 0.66, s * 0.86);
      drawMachine(w * 0.8, h * 0.65, s * 0.72);
      drawConveyor(w * 0.5, h * 0.76, s * 1.05, 390);

      drawWorker(w * 0.37, h * 0.86, s * 0.8, "#F4F4F4", "inspect", false, 0);
      drawWorker(
        w * 0.6,
        h * 0.86,
        s * 0.78,
        "#F4F4F4",
        "clipboard",
        true,
        1.2,
      );
      drawWorker(w * 0.72, h * 0.86, s * 0.74, "#F4F4F4", "pack", false, 2.2);

      drawForklift(w * 0.1 + ((time * 35) % (w * 0.72)), h * 0.91, s * 0.78);

      drawProcessPanel(w * 0.5, h * 0.18);
      drawLiveChart(w * 0.78, h * 0.35);

      drawFloatingCard(
        w * 0.22,
        h * 0.3,
        "Food Safety",
        "Hygiene ready",
        "#CFF7BC",
        0,
      );
      drawFloatingCard(
        w * 0.22,
        h * 0.78,
        "Packaging",
        "Line covered",
        "#FFE994",
        2,
      );
      drawFloatingCard(
        w * 0.5,
        h * 0.94,
        "Outcome",
        "Production moving ✓",
        "#A6E6EC",
        4,
      );

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
      className="font-arimo overflow-hidden bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="food-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#FFF9E6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <Factory size={14} strokeWidth={2.2} />
              Food Processing Recruitment
            </span>

            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.04em] text-black sm:text-[3.7rem] lg:text-[4.35rem]">
              {["Powering", "food"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2"
                >
                  <span className="food-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              {["production"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2"
                >
                  <span className="food-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative inline-block overflow-visible">
                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="food-word inline-block text-[#1f7a2e]">
                    with people.
                  </span>
                </span>

                <svg
                  className="food-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
                  viewBox="0 0 320 24"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M2 17C58 6 130 4 188 10C228 14 268 18 318 9"
                    stroke="#1f7a2e"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="food-reveal mt-7 max-w-xl text-base leading-7 text-black/75">
              We connect food processing companies with reliable production
              workers, machine operators, packaging teams, quality staff,
              warehouse support and hygiene-conscious factory professionals.
            </p>

            <div className="food-reveal mt-7 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                [UsersRound, "Skilled workers"],
                [ShieldCheck, "Food safety focus"],
                [PackageCheck, "Fast production support"],
              ].map(([Icon, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-black/10 bg-[#FFF9E6] px-4 py-3 text-sm font-bold text-black"
                >
                  <Icon size={18} className="mb-2" />
                  {label}
                </div>
              ))}
            </div>

            <div className="food-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Request Food Staff
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="/industries/food-processing"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                Explore roles
              </a>
            </div>

            <div className="food-reveal mt-9 grid max-w-xl gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-black/10 bg-[#FFF9E6] p-4"
                >
                  <p className="text-2xl font-normal tracking-[-0.05em] text-black">
                    {item.value}
                  </p>

                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-black/45">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="food-reveal relative h-[500px] w-full overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[620px] lg:h-[720px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFoodProcessing;
