import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wrench,
} from "lucide-react";

const stats = [
  { value: "6000+", label: "Facility Workers" },
  { value: "24/7", label: "Shift Support" },
  { value: "96%", label: "Client Satisfaction" },
];

const HeroCleaningFacility = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".clean-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".clean-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".clean-line", {
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

    const drawBuilding = () => {
      const bx = w * 0.5;
      const by = h * 0.42;
      const bw = Math.min(w * 0.72, 430);
      const bh = h * 0.48;

      rr(bx - bw / 2, by - bh / 2, bw, bh, 28);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(bx - bw * 0.42, by - bh * 0.38, bw * 0.84, 42, 16);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("FACILITY OPERATIONS", bx, by - bh * 0.38 + 27);

      const winW = bw * 0.18;
      const winH = bh * 0.17;

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
          const x = bx - bw * 0.36 + col * bw * 0.24;
          const y = by - bh * 0.18 + row * bh * 0.22;

          rr(x, y, winW, winH, 12);
          ctx.fillStyle =
            row === 1 && col === 2
              ? "rgba(166,230,236,0.7)"
              : "rgba(166,230,236,0.35)";
          ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.24)";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(x + winW / 2, y);
          ctx.lineTo(x + winW / 2, y + winH);
          ctx.moveTo(x, y + winH / 2);
          ctx.lineTo(x + winW, y + winH / 2);
          ctx.strokeStyle = "rgba(0,0,0,0.16)";
          ctx.stroke();
        }
      }

      rr(bx - 34, by + bh * 0.27, 68, bh * 0.23, 12);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();
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
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(-16, 10 + Math.sin(time * 4 + x) * 4);
      ctx.moveTo(0, -2);
      ctx.lineTo(18, 10 + Math.cos(time * 4 + x) * 4);
      ctx.stroke();

      ctx.beginPath();
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

        ctx.beginPath();
        ctx.arc(wx, 21, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
      });

      ctx.beginPath();
      ctx.ellipse(-56, 20, 24, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(166,230,236,0.5)";
      ctx.fill();

      ctx.restore();
    };

    const drawCleaningCart = (x, y, s) => {
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

    const drawChecklist = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.5) * 5);

      rr(-90, -58, 180, 116, 28);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("CLEANING CHECKLIST", 0, -32);

      const items = ["Lobby", "Windows", "Floors"];

      items.forEach((item, i) => {
        const yy = -5 + i * 27;
        ctx.beginPath();
        ctx.arc(-55, yy, 9, 0, Math.PI * 2);
        ctx.fillStyle =
          i <= Math.floor((time * 0.8) % 3) ? "#67D946" : "#FFF6C8";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        if (i <= Math.floor((time * 0.8) % 3)) {
          ctx.beginPath();
          ctx.moveTo(-60, yy);
          ctx.lineTo(-56, yy + 4);
          ctx.lineTo(-49, yy - 5);
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.fillStyle = "#111";
        ctx.font = "800 12px Arimo";
        ctx.textAlign = "left";
        ctx.fillText(item, -35, yy + 4);
      });

      ctx.restore();
    };

    const drawSparkles = () => {
      for (let i = 0; i < 32; i++) {
        const x = ((i * 79) % w) + Math.sin(time + i) * 9;
        const y = ((i * 43) % h) + Math.cos(time * 1.2 + i) * 7;
        const r = 2 + Math.sin(time * 3 + i) * 1;

        ctx.beginPath();
        ctx.moveTo(x, y - r * 2);
        ctx.lineTo(x, y + r * 2);
        ctx.moveTo(x - r * 2, y);
        ctx.lineTo(x + r * 2, y);
        ctx.strokeStyle = "rgba(103,217,70,0.45)";
        ctx.lineWidth = 1.6;
        ctx.stroke();
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

    const drawFloorReflection = () => {
      const y = h * 0.8;

      ctx.beginPath();
      ctx.moveTo(w * 0.1, y);
      ctx.lineTo(w * 0.9, y);
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.ellipse(
          w * 0.18 + i * w * 0.1,
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

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();
      drawSparkles();
      drawBuilding();
      drawFloorReflection();

      drawPerson(w * 0.32, h * 0.51, Math.min(w, h) / 760, "#A6E6EC", "window");
      drawPerson(w * 0.36, h * 0.78, Math.min(w, h) / 780, "#F4C542", "mop");
      drawPerson(w * 0.72, h * 0.77, Math.min(w, h) / 790, "#67D946", "wrench");

      drawCleaningMachine(
        w * 0.12 + ((time * 48) % (w * 0.72)),
        h * 0.86,
        Math.min(w, h) / 820,
      );

      drawCleaningCart(
        w * 0.82 - ((time * 30) % (w * 0.26)),
        h * 0.83,
        Math.min(w, h) / 820,
      );

      drawChecklist(w * 0.78, h * 0.25);

      drawStatusCard(w * 0.22, h * 0.26, "Facility", "Clean ✓", "#CFF7BC");
      drawStatusCard(w * 0.72, h * 0.56, "Maintenance", "Ready ✓", "#FFE994");

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
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="clean-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#FFF9E6] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <Sparkles size={14} strokeWidth={2.2} />
              Cleaning & Facility Management
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Reliable", "cleaning"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="clean-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="clean-word inline-block">teams</span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="clean-word inline-block text-[#1f7a2e]">
                    for facilities.
                  </span>
                </span>

                <svg
                  className="clean-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="clean-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              We connect employers with dependable cleaners, janitors,
              housekeeping teams, maintenance helpers and facility assistants to
              keep buildings safe, clean and operational.
            </p>

            <div className="clean-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [Building2, "Building care"],
                [ClipboardCheck, "Checklist ready"],
                [Wrench, "Facility support"],
              ].map(([Icon, label]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-[#FFF9E6] px-4 py-3 text-sm font-bold text-black"
                >
                  <Icon size={18} className="mb-2" />
                  {label}
                </div>
              ))}
            </div>

            <div className="clean-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Request Staff
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="/industries/cleaning-facility-management"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                Explore roles
              </a>
            </div>

            {/* <div className="clean-reveal mt-9 grid max-w-xl gap-3 sm:grid-cols-3">
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
            </div> */}
          </div>

          <div className="clean-reveal relative h-[460px] w-full overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[560px] lg:h-[660px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCleaningFacility;
