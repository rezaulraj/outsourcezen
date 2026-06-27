import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Globe2,
  Handshake,
  MessageCircle,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const stats = [
  { value: "10K+", label: "Successful Placements" },
  { value: "30+", label: "Countries Covered" },
  { value: "20+", label: "Industries Served" },
];

const HeroAbout = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-word", {
        y: 70,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".about-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".about-line", {
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

    const drawRoom = () => {
      const floorY = h * 0.78;

      const wall = ctx.createLinearGradient(0, 0, 0, floorY);
      wall.addColorStop(0, "#FFF9E6");
      wall.addColorStop(1, "#F5ECD7");
      ctx.fillStyle = wall;
      ctx.fillRect(0, 0, w, floorY);

      const floor = ctx.createLinearGradient(0, floorY, 0, h);
      floor.addColorStop(0, "#E8DFC8");
      floor.addColorStop(1, "#D8CDB2");
      ctx.fillStyle = floor;
      ctx.fillRect(0, floorY, w, h - floorY);

      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;

      for (let x = 0; x < w; x += 42) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, floorY);
        ctx.stroke();
      }

      for (let y = 0; y < floorY; y += 42) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.restore();

      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(w, floorY);
      ctx.stroke();

      for (let i = 0; i <= 9; i++) {
        const x = (i / 9) * w;
        ctx.beginPath();
        ctx.moveTo(w / 2 + (x - w / 2) * 0.12, floorY);
        ctx.lineTo(x, h);
        ctx.strokeStyle = "rgba(0,0,0,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = 1; i <= 6; i++) {
        const y = floorY + (h - floorY) * Math.pow(i / 6, 1.6);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = "rgba(0,0,0,0.08)";
        ctx.stroke();
      }
    };

    const drawWindow = (x, y, width, height) => {
      rr(x, y, width, height, 28);
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(x + 6, y + 6, width - 12, height - 12, 24);
      const sky = ctx.createLinearGradient(x, y, x, y + height);
      sky.addColorStop(0, "rgba(166,230,236,0.7)");
      sky.addColorStop(1, "rgba(255,233,148,0.35)");
      ctx.fillStyle = sky;
      ctx.fill();

      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + width / 2, y + 6);
      ctx.lineTo(x + width / 2, y + height - 6);
      ctx.moveTo(x + 6, y + height * 0.52);
      ctx.lineTo(x + width - 6, y + height * 0.52);
      ctx.stroke();

      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = "#FFE994";
      ctx.beginPath();
      ctx.moveTo(x + 20, y + height);
      ctx.lineTo(x + width - 20, y + height);
      ctx.lineTo(x + width + 120, h);
      ctx.lineTo(x - 120, h);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawWorldBoard = () => {
      const x = w * 0.5;
      const y = h * 0.18;
      const bw = Math.min(w * 0.58, 380);
      const bh = h * 0.25;

      rr(x - bw / 2, y - bh / 2, bw, bh, 26);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.strokeStyle = "#E7B53A";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#E7B53A";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("GLOBAL WORKFORCE NETWORK", x, y - bh / 2 + 28);

      const points = [
        { x: x - bw * 0.28, y: y + 2, label: "UK" },
        { x: x - bw * 0.03, y: y + bh * 0.18, label: "BD" },
        { x: x + bw * 0.2, y: y - bh * 0.05, label: "RO" },
        { x: x + bw * 0.32, y: y + bh * 0.2, label: "PT" },
      ];

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        const b = points[(i + 1) % points.length];

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo((a.x + b.x) / 2, y - bh * 0.25, b.x, b.y);
        ctx.strokeStyle = "rgba(255,255,255,0.28)";
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 12]);
        ctx.lineDashOffset = -time * 40;
        ctx.stroke();
        ctx.setLineDash([]);

        const p = (time * 0.16 + i * 0.23) % 1;
        const cx =
          (1 - p) * (1 - p) * a.x +
          2 * (1 - p) * p * ((a.x + b.x) / 2) +
          p * p * b.x;
        const cy =
          (1 - p) * (1 - p) * a.y +
          2 * (1 - p) * p * (y - bh * 0.25) +
          p * p * b.y;

        ctx.beginPath();
        ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
      }

      points.forEach((point, index) => {
        const pulse = Math.sin(time * 4 + index) * 2;

        ctx.beginPath();
        ctx.arc(point.x, point.y, 17 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#E7B53A";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#111";
        ctx.font = "900 10px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(point.label, point.x, point.y + 4);
      });
    };

    const drawPerson = (x, y, s, options = {}) => {
      const {
        color = "#CFF7BC",
        jacket = "#1C1810",
        skin = "#E9B98D",
        hair = "#1C1810",
        action = "talk",
        flip = false,
        phase = 0,
      } = options;

      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.3 + phase) * 2);
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

      ctx.beginPath();
      ctx.moveTo(-15, -34);
      ctx.lineTo(-34, -17 + Math.sin(t * 3) * 4);
      ctx.moveTo(15, -34);

      if (action === "talk") {
        ctx.lineTo(36, -28 + Math.sin(t * 4) * 5);
      } else if (action === "think") {
        ctx.lineTo(18, -58);
      } else if (action === "handshake") {
        ctx.lineTo(42, -28);
      } else {
        ctx.lineTo(32, -18);
      }

      ctx.strokeStyle = jacket;
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-34, -17 + Math.sin(t * 3) * 4, 5, 0, Math.PI * 2);
      ctx.arc(
        action === "think" ? 18 : action === "handshake" ? 42 : 36,
        action === "think"
          ? -58
          : action === "handshake"
            ? -28
            : -28 + Math.sin(t * 4) * 5,
        5,
        0,
        Math.PI * 2,
      );
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
      ctx.fillStyle = hair;
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

      if (action === "think") {
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(
            30 + i * 12,
            -95 - Math.sin(time * 2 + i) * 4,
            4 + i * 2,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = i === 2 ? color : "rgba(0,0,0,0.12)";
          ctx.fill();
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const drawTable = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-120, -22, 240, 38, 15);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

      ctx.strokeStyle = "#E7B53A";
      ctx.lineWidth = 2;
      ctx.stroke();

      [-78, 78].forEach((lx) => {
        ctx.beginPath();
        ctx.moveTo(lx, 16);
        ctx.lineTo(lx - 18, 80);
        ctx.moveTo(lx + 20, 16);
        ctx.lineTo(lx + 38, 80);
        ctx.strokeStyle = "#1C1810";
        ctx.lineWidth = 8;
        ctx.stroke();
      });

      rr(-36, -60, 72, 42, 8);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(0, -8);
      ctx.moveTo(-20, -8);
      ctx.lineTo(20, -8);
      ctx.stroke();

      ctx.restore();
    };

    const drawBubble = (x, y, text, color, delay = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.7 + delay) * 5);

      ctx.font = "800 12px Arimo";
      const width = Math.max(130, ctx.measureText(text).width + 34);

      rr(-width / 2, -22, width, 44, 18);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-14, 20);
      ctx.lineTo(-2, 36);
      ctx.lineTo(8, 20);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.textAlign = "center";
      ctx.fillText(text, 0, 4);

      ctx.restore();
    };

    const drawThoughtPanel = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.25) * 6);

      rr(-120, -52, 240, 104, 28);
      ctx.fillStyle = "rgba(255,249,230,0.92)";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-84, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("WE THINK BEYOND HIRING", 25, -14);

      ctx.font = "900 18px Arimo";
      ctx.fillText("Right People. Right Place.", 25, 15);

      ctx.beginPath();
      ctx.arc(104, -36, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
    };

    const drawFloatingCard = (x, y, title, value, color, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.5 + phase) * 6);

      rr(-90, -34, 180, 68, 22);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-58, 0, 18, 0, Math.PI * 2);
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

    const drawConnection = (x1, y1, x2, y2, color = "#67D946") => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, Math.min(y1, y2) - 70, x2, y2);
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      const p = (time * 0.18) % 1;
      const cx =
        (1 - p) * (1 - p) * x1 + 2 * (1 - p) * p * ((x1 + x2) / 2) + p * p * x2;
      const cy =
        (1 - p) * (1 - p) * y1 +
        2 * (1 - p) * p * (Math.min(y1, y2) - 70) +
        p * p * y2;

      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const drawDust = () => {
      for (let i = 0; i < 30; i++) {
        const x = ((i * 97) % w) + Math.sin(time + i) * 8;
        const y = ((i * 53) % h) + Math.cos(time * 1.1 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.3 + Math.sin(time * 2 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.25)";
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawRoom();
      drawDust();

      drawWindow(w * 0.06, h * 0.12, w * 0.16, h * 0.34);
      drawWindow(w * 0.78, h * 0.12, w * 0.16, h * 0.34);

      drawWorldBoard();

      const floorY = h * 0.78;
      const s = Math.min(w, h) / 720;

      drawConnection(w * 0.28, floorY - 145 * s, w * 0.5, h * 0.18);
      drawConnection(w * 0.72, floorY - 145 * s, w * 0.5, h * 0.18, "#FFE994");

      drawTable(w * 0.5, floorY, s);

      drawPerson(w * 0.31, floorY, s, {
        jacket: "#1C1810",
        skin: "#E7B58B",
        hair: "#302014",
        action: "talk",
        phase: 0,
      });

      drawPerson(w * 0.49, floorY, s, {
        jacket: "#2C3F68",
        skin: "#C7895C",
        hair: "#111",
        action: "think",
        phase: 1,
      });

      drawPerson(w * 0.69, floorY, s, {
        jacket: "#2E6A3F",
        skin: "#F0C39A",
        hair: "#4A2E1A",
        action: "handshake",
        flip: true,
        phase: 2,
      });

      drawBubble(w * 0.28, floorY - 135 * s, "What do you need?", "#FFE994", 0);
      drawBubble(
        w * 0.72,
        floorY - 138 * s,
        "We build the team.",
        "#CFF7BC",
        2,
      );

      drawThoughtPanel(w * 0.5, h * 0.47);

      drawFloatingCard(
        w * 0.2,
        h * 0.56,
        "Employers",
        "Need talent",
        "#FFE994",
        0,
      );
      drawFloatingCard(
        w * 0.8,
        h * 0.56,
        "Candidates",
        "Ready to work",
        "#CFF7BC",
        2,
      );
      drawFloatingCard(
        w * 0.5,
        h * 0.9,
        "Outcome",
        "Workforce matched ✓",
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
            <span className="about-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#FFF9E6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <Building2 size={14} strokeWidth={2.2} />
              About OutsourceZen
            </span>

            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.04em] text-black sm:text-[3.7rem] lg:text-[4.35rem]">
              {["We", "connect"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2"
                >
                  <span className="about-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              {["people", "with"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2"
                >
                  <span className="about-word inline-block">{word}</span>
                </span>
              ))}

              <span className="relative inline-block overflow-visible">
                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="about-word inline-block text-[#1f7a2e]">
                    opportunity.
                  </span>
                </span>

                <svg
                  className="about-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="about-reveal mt-7 max-w-xl text-base leading-7 text-black/75">
              OutsourceZen is a global workforce and recruitment partner helping
              employers find reliable people across construction, manufacturing,
              hospitality, healthcare, agriculture, logistics, cleaning,
              facility management and skilled trades.
            </p>

            <div className="about-reveal mt-7 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                [UsersRound, "People-first"],
                [Globe2, "Global reach"],
                [ShieldCheck, "Trusted process"],
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

            <div className="about-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Build Your Workforce
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="/company/our-agents"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                <Handshake size={16} />
                Meet Our Agents
              </a>
            </div>
          </div>

          <div className="about-reveal relative h-[500px] w-full overflow-hidden sm:h-[620px] lg:h-[720px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
