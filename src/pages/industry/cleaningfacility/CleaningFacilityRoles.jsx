import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Hotel,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  SprayCan,
  UsersRound,
  Wrench,
} from "lucide-react";

const categories = [
  {
    title: "Cleaning Teams",
    roles: [
      "Office Cleaners",
      "Janitors",
      "Deep Cleaners",
      "Public Area Cleaners",
    ],
    icon: Sparkles,
    color: "#FFE994",
  },
  {
    title: "Housekeeping",
    roles: [
      "Housekeepers",
      "Room Attendants",
      "Linen Assistants",
      "Cleaning Supervisors",
    ],
    icon: Hotel,
    color: "#CFF7BC",
  },
  {
    title: "Facility Support",
    roles: [
      "Facility Assistants",
      "Building Attendants",
      "Site Support Staff",
      "Caretakers",
    ],
    icon: Building2,
    color: "#A6E6EC",
  },
  {
    title: "Maintenance Helpers",
    roles: [
      "Maintenance Helpers",
      "Handymen",
      "Light Repair Assistants",
      "Utility Workers",
    ],
    icon: Wrench,
    color: "#FFF6C8",
  },
  {
    title: "Specialist Cleaning",
    roles: [
      "Window Cleaners",
      "Floor Care Operators",
      "Sanitation Workers",
      "Carpet Cleaners",
    ],
    icon: SprayCan,
    color: "#FFE994",
  },
  {
    title: "Supervision & Safety",
    roles: [
      "Cleaning Supervisors",
      "Shift Leaders",
      "Hygiene Checkers",
      "Safety Assistants",
    ],
    icon: ShieldCheck,
    color: "#CFF7BC",
  },
];

const stats = [
  { value: "6000+", label: "Facility Workers" },
  { value: "24/7", label: "Shift Support" },
  { value: "96%", label: "Client Satisfaction" },
  { value: "48 Hours", label: "Initial Shortlisting" },
];

