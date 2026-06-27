import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Eye,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";

const cards = [
  {
    title: "Our Mission",
    badge: "Mission",
    text: "To connect employers with dependable workers through clear communication, reliable screening and practical workforce support.",
    icon: Target,
    color: "#FFE994",
  },
  {
    title: "Our Vision",
    badge: "Vision",
    text: "To become a trusted global recruitment partner that helps people find opportunity and helps companies grow with confidence.",
    icon: Eye,
    color: "#CFF7BC",
  },
];

const pillars = [
  {
    title: "People First",
    text: "We focus on real people, real skills and real workplace needs.",
    icon: UsersRound,
    color: "#FFE994",
  },
  {
    title: "Global Reach",
    text: "We support employers and candidates across international markets.",
    icon: Globe2,
    color: "#CFF7BC",
  },
  {
    title: "Trusted Process",
    text: "We value screening, communication, coordination and transparency.",
    icon: ShieldCheck,
    color: "#A6E6EC",
  },
];

const MissionVision = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mv-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".mv-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".mv-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.4,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length);
    }, 3000);

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

      if (action === "point") {
        rightX = 42;
        rightY = -48;
      }

      if (action === "handshake") {
        rightX = 43;
        rightY = -28;
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

    const drawGoalTower = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      for (let i = 0; i < 3; i++) {
        const width = 150 - i * 34;
        const height = 34;
        rr(-width / 2, -i * 34, width, height, 10);
        ctx.fillStyle = i === 0 ? "#FFF9E6" : i === 1 ? "#CFF7BC" : "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = "#111";
        ctx.font = "900 11px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(["HIRING", "TRUST", "GROWTH"][i], 0, -i * 34 + 22);
      }

      ctx.beginPath();
      ctx.moveTo(0, -102);
      ctx.lineTo(0, -145);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -145);
      ctx.lineTo(44, -132);
      ctx.lineTo(0, -119);
      ctx.closePath();
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    const drawVisionPortal = (x, y, r) => {
      ctx.save();
      ctx.translate(x, y);

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, r + i * 18 + Math.sin(time * 2 + i) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(103,217,70,${0.35 - i * 0.06})`;
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.strokeStyle = "#E7B53A";
      ctx.lineWidth = 3;
      ctx.stroke();

      const points = [
        { x: -44, y: -8, label: "UK" },
        { x: -7, y: 28, label: "BD" },
        { x: 34, y: -18, label: "RO" },
        { x: 48, y: 26, label: "PT" },
      ];

      points.forEach((a, index) => {
        const b = points[(index + 1) % points.length];

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo((a.x + b.x) / 2, -45, b.x, b.y);
        ctx.strokeStyle = "rgba(255,255,255,0.28)";
        ctx.lineWidth = 2;
        ctx.setLineDash([7, 10]);
        ctx.lineDashOffset = -time * 40;
        ctx.stroke();
        ctx.setLineDash([]);

        const p = (time * 0.18 + index * 0.22) % 1;
        const cx =
          (1 - p) * (1 - p) * a.x +
          2 * (1 - p) * p * ((a.x + b.x) / 2) +
          p * p * b.x;
        const cy =
          (1 - p) * (1 - p) * a.y + 2 * (1 - p) * p * -45 + p * p * b.y;

        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
      });

      points.forEach((point, index) => {
        ctx.beginPath();
        ctx.arc(
          point.x,
          point.y,
          14 + Math.sin(time * 4 + index) * 2,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#E7B53A";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#111";
        ctx.font = "900 8px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(point.label, point.x, point.y + 3);
      });

      ctx.restore();
    };

    const drawMissionPath = () => {
      const points = [
        [w * 0.18, h * 0.7],
        [w * 0.35, h * 0.58],
        [w * 0.5, h * 0.68],
        [w * 0.66, h * 0.52],
        [w * 0.82, h * 0.62],
      ];

      ctx.beginPath();
      points.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 12]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      points.forEach(([x, y], index) => {
        ctx.beginPath();
        ctx.arc(x, y, 20 + Math.sin(time * 3 + index) * 2, 0, Math.PI * 2);
        ctx.fillStyle =
          index <= Math.floor((time * 0.55) % points.length)
            ? "#67D946"
            : "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        if (index <= Math.floor((time * 0.55) % points.length)) {
          drawCheck(x, y, 0.55);
        }
      });
    };

    const drawCenterBadge = () => {
      const item = cards[activeRef.current];

      ctx.save();
      ctx.translate(w * 0.5, h * 0.17 + Math.sin(time * 1.2) * 5);

      rr(-136, -54, 272, 108, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-96, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(`ACTIVE ${item.badge.toUpperCase()}`, 28, -14);

      ctx.font = "900 18px Arimo";
      ctx.fillText(item.title.toUpperCase(), 28, 16);

      ctx.beginPath();
      ctx.arc(116, -38, 7 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
    };

    const drawFloatingCard = (x, y, title, value, color, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.45 + phase) * 6);

      rr(-86, -32, 172, 64, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-56, 0, 17, 0, Math.PI * 2);
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

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();
      drawParticles();

      const s = Math.min(w, h) / 760;

      drawCenterBadge();

      drawMissionPath();

      drawGoalTower(w * 0.22, h * 0.56, s);
      drawVisionPortal(w * 0.78, h * 0.42, Math.min(w, h) * 0.115);

      drawPerson(
        w * 0.33,
        h * 0.72,
        s,
        "#1C1810",
        "#E7B58B",
        "point",
        false,
        0,
      );
      drawPerson(
        w * 0.55,
        h * 0.75,
        s,
        "#2C3F68",
        "#C7895C",
        "talk",
        false,
        1.3,
      );
      drawPerson(
        w * 0.7,
        h * 0.74,
        s,
        "#2E6A3F",
        "#F0C39A",
        "handshake",
        true,
        2.3,
      );

      drawFloatingCard(
        w * 0.25,
        h * 0.25,
        "Mission",
        "Serve people",
        "#FFE994",
        0,
      );
      drawFloatingCard(
        w * 0.78,
        h * 0.68,
        "Vision",
        "Global trust",
        "#CFF7BC",
        2,
      );
      drawFloatingCard(
        w * 0.5,
        h * 0.9,
        "Outcome",
        "Growth together ✓",
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
        <div className="mv-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Mission & Vision
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Guided",
              "by",
              "purpose",
              "built",
              "for",
              "global",
              "growth",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="mv-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Our mission shapes how we serve people today. Our vision defines the
            global recruitment partner we are building for tomorrow.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="mv-reveal relative h-[500px] overflow-hidden sm:h-[600px] lg:sticky lg:top-24 lg:h-[690px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="space-y-5">
            {cards.map(({ icon: Icon, ...item }, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`mv-card w-full rounded-[32px] border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "border-black bg-[#FFF9E6]"
                      : "border-black/10 bg-[#FFF9E6]/75 hover:border-black/30"
                  }`}
                >
                  <div className="flex gap-5">
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon size={28} strokeWidth={2.4} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">
                        {item.badge}
                      </p>

                      <h3 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-black">
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

            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {pillars.map(({ icon: Icon, ...item }) => (
                <article
                  key={item.title}
                  className="mv-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
                >
                  <div className="flex gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon size={22} strokeWidth={2.4} />
                    </div>

                    <div>
                      <h4 className="text-lg font-bold tracking-[-0.03em] text-black">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-sm leading-6 text-black/70">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <a
              href="/contact"
              className="mv-card group inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Build Your Workforce
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
