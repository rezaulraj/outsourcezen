import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Ambulance,
  ClipboardCheck,
  HeartHandshake,
  HeartPulse,
  Hospital,
  Microscope,
  Pill,
  Stethoscope,
  UserRoundCheck,
} from "lucide-react";

const categories = [
  {
    title: "Hospitals & Clinics",
    roles: [
      "General Physicians",
      "Specialists",
      "Registered Nurses",
      "Nursing Assistants",
    ],
    icon: Hospital,
    color: "#FFE994",
  },
  {
    title: "Elderly & Home Care",
    roles: [
      "Caregivers",
      "Home Care Assistants",
      "Elderly Support Workers",
      "Patient Companions",
    ],
    icon: HeartHandshake,
    color: "#CFF7BC",
  },
  {
    title: "Allied Health",
    roles: [
      "Physiotherapists",
      "Laboratory Technicians",
      "Radiographers",
      "Pharmacists",
    ],
    icon: Microscope,
    color: "#A6E6EC",
  },
  {
    title: "Support Services",
    roles: [
      "Medical Receptionists",
      "Ward Assistants",
      "Healthcare Administrators",
      "Medical Secretaries",
    ],
    icon: ClipboardCheck,
    color: "#FFF6C8",
  },
  {
    title: "Emergency Services",
    roles: ["EMTs", "Paramedics", "Ambulance Assistants", "Emergency Helpers"],
    icon: Ambulance,
    color: "#FFE994",
  },
];

const stats = [
  { value: "5000+", label: "Healthcare Professionals" },
  { value: "48 Hours", label: "Initial Shortlisting" },
  { value: "25+", label: "Healthcare Sectors" },
  { value: "98%", label: "Employer Satisfaction" },
];

const HealthcareRoles = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".health-role-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".health-role-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".health-role-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".health-stat", {
        y: 28,
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
      setActive((prev) => (prev + 1) % categories.length);
    }, 2200);

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

    const drawPerson = (x, y, s, color, type = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + x) * 3);
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

    const drawHospital = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-78, -105, 156, 210, 18);
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(-58, -82, 116, 165, 13);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      rr(-24, -118, 48, 38, 12);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-10, -99);
      ctx.lineTo(10, -99);
      ctx.moveTo(0, -109);
      ctx.lineTo(0, -89);
      ctx.stroke();

      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
          rr(-34 + col * 34, -38 + row * 28, 17, 14, 4);
          ctx.fillStyle = `rgba(103,217,70,${
            0.22 + 0.3 * Math.sin(time * 2 + row + col)
          })`;
          ctx.fill();
        }
      }

      rr(-18, 58, 36, 47, 7);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    const drawHeartbeat = (x, y, width) => {
      ctx.beginPath();
      ctx.moveTo(x - width / 2, y);
      ctx.lineTo(x - width * 0.25, y);
      ctx.lineTo(x - width * 0.18, y - 20);
      ctx.lineTo(x - width * 0.08, y + 22);
      ctx.lineTo(x + width * 0.02, y - 8);
      ctx.lineTo(x + width * 0.12, y);
      ctx.lineTo(x + width / 2, y);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.setLineDash([width * 0.22, width]);
      ctx.lineDashOffset = -time * 100;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const drawCarePath = (cx, cy, width) => {
      ctx.beginPath();
      ctx.moveTo(cx - width / 2, cy);
      ctx.bezierCurveTo(
        cx - width * 0.25,
        cy - 55,
        cx + width * 0.25,
        cy + 55,
        cx + width / 2,
        cy,
      );
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 14]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 12; i++) {
        const p = (time * 0.1 + i / 12) % 1;
        const x = cx - width / 2 + width * p;
        const y = cy + Math.sin(p * Math.PI * 2) * 40;

        drawPerson(
          x,
          y,
          Math.min(w, h) / 900,
          p > 0.6 ? "#67D946" : "#F4C542",
          i % 3,
        );
      }
    };

    const drawRoleBadge = (x, y) => {
      const item = categories[activeRef.current];

      rr(x - 124, y - 42, 248, 84, 24);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x - 88, y, 22, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ACTIVE CARE GROUP", x + 18, y - 8);

      ctx.font = "800 17px Arimo";
      ctx.fillText(item.title, x + 18, y + 16);
    };

    const drawDots = () => {
      for (let i = 0; i < 28; i++) {
        const x = ((i * 89) % w) + Math.sin(time + i) * 10;
        const y = ((i * 47) % h) + Math.cos(time * 1.2 + i) * 8;

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.14)";
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawDots();
      drawHeartbeat(w * 0.5, h * 0.12, Math.min(w * 0.55, 360));

      const s = Math.min(w, h) / 720;

      drawHospital(w * 0.67, h * 0.34, s);
      drawCarePath(w * 0.5, h * 0.72, Math.min(w * 0.74, 540));

      drawPerson(w * 0.22, h * 0.55, Math.min(w, h) / 760, "#A6E6EC", 0);
      drawPerson(w * 0.45, h * 0.61, Math.min(w, h) / 760, "#F4C542", 1);
      drawPerson(w * 0.78, h * 0.6, Math.min(w, h) / 760, "#67D946", 2);

      drawRoleBadge(w * 0.5, h * 0.91);

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
        <div className="health-role-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Roles We Recruit
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Healthcare", "talent", "for", "every", "care", "setting"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="health-role-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We recruit medical, caregiving, allied health, support and emergency
            professionals for hospitals, clinics, care homes and healthcare
            facilities.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            {categories.map(({ icon: Icon, ...item }, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={`health-role-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.roles.map((role) => (
                          <span
                            key={role}
                            className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-bold text-black/65"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="health-role-reveal relative h-[460px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[560px] lg:sticky lg:top-24 lg:h-[690px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="health-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

export default HealthcareRoles;