const CleaningFacilityRoles = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".clean-role-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".clean-role-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".clean-role-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".clean-stat", {
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
    }, 2300);

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
    };

    const drawPerson = (x, y, s, color, tool = "mop") => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.5 + x) * 3);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(0, -20, 8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(0, 24);
      ctx.moveTo(0, -2);
      ctx.lineTo(-16, 10 + Math.sin(time * 4 + x) * 4);
      ctx.moveTo(0, -2);
      ctx.lineTo(18, 10 + Math.cos(time * 4 + x) * 4);
      ctx.moveTo(0, 24);
      ctx.lineTo(-12, 44);
      ctx.moveTo(0, 24);
      ctx.lineTo(12, 44);
      ctx.stroke();

      if (tool === "mop") {
        ctx.beginPath();
        ctx.moveTo(20, 8);
        ctx.lineTo(42, 48);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(31, 48);
        ctx.lineTo(54, 48);
        ctx.strokeStyle = "#67D946";
        ctx.lineWidth = 5;
        ctx.stroke();
      }

      if (tool === "window") {
        ctx.beginPath();
        ctx.moveTo(18, 6);
        ctx.lineTo(40, -18 + Math.sin(time * 5) * 8);
        ctx.stroke();

        rr(34, -26 + Math.sin(time * 5) * 8, 22, 10, 4);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (tool === "wrench") {
        ctx.beginPath();
        ctx.moveTo(17, 8);
        ctx.lineTo(38, -8);
        ctx.moveTo(38, -8);
        ctx.lineTo(44, 2);
        ctx.stroke();
      }

      if (tool === "brush") {
        ctx.beginPath();
        ctx.moveTo(18, 8);
        ctx.lineTo(42, 4);
        ctx.stroke();

        rr(41, -4, 18, 14, 5);
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawBuilding = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-105, -95, 210, 190, 26);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-70, -70, 140, 36, 12);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("BUILDING CARE", 0, -47);

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
          rr(-76 + col * 50, -15 + row * 42, 30, 26, 7);
          ctx.fillStyle = "rgba(166,230,236,0.45)";
          ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.22)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      rr(-22, 58, 44, 37, 8);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.restore();
    };

    const drawCleaningMachine = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4) * 2);
      ctx.scale(s, s);

      rr(-52, -20, 96, 38, 15);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(10, -45, 34, 28, 8);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-12, -18);
      ctx.lineTo(-36, -55);
      ctx.stroke();

      [-28, 26].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 21, 9, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      });

      ctx.beginPath();
      ctx.ellipse(-56, 20, 24, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(166,230,236,0.5)";
      ctx.fill();

      ctx.restore();
    };

    const drawCleaningCart = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.3) * 2);
      ctx.scale(s, s);

      rr(-34, -30, 68, 54, 12);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-22, -50, 20, 22, 6);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      rr(8, -54, 20, 26, 6);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(34, -18);
      ctx.lineTo(52, -44);
      ctx.stroke();

      [-20, 20].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 28, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      });

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

    const drawRoleBadge = (x, y) => {
      const item = categories[activeRef.current];

      rr(x - 128, y - 42, 256, 84, 24);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x - 92, y, 22, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ACTIVE FACILITY GROUP", x + 22, y - 8);

      ctx.font = "800 17px Arimo";
      ctx.fillText(item.title, x + 22, y + 16);
    };

    const drawChecklist = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4) * 5);

      rr(-88, -48, 176, 96, 25);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SHIFT READY", 0, -22);

      ["Clean", "Safe", "Checked"].forEach((item, i) => {
        const yy = 5 + i * 22;

        ctx.beginPath();
        ctx.arc(-48, yy, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        drawCheck(-48, yy, 0.36);

        ctx.fillStyle = "#111";
        ctx.font = "800 11px Arimo";
        ctx.textAlign = "left";
        ctx.fillText(item, -30, yy + 4);
      });

      ctx.restore();
    };

    const drawSparkles = () => {
      for (let i = 0; i < 32; i++) {
        const x = ((i * 79) % w) + Math.sin(time + i) * 9;
        const y = ((i * 43) % h) + Math.cos(time * 1.2 + i) * 7;
        const r = 2 + Math.sin(time * 3 + i) * 1;

        ctx.beginPath();
        ctx.moveTo(x, y - r * 2);
        ctx.lineTo(x, y + r * 2);
        ctx.moveTo(x - r * 2, y);
        ctx.lineTo(x + r * 2, y);
        ctx.strokeStyle = "rgba(103,217,70,0.42)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    const drawFloor = () => {
      const y = h * 0.8;

      ctx.beginPath();
      ctx.moveTo(w * 0.1, y);
      ctx.lineTo(w * 0.9, y);
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.ellipse(
          w * 0.18 + i * w * 0.1,
          y + 28 + Math.sin(time + i) * 4,
          42,
          10,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "rgba(166,230,236,0.25)";
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();
      drawSparkles();
      drawFloor();

      drawBuilding(w * 0.5, h * 0.35, Math.min(w, h) / 780);

      drawPerson(w * 0.28, h * 0.5, Math.min(w, h) / 780, "#A6E6EC", "window");
      drawPerson(w * 0.36, h * 0.77, Math.min(w, h) / 790, "#F4C542", "mop");
      drawPerson(w * 0.72, h * 0.76, Math.min(w, h) / 800, "#67D946", "wrench");
      drawPerson(w * 0.62, h * 0.79, Math.min(w, h) / 820, "#FFE994", "brush");

      drawCleaningMachine(
        w * 0.1 + ((time * 45) % (w * 0.72)),
        h * 0.87,
        Math.min(w, h) / 850,
      );

      drawCleaningCart(
        w * 0.82 - ((time * 28) % (w * 0.24)),
        h * 0.84,
        Math.min(w, h) / 830,
      );

      drawChecklist(w * 0.78, h * 0.22);
      drawRoleBadge(w * 0.5, h * 0.94);

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
      className="font-arimo relative bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[#FFE994]" />

      <svg
        className="absolute left-0 top-0 h-[120px] w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H1440V45C1180 95 900 20 720 55C470 100 230 70 0 25V0Z"
          fill="var(--color-primary-bg)"
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 h-[150px] w-full"
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
      >
        <path
          d="M0 150V95C210 35 470 75 720 52C980 28 1210 55 1440 105V150H0Z"
          fill="#FFE994"
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="clean-role-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Roles We Recruit
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Cleaning", "talent", "for", "every", "facility", "need"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="clean-role-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We recruit dependable cleaning, housekeeping, facility support,
            maintenance and hygiene-focused workers for offices, buildings,
            hotels and commercial spaces.
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
                  onClick={() => setActive(index)}
                  className={`clean-role-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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

          <div className="clean-role-reveal relative h-[460px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[560px] lg:sticky lg:top-24 lg:h-[690px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        {/* <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="clean-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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
      </div>
    </section>
  );
};

export default CleaningFacilityRoles;
