import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Factory,
  Package,
  SearchCheck,
  ShieldCheck,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Workforce Sourcing",
    text: "Identifying suitable manufacturing talent for production and factory operations.",
    icon: Users,
    color: "#FFE994",
  },
  {
    title: "Candidate Screening",
    text: "Evaluating experience, discipline and role suitability before placement.",
    icon: SearchCheck,
    color: "#CFF7BC",
  },
  {
    title: "Production Support",
    text: "Providing workers who help maintain productivity and operational continuity.",
    icon: Package,
    color: "#A6E6EC",
  },
  {
    title: "Compliance Focus",
    text: "Supporting workplace safety awareness and manufacturing standards.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
];

const WhatManufacturingRecruitment = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".manufacturing-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".manufacturing-what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".manufacturing-card", {
        y: 40,
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

    let w, h, frame;
    let time = 0;

    const workers = Array.from({ length: 18 }, (_, i) => ({
      progress: (i / 18) * 0.9,
      speed: 0.0012 + Math.random() * 0.001,
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

    const rr = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
    };

    const drawWorker = (x, y, color) => {
      ctx.beginPath();
      ctx.arc(x, y - 10, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y + 5, 7, Math.PI, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    const drawNode = (x, y, label, color) => {
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        40,
        -Math.PI / 2,
        -Math.PI / 2 + Math.PI * 2 * (0.7 + Math.sin(time * 1.5) * 0.1),
      );
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(label, x, y + 4);
    };

    const drawArrow = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 12]);
      ctx.lineDashOffset = -time * 50;
      ctx.stroke();
      ctx.setLineDash([]);

      const angle = Math.atan2(y2 - y1, x2 - x1);

      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(
        x2 - 12 * Math.cos(angle - 0.4),
        y2 - 12 * Math.sin(angle - 0.4),
      );
      ctx.moveTo(x2, y2);
      ctx.lineTo(
        x2 - 12 * Math.cos(angle + 0.4),
        y2 - 12 * Math.sin(angle + 0.4),
      );

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    const drawFactory = (x, y) => {
      rr(x - 50, y - 20, 100, 70, 12);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x - 50, y - 20);
      ctx.lineTo(x - 25, y - 45);
      ctx.lineTo(x, y - 20);
      ctx.lineTo(x + 25, y - 45);
      ctx.lineTo(x + 50, y - 20);

      ctx.stroke();

      rr(x - 35, y - 90, 18, 45, 6);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x - 26 + Math.sin(time) * 4, y - 108, 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      time += 0.014;

      const sourceX = w * 0.15;
      const screenX = w * 0.45;
      const factoryX = w * 0.8;
      const centerY = h * 0.5;

      drawNode(sourceX, centerY, "SOURCE", "#FFE994");
      drawNode(screenX, centerY, "SCREEN", "#67D946");
      drawFactory(factoryX, centerY - 10);

      drawArrow(sourceX + 40, centerY, screenX - 40, centerY);
      drawArrow(screenX + 40, centerY, factoryX - 70, centerY);

      workers.forEach((worker, i) => {
        worker.progress += worker.speed;

        if (worker.progress > 1) {
          worker.progress = 0;
        }

        let x;

        if (worker.progress < 0.5) {
          const p = worker.progress / 0.5;
          x = sourceX + 40 + (screenX - sourceX - 80) * p;
        } else {
          const p = (worker.progress - 0.5) / 0.5;
          x = screenX + 40 + (factoryX - screenX - 110) * p;
        }

        const y = centerY + Math.sin(time * 3 + worker.phase) * 12;

        drawWorker(x, y, worker.progress > 0.5 ? "#67D946" : "#F4C542");
      });

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
          {/* Left Content */}
          <div>
            <p className="manufacturing-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
              What Is Manufacturing Recruitment?
            </p>

            <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
              {[
                "Connecting",
                "factories",
                "with",
                "the",
                "right",
                "talent",
              ].map((word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="manufacturing-what-word inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            <p className="manufacturing-what-reveal mt-6 max-w-xl text-base leading-7 text-black/75">
              Manufacturing recruitment focuses on sourcing, screening and
              deploying workers for production facilities, assembly plants and
              industrial operations. It ensures businesses have dependable
              talent to maintain productivity and operational continuity.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {features.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="manufacturing-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
                  >
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon size={22} strokeWidth={2.4} />
                    </div>

                    <h3 className="text-lg font-bold text-black">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-black/70">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Canvas */}
          <div className="manufacturing-what-reveal relative h-[360px] sm:h-[450px] lg:h-[520px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatManufacturingRecruitment;
