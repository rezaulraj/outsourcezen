import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  UserCheck,
  FileCheck,
  Plane,
  Briefcase,
  ShieldCheck,
  MapPin,
} from "lucide-react";

const steps = [
  {
    title: "Candidate Selection",
    time: "Day 1–7",
    icon: UserCheck,
  },
  {
    title: "Trade Testing",
    time: "Day 8–15",
    icon: ShieldCheck,
  },
  {
    title: "Documentation",
    time: "Day 16–25",
    icon: FileCheck,
  },
  {
    title: "Visa Processing",
    time: "Day 26–40",
    icon: MapPin,
  },
  {
    title: "Travel Arrangement",
    time: "Day 41–55",
    icon: Plane,
  },
  {
    title: "Workforce Deployment",
    time: "Final Stage",
    icon: Briefcase,
  },
];

const DeploymentTimeline = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".deploy-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        stagger: 0.06,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".deploy-card", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        delay: 0.3,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h, frame;
    let t = 0;

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

    const drawRoad = () => {
      ctx.beginPath();
      ctx.moveTo(w * 0.15, h * 0.2);
      ctx.quadraticCurveTo(w * 0.5, h * 0.45, w * 0.8, h * 0.25);
      ctx.quadraticCurveTo(w * 0.5, h * 0.65, w * 0.2, h * 0.75);

      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 12]);
      ctx.lineDashOffset = -t * 40;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const drawDot = (x, y, color) => {
      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawPlane = (x, y) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.4);

      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(10, 0);
      ctx.lineTo(0, -6);
      ctx.closePath();

      ctx.fillStyle = "#111";
      ctx.fill();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.015;

      drawRoad();

      const points = [
        { x: w * 0.15, y: h * 0.2 },
        { x: w * 0.5, y: h * 0.45 },
        { x: w * 0.8, y: h * 0.25 },
        { x: w * 0.5, y: h * 0.65 },
        { x: w * 0.2, y: h * 0.75 },
      ];

      points.forEach((p, i) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + i);
        drawDot(p.x, p.y, pulse > 0.5 ? "#F4C542" : "rgba(0,0,0,0.25)");
      });

      const planeX = w * 0.15 + w * 0.7 * (0.5 + 0.5 * Math.sin(t * 0.5));

      const planeY = h * 0.4 + Math.sin(t * 2) * 80;

      drawPlane(planeX, planeY);

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
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* CANVAS BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* HEADER */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-5xl font-semibold tracking-[-0.04em] text-black">
            {"Deployment Timeline".split(" ").map((w, i) => (
              <span key={i} className="deploy-word inline-block mr-3">
                {w}
              </span>
            ))}
          </h2>

          <p className="mt-5 text-black/70">
            From selection to workplace arrival — fully managed workforce
            deployment flow.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative mx-auto max-w-5xl">
          {/* center line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-black/10 lg:block" />

          <div className="space-y-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isRight = i % 2 === 1;

              return (
                <div
                  key={i}
                  className={`deploy-card flex items-center ${
                    isRight ? "lg:justify-end" : "lg:justify-start"
                  }`}
                >
                  <div className="relative w-full rounded-[28px] border border-black/10 bg-white/60 p-6 backdrop-blur-sm lg:w-[45%]">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#FFE994] p-3">
                        <Icon size={20} />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-black/50">
                          {step.time}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold text-black">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* center dot */}
                  <div className="absolute left-1/2 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-[#F4C542] lg:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentTimeline;
