import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  Globe2,
  Handshake,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

const values = [
  {
    title: "Integrity",
    text: "We work with honesty, transparency and professional responsibility in every recruitment process.",
    icon: ShieldCheck,
    color: "#FFE994",
  },
  {
    title: "People First",
    text: "We respect both employers and candidates, focusing on real needs, real skills and real opportunities.",
    icon: UsersRound,
    color: "#CFF7BC",
  },
  {
    title: "Reliability",
    text: "We aim to provide dependable support, clear communication and practical workforce solutions.",
    icon: BadgeCheck,
    color: "#A6E6EC",
  },
  {
    title: "Global Mindset",
    text: "We connect people and companies across borders with cultural awareness and international coordination.",
    icon: Globe2,
    color: "#FFF6C8",
  },
  {
    title: "Partnership",
    text: "We build long-term relationships with employers, candidates, agents and support teams.",
    icon: Handshake,
    color: "#FFE994",
  },
  {
    title: "Continuous Improvement",
    text: "We keep improving our sourcing, screening, communication and deployment support process.",
    icon: Lightbulb,
    color: "#CFF7BC",
  },
];

const OurValues = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".values-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".values-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".values-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.4,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % values.length);
    }, 2500);

    return () => clearInterval(timer);
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

    const drawPerson = (
      x,
      y,
      s,
      jacket,
      skin,
      action = "talk",
      flip = false,
      phase = 0,
    ) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.25 + phase) * 2);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(s, s);

      const t = time + phase;

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-7, 0);
      ctx.lineTo(-12 + Math.sin(t * 2) * 2, 25);
      ctx.moveTo(7, 0);
      ctx.lineTo(12 + Math.cos(t * 2) * 2, 25);
      ctx.stroke();

      rr(-17, -42, 34, 45, 8);
      ctx.fillStyle = jacket;
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.45)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-6, -42);
      ctx.lineTo(0, -18);
      ctx.lineTo(6, -42);
      ctx.fillStyle = "#fff";
      ctx.fill();

      let rightX = 34;
      let rightY = -24 + Math.sin(t * 3.5) * 4;

      if (action === "heart") {
        rightX = 35;
        rightY = -46;
      }

      if (action === "handshake") {
        rightX = 43;
        rightY = -28;
      }

      if (action === "point") {
        rightX = 42;
        rightY = -48;
      }

      ctx.beginPath();
      ctx.moveTo(-15, -34);
      ctx.lineTo(-34, -17 + Math.sin(t * 3) * 3);
      ctx.moveTo(15, -34);
      ctx.lineTo(rightX, rightY);
      ctx.strokeStyle = jacket;
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-34, -17 + Math.sin(t * 3) * 3, 5, 0, Math.PI * 2);
      ctx.arc(rightX, rightY, 5, 0, Math.PI * 2);
      ctx.fillStyle = skin;
      ctx.fill();

      if (action === "heart") {
        ctx.save();
        ctx.translate(rightX + 14, rightY - 7);
        ctx.scale(
          0.6 + Math.sin(time * 4) * 0.04,
          0.6 + Math.sin(time * 4) * 0.04,
        );

        ctx.beginPath();
        ctx.moveTo(0, 8);
        ctx.bezierCurveTo(-20, -8, -8, -24, 0, -12);
        ctx.bezierCurveTo(8, -24, 20, -8, 0, 8);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      }

      ctx.beginPath();
      ctx.moveTo(0, -42);
      ctx.lineTo(0, -50);
      ctx.strokeStyle = skin;
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -64, 14, 0, Math.PI * 2);
      ctx.fillStyle = skin;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -68, 15, Math.PI * 0.85, Math.PI * 2.15);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

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

    const drawValueOrbit = () => {
      const cx = w * 0.5;
      const cy = h * 0.42;
      const radius = Math.min(w, h) * 0.24;

      ctx.save();

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.setLineDash([9, 13]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      values.forEach((item, index) => {
        const angle = (Math.PI * 2 * index) / values.length + time * 0.12;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.72;
        const isActive = index === activeRef.current;
        const pulse = isActive ? Math.sin(time * 5) * 5 : 0;

        ctx.beginPath();
        ctx.arc(x, y, 26 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? item.color : "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = isActive ? 3 : 2.4;
        ctx.stroke();

        if (isActive) {
          ctx.beginPath();
          ctx.arc(x, y, 46 + Math.sin(time * 4) * 5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(103,217,70,0.42)";
          ctx.lineWidth = 4;
          ctx.stroke();
        }

        ctx.fillStyle = "#111";
        ctx.font = "900 9px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(String(index + 1).padStart(2, "0"), x, y + 3);
      });

      ctx.restore();
    };

    const drawCenterBadge = () => {
      const item = values[activeRef.current];

      ctx.save();
      ctx.translate(w * 0.5, h * 0.42 + Math.sin(time * 1.3) * 5);

      rr(-140, -56, 280, 112, 32);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-100, 0, 25, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ACTIVE VALUE", 28, -15);

      ctx.font = "900 20px Arimo";
      ctx.fillText(item.title.toUpperCase(), 28, 16);

      ctx.beginPath();
      ctx.arc(120, -40, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
    };

    const drawBridge = () => {
      const y = h * 0.72;

      ctx.beginPath();
      ctx.moveTo(w * 0.15, y);
      ctx.lineTo(w * 0.85, y);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 6;
      ctx.stroke();

      for (let i = 0; i < 6; i++) {
        const x = w * 0.2 + i * w * 0.12;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + w * 0.08, y - h * 0.12);
        ctx.lineTo(x + w * 0.16, y);
        ctx.strokeStyle = "rgba(0,0,0,0.22)";
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      for (let i = 0; i < 9; i++) {
        const p = (time * 0.16 + i * 0.12) % 1;
        const x = w * 0.15 + p * w * 0.7;
        const yDot = y - Math.sin(p * Math.PI) * h * 0.12;

        ctx.beginPath();
        ctx.arc(x, yDot, 5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 ? "#67D946" : "#F4C542";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    const drawFloatingCard = (x, y, title, value, color, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.45 + phase) * 6);

      rr(-88, -32, 176, 64, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-58, 0, 17, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 11px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(title, 20, -6);

      ctx.font = "900 15px Arimo";
      ctx.fillText(value, 20, 14);

      ctx.restore();
    };

    const drawParticles = () => {
      for (let i = 0; i < 34; i++) {
        const x = ((i * 83) % w) + Math.sin(time + i) * 9;
        const y = ((i * 47) % h) + Math.cos(time * 1.15 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.3 + Math.sin(time * 2 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.28)";
        ctx.fill();
      }
    };

    const drawFloor = () => {
      const y = h * 0.8;

      ctx.beginPath();
      ctx.moveTo(w * 0.08, y);
      ctx.lineTo(w * 0.92, y);
      ctx.strokeStyle = "rgba(0,0,0,0.14)";
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
        ctx.fillStyle = "rgba(166,230,236,0.22)";
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();
      drawParticles();
      drawFloor();

      const s = Math.min(w, h) / 760;

      drawValueOrbit();
      drawCenterBadge();
      drawBridge();

      drawPerson(w * 0.24, h * 0.8, s, "#1C1810", "#E7B58B", "heart", false, 0);
      drawPerson(
        w * 0.48,
        h * 0.8,
        s,
        "#2C3F68",
        "#C7895C",
        "point",
        false,
        1.4,
      );
      drawPerson(
        w * 0.72,
        h * 0.8,
        s,
        "#2E6A3F",
        "#F0C39A",
        "handshake",
        true,
        2.4,
      );

      drawFloatingCard(
        w * 0.23,
        h * 0.18,
        "Foundation",
        "Integrity",
        "#FFE994",
        0,
      );
      drawFloatingCard(
        w * 0.78,
        h * 0.18,
        "Culture",
        "People first",
        "#CFF7BC",
        2,
      );
      drawFloatingCard(
        w * 0.5,
        h * 0.93,
        "Promise",
        "Reliable support ✓",
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
      className="font-arimo bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="values-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Values
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["The", "principles", "behind", "every", "placement"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="values-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Our values guide how we support employers, candidates, agents and
            international workforce partners.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="values-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:sticky lg:top-24 lg:h-[690px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {values.map(({ icon: Icon, ...item }, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`values-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "border-black bg-[#FFF9E6]"
                      : "border-black/10 bg-[#FFF9E6]/75 hover:border-black/30"
                  }`}
                >
                  <div className="flex gap-5">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon size={24} strokeWidth={2.4} />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-black/70">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="values-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <HeartHandshake size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Values that support stronger workforce relationships
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We believe successful recruitment depends on trust,
                  responsibility, communication and a genuine commitment to both
                  employers and candidates.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Work With Us
              <Target size={17} strokeWidth={2.4} />
            </a>
          </div>
        </div>

        <div className="values-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Integrity",
            "People-first",
            "Reliability",
            "Partnership",
            "Global mindset",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2 text-sm font-bold text-black/65"
            >
              <Sparkles size={14} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
