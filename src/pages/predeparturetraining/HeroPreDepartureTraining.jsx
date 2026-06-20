import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  GraduationCap,
  HardHat,
  Plane,
  ShieldCheck,
} from "lucide-react";

const HeroPreDepartureTraining = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pre-word", {
        y: 55,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".pre-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".pre-line", {
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

    const workers = Array.from({ length: 38 }, (_, i) => ({
      t: Math.random(),
      lane: i % 5,
      speed: 0.0014 + Math.random() * 0.0018,
      phase: Math.random() * Math.PI * 2,
      size: 2.5 + Math.random() * 1.7,
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

    const drawTrainingHub = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 62, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        62,
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
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-18 + x, -2 + y);
      ctx.lineTo(x, -14 + y);
      ctx.lineTo(18 + x, -2 + y);
      ctx.lineTo(x, 10 + y);
      ctx.closePath();
      ctx.stroke();

      drawCheck(x + 22, y + 24, 0.75);

      ctx.fillStyle = "#111";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("TRAINED", x, y + 76);
    };

    const drawCertificate = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.2) * 5);
      ctx.rotate(-0.08 + Math.sin(time) * 0.04);
      ctx.scale(scale, scale);

      rr(-58, -42, 116, 84, 14);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "700 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("CERTIFICATE", 0, -12);

      rr(-34, 0, 68, 7, 4);
      ctx.fillStyle = "rgba(0,0,0,0.16)";
      ctx.fill();

      rr(-24, 15, 48, 7, 4);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      drawCheck(38, 22, 0.6);

      ctx.restore();
    };

    const drawHelmet = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + 2) * 6);
      ctx.rotate(0.12 + Math.sin(time) * 0.04);
      ctx.scale(scale, scale);

      ctx.beginPath();
      ctx.arc(0, 5, 34, Math.PI, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-42, 4, 84, 15, 8);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -28);
      ctx.lineTo(0, 8);
      ctx.stroke();

      ctx.restore();
    };

    const drawPlane = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.1) * 8);
      ctx.rotate(-0.25 + Math.sin(time) * 0.08);
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

    const flow = (x1, y1, x2, y2, color) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 48, x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 48;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const hubX = w * 0.52;
      const hubY = h * 0.5;

      workers.forEach((p, i) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        const x = w * 0.08 + (hubX - w * 0.18) * p.t;
        const y =
          h * (0.25 + p.lane * 0.12) +
          Math.sin(p.t * Math.PI) * -35 +
          Math.sin(time * 2 + p.phase) * 3;

        drawWorker(x, y, p.size, p.t > 0.78 ? "#F4C542" : "rgba(0,0,0,0.48)");
      });

      flow(w * 0.22, h * 0.3, hubX - 70, hubY - 20, "rgba(0,0,0,0.13)");
      flow(w * 0.22, h * 0.5, hubX - 70, hubY, "rgba(0,0,0,0.13)");
      flow(w * 0.22, h * 0.7, hubX - 70, hubY + 20, "rgba(0,0,0,0.13)");
      flow(hubX + 70, hubY, w * 0.78, h * 0.5, "#F4C542");

      drawTrainingHub(hubX, hubY);

      for (let i = 0; i < 12; i++) {
        const p = (time * 0.16 + i / 12) % 1;
        const x = hubX + 75 + (w * 0.76 - hubX - 75) * p;
        const y = hubY + Math.sin(p * Math.PI) * -32;

        drawWorker(x, y, 3.2, "#67D946");
      }

      drawCertificate(w * 0.78, h * 0.32, Math.min(w, h) / 560);
      drawHelmet(w * 0.18, h * 0.82, Math.min(w, h) / 700);
      drawPlane(w * 0.82, h * 0.72, 1.05);

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
      className="font-arimo relative overflow-hidden pt-26 bg-[var(--color-primary-bg)]"
    >
      {/* <div
        className="absolute left-0 top-0 h-[55%] w-full bg-[#FFE994]"
        style={{ clipPath: "ellipse(85% 65% at 50% 0%)" }}
      /> */}

      {/* <div
        className="absolute bottom-0 left-0 h-[45%] w-full bg-[#CFF7BC]"
        style={{ clipPath: "ellipse(80% 55% at 50% 100%)" }}
      /> */}

      <div className="relative z-10 container mx-auto rounded-xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="pre-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <GraduationCap size={14} strokeWidth={2.2} />
              Pre-Departure Training
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Workers", "ready", "before"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="pre-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="pre-word inline-block">they</span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="pre-word inline-block text-[#1f7a2e]">
                    arrive.
                  </span>
                </span>

                <svg
                  className="pre-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="pre-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              Our pre-departure training prepares workers for their job,
              workplace culture, safety requirements and daily life before
              deployment.
            </p>

            <div className="pre-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [HardHat, "Safety ready"],
                [BriefcaseBusiness, "Job prepared"],
                [BadgeCheck, "Trained workers"],
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

            <div className="pre-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Start training support
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
                View modules
              </a>
            </div>
          </div>

          <div className="pre-reveal relative h-[420px] w-full sm:h-[500px] lg:h-[590px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPreDepartureTraining;
