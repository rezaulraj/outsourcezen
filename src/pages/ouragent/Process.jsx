import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  FileText,
  UserCheck,
  Search,
  Users,
  Briefcase,
  FolderSync,
  Globe,
  PlaneTakeoff,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

const STAGES = [
  {
    id: 1,
    title: "Employer Request",
    icon: FileText,
    desc: "System intakes core personnel operational metrics.",
    action: "Analyzing Request",
  },
  {
    id: 2,
    title: "Agent Assigned",
    icon: UserCheck,
    desc: "Dedicated domain experts assume direct process ownership.",
    action: "Walking to Node",
  },
  {
    id: 3,
    title: "Candidate Search",
    icon: Search,
    desc: "Global network search parameters dynamically execute.",
    action: "Scanning Profiles",
  },
  {
    id: 4,
    title: "Screening Processes",
    icon: Users,
    desc: "Rigorous verification metrics and skill checkpoints run.",
    action: "Verifying Background",
  },
  {
    id: 5,
    title: "Structured Interview",
    icon: Briefcase,
    desc: "Synchronized panel live virtual evaluations setup.",
    action: "Shaking Hands",
  },
  {
    id: 6,
    title: "Documentation Sync",
    icon: FolderSync,
    desc: "Secure distributed payload verification and sync.",
    action: "Transferring Files",
  },
  {
    id: 7,
    title: "Visa Processing",
    icon: Globe,
    desc: "International legal compliance routing checks.",
    action: "Global Processing",
  },
  {
    id: 8,
    title: "Strategic Deployment",
    icon: PlaneTakeoff,
    desc: "Logistical transit coordinates activated.",
    action: "Deploying Assets",
  },
  {
    id: 9,
    title: "Post-Placement Support",
    icon: HeartHandshake,
    desc: "Continuous hyper-care workflow optimization loop.",
    action: "Active Monitoring",
  },
];

