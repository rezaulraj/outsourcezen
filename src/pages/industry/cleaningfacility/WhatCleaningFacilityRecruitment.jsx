import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wrench,
} from "lucide-react";

const points = [
  {
    title: "Reliable cleaning teams",
    text: "Cleaners, janitors and housekeeping staff for daily building hygiene.",
    icon: Sparkles,
    color: "#FFE994",
  },
  {
    title: "Facility support workers",
    text: "Maintenance helpers and facility assistants for smooth building operations.",
    icon: Wrench,
    color: "#CFF7BC",
  },
  {
    title: "Shift-ready staffing",
    text: "Workers for day, night, weekend and high-traffic facility schedules.",
    icon: UsersRound,
    color: "#A6E6EC",
  },
  {
    title: "Safety & checklist focus",
    text: "Candidates matched for reliability, hygiene standards and workplace care.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
];

const stats = [
  { value: "6000+", label: "Facility Workers" },
  { value: "24/7", label: "Shift Support" },
  { value: "96%", label: "Client Satisfaction" },
  { value: "48 Hours", label: "Initial Shortlisting" },
];

const WhatCleaningFacilityRecruitment = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".clean-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".clean-what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".clean-what-card", {
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
      ctx.globalAlpha = 0.07;
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

    const drawPerson = (x, y, s, color, tool = "mop") => {
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
      ctx.lineTo(0, 24);
      ctx.moveTo(0, -2);
      ctx.lineTo(-16, 10 + Math.sin(time * 4 + x) * 4);
      ctx.moveTo(0, -2);
      ctx.lineTo(18, 10 + Math.cos(time * 4 + x) * 4);
      ctx.moveTo(0, 24);
      ctx.lineTo(-12, 44);
      ctx.moveTo(0, 24);
      ctx.lineTo(12, 44);
      ctx.stroke();

      if (tool === "mop") {
        ctx.beginPath();
        ctx.moveTo(20, 8);
        ctx.lineTo(42, 48);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(31, 48);
        ctx.lineTo(54, 48);
        ctx.strokeStyle = "#67D946";
        ctx.lineWidth = 5;
        ctx.stroke();
      }

      if (tool === "window") {
        ctx.beginPath();
        ctx.moveTo(18, 6);
        ctx.lineTo(40, -18 + Math.sin(time * 5) * 8);
        ctx.stroke();

        rr(34, -26 + Math.sin(time * 5) * 8, 22, 10, 4);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (tool === "wrench") {
        ctx.beginPath();
        ctx.moveTo(17, 8);
        ctx.lineTo(38, -8);
        ctx.moveTo(38, -8);
        ctx.lineTo(44, 2);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawBuildingMini = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-86, -80, 172, 160, 22);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          rr(-58 + col * 44, -45 + row * 38, 28, 24, 6);
          ctx.fillStyle = "rgba(166,230,236,0.45)";
          ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.22)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      rr(-20, 42, 40, 38, 8);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.restore();
    };

    const drawCleaningMachine = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4) * 2);
      ctx.scale(s, s);

      rr(-52, -20, 96, 38, 15);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(10, -45, 34, 28, 8);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-12, -18);
      ctx.lineTo(-36, -55);
      ctx.stroke();

      [-28, 26].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 21, 9, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      });

      ctx.beginPath();
      ctx.ellipse(-56, 20, 24, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(166,230,236,0.5)";
      ctx.fill();

      ctx.restore();
    };

    const drawNode = (x, y, label, color, index) => {
      const pulse = Math.sin(time * 3 + index) * 3;

      ctx.beginPath();
      ctx.arc(x, y, 44 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.8;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        44,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 + time * 0.45 + Math.PI * 2 * 0.68,
      );
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.stroke();

      if (index === 0) {
        drawPerson(x, y + 18, 0.32, color, "mop");
      }

      if (index === 1) {
        drawCheck(x, y, 0.85);
      }

      if (index === 2) {
        drawCleaningMachine(x, y + 14, 0.34);
      }

      if (index === 3) {
        drawPerson(x, y + 18, 0.32, color, "wrench");
      }

      ctx.fillStyle = "#111";
      ctx.font = "800 10px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(label, x, y + 66);
    };

    const drawFlow = (nodes) => {
      nodes.forEach((node, index) => {
        if (index === nodes.length - 1) return;

        const next = nodes[index + 1];

        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = "rgba(0,0,0,0.16)";
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 12]);
        ctx.lineDashOffset = -time * 42;
        ctx.stroke();
        ctx.setLineDash([]);

        const p = (time * 0.16 + index * 0.2) % 1;
        const x = node.x + (next.x - node.x) * p;
        const y = node.y + (next.y - node.y) * p;

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = index % 2 ? "#67D946" : "#F4C542";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    const drawChecklistPanel = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4) * 5);

      rr(-100, -54, 200, 108, 28);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("FACILITY READY", 0, -26);

      ["Clean", "Safe", "Operational"].forEach((item, i) => {
        const yy = 0 + i * 24;

        ctx.beginPath();
        ctx.arc(-55, yy, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        drawCheck(-55, yy, 0.42);

        ctx.fillStyle = "#111";
        ctx.font = "800 12px Arimo";
        ctx.textAlign = "left";
        ctx.fillText(item, -35, yy + 4);
      });

      ctx.restore();
    };

    const drawSparkles = () => {
      for (let i = 0; i < 30; i++) {
        const x = ((i * 79) % w) + Math.sin(time + i) * 9;
        const y = ((i * 43) % h) + Math.cos(time * 1.2 + i) * 7;
        const r = 2 + Math.sin(time * 3 + i) * 1;

        ctx.beginPath();
        ctx.moveTo(x, y - r * 2);
        ctx.lineTo(x, y + r * 2);
        ctx.moveTo(x - r * 2, y);
        ctx.lineTo(x + r * 2, y);
        ctx.strokeStyle = "rgba(103,217,70,0.42)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    const drawFloor = () => {
      const y = h * 0.8;

      ctx.beginPath();
      ctx.moveTo(w * 0.1, y);
      ctx.lineTo(w * 0.9, y);
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.ellipse(
          w * 0.18 + i * w * 0.1,
          y + 28 + Math.sin(time + i) * 4,
          42,
          10,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "rgba(166,230,236,0.25)";
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();
      drawSparkles();
      drawFloor();

      drawBuildingMini(w * 0.5, h * 0.35, Math.min(w, h) / 760);

      const nodes = [
        { x: w * 0.18, y: h * 0.6, label: "SOURCE", color: "#FFE994" },
        { x: w * 0.38, y: h * 0.68, label: "SCREEN", color: "#CFF7BC" },
        { x: w * 0.62, y: h * 0.68, label: "DEPLOY", color: "#A6E6EC" },
        { x: w * 0.82, y: h * 0.6, label: "SUPPORT", color: "#FFF6C8" },
      ];

      drawFlow(nodes);
      nodes.forEach((node, index) =>
        drawNode(node.x, node.y, node.label, node.color, index),
      );

      drawPerson(w * 0.28, h * 0.43, Math.min(w, h) / 790, "#A6E6EC", "window");
      drawPerson(w * 0.73, h * 0.45, Math.min(w, h) / 790, "#67D946", "wrench");

      drawCleaningMachine(
        w * 0.14 + ((time * 42) % (w * 0.72)),
        h * 0.88,
        Math.min(w, h) / 840,
      );

      drawChecklistPanel(w * 0.78, h * 0.2);

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
            <p className="clean-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
              What Is Cleaning & Facility Management Recruitment?
            </p>

            <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
              {[
                "Connecting",
                "facilities",
                "with",
                "reliable",
                "support",
                "teams",
              ].map((word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="clean-what-word inline-block">{word}</span>
                </span>
              ))}
            </h2>

            <p className="clean-what-reveal mt-6 max-w-xl text-base leading-7 text-black/75">
              Cleaning and facility management recruitment focuses on sourcing,
              screening and deploying dependable workers who keep offices,
              buildings, commercial spaces and facilities clean, safe and fully
              operational.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map(({ icon: Icon, ...item }) => (
                <article
                  key={item.title}
                  className="clean-what-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
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

            <div className="clean-what-reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
              >
                Request Facility Staff
                <ArrowRight size={16} />
              </a>

              <a
                href="/industries/cleaning-facility-management"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black"
              >
                View cleaning roles
              </a>
            </div>
          </div>

          <div className="clean-what-reveal relative h-[460px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[560px] lg:h-[640px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        {/* <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="clean-what-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

export default WhatCleaningFacilityRecruitment;
