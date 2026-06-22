import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  HeartPulse,
  Hospital,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const HeroHealthcare = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".health-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".health-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".health-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
        duration: 1,
        delay: 0.7,
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

    // Draw realistic medical cross insignia
    const drawMedicalCross = (x, y, size, color = "#EF4444") => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.fillRect(x - size / 2, y - size / 6, size, size / 3);
      ctx.fillRect(x - size / 6, y - size / 2, size / 3, size);
    };

    // Realistic Anatomical Human Rendering with Activity States
    const drawRealisticPerson = (
      x,
      y,
      s,
      type = "doctor",
      state = "standing",
      localTime = 0,
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      // Color Palette Configurations
      let headColor = "#E2E8F0";
      let attireColor = "#38BDF8"; // Doctor scrubs blue
      let secondaryAttire = "#0284C7";

      if (type === "nurse") {
        attireColor = "#34D399"; // Nurse/Caregiver Emerald
        secondaryAttire = "#059669";
      } else if (type === "patient") {
        attireColor = "#94A3B8"; // Slate patient robe
        secondaryAttire = "#64748B";
      } else if (type === "paramedic") {
        attireColor = "#6366F1"; // Paramedic purple
        secondaryAttire = "#4F46E5";
      }

      // Head and Face orientation
      ctx.beginPath();
      ctx.arc(0, -32, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#CBD5E1";
      ctx.fill();

      // Hair
      ctx.beginPath();
      ctx.arc(0, -34, 9, Math.PI, 0);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#475569";
      ctx.stroke();

      // Torso / Attire jacket
      ctx.fillStyle = attireColor;
      ctx.beginPath();
      ctx.roundRect(-8, -20, 16, 28, [4, 4, 1, 1]);
      ctx.fill();

      // Setup Movement/Interaction States
      ctx.lineWidth = 4.5;
      ctx.strokeStyle = secondaryAttire;
      ctx.lineCap = "round";

      const isMoving = state === "walking" || state === "pushing";

      // Legs with dynamic joint movement
      const kneeY = 18;
      const legOffset = Math.sin(localTime * 1.5) * 6;

      ctx.beginPath();
      if (state === "walking") {
        // Left leg
        ctx.moveTo(-4, 8);
        ctx.lineTo(-5, kneeY);
        ctx.lineTo(-5 + legOffset, 28);
        // Right leg
        ctx.moveTo(4, 8);
        ctx.lineTo(5, kneeY);
        ctx.lineTo(5 - legOffset, 28);
      } else if (state === "sitting") {
        ctx.moveTo(-4, 8);
        ctx.lineTo(-12, 16);
        ctx.lineTo(-10, 24);
        ctx.moveTo(4, 8);
        ctx.lineTo(12, 16);
        ctx.lineTo(10, 24);
      } else {
        ctx.moveTo(-4, 8);
        ctx.lineTo(-5, 28);
        ctx.moveTo(4, 8);
        ctx.lineTo(5, 28);
      }
      ctx.stroke();

      // Arms / Work extensions with gesture movement
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = attireColor;
      ctx.beginPath();

      if (type === "doctor") {
        // Stethoscope / Consulting pose
        ctx.moveTo(-8, -16);
        ctx.lineTo(-14 + Math.sin(localTime * 2.5) * 3, -4);
        ctx.lineTo(-4 + Math.sin(localTime * 2.5) * 3, 0);

        // Stethoscope tube
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#475569";
        ctx.beginPath();
        ctx.moveTo(-2, -26);
        ctx.bezierCurveTo(-10, -20, -10, -10, -5, -4);
        ctx.stroke();
      } else if (type === "nurse" && state === "interacting") {
        // Dynamic arm gesture
        ctx.moveTo(8, -16);
        ctx.lineTo(14 + Math.sin(localTime * 2) * 4, -4);
        ctx.lineTo(10 + Math.sin(localTime * 2) * 6, 8);
        // Medical clipboard with dynamic hand gesture
        ctx.fillStyle = "#F8FAFC";
        ctx.fillRect(-3, -2, 8, 10);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#475569";
        ctx.strokeRect(-3, -2, 8, 10);
      } else if (type === "paramedic" && state === "pushing") {
        // Arms locked in forward pushing posture
        ctx.moveTo(-8, -16);
        ctx.lineTo(-12, -4);
        ctx.lineTo(-20, 8);
        ctx.moveTo(8, -16);
        ctx.lineTo(12, -4);
        ctx.lineTo(20, 8);
      } else {
        // Natural resting arms
        ctx.moveTo(-8, -16);
        ctx.lineTo(-11, 4);
        ctx.moveTo(8, -16);
        ctx.lineTo(11, 4);
      }
      ctx.stroke();

      ctx.restore();
    };

    // Realistic Modern Hospital Environment and Floor Plan
    const drawHospitalEnvironment = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      // Main Architectural Block with Volumetric Shading
      const buildingGrad = ctx.createLinearGradient(-160, -180, 160, 180);
      buildingGrad.addColorStop(0, "#FFFFFF");
      buildingGrad.addColorStop(1, "#F1F5F9");
      ctx.fillStyle = buildingGrad;
      ctx.shadowColor = "rgba(148, 163, 184, 0.15)";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = -10;
      ctx.shadowOffsetY = 15;
      ctx.beginPath();
      ctx.roundRect(-150, -170, 300, 340, 12);
      ctx.fill();

      // Reset shadows for interior elements
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Realistic Micro-organic Connectivity Node System Overlay
      ctx.save();
      for (let i = 0; i < 15; i++) {
        const nx = ((i * 127) % 300) - 150 + Math.sin(time * 0.5 + i) * 15;
        const ny = ((i * 83) % 340) - 170 + Math.cos(time * 0.4 + i) * 12;
        ctx.beginPath();
        ctx.arc(nx, ny, 1.2 + Math.sin(time * 1.5 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(14, 165, 233, 0.12)";
        ctx.fill();
      }
      ctx.restore();

      // Detailed Floor Plan: Corridors and Rooms
      const corridorGrad = ctx.createLinearGradient(-150, 0, 150, 0);
      corridorGrad.addColorStop(0, "rgba(226, 232, 240, 0.3)");
      corridorGrad.addColorStop(0.5, "rgba(255,255,255, 0)");
      corridorGrad.addColorStop(1, "rgba(226, 232, 240, 0.3)");
      ctx.fillStyle = corridorGrad;
      ctx.fillRect(-150, -50, 300, 100); // Main Central Hallway

      // Triage Desk Area
      ctx.beginPath();
      ctx.roundRect(-60, -110, 120, 40, [6, 6, 2, 2]);
      ctx.fillStyle = "#E2E8F0";
      ctx.fill();
      // Desk Clerk Computer
      ctx.fillStyle = "#475569";
      ctx.fillRect(-45, -100, 20, 14);
      ctx.fillStyle = `rgba(56, 189, 248, ${0.4 + 0.4 * Math.sin(time * 3)})`;
      ctx.fillRect(-43, -98, 16, 10); // Monitor glow

      // Glass Partition walls to private rooms
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(14, 165, 233, 0.25)";
      ctx.beginPath();
      for (let i = -120; i <= 120; i += 60) {
        if (Math.abs(i) === 0) continue;
        ctx.moveTo(i, -50);
        ctx.lineTo(i, 50); // Vertical room walls
        ctx.moveTo(i - 30, -50);
        ctx.lineTo(i + 30, -50); // Horizontal room walls
      }
      ctx.stroke();

      // Realistic Modern Facade Windows with Reflective sheen
      const winW = 18;
      const winH = 26;
      const startX = 65;
      const startY = -120;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 2; col++) {
          const wx = startX + col * 35;
          const wy = startY + row * 45;
          const glowAlpha =
            0.1 + 0.2 * Math.abs(Math.sin(time * 0.8 + row + col));
          ctx.beginPath();
          ctx.roundRect(wx, wy, winW, winH, 3);
          ctx.fillStyle = `rgba(56, 189, 248, ${glowAlpha})`;
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(14, 165, 233, 0.2)";
          ctx.stroke();
          ctx.strokeStyle = "rgba(255,255,255,0.4)";
          ctx.beginPath();
          ctx.moveTo(wx + 2, wy + winH - 4);
          ctx.lineTo(wx + winW - 4, wy + 2);
          ctx.stroke();
        }
      }

      // Volumetric Entrance Atrium
      ctx.beginPath();
      ctx.roundRect(-40, 130, 80, 40, [8, 8, 0, 0]);
      ctx.fillStyle = "#334155";
      ctx.fill();
      ctx.fillStyle = "rgba(186, 230, 253, 0.8)";
      ctx.fillRect(-20, 145, 18, 25);
      ctx.fillRect(2, 145, 18, 25);
      drawMedicalCross(0, 120, 16);

      ctx.restore();
    };

    // Realistic Moving Transport Cluster: Doctors moving Patient on Gurney
    const drawRealisticGurneyTransport = (cx, cy, s, localTime = 0) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);

      // Casting dynamic soft shadow for movement depth
      ctx.shadowColor = "rgba(15, 23, 42, 0.1)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 6;

      // Realistic Wheeled Gurney Architecture
      ctx.beginPath();
      ctx.roundRect(-45, -6, 90, 12, 4);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#E2E8F0";
      ctx.stroke();
      ctx.beginPath();
      ctx.roundRect(-45, 6, 8, 8, 2);
      ctx.roundRect(37, 6, 8, 8, 2);
      ctx.fillStyle = "#475569";
      ctx.fill(); // Wheels

      // Realistic Moving Patient on Gurney
      const patientXOffset = Math.sin(localTime * 1.8) * 2;
      // Body shape
      ctx.beginPath();
      ctx.ellipse(-10 + patientXOffset, -15, 30, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#CBD5E1";
      ctx.fill(); // Slate patient robe
      // Head
      ctx.beginPath();
      ctx.arc(-35 + patientXOffset, -22, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#E2E8F0";
      ctx.fill();
      // Arm resting
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#CBD5E1";
      ctx.beginPath();
      ctx.moveTo(-18 + patientXOffset, -10);
      ctx.lineTo(-12 + patientXOffset, -4);
      ctx.stroke();
      // IV Pole extension
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#475569";
      ctx.beginPath();
      ctx.moveTo(25 + patientXOffset, -28);
      ctx.lineTo(25 + patientXOffset, 4);
      ctx.stroke();

      // Moving Doctors/Paramedics around gurney
      const movePhase = localTime * 1.5;
      drawRealisticPerson(-55, -8, 0.8, "paramedic", "pushing", localTime);
      drawRealisticPerson(55, -8, 0.8, "doctor", "walking", movePhase + 2); // Leading doctor
      drawRealisticPerson(0, 32, 0.8, "nurse", "walking", movePhase + 4); // Side support

      ctx.restore();
    };

    // Realistic Sinus Rhythm Electrocardiogram (ECG) Pulse Waveform
    const drawRealisticECG = (x, y, width) => {
      ctx.save();
      ctx.strokeStyle = "rgba(226, 232, 240, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = -width / 2; i <= width / 2; i += 20) {
        ctx.moveTo(x + i, y - 40);
        ctx.lineTo(x + i, y + 40);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(16, 185, 129, 0.8)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(16, 185, 129, 0.4)";
      ctx.shadowBlur = 8;
      const speed = 160;
      const cycleLength = width * 0.7;

      for (let px = 0; px < width; px++) {
        const curX = x - width / 2 + px;
        const phase = (px - time * speed) % cycleLength;
        const normPhase = phase < 0 ? phase + cycleLength : phase;
        let waveY = 0;
        if (normPhase > 40 && normPhase < 55) {
          waveY = Math.sin(((normPhase - 40) / 15) * Math.PI) * -6;
        } else if (normPhase >= 55 && normPhase < 60) {
          waveY = ((normPhase - 55) / 5) * 5;
        } else if (normPhase >= 60 && normPhase < 66) {
          waveY = -45 + ((normPhase - 60) / 6) * 45;
        } else if (normPhase >= 66 && normPhase < 72) {
          waveY = ((normPhase - 66) / 6) * 15;
        } else if (normPhase >= 72 && normPhase < 95) {
          waveY = Math.sin(((normPhase - 72) / 23) * Math.PI) * -12;
        }
        if (px === 0) ctx.moveTo(curX, y + waveY);
        else ctx.lineTo(curX, y + waveY);
      }
      ctx.stroke();
      ctx.restore();
    };

    // Realistic Automotive Ambulance Rendering with Dynamic Arrival
    const drawRealisticAmbulance = (x, y, s, localTime = 0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);
      ctx.shadowColor = "rgba(15, 23, 42, 0.15)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 6;
      ctx.beginPath();
      ctx.roundRect(-55, -25, 75, 42, 6);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#E2E8F0";
      ctx.stroke();
      ctx.beginPath();
      ctx.roundRect(15, -12, 42, 29, [0, 8, 4, 0]);
      ctx.fillStyle = "#F8FAFC";
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.beginPath();
      ctx.roundRect(32, -9, 18, 14, [0, 5, 1, 0]);
      ctx.fillStyle = "rgba(14, 165, 233, 0.35)";
      ctx.fill();
      ctx.fillStyle = "#EF4444";
      ctx.fillRect(-55, -2, 110, 5);
      drawMedicalCross(-18, -12, 12, "#EF4444");

      // Flashing LED reflectiveness on ambulance panels
      const isBeaconOn = Math.floor(localTime * 12) % 2 === 0;
      if (isBeaconOn) {
        ctx.fillStyle = "rgba(56, 189, 248, 0.2)";
        ctx.fillRect(-50, -20, 60, 20);
        ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
        ctx.fillRect(20, -5, 30, 20);
      }

      // Volumetric Alloy Wheels
      [-32, 36].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 17, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#1E293B";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(wx, 17, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#94A3B8";
        ctx.fill();
      });
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.012;

      const sFactor = Math.min(w, h) / 720;

      // Layer 1: Global Infrastructure/Floor Plan
      drawHospitalEnvironment(w * 0.72, h * 0.44, sFactor * 1.1);

      // Layer 2: Synchronized Bio-Signals
      drawRealisticECG(w * 0.38, h * 0.18, Math.min(w * 0.48, 380));

      // Layer 3: Bustling Interior Interactions
      // Triage Desk: Nurse gesturing while speaking to sitting patient
      drawRealisticPerson(
        w * 0.65,
        h * 0.31,
        sFactor * 1.25,
        "nurse",
        "interacting",
        time,
      );
      drawRealisticPerson(
        w * 0.73,
        h * 0.33,
        sFactor * 1.25,
        "patient",
        "sitting",
        time + 3,
      );

      // Busy Hallway: Doctor reviewing clipboard while walking
      drawRealisticPerson(
        w * 0.58,
        h * 0.47,
        sFactor * 1.25,
        "doctor",
        "walking",
        time * 2,
      );

      // Complex Wheeled Transport: Doctors moving Patient in corridor
      const gurneySpeed = 55;
      const ambleLength = w * 0.75;
      const gurneyX = ((time * gurneySpeed) % ambleLength) - 100;
      drawRealisticGurneyTransport(gurneyX, h * 0.58, sFactor * 1.1, time);

      // Layer 4: Public Routing/Ambulance Transport
      const roadY = h * 0.88;
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, roadY);
      ctx.lineTo(w, roadY);
      ctx.stroke();
      const ambleX = ((time * 65) % (w + 200)) - 100;
      drawRealisticAmbulance(ambleX, roadY - 12, sFactor * 1.1, time);

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
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="health-reveal inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 shadow-sm">
              <Hospital size={14} className="text-blue-500" strokeWidth={2.2} />
              Healthcare Recruitment
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-900 sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Qualified", "healthcare"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="health-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="health-word inline-block">talent</span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="health-word inline-block text-emerald-600">
                    for care.
                  </span>
                </span>

                <svg
                  className="health-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
                  viewBox="0 0 320 24"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M2 17C58 6 130 4 188 10C228 14 268 18 318 9"
                    stroke="#059669"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="health-reveal mt-7 max-w-lg text-base leading-7 text-slate-600">
              From hospitals and clinics to elderly care facilities, we connect
              healthcare providers with compassionate, skilled and reliable
              professionals.
            </p>

            <div className="health-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [
                  HeartPulse,
                  "Patient care",
                  "text-red-500 bg-red-50/60 border-red-100",
                ],
                [
                  Stethoscope,
                  "Clinical support",
                  "text-blue-500 bg-blue-50/60 border-blue-100",
                ],
                [
                  ShieldCheck,
                  "Compliance ready",
                  "text-emerald-500 bg-emerald-50/60 border-emerald-100",
                ],
              ].map(([Icon, label, styleClasses]) => (
                <div
                  key={label}
                  className={`flex flex-col rounded-2xl border px-4 py-3.5 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-sm ${styleClasses}`}
                >
                  <Icon size={20} className="mb-2" />
                  {label}
                </div>
              ))}
            </div>

            <div className="health-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02] shadow-md shadow-slate-950/10"
              >
                <span className="absolute inset-0 w-0 bg-emerald-500 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Request Staff
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                />
              </a>

              <a
                href="/industries/healthcare"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
              >
                View roles
              </a>
            </div>
          </div>

          <div className="health-reveal relative h-[450px] w-full rounded-3xl border border-slate-100 bg-white/70 shadow-2xl shadow-slate-200/60 backdrop-blur-md sm:h-[520px] lg:h-[600px]">
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none select-none">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Live Operations Ecosystem
              </span>
            </div>
            <canvas ref={canvasRef} className="h-full w-full block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHealthcare;
