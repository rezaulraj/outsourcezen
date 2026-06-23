import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Boxes,
  Globe2,
  MapPinned,
  PackageCheck,
  Truck,
  Warehouse,
} from "lucide-react";

const stats = [
  { value: "7000+", label: "Logistics Workers" },
  { value: "25+", label: "Countries Served" },
  { value: "96%", label: "Employer Satisfaction" },
  { value: "48h", label: "Initial Shortlisting" },
];

const HeroTransportationLogistics = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".logistics-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".logistics-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".logistics-line", {
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
      ctx.globalAlpha = 0.09;
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;

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

    const drawWarehouse = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(-120, -70);
      ctx.lineTo(0, -120);
      ctx.lineTo(120, -70);
      ctx.lineTo(120, 85);
      ctx.lineTo(-120, 85);
      ctx.closePath();
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 16px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("WAREHOUSE", 0, -58);

      for (let i = -80; i <= 80; i += 80) {
        rr(i - 24, -25, 48, 70, 8);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i - 24, 0);
        ctx.lineTo(i + 24, 0);
        ctx.moveTo(i - 24, 20);
        ctx.lineTo(i + 24, 20);
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      rr(-52, 25, 104, 60, 8);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-52, 45);
      ctx.lineTo(52, 45);
      ctx.moveTo(-52, 65);
      ctx.lineTo(52, 65);
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.stroke();

      ctx.restore();
    };

    const drawTruck = (x, y, s, color = "#FFE994", dir = 1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s * dir, s);

      rr(-62, -28, 82, 42, 10);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(18, -18, 42, 32, 8);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(60, 14);
      ctx.lineTo(72, 14);
      ctx.stroke();

      [-35, 35].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 18, 11, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wx, 18, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawVan = (x, y, s, color = "#CFF7BC") => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-42, -22, 84, 38, 12);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(8, -37, 28, 20, 6);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      [-22, 25].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 18, 9, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wx, 18, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawBox = (x, y, s, color = "#FFF6C8") => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + x) * 2);
      ctx.scale(s, s);

      rr(-18, -14, 36, 28, 5);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -3);
      ctx.lineTo(18, -3);
      ctx.moveTo(0, -14);
      ctx.lineTo(0, 14);
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 1.3;
      ctx.stroke();

      ctx.restore();
    };

    const drawForklift = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4) * 2);
      ctx.scale(s, s);

      rr(-38, -20, 55, 34, 8);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(0, -48, 30, 30, 6);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(32, -42);
      ctx.lineTo(32, 16);
      ctx.moveTo(32, 12);
      ctx.lineTo(66, 12);
      ctx.stroke();

      drawBox(76, 5, 0.75, "#CFF7BC");

      [-20, 18].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 18, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wx, 18, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawConveyor = (x, y, width) => {
      ctx.beginPath();
      ctx.moveTo(x - width / 2, y);
      ctx.lineTo(x + width / 2, y);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x - width / 2, y + 16);
      ctx.lineTo(x + width / 2, y + 16);
      ctx.stroke();

      for (let i = 0; i < 8; i++) {
        const bx = x - width / 2 + ((time * 55 + i * 65) % width);
        drawBox(bx, y - 10, 0.6, i % 2 ? "#FFE994" : "#FFF6C8");
      }
    };

    const drawRoute = (points, activeColor = "#67D946") => {
      ctx.beginPath();
      points.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 3;
      ctx.setLineDash([9, 13]);
      ctx.lineDashOffset = -time * 50;
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 5; i++) {
        const p = (time * 0.13 + i / 5) % 1;
        const totalSegments = points.length - 1;
        const seg = Math.min(Math.floor(p * totalSegments), totalSegments - 1);
        const local = p * totalSegments - seg;

        const [x1, y1] = points[seg];
        const [x2, y2] = points[seg + 1];

        const x = x1 + (x2 - x1) * local;
        const y = y1 + (y2 - y1) * local;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = activeColor;
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      points.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    const drawFloatingCard = (x, y, title, text, color) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.5 + x) * 5);

      rr(-92, -38, 184, 76, 22);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-62, 0, 20, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(title, 20, -8);

      ctx.font = "900 16px Arimo";
      ctx.fillText(text, 20, 15);

      ctx.restore();
    };

    const drawPlane = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.22);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(-48, 0);
      ctx.lineTo(50, -12);
      ctx.lineTo(38, 0);
      ctx.lineTo(50, 12);
      ctx.closePath();
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-8, -5);
      ctx.lineTo(-25, -32);
      ctx.moveTo(-8, 5);
      ctx.lineTo(-25, 32);
      ctx.stroke();

      ctx.restore();
    };

    const drawPort = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-60, -22, 120, 44, 8);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = -35; i <= 35; i += 35) {
        rr(i - 14, -48, 28, 26, 5);
        ctx.fillStyle = i === 0 ? "#FFE994" : "#CFF7BC";
        ctx.fill();
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(-70, 26);
      ctx.lineTo(70, 26);
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.stroke();

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();

      drawRoute([
        [w * 0.16, h * 0.25],
        [w * 0.34, h * 0.38],
        [w * 0.5, h * 0.45],
        [w * 0.72, h * 0.34],
        [w * 0.86, h * 0.52],
      ]);

      drawRoute(
        [
          [w * 0.5, h * 0.45],
          [w * 0.42, h * 0.67],
          [w * 0.25, h * 0.78],
          [w * 0.68, h * 0.82],
          [w * 0.84, h * 0.7],
        ],
        "#F4C542",
      );

      drawPlane(
        w * 0.28 + ((time * 28) % (w * 0.48)),
        h * 0.16,
        Math.min(w, h) / 950,
      );
      drawPort(w * 0.18, h * 0.48, Math.min(w, h) / 830);

      drawWarehouse(w * 0.5, h * 0.47, Math.min(w, h) / 760);
      drawConveyor(w * 0.5, h * 0.66, Math.min(w * 0.55, 390));

      drawForklift(
        w * 0.22 + ((time * 44) % (w * 0.28)),
        h * 0.72,
        Math.min(w, h) / 840,
      );

      drawTruck(
        w * 0.08 + ((time * 56) % (w * 0.78)),
        h * 0.82,
        Math.min(w, h) / 840,
        "#FFE994",
        1,
      );

      drawTruck(
        w * 0.92 - ((time * 42) % (w * 0.74)),
        h * 0.88,
        Math.min(w, h) / 900,
        "#CFF7BC",
        -1,
      );

      drawVan(
        w * 0.15 + ((time * 62) % (w * 0.68)),
        h * 0.58,
        Math.min(w, h) / 900,
        "#CFF7BC",
      );

      drawFloatingCard(
        w * 0.22,
        h * 0.33,
        "Truck #27",
        "On Route ✓",
        "#CFF7BC",
      );
      drawFloatingCard(
        w * 0.78,
        h * 0.22,
        "Warehouse",
        "Operational ✓",
        "#FFE994",
      );
      drawFloatingCard(
        w * 0.75,
        h * 0.62,
        "Delivery",
        "96% On-Time",
        "#A6E6EC",
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
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="logistics-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#FFF9E6] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <Truck size={14} strokeWidth={2.2} />
              Transportation & Logistics Recruitment
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Reliable", "logistics"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="logistics-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="logistics-word inline-block">workforce</span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="logistics-word inline-block text-[#1f7a2e]">
                    for movement.
                  </span>
                </span>

                <svg
                  className="logistics-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="logistics-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              We connect employers with dependable drivers, warehouse workers,
              dispatch support and logistics teams for smooth fleet, delivery
              and supply chain operations.
            </p>

            <div className="logistics-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [Warehouse, "Warehouse staff"],
                [Truck, "Fleet support"],
                [PackageCheck, "Delivery teams"],
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

            <div className="logistics-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                href="/industries/transportation-logistics"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                Explore roles
              </a>
            </div>

            {/* <div className="logistics-reveal mt-9 grid max-w-xl gap-3 sm:grid-cols-4">
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

          <div className="logistics-reveal relative h-[460px] w-full overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[560px] lg:h-[660px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroTransportationLogistics;
