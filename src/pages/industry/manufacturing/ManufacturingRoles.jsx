import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  Boxes,
  Factory,
  PackageCheck,
  Settings,
  ShieldCheck,
  Truck,
  UsersRound,
  Wrench,
} from "lucide-react";

const categories = [
  {
    title: "Production Roles",
    roles: [
      "Production Operators",
      "Assembly Line Workers",
      "Packaging Staff",
      "Production Helpers",
    ],
    icon: Factory,
    color: "#FFE994",
  },
  {
    title: "Machine & Technical Roles",
    roles: [
      "Machine Operators",
      "CNC Operators",
      "Maintenance Technicians",
      "Welders",
    ],
    icon: Wrench,
    color: "#CFF7BC",
  },
  {
    title: "Quality & Compliance",
    roles: [
      "Quality Inspectors",
      "QA Assistants",
      "GMP Supervisors",
      "Hygiene Officers",
    ],
    icon: ShieldCheck,
    color: "#A6E6EC",
  },
  {
    title: "Warehouse & Logistics",
    roles: [
      "Forklift Drivers",
      "Warehouse Assistants",
      "Inventory Controllers",
      "Dispatch Coordinators",
    ],
    icon: Truck,
    color: "#FFF6C8",
  },
  {
    title: "Leadership Roles",
    roles: [
      "Production Supervisors",
      "Shift Leaders",
      "Team Leaders",
      "Plant Managers",
    ],
    icon: UsersRound,
    color: "#FFE994",
  },
];

const stats = [
  { value: "500+", label: "Factory Workers Available" },
  { value: "48 Hours", label: "Initial Shortlisting" },
  { value: "25+", label: "Countries Served" },
  { value: "96%", label: "Employer Satisfaction" },
];

