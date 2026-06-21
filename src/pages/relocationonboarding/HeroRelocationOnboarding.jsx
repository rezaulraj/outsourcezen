import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Building2,
  Home,
  MapPinCheck,
  PlaneLanding,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const HeroRelocationOnboarding = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".relocate-word", {
        y: 55,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".relocate-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".relocate-line", {
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

    let w, h, frame;
    let time = 0;

    const workers = Array.from({ length: 34 }, (_, i) => ({
      t: Math.random(),
      lane: i % 4,
      speed: 0.0014 + Math.random() * 0.0016,
      phase: Math.random() * Math.PI * 2,
      size: 2.8 + Math.random() * 1.4,
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

    const drawWorker = (x, y, r, color) => {
      ctx.beginPath();
      ctx.arc(x, y - r * 1.15, r * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y + r * 0.75, r, Math.PI, 0);
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
      ctx.moveTo(-8, 0);
      ctx.lineTo(-3, 6);
      ctx.lineTo(10, -9);
      ctx.stroke();
      ctx.restore();
    };

    const drawPlane = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.2) * 5);
      ctx.rotate(-0.12 + Math.sin(time) * 0.06);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(20, -8);
      ctx.lineTo(8, 3);
      ctx.lineTo(20, 12);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-3, 3);
      ctx.lineTo(-13, 14);
      ctx.moveTo(-4, -1);
      ctx.lineTo(-13, -13);
      ctx.stroke();

      ctx.restore();
    };

    const drawHome = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.15) * 5);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(-44, -4);
      ctx.lineTo(0, -42);
      ctx.lineTo(44, -4);
      ctx.stroke();

      rr(-34, -4, 68, 58, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.stroke();

      rr(-10, 18, 20, 36, 5);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawBuilding = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      rr(-62, -92, 124, 184, 16);
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(-46, -72, 92, 144, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          rr(-29 + col * 29, -54 + row * 24, 13, 13, 3);
          ctx.fillStyle = `rgba(244,197,66,${
            0.35 + 0.35 * Math.sin(time * 2 + row + col)
          })`;
          ctx.fill();
        }
      }

      rr(-18, 46, 36, 46, 6);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawHub = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 60, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        60,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 +
          time * 0.45 +
          Math.PI * 2 * (0.58 + Math.sin(time) * 0.2),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 38, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ARRIVAL", x, y - 4);
      ctx.fillText("SUPPORT", x, y + 13);

      drawCheck(x + 42, y + 38, 0.75);
    };

    const flow = (x1, y1, x2, y2, color) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 48, x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 50;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const airportX = w * 0.17;
      const hubX = w * 0.48;
      const hubY = h * 0.5;
      const homeX = w * 0.74;
      const companyX = w * 0.86;

      drawPlane(airportX, h * 0.28, 1.05);
      drawHome(homeX, h * 0.34, Math.min(w, h) / 720);
      drawBuilding(companyX, h * 0.63, Math.min(w, h) / 600);

      flow(airportX + 40, h * 0.3, hubX - 70, hubY, "rgba(0,0,0,0.13)");
      flow(hubX + 70, hubY - 14, homeX - 55, h * 0.35, "#F4C542");
      flow(hubX + 70, hubY + 18, companyX - 78, h * 0.63, "#67D946");

      workers.forEach((p, i) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        const x = airportX + 10 + (hubX - airportX - 90) * p.t;
        const y =
          h * (0.36 + p.lane * 0.09) +
          Math.sin(p.t * Math.PI) * -32 +
          Math.sin(time * 2 + p.phase) * 3;

        drawWorker(x, y, p.size, p.t > 0.72 ? "#F4C542" : "rgba(0,0,0,0.48)");
      });

      drawHub(hubX, hubY);

      for (let i = 0; i < 16; i++) {
        const p = (time * 0.16 + i / 16) % 1;
        const x = hubX + 72 + (companyX - hubX - 150) * p;
        const y =
          hubY + Math.sin(p * Math.PI) * -36 + (i % 2 === 0 ? -42 : 42) * p;

        drawWorker(x, y, 3.1, i % 2 === 0 ? "#F4C542" : "#67D946");
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
      className="font-arimo relative overflow-hidden bg-[#FFF9E6] pt-26"
    >
      <div
        className="absolute left-0 top-0 h-[55%] w-full bg-[#FFE994]"
        style={{ clipPath: "ellipse(85% 65% at 50% 0%)" }}
      />

      <div
        className="absolute bottom-0 left-0 h-[45%] w-full bg-[#CFF7BC]"
        style={{ clipPath: "ellipse(80% 55% at 50% 100%)" }}
      />

      <div className="relative z-10 container mx-auto rounded-xl px-4 ">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="relocate-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <PlaneLanding size={14} strokeWidth={2.2} />
              Relocation & Onboarding
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["From", "arrival", "to"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="relocate-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="relocate-word inline-block">workplace,</span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="relocate-word inline-block text-[#1f7a2e]">
                    smoothly.
                  </span>
                </span>

                <svg
                  className="relocate-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="relocate-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              We support workers and employers with airport arrival,
              accommodation guidance, workplace orientation, first-day
              coordination and post-placement follow-up.
            </p>

            <div className="relocate-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [MapPinCheck, "Arrival support"],
                [Home, "Accommodation"],
                [Building2, "Workplace start"],
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

            <div className="relocate-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Plan onboarding
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
                View support flow
              </a>
            </div>
          </div>

          <div className="relocate-reveal relative h-[420px] w-full sm:h-[500px] lg:h-[590px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRelocationOnboarding;
