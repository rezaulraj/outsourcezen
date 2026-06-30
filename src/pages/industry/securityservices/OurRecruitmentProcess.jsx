import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Fingerprint,
  LockKeyhole,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UsersRound,
} from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Site Requirement",
    text: "We understand location type, shift hours, risk level, required guard numbers and security coverage needs.",
    icon: ClipboardCheck,
    color: "#FFE994",
    tag: "Requirement",
  },
  {
    step: "02",
    title: "Security Staff Sourcing",
    text: "We source trained guards, CCTV operators, patrol officers, access control staff and supervisors.",
    icon: SearchCheck,
    color: "#CFF7BC",
    tag: "Sourcing",
  },
  {
    step: "03",
    title: "Profile Verification",
    text: "Candidates are reviewed for experience, discipline, communication, appearance and security readiness.",
    icon: Fingerprint,
    color: "#A6E6EC",
    tag: "Verification",
  },
  {
    step: "04",
    title: "Training & Compliance Check",
    text: "We check reporting ability, emergency awareness, site rules, patrol duties and client expectations.",
    icon: ShieldCheck,
    color: "#FFF6C8",
    tag: "Compliance",
  },
  {
    step: "05",
    title: "Client Selection",
    text: "Shortlisted candidates are shared with the employer for final review, interview or approval.",
    icon: UserCheck,
    color: "#FFE1A6",
    tag: "Selection",
  },
  {
    step: "06",
    title: "Site Deployment",
    text: "Approved security staff are deployed smoothly with shift coordination and ongoing workforce support.",
    icon: LockKeyhole,
    color: "#CFF7BC",
    tag: "Deployment",
  },
];

