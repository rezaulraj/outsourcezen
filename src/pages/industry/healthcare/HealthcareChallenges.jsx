import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlertTriangle,
  CalendarClock,
  ClipboardCheck,
  HeartPulse,
  RefreshCcw,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

const challenges = [
  {
    title: "Staffing Shortages",
    challenge: "Healthcare facilities face ongoing workforce gaps.",
    solution: "Rapid access to qualified healthcare professionals.",
    icon: UserRoundCheck,
    color: "#FFE994",
  },
  {
    title: "Burnout & Turnover",
    challenge: "High workloads increase staff attrition.",
    solution: "Reliable replacement support and workforce planning.",
    icon: RefreshCcw,
    color: "#CFF7BC",
  },
  {
    title: "Urgent Coverage",
    challenge: "Unexpected absences disrupt patient care operations.",
    solution: "Fast-response staffing assistance.",
    icon: CalendarClock,
    color: "#A6E6EC",
  },
  {
    title: "Credential Verification",
    challenge: "Verifying licenses and experience takes time.",
    solution: "Structured screening and document review.",
    icon: ClipboardCheck,
    color: "#FFF6C8",
  },
  {
    title: "Compliance Requirements",
    challenge: "Healthcare standards must be maintained.",
    solution: "Compliance-conscious recruitment practices.",
    icon: ShieldCheck,
    color: "#FFE994",
  },
  {
    title: "Patient Care Continuity",
    challenge: "Frequent staff changes affect care experiences.",
    solution: "Patient-focused candidate matching.",
    icon: HeartPulse,
    color: "#CFF7BC",
  },
];