const Process = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-title-word", {
        y: 60,
        opacity: 0,
        rotateX: 45,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".process-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frameId;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.parentElement.offsetWidth;
      const height = canvas.parentElement.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener("resize", resize);
    resize();

    const getPathPoints = (w, h) => {
      const points = [];
      const paddingX = w * 0.1;
      const rowHeight = h / 3;

      points.push({ x: paddingX, y: rowHeight * 0.5 });
      points.push({ x: w * 0.5, y: rowHeight * 0.5 });
      points.push({ x: w - paddingX, y: rowHeight * 0.5 });

      points.push({ x: w - paddingX, y: rowHeight * 1.5 });
      points.push({ x: w * 0.5, y: rowHeight * 1.5 });
      points.push({ x: paddingX, y: rowHeight * 1.5 });

      points.push({ x: paddingX, y: rowHeight * 2.5 });
      points.push({ x: w * 0.5, y: rowHeight * 2.5 });
      points.push({ x: w - paddingX, y: rowHeight * 2.5 });

      return points;
    };

    const drawCharacter = (cx, cy, step, actionType) => {
      ctx.save();
      ctx.translate(cx, cy);

      const isActive = step === activeStep;
      const color = isActive ? "#1f7a2e" : "#111111";
      const scale = isActive ? 1.2 : 0.95;
      ctx.scale(scale, scale);

      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(0, -22, 7, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? "#FFF9E6" : "#FFFFFF";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.lineTo(0, 5);
      ctx.stroke();

      const cycle = Math.sin(time * 4);
      const walkCycle = Math.sin(time * 6);

      if (actionType === 0) {
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.lineTo(-6, -10);
        ctx.lineTo(-4, -18);
        ctx.stroke();

        if (isActive && Math.random() > 0.4) {
          ctx.font = "bold 9px sans-serif";
          ctx.fillStyle = "rgba(31,122,46,0.6)";
          ctx.fillText("?", 12, -26 + cycle * 2);
        }
      } else if (actionType === 1) {
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(-6 + walkCycle * 4, 18);
        ctx.moveTo(0, 5);
        ctx.lineTo(6 - walkCycle * 4, 18);
        ctx.stroke();
      } else if (actionType === 2) {
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(10 + cycle * 2, -6);
        ctx.stroke();


        ctx.fillStyle = "#A6E6EC";
        ctx.fillRect(12, -14 + cycle, 8, 10);
        ctx.strokeRect(12, -14 + cycle, 8, 10);
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(-6, 2);
        ctx.moveTo(0, -10);
        ctx.lineTo(6, 2);
        ctx.stroke();
      }

      if (actionType !== 1) {
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(-5, 18);
        ctx.moveTo(0, 5);
        ctx.lineTo(5, 18);
        ctx.stroke();
      }

      ctx.restore();
    };

    const renderLoop = () => {
      time += 0.02;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);

      const points = getPathPoints(w, h);

      ctx.beginPath();
      if (points.length > 0) {
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          if (p1.y === p2.y) {
            ctx.lineTo(p2.x, p2.y);
          } else {
            const cpX = (p1.x + p2.x) / 2;
            ctx.bezierCurveTo(p1.x, p2.y, cpX, p2.y, p2.x, p2.y);
          }
        }
      }
      ctx.strokeStyle = "rgba(17, 17, 17, 0.12)";
      ctx.lineWidth = 4;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      if (activeStep > 0 && points.length > activeStep) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let j = 0; j <= activeStep; j++) {
          ctx.lineTo(points[j].x, points[j].y);
        }
        ctx.strokeStyle = "#67D946";
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      points.forEach((pt, idx) => {
        const isCurrent = idx === activeStep;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isCurrent ? 24 : 14, 0, Math.PI * 2);
        ctx.fillStyle = isCurrent ? "rgba(31,122,46,0.08)" : "#FFFFFF";
        ctx.fill();
        ctx.strokeStyle = isCurrent ? "#1f7a2e" : "rgba(0,0,0,0.3)";
        ctx.lineWidth = isCurrent ? 3 : 1.5;
        ctx.stroke();

        let pose = 0;
        if (isCurrent) pose = 1;
        if (idx === 4 || idx === 5) pose = 2;

        drawCharacter(pt.x, pt.y - 4, idx, pose);

        ctx.font = isCurrent ? "bold 11px sans-serif" : "500 10px sans-serif";
        ctx.fillStyle = isCurrent ? "#1f7a2e" : "rgba(0,0,0,0.65)";
        ctx.textAlign = "center";
        ctx.fillText(STAGES[idx].title, pt.x, pt.y - 38);
      });

      frameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, [activeStep]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STAGES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden font-arimo px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-black/10 pb-10 lg:flex-row lg:items-end">
          <div>
            <span className="process-reveal text-xs font-bold uppercase tracking-[0.2em] text-black">
              Operational Lifecycle
            </span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              {["Recruitment", "Process", "Ownership"].map((word, i) => (
                <span
                  key={i}
                  className="mr-3 inline-block overflow-hidden pb-1"
                >
                  <span className="process-title-word inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <p className="process-reveal max-w-md text-base leading-relaxed text-black/70">
            A comprehensive overview tracking workflow requests through
            dedicated agent routing assignment, legal clearance pipelines, and
            deployment synchronization maps.
          </p>
        </div>

        {/* Dynamic Split Layout Panel */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Left Block: Stage Controller Menu Layout */}
          <div className="process-reveal lg:col-span-4 flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2">
            {STAGES.map((stage, index) => {
              const IconComponent = stage.icon;
              const isSelected = index === activeStep;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStep(index)}
                  className={`group relative flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-[#1f7a2e] bg-gradient-to-r from-rgba(31,122,46,0.05) to-transparent shadow-sm"
                      : "border-black/10 hover:border-black/20 hover:bg-black/[0.01]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isSelected
                        ? "bg-[#1f7a2e] text-white"
                        : "bg-black/5 text-black/60"
                    }`}
                  >
                    <IconComponent size={20} strokeWidth={2.2} />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold tracking-tight transition-colors ${
                          isSelected ? "text-[#1f7a2e]" : "text-black"
                        }`}
                      >
                        {stage.title}
                      </h4>
                      {isSelected && (
                        <span className="inline-flex items-center rounded-full bg-[#67D946]/20 px-2 py-0.5 text-[10px] font-bold text-[#1f7a2e] animate-pulse">
                          {stage.action}
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed text-black/60">
                      {stage.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Block: Live Path Vector Canvas Workspace */}
          <div className="process-reveal relative flex flex-col justify-between rounded-3xl border border-black/10 p-6 lg:col-span-8 min-h-[500px] lg:min-h-auto">
            {/* Control Panel Breadcrumb Top HUD */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-black/40">
                <span>
                  STAGE {activeStep + 1} OF {STAGES.length}
                </span>
                <ChevronRightIndicator />
                <span className="text-[#1f7a2e] uppercase">
                  {STAGES[activeStep].title}
                </span>
              </div>
              <div className="flex gap-1.5">
                {STAGES.map((_, dotIdx) => (
                  <div
                    key={dotIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === activeStep
                        ? "w-6 bg-[#1f7a2e]"
                        : "w-1.5 bg-black/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Interactive Vector Graphics Node Canvas Element */}
            <div className="relative w-full flex-1 min-h-[400px]">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
              />
            </div>

            {/* Micro Interaction Footer Controls */}
            <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
              <span className="text-xs font-medium text-black/50">
                Continuous live tracking architecture enabled.
              </span>
              <button
                onClick={() =>
                  setActiveStep((prev) => (prev + 1) % STAGES.length)
                }
                className="inline-flex items-center gap-2 text-xs font-bold text-black hover:text-[#1f7a2e] transition-colors"
              >
                Skip Stage Step
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ChevronRightIndicator = () => (
  <svg
    className="h-3 w-3 opacity-50"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default Process;
