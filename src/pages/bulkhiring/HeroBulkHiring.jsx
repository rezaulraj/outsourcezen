import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, UsersRound, Factory, CheckCircle2 } from "lucide-react";

const HeroBulkHiring = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bulk-word", {
        y: 55,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".bulk-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".bulk-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
        duration: 1,
        delay: 0.6,
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

    const workers = Array.from({ length: 90 }, (_, i) => ({
      lane: i % 6,
      offset: Math.random(),
      speed: 0.002 + Math.random() * 0.002,
      size: 2 + Math.random() * 2.4,
      phase: Math.random() * Math.PI * 2,
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

    const roundedRect = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
    };

    const drawWorker = (x, y, r, color) => {
      ctx.beginPath();
      ctx.arc(x, y - r * 1.3, r * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y + r * 0.7, r * 1.1, Math.PI, 0);
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
      ctx.moveTo(-9, 0);
      ctx.lineTo(-3, 7);
      ctx.lineTo(10, -9);
      ctx.stroke();
      ctx.restore();
    };

    const drawBus = (x, y, scale, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.6 + i) * 4);
      ctx.scale(scale, scale);

      roundedRect(-34, -16, 68, 32, 8);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let n = 0; n < 4; n++) {
        roundedRect(-25 + n * 14, -9, 10, 10, 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(-20, 18, 5, 0, Math.PI * 2);
      ctx.arc(20, 18, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.restore();
    };

    const drawBuilding = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      roundedRect(-78, -118, 156, 236, 16);
      ctx.fillStyle = "#111";
      ctx.fill();

      roundedRect(-62, -98, 124, 196, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
          const pulse =
            0.55 + 0.45 * Math.sin(time * 2 + row * 0.6 + col * 0.9);
          roundedRect(-44 + col * 28, -78 + row * 28, 14, 14, 3);
          ctx.fillStyle = `rgba(244,197,66,${0.35 + pulse * 0.45})`;
          ctx.fill();
        }
      }

      roundedRect(-24, 80, 48, 38, 6);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "700 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("CLIENT", 0, 138);

      ctx.restore();
    };

    const drawHub = (x, y) => {
      const p = 0.55 + 0.28 * Math.sin(time * 1.4);

      ctx.beginPath();
      ctx.arc(x, y, 54, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        54,
        -Math.PI / 2 + time * 0.4,
        -Math.PI / 2 + time * 0.4 + Math.PI * 2 * p,
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 36, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      drawCheck(x, y + 2, 1.2);
    };

    const drawBulkMeter = (x, y, width) => {
      roundedRect(x, y, width, 16, 9);
      ctx.fillStyle = "rgba(0,0,0,0.10)";
      ctx.fill();

      roundedRect(x, y, width * (0.65 + Math.sin(time * 1.5) * 0.18), 16, 9);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.fillStyle = "#111";
      ctx.font = "700 18px Arimo";
      ctx.textAlign = "left";
      ctx.fillText("BULK-UP", x, y - 12);
    };

    const drawFlowLine = (x1, y1, x2, y2, color, speed = 45) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 50, x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * speed;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const hubX = w * 0.46;
      const hubY = h * 0.48;
      const buildingX = w * 0.78;
      const buildingY = h * 0.49;

      drawFlowLine(w * 0.12, h * 0.2, hubX - 60, hubY - 25, "rgba(0,0,0,0.12)");
      drawFlowLine(w * 0.12, h * 0.5, hubX - 60, hubY, "rgba(0,0,0,0.12)");
      drawFlowLine(
        w * 0.12,
        h * 0.78,
        hubX - 60,
        hubY + 25,
        "rgba(0,0,0,0.12)",
      );
      drawFlowLine(hubX + 60, hubY, buildingX - 110, buildingY, "#F4C542", 55);

      workers.forEach((p, i) => {
        p.offset += p.speed;
        if (p.offset > 1) p.offset = 0;

        const startX = w * 0.06;
        const endX = hubX - 65;
        const laneY = h * (0.2 + p.lane * 0.115);

        const x = startX + (endX - startX) * p.offset;
        const y =
          laneY +
          Math.sin(p.offset * Math.PI) * -42 +
          Math.sin(time * 2 + p.phase) * 3;

        const approved = p.offset > 0.76;
        drawWorker(x, y, p.size, approved ? "#F4C542" : "rgba(0,0,0,0.55)");
      });

      drawHub(hubX, hubY);

      for (let i = 0; i < 18; i++) {
        const t = (time * 0.18 + i / 18) % 1;
        const x = hubX + 72 + (buildingX - 160 - hubX) * t;
        const y = hubY + Math.sin(t * Math.PI) * -34 + Math.sin(time + i) * 2;
        drawWorker(x, y, 3.1, "#67D946");
      }

      drawBus(w * 0.56, h * 0.75, 0.72, 1);
      drawBus(w * 0.68, h * 0.78, 0.62, 2);

      drawBuilding(buildingX, buildingY, Math.min(w, h) / 620);

      drawBulkMeter(w * 0.1, h * 0.9, w * 0.46);

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
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] pt-8"
    >
      <div className="relative z-10 container mx-auto rounded-xl px-4 pb-12 pt-24 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="bulk-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <UsersRound size={14} strokeWidth={2.2} />
              Bulk Hiring
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Build", "large", "teams"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="bulk-word inline-block">{word}</span>
                </span>
              ))}
              <br />
              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="bulk-word inline-block">faster</span>
                </span>
                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="bulk-word inline-block text-[#1f7a2e]">
                    at scale.
                  </span>
                </span>

                <svg
                  className="bulk-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="bulk-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              We help employers source, screen and deploy high-volume workers
              for construction, manufacturing, hospitality, logistics, cleaning
              and essential industries.
            </p>

            <div className="bulk-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [Factory, "Large teams"],
                [CheckCircle2, "Screened workers"],
                [UsersRound, "Fast deployment"],
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

            <div className="bulk-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Start bulk hiring
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="/process"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                View process
              </a>
            </div>
          </div>

          <div className="bulk-reveal relative h-[410px] w-full sm:h-[500px] lg:h-[590px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBulkHiring;
