import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  AlarmClock,
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  Flame,
  Globe2,
  HardHat,
  MapPinned,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Zap,
} from "lucide-react";

const challenges = [
  {
    title: "Skilled Workforce Shortage",
    problem:
      "Energy projects often need engineers, technicians and site workers with specific technical experience.",
    solution:
      "We support targeted sourcing for qualified oil, gas, EPC and renewable energy professionals.",
    icon: UsersRound,
    color: "#FFE994",
    alert: "Talent Gap",
    fixed: "Skilled Team Found",
  },
  {
    title: "Offshore & Remote Hiring",
    problem:
      "Remote platforms, field sites and offshore projects require workers who can handle demanding environments.",
    solution:
      "We help identify candidates prepared for offshore, remote site and project-based deployment.",
    icon: MapPinned,
    color: "#CFF7BC",
    alert: "Remote Coverage",
    fixed: "Remote Crew Ready",
  },
  {
    title: "HSE & Safety Compliance",
    problem:
      "Safety standards are critical across oil rigs, refineries, gas plants and energy infrastructure.",
    solution:
      "We support safety-focused screening with HSE awareness and document readiness in mind.",
    icon: ShieldCheck,
    color: "#A6E6EC",
    alert: "Safety Review",
    fixed: "HSE Checked",
  },
  {
    title: "Certified Technical Professionals",
    problem:
      "Employers need workers with relevant technical ability, certifications and project readiness.",
    solution:
      "We help coordinate verification of skills, documents and role suitability before employer review.",
    icon: ClipboardCheck,
    color: "#FFF6C8",
    alert: "Certification Needed",
    fixed: "Certified Profiles",
  },
  {
    title: "Shutdown & Turnaround Staffing",
    problem:
      "Shutdowns require fast mobilization of skilled workers within strict project timelines.",
    solution:
      "We support rapid shortlisting for maintenance, inspection, fabrication and technical site teams.",
    icon: AlarmClock,
    color: "#FFE994",
    alert: "Urgent Shutdown",
    fixed: "Turnaround Crew Ready",
  },
  {
    title: "Fast Project Mobilization",
    problem:
      "Energy projects lose time when hiring, screening and deployment coordination are delayed.",
    solution:
      "We help employers move from requirement to shortlist and deployment support faster.",
    icon: Zap,
    color: "#CFF7BC",
    alert: "Mobilization Delay",
    fixed: "Project Mobilized",
  },
  {
    title: "Multi-country Recruitment",
    problem:
      "International energy hiring needs cross-border coordination and reliable candidate pipelines.",
    solution:
      "Our network supports employer needs across countries, regions and energy workforce categories.",
    icon: Globe2,
    color: "#A6E6EC",
    alert: "Country Gap",
    fixed: "Global Pipeline Active",
  },
  {
    title: "Documentation & Visa Coordination",
    problem:
      "Incomplete documents can slow down overseas hiring and deployment planning.",
    solution:
      "We support organized document flow for smoother employer review and placement preparation.",
    icon: FileCheck2,
    color: "#FFF6C8",
    alert: "Document Delay",
    fixed: "Files Ready",
  },
];

const stats = [
  { value: "96%", label: "Client Satisfaction" },
  { value: "1500+", label: "Energy Professionals" },
  { value: "20+", label: "Major Projects" },
  { value: "18+", label: "Countries Supported" },
  { value: "24/7", label: "Recruitment Support" },
];