const HealthcareChallenges = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".health-ch-title", {
        y: 70,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".health-ch-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".health-ch-card", {
        y: 45,
        opacity: 0,
        scale: 0.95,
        duration: 0.85,
        stagger: 0.07,
        delay: 0.45,
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

    const labels = [
      "SHORTAGE",
      "BURNOUT",
      "URGENT",
      "VERIFY",
      "COMPLIANCE",
      "CARE",
    ];

    const colors = [
      "#FFE994",
      "#CFF7BC",
      "#A6E6EC",
      "#FFF6C8",
      "#FFE994",
      "#CFF7BC",
    ];

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

    const drawPerson = (x, y, s, color, type = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + type) * 3);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(0, -19, 8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      if (type === 0) {
        rr(-14, -33, 28, 9, 5);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-5, -28);
        ctx.lineTo(5, -28);
        ctx.moveTo(0, -33);
        ctx.lineTo(0, -24);
        ctx.stroke();
      }

      if (type === 1) {
        ctx.beginPath();
        ctx.arc(0, -19, 13, 0.15, Math.PI - 0.15);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 20);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(-15, 8 + Math.sin(time * 4 + type) * 3);
      ctx.moveTo(0, -2);
      ctx.lineTo(16, 8 + Math.cos(time * 4 + type) * 3);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.lineTo(-10, 39);
      ctx.moveTo(0, 20);
      ctx.lineTo(10, 39);
      ctx.stroke();

      if (type === 0) {
        ctx.beginPath();
        ctx.arc(18, 8, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(18, 16);
        ctx.lineTo(18, 25);
        ctx.stroke();
      }

      if (type === 1) {
        ctx.beginPath();
        ctx.moveTo(-18, 8);
        ctx.lineTo(-36, 8);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-42, 8, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.stroke();
      }

      if (type === 2) {
        ctx.beginPath();
        ctx.moveTo(17, 8);
        ctx.lineTo(36, -4);
        ctx.moveTo(36, -4);
        ctx.lineTo(42, 6);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawHeartbeat = (x, y, width) => {
      ctx.beginPath();
      ctx.moveTo(x - width / 2, y);
      ctx.lineTo(x - width * 0.28, y);
      ctx.lineTo(x - width * 0.2, y - 24);
      ctx.lineTo(x - width * 0.1, y + 24);
      ctx.lineTo(x, y - 10);
      ctx.lineTo(x + width * 0.1, y);
      ctx.lineTo(x + width / 2, y);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.setLineDash([width * 0.25, width]);
      ctx.lineDashOffset = -time * 110;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(
        x + width / 2 + 16,
        y,
        7 + Math.sin(time * 3) * 2,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = "#67D946";
      ctx.fill();
    };

    const drawCenter = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 88 + Math.sin(time * 1.8) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(103,217,70,0.28)";
      ctx.lineWidth = 12;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 68, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 8;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        68,
        -Math.PI / 2 + time * 0.5,
        -Math.PI / 2 + time * 0.5 + Math.PI * 2 * 0.65,
      );
      ctx.strokeStyle = "#67D946";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.stroke();

      rr(x - 105, y - 58, 210, 116, 34);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 15px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("PATIENT", x, y - 18);

      ctx.font = "900 25px Arimo";
      ctx.fillText("SAFETY", x, y + 12);

      ctx.font = "800 13px Arimo";
      ctx.fillText("FIRST", x, y + 36);

      drawCheck(x + 88, y - 44, 0.72);
    };

    const drawNode = (x, y, label, color, i) => {
      ctx.beginPath();
      ctx.arc(x, y, 46, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        46,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 + time * 0.45 + Math.PI * 2 * 0.64,
      );
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 10px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(label, x, y + 4);

      if (i % 2 === 0) {
        drawPerson(x + 28, y - 26, 0.28, color, i % 3);
      } else {
        drawCheck(x + 28, y - 28, 0.48);
      }
    };

    const drawAmbulance = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-42, -18, 84, 36, 9);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-15, -38, 38, 22, 7);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.lineTo(-17, 0);
      ctx.moveTo(-23.5, -7);
      ctx.lineTo(-23.5, 7);
      ctx.strokeStyle = "#67D946";
      ctx.lineWidth = 3;
      ctx.stroke();

      [-24, 24].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 20, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawCareWorkers = (cx, cy, radius) => {
      for (let i = 0; i < 16; i++) {
        const p = (time * 0.08 + i / 16) % 1;
        const angle = p * Math.PI * 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.62;

        drawPerson(
          x,
          y,
          Math.min(w, h) / 980,
          i % 2 === 0 ? "#A6E6EC" : "#F4C542",
          i % 3,
        );
      }
    };

    const drawParticles = () => {
      for (let i = 0; i < 34; i++) {
        const x = ((i * 89) % w) + Math.sin(time + i) * 10;
        const y = ((i * 47) % h) + Math.cos(time * 1.2 + i) * 8;

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.14)";
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawParticles();

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.34;

      drawHeartbeat(cx, h * 0.12, Math.min(w * 0.58, 380));

      labels.forEach((label, i) => {
        const angle = time * 0.22 + (Math.PI * 2 * i) / labels.length;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.68;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = "rgba(0,0,0,0.12)";
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 12]);
        ctx.lineDashOffset = -time * 42;
        ctx.stroke();
        ctx.setLineDash([]);

        drawNode(x, y, label, colors[i], i);
      });

      drawCareWorkers(cx, cy, radius * 0.86);
      drawCenter(cx, cy);

      const ambulanceX = w * 0.1 + ((time * 70) % (w * 0.78));
      drawAmbulance(ambulanceX, h * 0.9, Math.min(w, h) / 850);

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
        <div className="grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="health-ch-reveal mb-4 inline-block border-b border-black text-sm font-medium text-black">
              Healthcare Challenges We Solve
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black sm:text-7xl lg:text-8xl">
              {["Protecting", "patient", "care", "always"].map((word) => (
                <span key={word} className="block overflow-hidden pb-2">
                  <span className="health-ch-title inline-block">{word}</span>
                </span>
              ))}
            </h2>
          </div>

          <p className="health-ch-reveal max-w-xl text-base leading-7 text-black/70 lg:pb-3">
            Healthcare providers need qualified staff, verified credentials and
            reliable coverage to protect patient safety, compliance and
            continuity of care.
          </p>
        </div>

        <div className="health-ch-reveal relative mt-12 h-[360px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[460px] lg:h-[560px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {challenges.map(
            ({ title, challenge, solution, icon: Icon, color }, index) => (
              <article
                key={title}
                className="health-ch-card rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-5">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: color }}
                  >
                    <Icon size={24} strokeWidth={2.4} />
                  </div>

                  <span className="text-5xl font-black leading-none text-black/[0.06]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
                  {title}
                </h3>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-black/45">
                      Challenge
                    </p>
                    <p className="text-sm leading-6 text-black/70">
                      {challenge}
                    </p>
                  </div>

                  <div className="border-t border-black/10 pt-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-black/45">
                      Solution
                    </p>
                    <p className="text-sm leading-6 text-black/70">
                      {solution}
                    </p>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default HealthcareChallenges;
