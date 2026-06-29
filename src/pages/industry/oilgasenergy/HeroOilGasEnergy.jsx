import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Factory,
  Flame,
  Gauge,
  HardHat,
  ShieldCheck,
  Sun,
  UsersRound,
  Wind,
  Zap,
} from "lucide-react";

const stats = [
  { value: "1500+", label: "Energy Professionals" },
  { value: "20+", label: "Energy Projects" },
  { value: "18+", label: "Countries Supported" },
];

const HeroOilGasEnergy = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".energy-word", {
        y: 70,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".energy-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".energy-line", {
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

    const drawSky = () => {
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#FFF9E6");
      sky.addColorStop(0.55, "#F4ECD7");
      sky.addColorStop(1, "#DCCFB0");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

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

      for (let i = 0; i < 32; i++) {
        const x = ((i * 89) % w) + Math.sin(time + i) * 8;
        const y = ((i * 47) % h) + Math.cos(time * 1.1 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.26)";
        ctx.fill();
      }
    };

    const drawGround = () => {
      const gy = h * 0.76;

      const ground = ctx.createLinearGradient(0, gy, 0, h);
      ground.addColorStop(0, "#DFD2B3");
      ground.addColorStop(1, "#C8B895");
      ctx.fillStyle = ground;
      ctx.fillRect(0, gy, w, h - gy);

      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();

      for (let i = 0; i < 8; i++) {
        const y = gy + (h - gy) * Math.pow(i / 8, 1.5);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = "rgba(0,0,0,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const drawSun = () => {
      const x = w * 0.82;
      const y = h * 0.16;
      const r = Math.min(w, h) * 0.07;

      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.arc(x, y, r * 2.5 + Math.sin(time * 2) * 8, 0, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      for (let i = 0; i < 12; i++) {
        const a = (Math.PI * 2 * i) / 12 + time * 0.25;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(a) * (r + 12), y + Math.sin(a) * (r + 12));
        ctx.lineTo(x + Math.cos(a) * (r + 28), y + Math.sin(a) * (r + 28));
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const drawRefinery = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      const pipe = (px, py, height, color = "#1C1810") => {
        rr(px - 10, py - height, 20, height, 6);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.globalAlpha = 0.18 + Math.sin(time * 1.2 + px) * 0.05;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.ellipse(
            px + Math.sin(time * 0.9 + i) * 8,
            py - height - 18 - i * 10,
            13 + i * 3,
            7 + i,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = "#111";
          ctx.fill();
        }
        ctx.restore();
      };

      rr(-120, -52, 240, 72, 12);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      pipe(-80, -20, 145);
      pipe(-35, -20, 105, "#2E2618");
      pipe(74, -20, 130);

      rr(30, -125, 58, 105, 12);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(30, -100 + i * 25);
        ctx.lineTo(88, -100 + i * 25);
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(-120, -16);
      ctx.lineTo(120, -16);
      ctx.moveTo(-100, -52);
      ctx.lineTo(-100, 20);
      ctx.moveTo(-45, -52);
      ctx.lineTo(-45, 20);
      ctx.moveTo(30, -52);
      ctx.lineTo(30, 20);
      ctx.moveTo(95, -52);
      ctx.lineTo(95, 20);
      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    const drawOilRig = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      rr(-100, -20, 200, 28, 8);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-78, -20);
      ctx.lineTo(0, -190);
      ctx.lineTo(78, -20);
      ctx.moveTo(-45, -20);
      ctx.lineTo(0, -125);
      ctx.lineTo(45, -20);
      ctx.moveTo(-55, -80);
      ctx.lineTo(55, -80);
      ctx.moveTo(-34, -130);
      ctx.lineTo(34, -130);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -190);
      ctx.lineTo(0, -230);
      ctx.moveTo(0, -230);
      ctx.lineTo(48, -210);
      ctx.stroke();

      rr(34, -116, 48, 24, 8);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      rr(-92, -58, 54, 38, 8);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      for (let i = 0; i < 4; i++) {
        const p = (time * 0.18 + i * 0.25) % 1;
        const px = -80 + p * 160;
        const py = -20 - Math.sin(p * Math.PI) * 22;

        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 ? "#67D946" : "#F4C542";
        ctx.fill();
      }

      ctx.restore();
    };

    const drawWindTurbine = (x, y, s, phase = 0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -132);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -132, 12, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.save();
      ctx.translate(0, -132);
      ctx.rotate(time * 1.2 + phase);

      for (let i = 0; i < 3; i++) {
        ctx.rotate((Math.PI * 2) / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -65);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 5;
        ctx.stroke();

        rr(-6, -70, 12, 44, 8);
        ctx.fillStyle = "#CFF7BC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();
      ctx.restore();
    };

    const drawSolarFarm = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
          ctx.save();
          ctx.translate(col * 48, row * 34);
          ctx.rotate(-0.18);
          rr(-20, -12, 40, 24, 5);
          ctx.fillStyle = "#A6E6EC";
          ctx.fill();
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(-20, 0);
          ctx.lineTo(20, 0);
          ctx.moveTo(-7, -12);
          ctx.lineTo(-7, 12);
          ctx.moveTo(7, -12);
          ctx.lineTo(7, 12);
          ctx.strokeStyle = "rgba(0,0,0,0.22)";
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.restore();
        }
      }

      ctx.restore();
    };

    const drawPipeline = () => {
      const y = h * 0.78;

      ctx.beginPath();
      ctx.moveTo(w * 0.08, y);
      ctx.lineTo(w * 0.92, y);
      ctx.strokeStyle = "#1C1810";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(w * 0.08, y);
      ctx.lineTo(w * 0.92, y);
      ctx.strokeStyle = "#E7B53A";
      ctx.lineWidth = 3;
      ctx.setLineDash([14, 16]);
      ctx.lineDashOffset = -time * 55;
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 7; i++) {
        const x = w * 0.12 + ((time * 50 + i * 120) % (w * 0.76));

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    const drawWorker = (
      x,
      y,
      s,
      color = "#FFE994",
      action = "point",
      flip = false,
    ) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.3 + x) * 2);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-7, 0);
      ctx.lineTo(-11, 25);
      ctx.moveTo(7, 0);
      ctx.lineTo(11, 25);
      ctx.stroke();

      rr(-17, -42, 34, 45, 8);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-15, -34);
      ctx.lineTo(-34, -18 + Math.sin(time * 3) * 3);
      ctx.moveTo(15, -34);
      ctx.lineTo(action === "point" ? 44 : 34, action === "point" ? -50 : -24);
      ctx.strokeStyle = color;
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-34, -18 + Math.sin(time * 3) * 3, 5, 0, Math.PI * 2);
      ctx.arc(
        action === "point" ? 44 : 34,
        action === "point" ? -50 : -24,
        5,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -42);
      ctx.lineTo(0, -50);
      ctx.strokeStyle = "#E7B58B";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -64, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rr(-17, -81, 34, 12, 5);
      ctx.fillStyle = "#F4C542";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -74);
      ctx.quadraticCurveTo(0, -95, 18, -74);
      ctx.fillStyle = "#F4C542";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-5, -63, 2, 0, Math.PI * 2);
      ctx.arc(5, -63, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -58, 4, 0.1, Math.PI - 0.1);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawHelicopter = () => {
      const x = w * 0.1 + ((time * 35) % (w * 0.82));
      const y = h * 0.17 + Math.sin(time * 1.8) * 12;

      ctx.save();
      ctx.translate(x, y);

      rr(-38, -12, 76, 24, 12);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      rr(8, -22, 24, 16, 6);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(38, 0);
      ctx.lineTo(70, -8);
      ctx.lineTo(70, 8);
      ctx.closePath();
      ctx.fillStyle = "#1C1810";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-4, -18);
      ctx.lineTo(-4, -32);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-58, -34);
      ctx.lineTo(50, -34);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4 + Math.sin(time * 18) * 1;
      ctx.stroke();

      ctx.restore();
    };

    const drawFloatingCard = (x, y, title, value, color, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.45 + phase) * 7);

      rr(-92, -34, 184, 68, 22);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-60, 0, 18, 0, Math.PI * 2);
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

    const drawStatusPanel = () => {
      ctx.save();
      ctx.translate(w * 0.5, h * 0.1 + Math.sin(time * 1.2) * 5);

      rr(-150, -50, 300, 100, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-108, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ENERGY WORKFORCE STATUS", 28, -13);

      ctx.font = "900 18px Arimo";
      ctx.fillText("CERTIFIED TEAM READY", 28, 17);

      ctx.beginPath();
      ctx.arc(130, -35, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawSky();
      drawSun();
      drawGround();
      drawPipeline();

      const s = Math.min(w, h) / 780;

      drawRefinery(w * 0.22, h * 0.71, s);
      drawOilRig(w * 0.52, h * 0.74, s);
      drawWindTurbine(w * 0.75, h * 0.72, s * 0.95, 0);
      drawWindTurbine(w * 0.86, h * 0.7, s * 0.82, 1.2);
      drawSolarFarm(w * 0.68, h * 0.78, s * 0.9);

      drawWorker(w * 0.34, h * 0.82, s * 0.9, "#FFE994", "point", false);
      drawWorker(w * 0.62, h * 0.83, s * 0.9, "#CFF7BC", "talk", true);

      drawHelicopter();

      drawStatusPanel();

      drawFloatingCard(
        w * 0.23,
        h * 0.26,
        "Offshore",
        "Crew Ready",
        "#FFE994",
        0,
      );
      drawFloatingCard(
        w * 0.78,
        h * 0.34,
        "Renewables",
        "Technicians ✓",
        "#CFF7BC",
        2,
      );
      drawFloatingCard(
        w * 0.52,
        h * 0.92,
        "HSE",
        "Safety Checked",
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
            <span className="energy-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#FFF9E6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <Flame size={14} strokeWidth={2.2} />
              Oil, Gas & Energy Recruitment
            </span>

            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.04em] text-black sm:text-[3.7rem] lg:text-[4.35rem]">
              {["Powering", "energy"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2"
                >
                  <span className="energy-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              {["projects", "with"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2"
                >
                  <span className="energy-word inline-block">{word}</span>
                </span>
              ))}

              <span className="relative inline-block overflow-visible">
                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="energy-word inline-block text-[#1f7a2e]">
                    skilled talent.
                  </span>
                </span>

                <svg
                  className="energy-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="energy-reveal mt-7 max-w-xl text-base leading-7 text-black/75">
              We help oil, gas and energy employers source qualified workers for
              offshore platforms, refineries, gas plants, EPC projects,
              renewable energy sites and power infrastructure operations.
            </p>

            <div className="energy-reveal mt-7 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                [HardHat, "Certified workers"],
                [ShieldCheck, "HSE focused"],
                [Zap, "Fast mobilization"],
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

            <div className="energy-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Request Energy Staff
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="#energy-roles"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                Explore roles
              </a>
            </div>

            {/* <div className="energy-reveal mt-9 grid max-w-xl gap-3 sm:grid-cols-3">
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

          <div className="energy-reveal relative h-[500px] w-full overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[620px] lg:h-[720px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOilGasEnergy;
