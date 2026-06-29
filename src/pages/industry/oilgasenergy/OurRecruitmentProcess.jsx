import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  FileCheck2,
  HardHat,
  MessageSquareCheck,
  SearchCheck,
  ShieldCheck,
  Truck,
  UserSearch,
  UsersRound,
} from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Requirement Analysis",
    text: "We understand project type, required roles, certifications, location, timeline and mobilization needs.",
    icon: ClipboardList,
    color: "#FFE994",
  },
  {
    step: "02",
    title: "Talent Search",
    text: "We source suitable energy professionals for oil, gas, EPC, refinery, power and renewable projects.",
    icon: UserSearch,
    color: "#CFF7BC",
  },
  {
    step: "03",
    title: "Screening",
    text: "Candidates are reviewed for experience, technical readiness, safety awareness and role suitability.",
    icon: SearchCheck,
    color: "#A6E6EC",
  },
  {
    step: "04",
    title: "Certification Review",
    text: "We support checking documents, HSE awareness, technical certificates and profile readiness.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
  {
    step: "05",
    title: "Employer Interview",
    text: "Shortlisted profiles are shared with employers for review, interview and final selection.",
    icon: MessageSquareCheck,
    color: "#FFE994",
  },
  {
    step: "06",
    title: "Visa & Documentation",
    text: "We help organize required candidate documents for smoother overseas hiring coordination.",
    icon: FileCheck2,
    color: "#CFF7BC",
  },
  {
    step: "07",
    title: "Deployment Support",
    text: "Selected workers are prepared for project arrival, mobilization and site onboarding support.",
    icon: Truck,
    color: "#A6E6EC",
  },
];

const stats = [
  { value: "48h", label: "Initial Shortlisting" },
  { value: "24/7", label: "Recruitment Support" },
  { value: "1500+", label: "Energy Professionals" },
  { value: "96%", label: "Client Satisfaction" },
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
      gsap.from(".energy-process-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".energy-process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".energy-process-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.06,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".energy-process-stat", {
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
    }, 2600);

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

    const drawWorker = (
      x,
      y,
      s,
      color = "#FFE994",
      action = "point",
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
      ctx.lineTo(-11, 25);
      ctx.moveTo(7, 0);
      ctx.lineTo(11, 25);
      ctx.stroke();

      rr(-17, -42, 34, 45, 8);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      let rightX = 36;
      let rightY = -24 + Math.sin(t * 3.5) * 4;

      if (action === "point") {
        rightX = 44;
        rightY = -50;
      }

      if (action === "clipboard") {
        rightX = 38;
        rightY = -32;
      }

      if (action === "wrench") {
        rightX = 42;
        rightY = -25;
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

      if (action === "wrench") {
        ctx.beginPath();
        ctx.moveTo(rightX, rightY);
        ctx.lineTo(rightX + 24, rightY - 18);
        ctx.moveTo(rightX + 24, rightY - 18);
        ctx.lineTo(rightX + 31, rightY - 8);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(0, -42);
      ctx.lineTo(0, -50);
      ctx.strokeStyle = "#E7B58B";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -64, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rr(-17, -81, 34, 12, 5);
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

    const drawRefinery = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-110, -42, 220, 60, 12);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      const tower = (tx, height, color) => {
        rr(tx - 10, -42 - height, 20, height, 5);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.globalAlpha = 0.14;
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.ellipse(
            tx + Math.sin(time + i) * 8,
            -56 - height - i * 11,
            12 + i * 3,
            6 + i,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = "#111";
          ctx.fill();
        }
        ctx.restore();
      };

      tower(-74, 116, "#1C1810");
      tower(-28, 88, "#2E2618");
      tower(70, 108, "#1C1810");

      rr(22, -134, 56, 92, 12);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.restore();
    };

    const drawRig = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      rr(-78, -18, 156, 26, 8);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-58, -18);
      ctx.lineTo(0, -150);
      ctx.lineTo(58, -18);
      ctx.moveTo(-34, -18);
      ctx.lineTo(0, -104);
      ctx.lineTo(34, -18);
      ctx.moveTo(-38, -72);
      ctx.lineTo(38, -72);
      ctx.moveTo(-22, -114);
      ctx.lineTo(22, -114);
      ctx.stroke();

      rr(28, -96, 44, 22, 7);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawPipeline = () => {
      const y = h * 0.8;

      ctx.beginPath();
      ctx.moveTo(w * 0.08, y);
      ctx.lineTo(w * 0.92, y);
      ctx.strokeStyle = "#1C1810";
      ctx.lineWidth = 9;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(w * 0.08, y);
      ctx.lineTo(w * 0.92, y);
      ctx.strokeStyle = "#E7B53A";
      ctx.lineWidth = 3;
      ctx.setLineDash([14, 16]);
      ctx.lineDashOffset = -time * 55;
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 6; i++) {
        const x = w * 0.13 + ((time * 50 + i * 110) % (w * 0.74));

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    const drawProcessPath = () => {
      const points = [
        { x: w * 0.16, y: h * 0.3, label: "NEED", color: "#FFE994" },
        { x: w * 0.3, y: h * 0.43, label: "SEARCH", color: "#CFF7BC" },
        { x: w * 0.44, y: h * 0.32, label: "SCREEN", color: "#A6E6EC" },
        { x: w * 0.58, y: h * 0.44, label: "CERTIFY", color: "#FFF6C8" },
        { x: w * 0.72, y: h * 0.33, label: "SELECT", color: "#FFE994" },
        { x: w * 0.84, y: h * 0.47, label: "DEPLOY", color: "#CFF7BC" },
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
      ctx.translate(w * 0.5, h * 0.12 + Math.sin(time * 1.2) * 5);

      rr(-158, -56, 316, 112, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-116, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = step.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(`STEP ${step.step}`, 30, -15);

      ctx.font = "900 18px Arimo";
      ctx.fillText(step.title.toUpperCase(), 30, 16);

      ctx.beginPath();
      ctx.arc(138, -40, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
    };

    const drawCertificationPanel = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.35) * 5);

      rr(-106, -52, 212, 104, 28);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("PROCESS READY", 0, -25);

      ["HSE", "Technical", "Documents"].forEach((item, i) => {
        const yy = 2 + i * 24;

        ctx.beginPath();
        ctx.arc(-56, yy, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        drawCheck(-56, yy, 0.38);

        ctx.fillStyle = "#111";
        ctx.font = "800 11px Arimo";
        ctx.textAlign = "left";
        ctx.fillText(item, -36, yy + 4);
      });

      ctx.restore();
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
        const x = ((i * 89) % w) + Math.sin(time + i) * 8;
        const y = ((i * 47) % h) + Math.cos(time * 1.1 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.26)";
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();
      drawParticles();
      drawActiveBadge();
      drawProcessPath();
      drawPipeline();

      const s = Math.min(w, h) / 820;

      drawRefinery(w * 0.23, h * 0.72, s * 0.82);
      drawRig(w * 0.72, h * 0.76, s * 0.82);

      drawWorker(w * 0.35, h * 0.86, s * 0.78, "#FFE994", "point", false, 0);
      drawWorker(
        w * 0.58,
        h * 0.86,
        s * 0.78,
        "#CFF7BC",
        "clipboard",
        true,
        1.2,
      );
      drawWorker(w * 0.72, h * 0.86, s * 0.74, "#A6E6EC", "wrench", false, 2.2);

      drawCertificationPanel(w * 0.5, h * 0.6);

      drawFloatingCard(w * 0.2, h * 0.56, "Shortlist", "48h", "#FFE994", 0);
      drawFloatingCard(w * 0.8, h * 0.56, "Support", "24/7", "#CFF7BC", 2);
      drawFloatingCard(
        w * 0.5,
        h * 0.93,
        "Outcome",
        "Deployment ready ✓",
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
        <div className="energy-process-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Recruitment Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "From",
              "project",
              "requirement",
              "to",
              "energy",
              "workforce",
              "deployment",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="energy-process-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Our process is built for energy employers that need skilled,
            safety-focused and deployment-ready professionals.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="energy-process-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:sticky lg:top-24 lg:h-[720px]">
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
                  className={`energy-process-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">
                        Step {item.step}
                      </p>

                      <h3 className="mt-1 text-xl font-bold tracking-[-0.03em] text-black">
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
              className="energy-process-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        <div className="energy-process-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <HardHat size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Built for technical, safety-critical recruitment
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We support the full recruitment journey — from understanding
                  your energy project needs to shortlisting, certification
                  review, documentation and deployment support.
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

        <div className="energy-process-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Requirement analysis",
            "Talent search",
            "Screening",
            "Certification review",
            "Documentation",
            "Deployment",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2 text-sm font-bold text-black/65"
            >
              <BadgeCheck size={14} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurRecruitmentProcess;
