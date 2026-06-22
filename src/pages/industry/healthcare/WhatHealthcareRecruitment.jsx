import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
} from "lucide-react";

const points = [
  {
    title: "Patient-centered hiring",
    text: "We focus on professionals who understand care, empathy and patient safety.",
    icon: HeartPulse,
    color: "#FFE994",
  },
  {
    title: "Credential verification",
    text: "Licenses, experience and required healthcare documents are reviewed carefully.",
    icon: ClipboardCheck,
    color: "#CFF7BC",
  },
  {
    title: "Clinical readiness",
    text: "Candidates are checked for relevant role knowledge, discipline and care standards.",
    icon: Stethoscope,
    color: "#A6E6EC",
  },
  {
    title: "Compliance awareness",
    text: "We support hiring with focus on ethics, safety and healthcare workplace standards.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
];

const stats = [
  { value: "98%", label: "Patient Care Focus" },
  { value: "48 Hours", label: "Initial Shortlisting" },
  { value: "25+", label: "Healthcare Sectors" },
  { value: "100%", label: "Credential Review Mindset" },
];

const WhatHealthcareRecruitment = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".health-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".health-what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".health-what-card", {
        y: 35,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".health-what-stat", {
        y: 30,
        opacity: 0,
        scale: 0.94,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.55,
        ease: "back.out(1.5)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ---------------------------------------------------------------------
  // Realistic, soft-shaded canvas scene: gradient atmosphere, glassy
  // glowing nodes, smooth-bodied figures, curved connective paths and a
  // glowing heartbeat line. Only this drawing logic was reworked.
  // ---------------------------------------------------------------------
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

    // soft ambient background atmosphere — two breathing radial blooms
    const drawAtmosphere = () => {
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#FFFBEF");
      bg.addColorStop(1, "#FFF3CE");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const bloom1 = ctx.createRadialGradient(
        w * 0.22,
        h * 0.18,
        0,
        w * 0.22,
        h * 0.18,
        Math.max(w, h) * (0.45 + Math.sin(time * 0.3) * 0.03),
      );
      bloom1.addColorStop(0, "rgba(166,230,236,0.45)");
      bloom1.addColorStop(1, "rgba(166,230,236,0)");
      ctx.fillStyle = bloom1;
      ctx.fillRect(0, 0, w, h);

      const bloom2 = ctx.createRadialGradient(
        w * 0.82,
        h * 0.85,
        0,
        w * 0.82,
        h * 0.85,
        Math.max(w, h) * (0.4 + Math.cos(time * 0.26) * 0.03),
      );
      bloom2.addColorStop(0, "rgba(103,217,70,0.22)");
      bloom2.addColorStop(1, "rgba(103,217,70,0)");
      ctx.fillStyle = bloom2;
      ctx.fillRect(0, 0, w, h);
    };

    // soft drifting depth particles, varying size & glow
    const drawDots = () => {
      for (let i = 0; i < 34; i++) {
        const x = ((i * 89) % w) + Math.sin(time * 0.6 + i) * 14;
        const y = ((i * 53) % h) + Math.cos(time * 0.5 + i * 1.3) * 12;
        const r = 1.1 + Math.sin(time * 1.4 + i) * 0.7 + (i % 3) * 0.5;
        const alpha = 0.08 + 0.06 * Math.sin(time * 1.1 + i);

        ctx.beginPath();
        ctx.arc(x, y, Math.max(r, 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20,20,20,${Math.max(alpha, 0.02)})`;
        ctx.fill();
      }
    };

    // smooth, softly shaded figure — rounded torso via bezier silhouette,
    // gradient-filled head, soft contact shadow, gentle idle sway
    const drawPerson = (x, y, s, color, type = 0) => {
      const sway = Math.sin(time * 1.4 + type * 2) * 4;
      const bob = Math.sin(time * 1.8 + type) * 2;

      ctx.save();
      ctx.translate(x + sway * 0.2, y + bob);
      ctx.scale(s, s);

      // contact shadow
      ctx.save();
      ctx.translate(0, 46);
      ctx.scale(1, 0.28);
      const shadowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 26);
      shadowGrad.addColorStop(0, "rgba(20,20,20,0.22)");
      shadowGrad.addColorStop(1, "rgba(20,20,20,0)");
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.fillStyle = shadowGrad;
      ctx.fill();
      ctx.restore();

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // torso — smooth rounded silhouette instead of stick lines
      ctx.beginPath();
      ctx.moveTo(-13, 12);
      ctx.bezierCurveTo(-17, -2, -14, -16, 0, -16);
      ctx.bezierCurveTo(14, -16, 17, -2, 13, 12);
      ctx.bezierCurveTo(15, 22, 12, 32, 0, 34);
      ctx.bezierCurveTo(-12, 32, -15, 22, -13, 12);
      ctx.closePath();

      const torsoGrad = ctx.createLinearGradient(0, -16, 0, 34);
      torsoGrad.addColorStop(0, type === 1 ? "#FFFFFF" : "#F4F7F2");
      torsoGrad.addColorStop(1, type === 1 ? "#EDEFF4" : "#E3ECDF");
      ctx.fillStyle = torsoGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.55)";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // collar / lapel accent
      ctx.beginPath();
      ctx.moveTo(-6, -14);
      ctx.lineTo(0, -3);
      ctx.lineTo(6, -14);
      ctx.strokeStyle = "rgba(17,17,17,0.35)";
      ctx.lineWidth = 1.3;
      ctx.stroke();

      // arms — soft tapered curves
      ctx.beginPath();
      ctx.moveTo(-11, -4);
      ctx.quadraticCurveTo(-24, 4 + Math.sin(time * 3 + type) * 2, -19, 20);
      ctx.lineWidth = 7;
      ctx.strokeStyle = torsoGrad;
      ctx.stroke();
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = "rgba(17,17,17,0.4)";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(11, -4);
      ctx.quadraticCurveTo(24, 4 + Math.cos(time * 3 + type) * 2, 19, 20);
      ctx.lineWidth = 7;
      ctx.strokeStyle = torsoGrad;
      ctx.stroke();
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = "rgba(17,17,17,0.4)";
      ctx.stroke();

      // legs
      ctx.beginPath();
      ctx.moveTo(-7, 32);
      ctx.quadraticCurveTo(-10, 42, -9, 50);
      ctx.lineWidth = 7;
      ctx.strokeStyle = "#3A3F47";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(7, 32);
      ctx.quadraticCurveTo(10, 42, 9, 50);
      ctx.lineWidth = 7;
      ctx.strokeStyle = "#3A3F47";
      ctx.stroke();

      // head — radial-gradient sphere with soft highlight
      const headGrad = ctx.createRadialGradient(-4, -36, 1, 0, -32, 13);
      headGrad.addColorStop(0, "#FFE7C2");
      headGrad.addColorStop(1, color);
      ctx.beginPath();
      ctx.arc(0, -32, 10.5, 0, Math.PI * 2);
      ctx.fillStyle = headGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.5)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      if (type === 0) {
        // doctor cap / headband
        ctx.beginPath();
        ctx.arc(0, -34, 11.5, Math.PI, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.strokeStyle = "rgba(17,17,17,0.5)";
        ctx.stroke();

        // stethoscope drape
        ctx.beginPath();
        ctx.moveTo(-7, -4);
        ctx.quadraticCurveTo(0, 8, 7, -4);
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = "#3A3F47";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 9, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#3A3F47";
        ctx.fill();
      }

      if (type === 1) {
        // nurse cross badge
        ctx.beginPath();
        ctx.arc(-21, 6, 6.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.strokeStyle = "rgba(17,17,17,0.4)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.strokeStyle = "#67D946";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-21, 2.5);
        ctx.lineTo(-21, 9.5);
        ctx.moveTo(-24.5, 6);
        ctx.lineTo(-17.5, 6);
        ctx.stroke();
      }

      // soft glow highlight on head
      ctx.beginPath();
      ctx.arc(-3, -35, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fill();

      ctx.restore();
    };

    // glassy node with gradient ring, glow and animated progress arc
    const drawNode = (x, y, label, color, type) => {
      // soft outer glow
      const glow = ctx.createRadialGradient(x, y, 10, x, y, 62);
      glow.addColorStop(0, `${color}55`);
      glow.addColorStop(1, `${color}00`);
      ctx.beginPath();
      ctx.arc(x, y, 62, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // glass disc
      const discGrad = ctx.createRadialGradient(x - 12, y - 16, 4, x, y, 46);
      discGrad.addColorStop(0, "#FFFFFF");
      discGrad.addColorStop(1, "#FFF6DE");
      ctx.beginPath();
      ctx.arc(x, y, 44, 0, Math.PI * 2);
      ctx.fillStyle = discGrad;
      ctx.shadowColor = "rgba(20,20,20,0.18)";
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.strokeStyle = "rgba(17,17,17,0.45)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // animated gradient progress ring
      const ringGrad = ctx.createLinearGradient(x - 44, y - 44, x + 44, y + 44);
      ringGrad.addColorStop(0, color);
      ringGrad.addColorStop(1, "#67D946");
      ctx.beginPath();
      ctx.arc(
        x,
        y,
        44,
        -Math.PI / 2 + time * 0.4,
        -Math.PI / 2 + time * 0.4 + Math.PI * 2 * 0.68,
      );
      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.stroke();

      drawPerson(x, y + 17, 0.52, color, type);

      ctx.fillStyle = "#111";
      ctx.font = "800 10px Arimo, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, x, y + 70);
    };

    // smooth curved connectors with a soft glowing traveling orb + trail
    const drawArrowPath = (pathPoints) => {
      pathPoints.forEach((point, index) => {
        if (index === pathPoints.length - 1) return;

        const next = pathPoints[index + 1];
        const midY = (point.y + 54 + (next.y - 54)) / 2;
        const cx = (point.x + next.x) / 2 + Math.sin(time + index) * 10;

        ctx.beginPath();
        ctx.moveTo(point.x, point.y + 54);
        ctx.quadraticCurveTo(cx, midY, next.x, next.y - 54);
        ctx.strokeStyle = "rgba(20,20,20,0.14)";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([2, 10]);
        ctx.lineDashOffset = -time * 40;
        ctx.stroke();
        ctx.setLineDash([]);

        const p = (time * 0.16 + index * 0.22) % 1;
        // sample the same quadratic curve for the traveling orb
        const t = p;
        const ox =
          (1 - t) * (1 - t) * point.x + 2 * (1 - t) * t * cx + t * t * next.x;
        const oy =
          (1 - t) * (1 - t) * (point.y + 54) +
          2 * (1 - t) * t * midY +
          t * t * (next.y - 54);

        const orbColor = index % 2 ? "#67D946" : "#F4C542";

        // glow trail
        const trailGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, 16);
        trailGrad.addColorStop(0, `${orbColor}88`);
        trailGrad.addColorStop(1, `${orbColor}00`);
        ctx.beginPath();
        ctx.arc(ox, oy, 16, 0, Math.PI * 2);
        ctx.fillStyle = trailGrad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ox, oy, 6.5, 0, Math.PI * 2);
        ctx.fillStyle = orbColor;
        ctx.fill();
        ctx.strokeStyle = "rgba(17,17,17,0.5)";
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });
    };

    // glowing heartbeat trace with soft outer halo
    const drawHeartbeat = (x, y, width) => {
      const buildPath = () => {
        ctx.beginPath();
        ctx.moveTo(x - width / 2, y);
        ctx.lineTo(x - width * 0.25, y);
        ctx.lineTo(x - width * 0.18, y - 22);
        ctx.lineTo(x - width * 0.08, y + 24);
        ctx.lineTo(x + width * 0.02, y - 10);
        ctx.lineTo(x + width * 0.12, y);
        ctx.lineTo(x + width / 2, y);
      };

      buildPath();
      ctx.strokeStyle = "rgba(103,217,70,0.35)";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      buildPath();
      ctx.strokeStyle = "#1C8A3A";
      ctx.lineWidth = 2.6;
      ctx.setLineDash([width * 0.22, width]);
      ctx.lineDashOffset = -time * 110;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // glassmorphic status card with soft shadow + glow check
    const drawCareCard = (x, y) => {
      ctx.save();
      ctx.shadowColor = "rgba(20,20,20,0.2)";
      ctx.shadowBlur = 22;
      ctx.shadowOffsetY = 10;

      rr(x - 85, y - 42, 170, 84, 24);
      const cardGrad = ctx.createLinearGradient(x - 85, y - 42, x + 85, y + 42);
      cardGrad.addColorStop(0, "rgba(255,255,255,0.92)");
      cardGrad.addColorStop(1, "rgba(255,249,230,0.92)");
      ctx.fillStyle = cardGrad;
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = "rgba(17,17,17,0.35)";
      ctx.lineWidth = 1.6;
      rr(x - 85, y - 42, 170, 84, 24);
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("PATIENT CARE", x, y - 8);

      ctx.font = "900 20px Arimo, sans-serif";
      ctx.fillText("READY", x, y + 18);

      const badgeGlow = ctx.createRadialGradient(
        x + 78,
        y - 34,
        1,
        x + 78,
        y - 34,
        18,
      );
      badgeGlow.addColorStop(0, "rgba(103,217,70,0.5)");
      badgeGlow.addColorStop(1, "rgba(103,217,70,0)");
      ctx.beginPath();
      ctx.arc(x + 78, y - 34, 18, 0, Math.PI * 2);
      ctx.fillStyle = badgeGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x + 78, y - 34, 15, 0, Math.PI * 2);
      const checkGrad = ctx.createRadialGradient(
        x + 73,
        y - 39,
        1,
        x + 78,
        y - 34,
        15,
      );
      checkGrad.addColorStop(0, "#9BEB7C");
      checkGrad.addColorStop(1, "#4DB832");
      ctx.fillStyle = checkGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.4)";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + 70, y - 35);
      ctx.lineTo(x + 76, y - 29);
      ctx.lineTo(x + 87, y - 42);
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2.4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    };

    const draw = () => {
      time += 0.014;

      drawAtmosphere();
      drawDots();

      drawHeartbeat(w * 0.5, h * 0.11, Math.min(w * 0.58, 360));

      const pathPoints = [
        { x: w * 0.5, y: h * 0.23, label: "SOURCE", color: "#FFE994", type: 1 },
        { x: w * 0.5, y: h * 0.43, label: "VERIFY", color: "#CFF7BC", type: 0 },
        { x: w * 0.5, y: h * 0.63, label: "ASSESS", color: "#A6E6EC", type: 0 },
        { x: w * 0.5, y: h * 0.82, label: "CARE", color: "#67D946", type: 1 },
      ];

      drawArrowPath(pathPoints);
      pathPoints.forEach((point) => {
        drawNode(point.x, point.y, point.label, point.color, point.type);
      });

      drawCareCard(w * 0.78, h * 0.23);

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
      className="font-arimo relative bg-[var(--color-primary-bg)] py-24 lg:py-42"
    >
      <div
        className="absolute inset-x-0 top-0 h-full bg-[#FFE994]"
        style={{
          clipPath: "ellipse(82% 45% at 50% 48%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="health-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
              What Is Healthcare Recruitment?
            </p>

            <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
              {[
                "Connecting",
                "qualified",
                "professionals",
                "with",
                "better",
                "care",
              ].map((word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="health-what-word inline-block">{word}</span>
                </span>
              ))}
            </h2>

            <p className="health-what-reveal mt-6 max-w-xl text-base leading-7 text-black/75">
              Healthcare recruitment focuses on identifying, screening and
              deploying qualified medical and support professionals who help
              healthcare providers deliver safe, compassionate and effective
              patient care.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map(({ icon: Icon, ...item }) => (
                <article
                  key={item.title}
                  className="health-what-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
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

            <div className="health-what-reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
              >
                Request Healthcare Staff
                <ArrowRight size={16} />
              </a>

              <a
                href="/industries/healthcare"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black"
              >
                View healthcare roles
              </a>
            </div>
          </div>

          <div className="health-what-reveal relative h-[460px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[560px] lg:h-[640px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="health-what-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <p className="text-4xl font-normal tracking-[-0.06em] text-black">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatHealthcareRecruitment;
