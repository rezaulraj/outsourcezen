import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Factory,
  PackageCheck,
  Settings,
  ShieldCheck,
} from "lucide-react";

const HeroManufacturing = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".manufacturing-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".manufacturing-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".manufacturing-line", {
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

    const drawWorker = (x, y, s, color, tool = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.8 + x) * 3);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

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

      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 18);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(-14, 8 + Math.sin(time * 4) * 3);
      ctx.moveTo(0, -2);
      ctx.lineTo(15, 8 + Math.cos(time * 4) * 3);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.lineTo(-10, 36);
      ctx.moveTo(0, 18);
      ctx.lineTo(10, 36);
      ctx.stroke();

      if (tool === 0) {
        rr(16, -4, 18, 14, 3);
        ctx.fillStyle = "#F4C542";
        ctx.fill();
        ctx.stroke();
      }

      if (tool === 1) {
        ctx.beginPath();
        ctx.moveTo(15, 8);
        ctx.lineTo(34, 8);
        ctx.moveTo(29, 3);
        ctx.lineTo(35, 8);
        ctx.lineTo(29, 13);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawFactory = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-130, -25, 260, 150, 18);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-130, -25);
      ctx.lineTo(-70, -75);
      ctx.lineTo(-10, -25);
      ctx.lineTo(50, -75);
      ctx.lineTo(130, -25);
      ctx.stroke();

      [-82, -42, 72].forEach((sx, i) => {
        rr(sx, -122, 28, 96, 8);
        ctx.fillStyle = "#111";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
          sx + 14 + Math.sin(time * 1.4 + i) * 8,
          -145 - Math.sin(time * 1.2 + i) * 8,
          10 + Math.sin(time + i) * 3,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "rgba(0,0,0,0.12)";
        ctx.fill();
      });

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 5; col++) {
          rr(-95 + col * 44, 6 + row * 32, 22, 18, 5);
          ctx.fillStyle = `rgba(244,197,66,${
            0.3 + 0.35 * Math.sin(time * 2 + row + col)
          })`;
          ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.15)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      rr(-22, 67, 44, 58, 7);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawConveyor = (x, y, width) => {
      rr(x - width / 2, y - 18, width, 36, 18);
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(x - width / 2 + 10, y - 10, width - 20, 20, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      for (let i = 0; i < 10; i++) {
        const px = x - width / 2 + ((time * 60 + i * 70) % width);

        rr(px - 15, y - 42, 30, 24, 5);
        ctx.fillStyle = i % 2 === 0 ? "#FFE994" : "#CFF7BC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      for (let i = 0; i < 12; i++) {
        const rx = x - width / 2 + 20 + i * ((width - 40) / 11);
        ctx.beginPath();
        ctx.arc(rx, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      }
    };

    const drawGear = (x, y, r, speed, reverse = false) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(time * speed * (reverse ? -1 : 1));

      ctx.strokeStyle = "#111";
      ctx.fillStyle = "#FFF9E6";
      ctx.lineWidth = 3;

      ctx.beginPath();
      for (let i = 0; i < 16; i++) {
        const a = (Math.PI * 2 * i) / 16;
        const rad = i % 2 === 0 ? r : r * 0.78;
        const px = Math.cos(a) * rad;
        const py = Math.sin(a) * rad;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.34, 0, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawGrid = () => {
      ctx.save();
      ctx.globalAlpha = 0.16;
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;

      const size = 44;
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

      drawGrid();

      const s = Math.min(w, h) / 760;

      drawFactory(w * 0.56, h * 0.42, s);
      drawConveyor(w * 0.56, h * 0.76, Math.min(w * 0.76, 520));

      drawGear(w * 0.18, h * 0.26, 38, 0.7);
      drawGear(w * 0.82, h * 0.22, 30, 0.9, true);
      drawGear(w * 0.2, h * 0.76, 28, 0.8, true);

      drawWorker(w * 0.28, h * 0.72, Math.min(w, h) / 720, "#F4C542", 0);
      drawWorker(w * 0.48, h * 0.72, Math.min(w, h) / 720, "#67D946", 1);
      drawWorker(w * 0.72, h * 0.72, Math.min(w, h) / 720, "#A6E6EC", 0);

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
        className="absolute bottom-0 left-0 h-[55%] w-full bg-[#CFF7BC]"
        style={{ clipPath: "ellipse(80% 55% at 50% 100%)" }}
      />

      <div className="relative z-10 container mx-auto rounded-xl px-4 pb-12 pt-10 ">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="manufacturing-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <Factory size={14} strokeWidth={2.2} />
              Manufacturing Recruitment
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Build", "high-performing"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="manufacturing-word inline-block">
                    {word}
                  </span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="manufacturing-word inline-block">
                    factory
                  </span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="manufacturing-word inline-block text-[#1f7a2e]">
                    teams.
                  </span>
                </span>

                <svg
                  className="manufacturing-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="manufacturing-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              We connect employers with dependable manufacturing workers for
              production lines, assembly plants, warehouses and industrial
              operations.
            </p>

            <div className="manufacturing-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [Settings, "Production ready"],
                [PackageCheck, "Factory support"],
                [ShieldCheck, "Quality focused"],
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

            <div className="manufacturing-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                href="/industries/manufacturing"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                View roles
              </a>
            </div>
          </div>

          <div className="manufacturing-reveal relative h-[440px] w-full sm:h-[520px] lg:h-[620px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroManufacturing;
