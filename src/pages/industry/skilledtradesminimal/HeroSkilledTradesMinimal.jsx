import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Hammer,
  HardHat,
  ShieldCheck,
  UsersRound,
  Wrench,
  Zap,
} from "lucide-react";

const stats = [
  { value: "4500+", label: "Trades Placed" },
  { value: "300+", label: "Projects Supported" },
  { value: "48h", label: "Initial Shortlist" },
];

const HeroSkilledTradesMinimal = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trade-word", {
        y: 70,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".trade-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".trade-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
        duration: 1,
        delay: 0.7,
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
      bg.addColorStop(0.55, "#F1E4C8");
      bg.addColorStop(1, "#D4C2A1");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const floorY = h * 0.78;
      ctx.fillStyle = "#B4A486";
      ctx.fillRect(0, floorY, w, h - floorY);

      ctx.save();
      ctx.globalAlpha = 0.07;
      ctx.strokeStyle = "#111";

      for (let x = 0; x < w; x += 44) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = 0; y < h; y += 44) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.restore();

      for (let i = 0; i < 35; i++) {
        const x = ((i * 91) % w) + Math.sin(time + i) * 8;
        const y = ((i * 47) % h) + Math.cos(time * 1.1 + i) * 7;
        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.25)";
        ctx.fill();
      }
    };

    const drawBuildingFrame = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";

      for (let i = 0; i < 5; i++) {
        const px = -180 + i * 90;
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, -250);
        ctx.stroke();
      }

      for (let j = 0; j < 5; j++) {
        const py = -j * 58;
        ctx.beginPath();
        ctx.moveTo(-200, py);
        ctx.lineTo(200, py);
        ctx.stroke();
      }

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(-180 + i * 90, 0);
        ctx.lineTo(-90 + i * 90, -58);
        ctx.strokeStyle = "rgba(0,0,0,0.45)";
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawCrane = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -290);
      ctx.moveTo(0, -260);
      ctx.lineTo(240, -320);
      ctx.moveTo(0, -260);
      ctx.lineTo(190, -235);
      ctx.stroke();

      for (let i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 42, -270 - i * 9);
        ctx.lineTo(i * 42 + 18, -245);
        ctx.stroke();
      }

      const hookX = 185 + Math.sin(time) * 18;
      ctx.beginPath();
      ctx.moveTo(hookX, -306);
      ctx.lineTo(hookX, -180);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(hookX - 34, -165 + Math.sin(time * 1.4) * 5, 68, 48, 6);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-38, -22, 76, 30, 6);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawWorker = (x, y, s, color = "#FFE994", action = "hammer", flip = false, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + phase) * 2);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(s, s);

      const t = time + phase;

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.lineTo(-14, 30);
      ctx.moveTo(8, 0);
      ctx.lineTo(14, 30);
      ctx.stroke();

      rr(-20, -48, 40, 52, 9);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      const armY = action === "hammer" ? -50 + Math.sin(t * 4) * 13 : -28;

      ctx.beginPath();
      ctx.moveTo(-16, -36);
      ctx.lineTo(-38, -20);
      ctx.moveTo(16, -36);
      ctx.lineTo(42, armY);
      ctx.strokeStyle = color;
      ctx.lineWidth = 7;
      ctx.stroke();

      if (action === "hammer") {
        ctx.save();
        ctx.translate(48, armY);
        ctx.rotate(Math.sin(t * 4) * 0.45);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(30, -10);
        ctx.moveTo(22, -18);
        ctx.lineTo(36, -2);
        ctx.stroke();
        ctx.restore();
      }

      if (action === "wrench") {
        ctx.save();
        ctx.translate(50, armY);
        ctx.rotate(-0.4 + Math.sin(t * 3) * 0.2);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(32, 0);
        ctx.arc(37, 0, 7, -1.1, 1.1);
        ctx.stroke();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, -68, 15, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rr(-18, -88, 36, 13, 5);
      ctx.fillStyle = "#F4C542";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -78);
      ctx.quadraticCurveTo(0, -101, 18, -78);
      ctx.fillStyle = "#F4C542";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-5, -68, 2, 0, Math.PI * 2);
      ctx.arc(5, -68, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.restore();
    };

    const drawPanel = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.25) * 5);

      rr(-150, -70, 300, 140, 32);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SKILLED TRADES HIRING", 0, -40);

      const steps = ["Source", "Test", "Verify", "Deploy"];

      steps.forEach((step, i) => {
        const px = -90 + i * 60;
        const active = i <= Math.floor((time * 0.7) % steps.length);

        ctx.beginPath();
        ctx.arc(px, 10, 18, 0, Math.PI * 2);
        ctx.fillStyle = active ? "#67D946" : "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        if (active) {
          ctx.beginPath();
          ctx.moveTo(px - 8, 10);
          ctx.lineTo(px - 2, 17);
          ctx.lineTo(px + 10, 2);
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        ctx.fillStyle = "#111";
        ctx.font = "800 10px Arimo";
        ctx.fillText(step, px, 44);

        if (i < steps.length - 1) {
          ctx.beginPath();
          ctx.moveTo(px + 24, 10);
          ctx.lineTo(px + 36, 10);
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      ctx.restore();
    };

    const drawFloatingCard = (x, y, title, value, color, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.45 + phase) * 6);

      rr(-92, -32, 184, 64, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-60, 0, 17, 0, Math.PI * 2);
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

    const drawToolRack = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-90, -65, 180, 110, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";

      const tools = [-55, 0, 55];
      tools.forEach((tx, i) => {
        ctx.beginPath();
        ctx.moveTo(tx, -35);
        ctx.lineTo(tx, 25);
        ctx.stroke();

        if (i === 0) {
          ctx.beginPath();
          ctx.arc(tx, -42, 12, 0, Math.PI * 2);
          ctx.stroke();
        }

        if (i === 1) {
          rr(tx - 11, -48, 22, 18, 4);
          ctx.fillStyle = "#A6E6EC";
          ctx.fill();
          ctx.stroke();
        }

        if (i === 2) {
          ctx.beginPath();
          ctx.moveTo(tx - 16, -44);
          ctx.lineTo(tx + 16, -44);
          ctx.stroke();
        }
      });

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawBackground();

      const s = Math.min(w, h) / 800;

      drawCrane(w * 0.12, h * 0.78, s * 0.78);
      drawBuildingFrame(w * 0.55, h * 0.77, s * 0.92);

      drawPanel(w * 0.5, h * 0.15);
      drawToolRack(w * 0.8, h * 0.48, s * 0.8);

      drawWorker(w * 0.34, h * 0.88, s * 0.78, "#FFE994", "hammer", false, 0);
      drawWorker(w * 0.59, h * 0.88, s * 0.72, "#CFF7BC", "wrench", true, 1.2);
      drawWorker(w * 0.73, h * 0.88, s * 0.7, "#A6E6EC", "hammer", false, 2.2);

      drawFloatingCard(w * 0.22, h * 0.34, "Trades", "Verified", "#FFE994", 0);
      drawFloatingCard(w * 0.78, h * 0.26, "Shortlist", "48h", "#CFF7BC", 2);
      drawFloatingCard(w * 0.5, h * 0.96, "Outcome", "Crew ready ✓", "#A6E6EC", 4);

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
            <span className="trade-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#FFF9E6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <HardHat size={14} strokeWidth={2.2} />
              Skilled Trades Recruitment
            </span>

            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.04em] text-black sm:text-[3.7rem] lg:text-[4.35rem]">
              {["Reliable", "skilled"].map((word) => (
                <span key={word} className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="trade-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              {["trades"].map((word) => (
                <span key={word} className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="trade-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative inline-block overflow-visible">
                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="trade-word inline-block text-[#1f7a2e]">
                    for every project.
                  </span>
                </span>

                <svg
                  className="trade-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="trade-reveal mt-7 max-w-xl text-base leading-7 text-black/75">
              We connect employers with electricians, plumbers, welders,
              carpenters, painters, masons, HVAC technicians, pipe fitters,
              machine operators and project-ready trade teams.
            </p>

            <div className="trade-reveal mt-7 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                [Wrench, "Verified trades"],
                [ShieldCheck, "Safety ready"],
                [UsersRound, "Fast deployment"],
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

            <div className="trade-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Request Trade Workers
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="/industries/skilled-trades"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                Explore roles
              </a>
            </div>

            <div className="trade-reveal mt-9 grid max-w-xl gap-3 sm:grid-cols-3">
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

          <div className="trade-reveal relative h-[500px] w-full overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[620px] lg:h-[720px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkilledTradesMinimal;