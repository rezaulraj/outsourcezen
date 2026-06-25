import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  ClipboardCheck,
  MapPinned,
  PackageCheck,
  Route,
  Truck,
  Warehouse,
} from "lucide-react";

const points = [
  {
    title: "Driver & fleet support",
    text: "Reliable drivers and transport workers for route, delivery and fleet operations.",
    icon: Truck,
    color: "#FFE994",
  },
  {
    title: "Warehouse workforce",
    text: "Staff for picking, packing, sorting, loading and warehouse shift coverage.",
    icon: Warehouse,
    color: "#CFF7BC",
  },
  {
    title: "Route reliability",
    text: "Support for delivery teams, dispatch operations and on-time movement.",
    icon: Route,
    color: "#A6E6EC",
  },
  {
    title: "Screened logistics talent",
    text: "Candidates are checked for readiness, reliability and role-specific requirements.",
    icon: BadgeCheck,
    color: "#FFF6C8",
  },
];

const stats = [
  { value: "7000+", label: "Logistics Workers" },
  { value: "48 Hours", label: "Initial Shortlisting" },
  { value: "25+", label: "Countries Served" },
  { value: "96%", label: "Employer Satisfaction" },
];

const WhatTransportationLogisticsRecruitment = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".logi-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".logi-what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".logi-what-card", {
        y: 35,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.4,
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
      ctx.globalAlpha = 0.08;
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

    const drawWorker = (x, y, s, color, box = false) => {
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
      ctx.lineTo(0, 22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(-16, 10 + Math.sin(time * 4 + x) * 3);
      ctx.moveTo(0, -2);
      ctx.lineTo(17, 10 + Math.cos(time * 4 + x) * 3);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 22);
      ctx.lineTo(-11, 42);
      ctx.moveTo(0, 22);
      ctx.lineTo(11, 42);
      ctx.stroke();

      if (box) {
        rr(16, 0, 28, 22, 5);
        ctx.fillStyle = "#FFF6C8";
        ctx.fill();
        ctx.stroke();
      }

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

    const drawTruck = (x, y, s, color = "#FFE994") => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

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

    const drawWarehouse = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(-105, -60);
      ctx.lineTo(0, -110);
      ctx.lineTo(105, -60);
      ctx.lineTo(105, 85);
      ctx.lineTo(-105, 85);
      ctx.closePath();

      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("LOGISTICS HUB", 0, -48);

      [-55, 0, 55].forEach((bx) => {
        rr(bx - 20, 5, 40, 80, 7);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bx - 20, 30);
        ctx.lineTo(bx + 20, 30);
        ctx.moveTo(bx - 20, 55);
        ctx.lineTo(bx + 20, 55);
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      ctx.restore();
    };

    const drawCheckpoint = (x, y, label, color, iconType) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.2 + x) * 3);

      rr(-78, -38, 156, 76, 22);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-50, 0, 20, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      if (iconType === "box") {
        drawBox(-50, 0, 0.45, "#FFF6C8");
      }

      if (iconType === "pin") {
        ctx.beginPath();
        ctx.arc(-50, -5, 7, 0, Math.PI * 2);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-50, 15);
        ctx.lineTo(-58, 0);
        ctx.lineTo(-42, 0);
        ctx.closePath();
        ctx.fillStyle = "#111";
        ctx.fill();
      }

      if (iconType === "check") {
        ctx.beginPath();
        ctx.moveTo(-58, 0);
        ctx.lineTo(-52, 7);
        ctx.lineTo(-41, -7);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      ctx.fillStyle = "#111";
      ctx.font = "800 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(label, 23, 5);

      ctx.restore();
    };

    const drawRoute = (points, color = "#67D946") => {
      ctx.beginPath();

      points.forEach(([x, y], index) => {
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 46;
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 4; i++) {
        const p = (time * 0.13 + i / 4) % 1;
        const total = points.length - 1;
        const seg = Math.min(Math.floor(p * total), total - 1);
        const local = p * total - seg;

        const [x1, y1] = points[seg];
        const [x2, y2] = points[seg + 1];

        const x = x1 + (x2 - x1) * local;
        const y = y1 + (y2 - y1) * local;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      points.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    const drawProcessLabel = (x, y) => {
      rr(x - 128, y - 44, 256, 88, 26);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SUPPLY CHAIN JOURNEY", x, y - 8);

      ctx.font = "900 18px Arimo";
      ctx.fillText("FROM STAFFING TO DELIVERY", x, y + 17);

      ctx.beginPath();
      ctx.arc(x + 112, y - 32, 7 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();
    };

    const drawConveyor = (x, y, width) => {
      ctx.beginPath();
      ctx.moveTo(x - width / 2, y);
      ctx.lineTo(x + width / 2, y);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      for (let i = 0; i < 7; i++) {
        const bx = x - width / 2 + ((time * 52 + i * 64) % width);
        drawBox(bx, y - 12, 0.55, i % 2 ? "#FFE994" : "#CFF7BC");
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();

      drawRoute([
        [w * 0.18, h * 0.22],
        [w * 0.34, h * 0.34],
        [w * 0.5, h * 0.42],
        [w * 0.67, h * 0.35],
        [w * 0.84, h * 0.54],
      ]);

      drawRoute(
        [
          [w * 0.5, h * 0.42],
          [w * 0.45, h * 0.62],
          [w * 0.28, h * 0.78],
          [w * 0.7, h * 0.8],
          [w * 0.86, h * 0.68],
        ],
        "#F4C542",
      );

      drawCheckpoint(w * 0.18, h * 0.22, "SOURCE", "#FFE994", "check");
      drawCheckpoint(w * 0.34, h * 0.34, "SCREEN", "#CFF7BC", "check");
      drawWarehouse(w * 0.5, h * 0.43, Math.min(w, h) / 820);
      drawCheckpoint(w * 0.68, h * 0.35, "DISPATCH", "#A6E6EC", "pin");
      drawCheckpoint(w * 0.84, h * 0.54, "DELIVER", "#FFF6C8", "box");

      drawConveyor(w * 0.5, h * 0.62, Math.min(w * 0.54, 360));

      drawWorker(w * 0.28, h * 0.7, Math.min(w, h) / 780, "#F4C542", true);
      drawWorker(w * 0.62, h * 0.7, Math.min(w, h) / 780, "#67D946", true);

      drawTruck(
        w * 0.08 + ((time * 55) % (w * 0.78)),
        h * 0.84,
        Math.min(w, h) / 850,
        "#FFE994",
      );

      drawProcessLabel(w * 0.5, h * 0.12);

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
      className="font-arimo bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="logi-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
              What Is Transportation & Logistics Recruitment?
            </p>

            <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
              {[
                "Connecting",
                "logistics",
                "teams",
                "with",
                "smooth",
                "movement",
              ].map((word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="logi-what-word inline-block">{word}</span>
                </span>
              ))}
            </h2>

            <p className="logi-what-reveal mt-6 max-w-xl text-base leading-7 text-black/75">
              Transportation and logistics recruitment focuses on sourcing,
              screening and deploying reliable drivers, warehouse workers,
              dispatch staff and delivery teams who keep supply chains moving
              smoothly.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map(({ icon: Icon, ...item }) => (
                <article
                  key={item.title}
                  className="logi-what-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={22} strokeWidth={2.4} />
                  </div>

                  <h3 className="text-lg font-bold tracking-[-0.03em] text-black">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-black/70">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="logi-what-reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
              >
                Request Logistics Staff
                <ArrowRight size={16} />
              </a>

              <a
                href="#transportation-logistics-role"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black"
              >
                View logistics roles
              </a>
            </div>
          </div>

          <div className="logi-what-reveal relative h-[460px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[560px] lg:h-[640px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        {/* <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="logi-what-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <p className="text-4xl font-normal tracking-[-0.06em] text-black">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {item.label}
              </p>
            </article>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default WhatTransportationLogisticsRecruitment;
