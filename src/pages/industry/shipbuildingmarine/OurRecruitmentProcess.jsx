import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Anchor,
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  HardHat,
  SearchCheck,
  ShieldCheck,
  Ship,
  Sparkles,
  UserCheck,
  UsersRound,
} from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Project Requirement",
    text: "We understand the shipyard project, required trades, manpower size, timeline, location and safety needs.",
    icon: ClipboardCheck,
    color: "#FFE994",
    tag: "Requirement",
  },
  {
    step: "02",
    title: "Marine Talent Search",
    text: "We source welders, pipe fitters, ship fitters, marine electricians, riggers, QA/QC and HSE profiles.",
    icon: SearchCheck,
    color: "#CFF7BC",
    tag: "Sourcing",
  },
  {
    step: "03",
    title: "Trade Screening",
    text: "Candidates are reviewed for trade experience, project readiness, technical fit and shipyard background.",
    icon: HardHat,
    color: "#A6E6EC",
    tag: "Screening",
  },
  {
    step: "04",
    title: "Document & Safety Check",
    text: "We support certificate review, safety awareness, HSE readiness and project documentation preparation.",
    icon: ShieldCheck,
    color: "#FFF6C8",
    tag: "Compliance",
  },
  {
    step: "05",
    title: "Employer Selection",
    text: "Shortlisted candidates are shared with the employer for interview, trade test or final approval.",
    icon: UserCheck,
    color: "#FFE1A6",
    tag: "Selection",
  },
  {
    step: "06",
    title: "Deployment & Onboarding",
    text: "Selected workers are coordinated for deployment, joining support and smooth onboarding at the shipyard.",
    icon: Ship,
    color: "#CFF7BC",
    tag: "Deployment",
  },
];

const stats = [
  { value: "48h", label: "Initial Shortlist" },
  { value: "2200+", label: "Marine Workers" },
  { value: "120+", label: "Shipyard Projects" },
  { value: "24/7", label: "Recruitment Support" },
];

const OurRecruitmentProcess = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".marine-process-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".marine-process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".marine-process-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".marine-process-stat", {
        y: 25,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.55,
        ease: "back.out(1.5)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % processSteps.length);
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

    const drawCheck = (x, y, s = 1) => {
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

    const drawBackground = () => {
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#FFF9E6");
      sky.addColorStop(0.5, "#F2E5C8");
      sky.addColorStop(0.76, "#D8C4A1");
      sky.addColorStop(1, "#A9B7BA");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

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

      for (let i = 0; i < 30; i++) {
        const x = ((i * 91) % w) + Math.sin(time + i) * 9;
        const y = ((i * 41) % (h * 0.58)) + Math.cos(time * 1.1 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.25)";
        ctx.fill();
      }
    };

    const drawWater = () => {
      const y = h * 0.78;

      ctx.fillStyle = "#8EA5AA";
      ctx.fillRect(0, y, w, h - y);

      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        const yy = y + 14 + i * 24;

        for (let x = -40; x <= w + 40; x += 26) {
          const waveY = yy + Math.sin(x * 0.02 + time * 2 + i) * 4;
          if (x === -40) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }

        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const drawDock = () => {
      const y = h * 0.78;

      ctx.fillStyle = "#2D2720";
      ctx.fillRect(0, y - 22, w, 28);

      for (let i = 0; i < 10; i++) {
        const x = i * (w / 9);

        ctx.beginPath();
        ctx.moveTo(x, y - 22);
        ctx.lineTo(x - 40, h);
        ctx.strokeStyle = "rgba(0,0,0,0.35)";
        ctx.lineWidth = 5;
        ctx.stroke();
      }
    };

    const drawShip = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(-220, -36);
      ctx.lineTo(210, -36);
      ctx.quadraticCurveTo(170, 62, -145, 58);
      ctx.quadraticCurveTo(-220, 35, -220, -36);
      ctx.closePath();

      const hull = ctx.createLinearGradient(0, -40, 0, 70);
      hull.addColorStop(0, "#1A242E");
      hull.addColorStop(0.58, "#243849");
      hull.addColorStop(0.59, "#8B3E2F");
      hull.addColorStop(1, "#5B2B25");

      ctx.fillStyle = hull;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      for (let i = 0; i < 9; i++) {
        ctx.beginPath();
        ctx.arc(-150 + i * 38, -13, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rr(-85, -106, 165, 66, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i < 6; i++) {
        rr(-66 + i * 25, -88, 12, 12, 3);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawCrane = (x, y, s, flip = false) => {
      ctx.save();
      ctx.translate(x, y);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -250);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -225);
      ctx.lineTo(200, -288);
      ctx.moveTo(0, -225);
      ctx.lineTo(165, -214);
      ctx.moveTo(40, -238);
      ctx.lineTo(55, -221);
      ctx.moveTo(80, -250);
      ctx.lineTo(98, -228);
      ctx.moveTo(120, -263);
      ctx.lineTo(138, -220);
      ctx.stroke();

      const hookX = 165 + Math.sin(time * 0.9) * 16;

      ctx.beginPath();
      ctx.moveTo(hookX, -274);
      ctx.lineTo(hookX, -142);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(hookX - 28, -128 + Math.sin(time * 1.4) * 5, 56, 46, 4);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-36, -20, 72, 28, 6);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawScaffold = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;

      for (let i = 0; i < 5; i++) {
        const xx = i * 28;
        ctx.beginPath();
        ctx.moveTo(xx, 0);
        ctx.lineTo(xx, -145);
        ctx.stroke();
      }

      for (let j = 0; j < 6; j++) {
        const yy = -j * 29;
        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.lineTo(112, yy);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawWorker = (
      x,
      y,
      s,
      color = "#FFE994",
      action = "weld",
      flip = false,
      phase = 0,
    ) => {
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
      ctx.moveTo(-8, 0);
      ctx.lineTo(-13, 28);
      ctx.moveTo(8, 0);
      ctx.lineTo(13, 28);
      ctx.stroke();

      rr(-18, -45, 36, 48, 8);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      let rightX = 40;
      let rightY = -26 + Math.sin(t * 3.5) * 4;

      if (action === "weld") {
        rightX = 45;
        rightY = -20;
      }

      if (action === "clipboard") {
        rightX = 38;
        rightY = -32;
      }

      if (action === "rig") {
        rightX = 42;
        rightY = -52;
      }

      ctx.beginPath();
      ctx.moveTo(-15, -34);
      ctx.lineTo(-34, -18 + Math.sin(t * 3) * 3);
      ctx.moveTo(15, -34);
      ctx.lineTo(rightX, rightY);
      ctx.strokeStyle = color;
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-34, -18 + Math.sin(t * 3) * 3, 5, 0, Math.PI * 2);
      ctx.arc(rightX, rightY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (action === "weld") {
        ctx.save();
        ctx.translate(rightX + 10, rightY);
        ctx.rotate(-0.2);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(28, 8);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.stroke();

        for (let i = 0; i < 8; i++) {
          const a = (Math.PI * 2 * i) / 8 + time * 5;
          const r = 8 + Math.sin(time * 8 + i) * 5;
          ctx.beginPath();
          ctx.moveTo(30, 8);
          ctx.lineTo(30 + Math.cos(a) * r, 8 + Math.sin(a) * r);
          ctx.strokeStyle = "#FFD36B";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.restore();
      }

      if (action === "clipboard") {
        ctx.save();
        ctx.translate(rightX + 12, rightY);
        ctx.rotate(-0.18);
        rr(-10, -16, 20, 26, 4);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-4, -6);
        ctx.lineTo(5, -6);
        ctx.moveTo(-4, 1);
        ctx.lineTo(6, 1);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.moveTo(0, -45);
      ctx.lineTo(0, -52);
      ctx.strokeStyle = "#E7B58B";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -66, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rr(-17, -82, 34, 12, 5);
      ctx.fillStyle = "#F4C542";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -74);
      ctx.quadraticCurveTo(0, -95, 18, -74);
      ctx.fillStyle = "#F4C542";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-5, -65, 2, 0, Math.PI * 2);
      ctx.arc(5, -65, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -58, 4, 0.1, Math.PI - 0.1);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawProcessPath = () => {
      const points = [
        { x: w * 0.13, y: h * 0.31, label: "NEED", color: "#FFE994" },
        { x: w * 0.29, y: h * 0.43, label: "SEARCH", color: "#CFF7BC" },
        { x: w * 0.45, y: h * 0.32, label: "TRADE", color: "#A6E6EC" },
        { x: w * 0.61, y: h * 0.44, label: "SAFETY", color: "#FFF6C8" },
        { x: w * 0.76, y: h * 0.33, label: "SELECT", color: "#FFE1A6" },
        { x: w * 0.88, y: h * 0.47, label: "DEPLOY", color: "#CFF7BC" },
      ];

      ctx.beginPath();
      points.forEach((point, i) => {
        if (i === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });

      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 12]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      points.forEach((point, index) => {
        const done = index <= activeRef.current;

        ctx.beginPath();
        ctx.arc(
          point.x,
          point.y,
          25 + (done ? Math.sin(time * 3 + index) * 3 : 0),
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = done ? point.color : "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = done ? 3 : 2.5;
        ctx.stroke();

        if (done) {
          ctx.beginPath();
          ctx.arc(point.x + 22, point.y - 24, 12, 0, Math.PI * 2);
          ctx.fillStyle = "#67D946";
          ctx.fill();
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 2;
          ctx.stroke();

          drawCheck(point.x + 22, point.y - 24, 0.45);
        }

        ctx.fillStyle = "#111";
        ctx.font = "900 9px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(point.label, point.x, point.y + 45);
      });

      for (let i = 0; i < 4; i++) {
        const p = (time * 0.16 + i * 0.25) % 1;
        const total = points.length - 1;
        const seg = Math.min(Math.floor(p * total), total - 1);
        const local = p * total - seg;

        const a = points[seg];
        const b = points[seg + 1];

        const x = a.x + (b.x - a.x) * local;
        const y = a.y + (b.y - a.y) * local;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(time * 2 + i) * 0.12);

        rr(-11, -15, 22, 22, 4);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }
    };

    const drawActiveBadge = () => {
      const step = processSteps[activeRef.current];

      ctx.save();
      ctx.translate(w * 0.5, h * 0.13 + Math.sin(time * 1.2) * 5);

      rr(-160, -56, 320, 112, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-118, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = step.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(`STEP ${step.step}`, 30, -15);

      ctx.font = "900 17px Arimo";
      ctx.fillText(step.title.toUpperCase(), 30, 16);

      ctx.beginPath();
      ctx.arc(140, -40, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
    };

    const drawChecklist = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.35) * 5);

      rr(-112, -54, 224, 108, 28);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("READY TO DEPLOY", 0, -27);

      ["Trade fit", "Docs ready", "HSE cleared"].forEach((item, i) => {
        const yy = 2 + i * 24;

        ctx.beginPath();
        ctx.arc(-58, yy, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        drawCheck(-58, yy, 0.36);

        ctx.fillStyle = "#111";
        ctx.font = "800 11px Arimo";
        ctx.textAlign = "left";
        ctx.fillText(item, -38, yy + 4);
      });

      ctx.restore();
    };

    const drawFloatingCard = (x, y, title, value, color, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.45 + phase) * 6);

      rr(-92, -32, 184, 64, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-60, 0, 17, 0, Math.PI * 2);
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

    const drawContainers = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      const colors = ["#A6E6EC", "#CFF7BC", "#FFE994"];

      for (let i = 0; i < 5; i++) {
        const xx = (i % 3) * 62;
        const yy = -Math.floor(i / 3) * 34;

        rr(xx, yy, 58, 30, 4);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawBackground();
      drawWater();
      drawDock();
      drawActiveBadge();
      drawProcessPath();

      const s = Math.min(w, h) / 820;

      drawCrane(w * 0.14, h * 0.78, s * 0.82, false);
      drawCrane(w * 0.88, h * 0.78, s * 0.74, true);

      drawShip(w * 0.52, h * 0.69, s * 0.9);
      drawScaffold(w * 0.59, h * 0.64, s * 0.7);

      drawContainers(w * 0.08, h * 0.75, s * 0.66);
      drawContainers(w * 0.73, h * 0.77, s * 0.62);

      drawWorker(w * 0.36, h * 0.86, s * 0.74, "#FFE994", "weld", false, 0);
      drawWorker(w * 0.62, h * 0.84, s * 0.69, "#CFF7BC", "rig", true, 1.1);
      drawWorker(
        w * 0.76,
        h * 0.86,
        s * 0.69,
        "#A6E6EC",
        "clipboard",
        false,
        2.2,
      );

      drawChecklist(w * 0.5, h * 0.6);

      drawFloatingCard(w * 0.22, h * 0.56, "Shortlist", "48h", "#FFE994", 0);
      drawFloatingCard(w * 0.78, h * 0.56, "Safety", "HSE", "#CFF7BC", 2);
      drawFloatingCard(
        w * 0.5,
        h * 0.94,
        "Outcome",
        "Crew deployed ✓",
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
        <div className="marine-process-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Recruitment Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "From",
              "shipyard",
              "need",
              "to",
              "marine",
              "crew",
              "deployment",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="marine-process-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            A smooth marine recruitment process built for shipyards, offshore
            projects, dry dock operations and vessel maintenance teams.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="marine-process-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:sticky lg:top-24 lg:h-[720px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="space-y-5">
            {processSteps.map(({ icon: Icon, ...item }, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.step}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`marine-process-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "border-black bg-[#FFF9E6] shadow-xl"
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
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <p className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                          Step {item.step}
                        </p>

                        <p className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-bold text-black/55">
                          {item.tag}
                        </p>
                      </div>

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

        {/* <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="marine-process-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        <div className="marine-process-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <Anchor size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Built for safety-critical marine hiring
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We support the full recruitment journey from project
                  requirement to trade screening, document checking, employer
                  selection and shipyard deployment.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Start Hiring
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="marine-process-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Project requirement",
            "Marine talent search",
            "Trade screening",
            "Safety check",
            "Employer selection",
            "Crew deployment",
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

export default OurRecruitmentProcess;