const stats = [
  { value: "48h", label: "Initial Shortlist" },
  { value: "3200+", label: "Security Staff" },
  { value: "180+", label: "Sites Protected" },
  { value: "24/7", label: "Support Coverage" },
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
      gsap.from(".security-process-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".security-process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".security-process-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".security-process-stat", {
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
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#FFF9E6");
      bg.addColorStop(0.5, "#F1E7D0");
      bg.addColorStop(1, "#D3C3A6");

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const floorY = h * 0.8;
      ctx.fillStyle = "#B7A98F";
      ctx.fillRect(0, floorY, w, h - floorY);

      ctx.strokeStyle = "rgba(0,0,0,0.14)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(w, floorY);
      ctx.stroke();

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

      for (let i = 0; i < 35; i++) {
        const x = ((i * 89) % w) + Math.sin(time + i) * 8;
        const y = ((i * 47) % h) + Math.cos(time * 1.1 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.25)";
        ctx.fill();
      }
    };

    const drawBuilding = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-130, -250, 260, 270, 22);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      rr(-52, -62, 104, 82, 14);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          rr(-96 + c * 52, -212 + r * 40, 27, 23, 5);
          ctx.fillStyle =
            Math.sin(time * 2 + r + c) > 0.2 ? "#A6E6EC" : "#FFE994";
          ctx.fill();
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      rr(-116, -274, 232, 34, 12);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.fillStyle = "#FFF9E6";
      ctx.font = "900 15px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SECURITY SITE", 0, -252);

      ctx.restore();
    };

    const drawCctvWall = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.2) * 4);
      ctx.scale(s, s);

      rr(-145, -112, 290, 198, 22);
      ctx.fillStyle = "#111";
      ctx.fill();
      ctx.strokeStyle = "#CFF7BC";
      ctx.lineWidth = 2;
      ctx.stroke();

      const labels = ["Gate", "Lobby", "Parking", "Warehouse"];

      for (let i = 0; i < 4; i++) {
        const xx = -126 + (i % 2) * 132;
        const yy = -92 + Math.floor(i / 2) * 88;

        rr(xx, yy, 118, 72, 10);
        ctx.fillStyle = "#1E2B2A";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(xx + 14, yy + 45 + Math.sin(time * 2 + i) * 8);
        ctx.lineTo(xx + 42, yy + 30);
        ctx.lineTo(xx + 72, yy + 46);
        ctx.lineTo(xx + 103, yy + 25);
        ctx.strokeStyle = "#67D946";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#CFF7BC";
        ctx.font = "800 9px Arimo";
        ctx.fillText(labels[i], xx + 18, yy + 16);

        ctx.beginPath();
        ctx.arc(
          xx + 100,
          yy + 14,
          5 + Math.sin(time * 5 + i) * 1.5,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = i === 1 ? "#FFE994" : "#67D946";
        ctx.fill();
      }

      ctx.fillStyle = "#CFF7BC";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("LIVE CCTV MONITORING", 0, 68);

      ctx.restore();
    };

    const drawAccessGate = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-145, -88, 290, 90, 18);
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(-130, -72, 260, 58, 14);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      const barX = -110 + ((time * 65) % 220);
      ctx.beginPath();
      ctx.moveTo(barX, -72);
      ctx.lineTo(barX, -14);
      ctx.strokeStyle = "rgba(103,217,70,0.65)";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ACCESS CONTROL", 0, -38);

      rr(-166, -120, 42, 122, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-145, -82, 12 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.restore();
    };

    const drawGuard = (x, y, s, flip = false, phase = 0) => {
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
      ctx.moveTo(-9, 0);
      ctx.lineTo(-15, 32);
      ctx.moveTo(9, 0);
      ctx.lineTo(15, 32);
      ctx.stroke();

      rr(-21, -50, 42, 54, 9);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.stroke();

      rr(-15, -42, 30, 38, 7);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -38);
      ctx.lineTo(-39, -18 + Math.sin(t * 3) * 3);
      ctx.moveTo(18, -38);
      ctx.lineTo(42, -28 + Math.sin(t * 2.6) * 4);
      ctx.strokeStyle = "#1C1810";
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-39, -18 + Math.sin(t * 3) * 3, 5, 0, Math.PI * 2);
      ctx.arc(42, -28 + Math.sin(t * 2.6) * 4, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.save();
      ctx.translate(52, -30 + Math.sin(t * 2.6) * 4);
      ctx.rotate(-0.12);
      rr(-8, -12, 22, 28, 5);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(3, 2, 5 + Math.sin(time * 5) * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(0, -50);
      ctx.lineTo(0, -58);
      ctx.strokeStyle = "#E7B58B";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -72, 15, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rr(-19, -90, 38, 13, 5);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -80);
      ctx.quadraticCurveTo(0, -102, 18, -80);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-5, -71, 2, 0, Math.PI * 2);
      ctx.arc(5, -71, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -64, 4, 0.1, Math.PI - 0.1);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawProcessPath = () => {
      const points = [
        { x: w * 0.13, y: h * 0.31, label: "NEED", color: "#FFE994" },
        { x: w * 0.29, y: h * 0.43, label: "SOURCE", color: "#CFF7BC" },
        { x: w * 0.45, y: h * 0.32, label: "VERIFY", color: "#A6E6EC" },
        { x: w * 0.61, y: h * 0.44, label: "TRAIN", color: "#FFF6C8" },
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

      ["Guard fit", "Verified", "Site ready"].forEach((item, i) => {
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

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawBackground();
      drawActiveBadge();
      drawProcessPath();

      const s = Math.min(w, h) / 820;

      drawBuilding(w * 0.52, h * 0.72, s * 0.78);
      drawAccessGate(w * 0.52, h * 0.82, s * 0.88);
      drawCctvWall(w * 0.23, h * 0.53, s * 0.66);

      drawGuard(w * 0.36, h * 0.88, s * 0.72, false, 0);
      drawGuard(w * 0.72, h * 0.88, s * 0.68, true, 1.2);

      drawChecklist(w * 0.77, h * 0.55);

      drawFloatingCard(w * 0.22, h * 0.66, "Shortlist", "48h", "#FFE994", 0);
      drawFloatingCard(w * 0.78, h * 0.66, "Coverage", "24/7", "#CFF7BC", 2);
      drawFloatingCard(
        w * 0.5,
        h * 0.96,
        "Outcome",
        "Staff deployed ✓",
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
        <div className="security-process-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Recruitment Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["From", "security", "need", "to", "site", "deployment"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="security-process-word inline-block">
                    {word}
                  </span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            A smooth security recruitment process for guards, CCTV operators,
            access control staff, supervisors and 24/7 site coverage teams.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="security-process-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:sticky lg:top-24 lg:h-[720px]">
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
                  className={`security-process-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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
              className="security-process-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        <div className="security-process-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <UsersRound size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Built for reliable security deployment
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We support the full recruitment journey from site requirement
                  to sourcing, verification, training check, client approval and
                  smooth security staff deployment.
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

        <div className="security-process-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Site requirement",
            "Guard sourcing",
            "Profile verification",
            "Training check",
            "Client selection",
            "Site deployment",
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