const EnergyChallengesWeSolve = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".energy-ch-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".energy-ch-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".energy-ch-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.06,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".energy-ch-stat", {
        y: 25,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.06,
        delay: 0.55,
        ease: "back.out(1.5)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % challenges.length);
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

      rr(-115, -44, 230, 62, 12);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      const tower = (tx, height, color) => {
        rr(tx - 11, -44 - height, 22, height, 5);
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
            -58 - height - i * 11,
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

      tower(-78, 124, "#1C1810");
      tower(-30, 92, "#2E2618");
      tower(74, 112, "#1C1810");

      rr(22, -142, 60, 98, 13);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(22, -118 + i * 26);
        ctx.lineTo(82, -118 + i * 26);
        ctx.strokeStyle = "rgba(0,0,0,0.22)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

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

      rr(-82, -18, 164, 26, 8);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-62, -18);
      ctx.lineTo(0, -158);
      ctx.lineTo(62, -18);
      ctx.moveTo(-36, -18);
      ctx.lineTo(0, -110);
      ctx.lineTo(36, -18);
      ctx.moveTo(-40, -75);
      ctx.lineTo(40, -75);
      ctx.moveTo(-22, -120);
      ctx.lineTo(22, -120);
      ctx.stroke();

      rr(30, -100, 46, 23, 7);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawWindTurbine = (x, y, s, phase = 0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -120);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -120, 11, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.save();
      ctx.translate(0, -120);
      ctx.rotate(time * 1.2 + phase);

      for (let i = 0; i < 3; i++) {
        ctx.rotate((Math.PI * 2) / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -58);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 5;
        ctx.stroke();

        rr(-5, -63, 10, 40, 7);
        ctx.fillStyle = "#CFF7BC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();
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

    const drawFlow = () => {
      const points = [
        { x: w * 0.16, y: h * 0.25, label: "ISSUE", color: "#FFE994" },
        { x: w * 0.34, y: h * 0.4, label: "SOURCE", color: "#CFF7BC" },
        { x: w * 0.5, y: h * 0.31, label: "SCREEN", color: "#A6E6EC" },
        { x: w * 0.68, y: h * 0.42, label: "VERIFY", color: "#FFF6C8" },
        { x: w * 0.84, y: h * 0.28, label: "SOLVE", color: "#FFE994" },
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
        ctx.beginPath();
        ctx.arc(
          point.x,
          point.y,
          25 + Math.sin(time * 3 + index) * 2,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = point.color;
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        if (index <= Math.floor((time * 0.6) % points.length)) {
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

    const drawDashboard = () => {
      const item = challenges[activeRef.current];
      const solved = Math.sin(time * 1.7) > -0.2;

      ctx.save();
      ctx.translate(w * 0.5, h * 0.12 + Math.sin(time * 1.2) * 5);

      rr(-150, -56, 300, 112, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-108, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(solved ? "SOLUTION ACTIVE" : "CHALLENGE DETECTED", 30, -15);

      ctx.font = "900 18px Arimo";
      ctx.fillText(solved ? `✓ ${item.fixed}` : `⚠ ${item.alert}`, 30, 16);

      ctx.beginPath();
      ctx.arc(130, -40, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = solved ? "#67D946" : "#FFE994";
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
      ctx.fillText("PROJECT READINESS", 0, -25);

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
      drawDashboard();
      drawFlow();
      drawPipeline();

      const s = Math.min(w, h) / 800;

      drawRefinery(w * 0.22, h * 0.72, s * 0.85);
      drawRig(w * 0.52, h * 0.76, s * 0.86);
      drawWindTurbine(w * 0.8, h * 0.74, s * 0.78, 0.4);

      drawWorker(w * 0.34, h * 0.86, s * 0.8, "#FFE994", "point", false, 0);
      drawWorker(w * 0.6, h * 0.86, s * 0.8, "#CFF7BC", "clipboard", true, 1.2);
      drawWorker(w * 0.72, h * 0.86, s * 0.76, "#A6E6EC", "wrench", false, 2.2);

      drawCertificationPanel(w * 0.5, h * 0.58);

      drawFloatingCard(
        w * 0.2,
        h * 0.55,
        "Challenge",
        "Detected",
        "#FFE994",
        0,
      );
      drawFloatingCard(
        w * 0.8,
        h * 0.55,
        "Solution",
        "Activated",
        "#CFF7BC",
        2,
      );
      drawFloatingCard(
        w * 0.5,
        h * 0.93,
        "Outcome",
        "Project ready ✓",
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
        <div className="energy-ch-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Energy Challenges We Solve
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Solving", "critical", "energy", "workforce", "challenges"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="energy-ch-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We help employers solve skill shortages, safety compliance, shutdown
            staffing, project mobilization and cross-border energy recruitment
            needs.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {challenges.map(({ icon: Icon, ...item }, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`energy-ch-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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

                      <div className="mt-4 grid gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">
                            Problem
                          </p>
                          <p className="mt-1 text-sm leading-6 text-black/70">
                            {item.problem}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">
                            Solution
                          </p>
                          <p className="mt-1 text-sm leading-6 text-black/70">
                            {item.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="energy-ch-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:sticky lg:top-24 lg:h-[720px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        {/* <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((item) => (
            <article
              key={item.label}
              className="energy-ch-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        <div className="energy-ch-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <HardHat size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Ready to solve your energy workforce challenges?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We help employers build reliable, safety-focused teams for
                  oil, gas, EPC, power and renewable energy projects.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
              >
                Talk to Our Experts
                <ArrowRight size={16} />
              </a>

              <a
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-all duration-300 hover:bg-black hover:text-white"
              >
                Request Workforce
                <BadgeCheck size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="energy-ch-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "HSE focused",
            "Shutdown staffing",
            "Offshore hiring",
            "Certified profiles",
            "Fast mobilization",
            "Global sourcing",
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

export default EnergyChallengesWeSolve;