const ManufacturingRoles = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".manufacturing-role-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".manufacturing-role-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".manufacturing-role-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".manufacturing-stat", {
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

    const drawWorker = (x, y, s, color, tool = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.6 + x) * 3);
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

      ctx.beginPath();
      ctx.arc(0, -23, 9, Math.PI, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-12, -22);
      ctx.lineTo(12, -22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 18);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(-14, 8 + Math.sin(time * 4 + tool) * 3);
      ctx.moveTo(0, -2);
      ctx.lineTo(15, 8 + Math.cos(time * 4 + tool) * 3);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.lineTo(-10, 36);
      ctx.moveTo(0, 18);
      ctx.lineTo(10, 36);
      ctx.stroke();

      if (tool === 0) {
        rr(16, -4, 18, 14, 3);
        ctx.fillStyle = "#F4C542";
        ctx.fill();
        ctx.stroke();
      }

      if (tool === 1) {
        ctx.beginPath();
        ctx.moveTo(15, 8);
        ctx.lineTo(34, 8);
        ctx.moveTo(29, 3);
        ctx.lineTo(35, 8);
        ctx.lineTo(29, 13);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawGear = (x, y, r, speed, reverse = false) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(time * speed * (reverse ? -1 : 1));

      ctx.strokeStyle = "#111";
      ctx.fillStyle = "#FFF9E6";
      ctx.lineWidth = 3;

      ctx.beginPath();

      for (let i = 0; i < 18; i++) {
        const a = (Math.PI * 2 * i) / 18;
        const rad = i % 2 === 0 ? r : r * 0.78;
        const px = Math.cos(a) * rad;
        const py = Math.sin(a) * rad;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.33, 0, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawConveyor = (cx, cy, width) => {
      rr(cx - width / 2, cy - 20, width, 40, 20);
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(cx - width / 2 + 12, cy - 11, width - 24, 22, 11);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      for (let i = 0; i < 13; i++) {
        const rx = cx - width / 2 + 25 + i * ((width - 50) / 12);

        ctx.beginPath();
        ctx.arc(rx, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      }

      for (let i = 0; i < 12; i++) {
        const px = cx - width / 2 + ((time * 60 + i * 64) % width);

        rr(px - 16, cy - 46, 32, 26, 6);
        ctx.fillStyle =
          i % 3 === 0 ? "#FFE994" : i % 3 === 1 ? "#CFF7BC" : "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        if ((time * 60 + i * 64) % width > width * 0.58) {
          ctx.beginPath();
          ctx.arc(px + 10, cy - 35, 7, 0, Math.PI * 2);
          ctx.fillStyle = "#67D946";
          ctx.fill();
        }
      }
    };

    const drawFactory = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-110, -28, 220, 122, 18);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-110, -28);
      ctx.lineTo(-60, -72);
      ctx.lineTo(-12, -28);
      ctx.lineTo(38, -72);
      ctx.lineTo(110, -28);
      ctx.stroke();

      [-72, -32, 62].forEach((sx, i) => {
        rr(sx, -116, 26, 88, 8);
        ctx.fillStyle = "#111";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
          sx + 13 + Math.sin(time * 1.2 + i) * 8,
          -136 - Math.sin(time * 1.1 + i) * 7,
          9 + Math.sin(time + i) * 3,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "rgba(0,0,0,0.12)";
        ctx.fill();
      });

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
          rr(-74 + col * 44, 2 + row * 28, 22, 17, 5);
          ctx.fillStyle = `rgba(244,197,66,${
            0.3 + 0.35 * Math.sin(time * 2 + row + col)
          })`;
          ctx.fill();
        }
      }

      rr(-20, 45, 40, 49, 7);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.4;
      ctx.stroke();

      ctx.restore();
    };

    const drawForklift = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-38, -18, 55, 32, 8);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(16, -18);
      ctx.lineTo(34, -38);
      ctx.lineTo(48, -18);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(44, -34);
      ctx.lineTo(44, 24);
      ctx.moveTo(44, 22);
      ctx.lineTo(76, 22);
      ctx.stroke();

      rr(62, 3, 30, 22, 4);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.stroke();

      [-25, 18].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 18, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawRoleBadge = (x, y) => {
      const item = categories[activeRef.current];

      rr(x - 118, y - 42, 236, 84, 24);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x - 82, y, 22, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ACTIVE ROLE GROUP", x + 20, y - 8);

      ctx.font = "800 17px Arimo";
      ctx.fillText(item.title, x + 20, y + 16);
    };

    const drawGrid = () => {
      ctx.save();
      ctx.globalAlpha = 0.14;
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;

      const size = 42;

      for (let x = 0; x < w; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = 0; y < h; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();

      const s = Math.min(w, h) / 760;

      drawFactory(w * 0.53, h * 0.32, s);
      drawConveyor(w * 0.52, h * 0.66, Math.min(w * 0.78, 560));

      drawWorker(w * 0.22, h * 0.61, Math.min(w, h) / 720, "#F4C542", 0);
      drawWorker(w * 0.45, h * 0.61, Math.min(w, h) / 720, "#67D946", 1);
      drawWorker(w * 0.68, h * 0.61, Math.min(w, h) / 720, "#A6E6EC", 0);

      const forkliftX = w * 0.17 + ((time * 75) % (w * 0.62));
      drawForklift(forkliftX, h * 0.84, Math.min(w, h) / 800);

      drawGear(w * 0.17, h * 0.24, 32, 0.75);
      drawGear(w * 0.84, h * 0.25, 28, 0.9, true);

      drawRoleBadge(w * 0.52, h * 0.93);

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
        <div className="manufacturing-role-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Roles We Recruit
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Talent", "across", "the", "production", "lifecycle"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="manufacturing-role-word inline-block">
                    {word}
                  </span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            From assembly lines to technical operations, we connect
            manufacturers with reliable talent across factory operations.
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
                  className={`manufacturing-role-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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

          <div className="manufacturing-role-reveal relative h-[460px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[560px] lg:sticky lg:top-24 lg:h-[690px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="manufacturing-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

export default ManufacturingRoles;
