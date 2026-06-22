import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  BedDouble,
  ChefHat,
  Coffee,
  ConciergeBell,
  GlassWater,
  Hotel,
  Luggage,
  Sparkles,
  UsersRound,
} from "lucide-react";

const categories = [
  {
    title: "Front Office",
    roles: [
      "Receptionists",
      "Guest Relations Officers",
      "Front Desk Agents",
      "Concierge Staff",
    ],
    icon: ConciergeBell,
    color: "#FFE994",
  },
  {
    title: "Food & Beverage",
    roles: [
      "Waiters / Waitresses",
      "Baristas",
      "Bartenders",
      "Restaurant Supervisors",
    ],
    icon: Coffee,
    color: "#CFF7BC",
  },
  {
    title: "Culinary",
    roles: ["Chefs", "Sous Chefs", "Kitchen Helpers", "Bakers"],
    icon: ChefHat,
    color: "#A6E6EC",
  },
  {
    title: "Housekeeping",
    roles: [
      "Room Attendants",
      "Housekeeping Supervisors",
      "Laundry Staff",
      "Public Area Cleaners",
    ],
    icon: BedDouble,
    color: "#FFF6C8",
  },
  {
    title: "Events & Leisure",
    roles: [
      "Event Coordinators",
      "Banquet Staff",
      "Recreation Assistants",
      "Spa Therapists",
    ],
    icon: Sparkles,
    color: "#FFE994",
  },
];

const stats = [
  { value: "6000+", label: "Hospitality Professionals" },
  { value: "48 Hours", label: "Initial Shortlisting" },
  { value: "20+", label: "Hospitality Sectors" },
  { value: "97%", label: "Employer Satisfaction" },
];

const HospitalityRoles = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hospitality-role-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".hospitality-role-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".hospitality-role-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".hospitality-stat", {
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
      ctx.translate(x, y + Math.sin(time * 1.5 + x) * 3);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(0, -18, 8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      if (type === 1) {
        ctx.beginPath();
        ctx.arc(0, -28, 13, Math.PI, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
        ctx.stroke();
      }

      if (type === 2) {
        rr(-13, -31, 26, 9, 5);
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 18);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(-14, 8 + Math.sin(time * 4 + type) * 3);
      ctx.moveTo(0, -2);
      ctx.lineTo(15, 8 + Math.cos(time * 4 + type) * 3);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.lineTo(-10, 36);
      ctx.moveTo(0, 18);
      ctx.lineTo(10, 36);
      ctx.stroke();

      if (type === 0) {
        rr(16, -5, 18, 14, 3);
        ctx.fillStyle = "#CFF7BC";
        ctx.fill();
        ctx.stroke();
      }

      if (type === 1) {
        ctx.beginPath();
        ctx.arc(20, 8, 13, Math.PI, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(6, 8);
        ctx.lineTo(34, 8);
        ctx.stroke();
      }

      if (type === 2) {
        ctx.beginPath();
        ctx.moveTo(-18, 10);
        ctx.lineTo(-34, 28);
        ctx.moveTo(-34, 28);
        ctx.lineTo(-16, 28);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawHotel = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-78, -105, 156, 210, 18);
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(-58, -82, 116, 165, 13);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      ctx.fillStyle = "#111";
      ctx.font = "800 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("HOTEL", 0, -58);

      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
          rr(-34 + col * 34, -33 + row * 27, 17, 15, 5);
          ctx.fillStyle = `rgba(244,197,66,${
            0.32 + 0.34 * Math.sin(time * 2 + row + col)
          })`;
          ctx.fill();
        }
      }

      rr(-18, 58, 36, 47, 7);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    const drawReceptionDesk = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-72, -18, 144, 52, 15);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-54, -42, 108, 28, 13);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 11px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("WELCOME", 0, -24);

      ctx.restore();
    };

    const drawPlate = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + x) * 2);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.ellipse(0, 0, 24, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -6, 13, Math.PI, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    const drawLuggage = (x, y, s, color) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.5 + x) * 2);
      ctx.scale(s, s);

      rr(-17, -18, 34, 36, 7);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.4;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-8, -18);
      ctx.quadraticCurveTo(0, -32, 8, -18);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-8, 22, 3, 0, Math.PI * 2);
      ctx.arc(8, 22, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.restore();
    };

    const drawServicePath = (cx, cy, width) => {
      ctx.beginPath();
      ctx.moveTo(cx - width / 2, cy);
      ctx.bezierCurveTo(
        cx - width * 0.25,
        cy - 60,
        cx + width * 0.25,
        cy + 60,
        cx + width / 2,
        cy,
      );
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 14]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 10; i++) {
        const p = (time * 0.11 + i / 10) % 1;
        const x = cx - width / 2 + width * p;
        const y = cy + Math.sin(p * Math.PI * 2) * 42;

        if (i % 2 === 0) {
          drawLuggage(x, y, 0.72, "#FFE994");
        } else {
          drawPlate(x, y, 0.75);
        }
      }
    };

    const drawRoleBadge = (x, y) => {
      const item = categories[activeRef.current];

      rr(x - 120, y - 42, 240, 84, 24);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x - 84, y, 22, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ACTIVE SERVICE GROUP", x + 18, y - 8);

      ctx.font = "800 17px Arimo";
      ctx.fillText(item.title, x + 18, y + 16);
    };

    const drawStars = () => {
      for (let i = 0; i < 26; i++) {
        const x = ((i * 87) % w) + Math.sin(time + i) * 10;
        const y = ((i * 49) % h) + Math.cos(time * 1.2 + i) * 8;

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawStars();

      const s = Math.min(w, h) / 720;

      drawHotel(w * 0.7, h * 0.34, s);
      drawReceptionDesk(w * 0.3, h * 0.55, s);
      drawServicePath(w * 0.5, h * 0.72, Math.min(w * 0.76, 550));

      drawPerson(w * 0.22, h * 0.6, Math.min(w, h) / 760, "#F4C542", 0);
      drawPerson(w * 0.47, h * 0.63, Math.min(w, h) / 760, "#67D946", 1);
      drawPerson(w * 0.78, h * 0.62, Math.min(w, h) / 760, "#A6E6EC", 2);

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
      className="font-arimo relative bg-[var(--color-primary-bg)] py-24"
    >
      <div className="absolute inset-0 bg-[#CFF7BC]" />

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
          fill="#CFF7BC"
        />
      </svg>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hospitality-role-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Roles We Recruit
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Hospitality",
              "talent",
              "for",
              "every",
              "guest",
              "touchpoint",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="hospitality-role-word inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            From front office and food service to culinary, housekeeping and
            events, we recruit service-ready professionals for hospitality
            operations.
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
                  className={`hospitality-role-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "border-black bg-[#CFF7BC]"
                      : "border-black/10 bg-[#CFF7BC]/75 hover:border-black/30"
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

          <div className="hospitality-role-reveal relative h-[460px] overflow-hidden rounded-[36px] border border-black/10 bg-[#CFF7BC] sm:h-[560px] lg:sticky lg:top-24 lg:h-[690px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="hospitality-stat rounded-[28px] border border-black/10 bg-[#CFF7BC] p-6 text-center"
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

export default HospitalityRoles;
