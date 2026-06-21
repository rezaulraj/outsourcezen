import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Building2,
  HardHat,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const HeroConstruction = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".construction-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".construction-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".construction-line", {
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

    // 5 distinct roles, cycled so every worker on screen is doing a
    // different, clearly recognizable job rather than the same pose
    // with a swapped prop.
    const workers = Array.from({ length: 20 }, (_, i) => ({
      floor: i % 6,
      side: i % 2 === 0 ? -1 : 1,
      phase: i * 0.6,
      speed: 0.8 + (i % 4) * 0.12,
      role: i % 5,
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

    const drawWorker = (x, y, scale, color, roleType) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";

      // head + helmet (shared by every role)
      ctx.beginPath();
      ctx.arc(0, -18, 8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -23, 9, Math.PI, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-12, -22);
      ctx.lineTo(12, -22);
      ctx.stroke();

      // torso (shared)
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 18);
      ctx.stroke();

      // legs (shared, gentle idle shift)
      const legShift = Math.sin(time * 2 + x) * 2;
      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.lineTo(-10 + legShift, 36);
      ctx.moveTo(0, 18);
      ctx.lineTo(10 - legShift, 36);
      ctx.stroke();

      if (roleType === 0) {
        // HAMMERING: raised arm swings down to strike a board braced
        // against a low stool, on a steady percussive beat.
        const swing = Math.abs(Math.sin(time * 3.4 + x));
        const armY = -2 - swing * 14;
        const handX = 16;
        const handY = 4 - swing * 16;

        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(-12, 8);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, armY);
        ctx.lineTo(handX, handY);
        ctx.stroke();

        ctx.save();
        ctx.translate(handX, handY);
        ctx.rotate(-0.6 + swing * 0.9);
        rr(-3, -3, 16, 7, 2);
        ctx.fillStyle = "#F4C542";
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        rr(10, 20, 16, 6, 2);
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.fill();

        if (swing > 0.93) {
          for (let s = 0; s < 3; s++) {
            const sa = (s / 3) * Math.PI * 2 + time * 6;
            ctx.beginPath();
            ctx.moveTo(26 + Math.cos(sa) * 2, 16 + Math.sin(sa) * 2);
            ctx.lineTo(26 + Math.cos(sa) * 8, 16 + Math.sin(sa) * 8);
            ctx.strokeStyle = "#F4C542";
            ctx.lineWidth = 1.6;
            ctx.stroke();
          }
        }
      } else if (roleType === 1) {
        // CARRYING: walks with a toolbox swinging gently in one hand,
        // free arm swinging in counter-rhythm to the legs.
        const carrySwing = Math.sin(time * 4 + x) * 3;

        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(-14, 9 + carrySwing * 0.6);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(16, 4);
        ctx.stroke();

        ctx.save();
        ctx.translate(16, 4 + Math.sin(time * 4 + x) * 1.5);
        rr(-2, 0, 20, 14, 3);
        ctx.fillStyle = "#F4C542";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.4;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(2, 0);
        ctx.quadraticCurveTo(8, -7, 14, 0);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      } else if (roleType === 2) {
        // CLIMBING: hand-over-hand motion up a fixed ladder beside the
        // figure, alternating arm reach with vertical body bob.
        const climb = (Math.sin(time * 2.2 + x) + 1) / 2;

        ctx.save();
        ctx.strokeStyle = "rgba(0,0,0,0.35)";
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(-24, -34);
        ctx.lineTo(-24, 34);
        ctx.moveTo(-16, -34);
        ctx.lineTo(-16, 34);
        for (let r = -30; r <= 30; r += 12) {
          ctx.moveTo(-24, r);
          ctx.lineTo(-16, r);
        }
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(-20, -10 - climb * 10);
        ctx.moveTo(0, 6);
        ctx.lineTo(-19, 14 - (1 - climb) * 10);
        ctx.stroke();
      } else if (roleType === 3) {
        // DRILLING: arm braced and vibrating against a wall panel, with
        // small dust particles kicked off near the bit.
        const jitter = Math.sin(time * 26) * 1.3;
        const handX = 18 + jitter;
        const handY = 2;

        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(-12, 9);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(handX, handY);
        ctx.stroke();

        ctx.save();
        ctx.translate(handX, handY);
        rr(-2, -4, 18, 8, 2);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.restore();

        rr(handX + 14, -22, 4, 44, 2);
        ctx.fillStyle = "rgba(0,0,0,0.12)";
        ctx.fill();

        for (let p = 0; p < 3; p++) {
          const pt = (time * 3 + p / 3) % 1;
          ctx.beginPath();
          ctx.arc(
            handX + 16 + pt * 6,
            handY + Math.sin(pt * Math.PI * 4) * 4,
            1.4,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = "rgba(0,0,0,0.3)";
          ctx.fill();
        }
      } else {
        // WHEELBARROW: both arms gripping handles, pushing forward with
        // a small front wheel that visibly rolls.
        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(20, -6);
        ctx.moveTo(0, 6);
        ctx.lineTo(20, 10);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(20, -6);
        ctx.lineTo(38, -2);
        ctx.moveTo(20, 10);
        ctx.lineTo(38, 6);
        ctx.lineTo(38, -2);
        ctx.stroke();

        rr(20, -10, 18, 14, 3);
        ctx.fillStyle = "#F4C542";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.4;
        ctx.stroke();

        ctx.save();
        ctx.translate(40, 14);
        ctx.rotate(time * 5);
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(6, 0);
        ctx.moveTo(0, -6);
        ctx.lineTo(0, 6);
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    };

    const drawCrane = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(0, 120);
      ctx.lineTo(0, -150);
      ctx.stroke();

      for (let i = -120; i < 110; i += 34) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(38, i + 28);
        ctx.moveTo(38, i);
        ctx.lineTo(0, i + 28);
        ctx.strokeStyle = "rgba(0,0,0,0.45)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;

      ctx.beginPath();
      ctx.moveTo(-82, -150);
      ctx.lineTo(168, -150);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-20, -150);
      ctx.lineTo(58, -105);
      ctx.lineTo(138, -150);
      ctx.strokeStyle = "rgba(0,0,0,0.45)";
      ctx.lineWidth = 2;
      ctx.stroke();

      const hookX = 118 + Math.sin(time * 0.9) * 18;
      ctx.beginPath();
      ctx.moveTo(hookX, -150);
      ctx.lineTo(hookX, -42);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(hookX, -32, 10, 0, Math.PI * 1.4);
      ctx.stroke();

      rr(hookX - 22, -5 + Math.sin(time * 1.2) * 8, 44, 30, 5);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();
    };

    const drawBuilding = (x, y, bw, bh) => {
      const floors = 7;
      const floorH = bh / floors;
      const buildProgress = (Math.sin(time * 0.35) + 1) / 2;
      const visibleFloors = Math.max(3, Math.floor(3 + buildProgress * 4));

      for (let i = floors - 1; i >= floors - visibleFloors; i--) {
        const fy = y - bh / 2 + i * floorH;

        rr(x - bw / 2, fy, bw, floorH - 4, 8);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        for (let c = 0; c < 4; c++) {
          rr(x - bw / 2 + 22 + c * 44, fy + 14, 22, 22, 5);
          ctx.fillStyle = `rgba(244,197,66,${
            0.25 + 0.35 * Math.sin(time * 2 + i + c)
          })`;
          ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.18)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.moveTo(x - bw / 2 - 20, y + bh / 2 + 12);
      ctx.lineTo(x + bw / 2 + 20, y + bh / 2 + 12);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      for (let i = 0; i < visibleFloors; i++) {
        const fy = y + bh / 2 - i * floorH - floorH * 0.55;
        ctx.beginPath();
        ctx.moveTo(x - bw / 2 - 22, fy);
        ctx.lineTo(x + bw / 2 + 22, fy);
        ctx.strokeStyle = "rgba(0,0,0,0.18)";
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 8]);
        ctx.lineDashOffset = -time * 25;
        ctx.stroke();
        ctx.setLineDash([]);
      }
    };

    const drawBlueprintGrid = () => {
      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;

      const size = 42;
      for (let x = 0; x < w; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = 0; y < h; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawBlueprintGrid();

      const bx = w * 0.55;
      const by = h * 0.57;
      const bw = Math.min(w * 0.38, 230);
      const bh = Math.min(h * 0.72, 430);

      drawCrane(w * 0.22, h * 0.52, Math.min(w, h) / 720);
      drawBuilding(bx, by, bw, bh);

      workers.forEach((worker, i) => {
        const floorY =
          by +
          bh / 2 -
          (worker.floor + 1) * (bh / 7) +
          Math.sin(time * worker.speed + worker.phase) * 4;

        const wx =
          bx + worker.side * (bw * 0.32 + Math.sin(time + worker.phase) * 12);

        drawWorker(
          wx,
          floorY,
          Math.min(w, h) / 760,
          i % 3 === 0 ? "#F4C542" : i % 3 === 1 ? "#67D946" : "#A6E6EC",
          worker.role,
        );
      });

      for (let i = 0; i < 26; i++) {
        const p = (time * 0.1 + i / 26) % 1;
        const x = w * 0.12 + w * 0.72 * p;
        const y = h * 0.86 + Math.sin(p * Math.PI) * -36;
        drawWorker(
          x,
          y,
          Math.min(w, h) / 980,
          p > 0.75 ? "#67D946" : "#F4C542",
          i % 5,
        );
      }

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
      className="font-arimo relative overflow-hidden  pt-26"
    >
      <div className="relative z-10 container mx-auto rounded-xl px-4 bg-[#FFF9E6] pb-12 pt-14 sm:px-6 lg:px-8 lg:pb-16 lg:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="construction-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <HardHat size={14} strokeWidth={2.2} />
              Construction Recruitment
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Build", "strong", "teams"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="construction-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="construction-word inline-block">for</span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="construction-word inline-block text-[#1f7a2e]">
                    every project.
                  </span>
                </span>

                <svg
                  className="construction-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="construction-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              We connect employers with verified construction workers, skilled
              tradespeople, equipment operators and site support teams for
              reliable project delivery.
            </p>

            <div className="construction-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [UsersRound, "Skilled teams"],
                [ShieldCheck, "Safety ready"],
                [Building2, "Project support"],
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

            <div className="construction-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Request Workers
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="/industries/construction"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                View roles
              </a>
            </div>
          </div>

          <div className="construction-reveal relative h-[440px] w-full sm:h-[520px] lg:h-[620px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroConstruction;
