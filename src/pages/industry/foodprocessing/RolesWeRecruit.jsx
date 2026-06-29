import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  ClipboardCheck,
  Factory,
  PackageCheck,
  ShieldCheck,
  Snowflake,
  Truck,
  UsersRound,
  Wrench,
} from "lucide-react";

const roleGroups = [
  {
    title: "Production & Processing",
    roles: [
      "Production Operator",
      "Production Worker",
      "Line Operator",
      "Food Processor",
      "Processing Assistant",
      "Batching Operator",
    ],
    icon: Factory,
    color: "#FFE994",
  },
  {
    title: "Machine & Manufacturing",
    roles: [
      "Machine Operator",
      "Mixer Operator",
      "Baking Operator",
      "Filling Machine Operator",
      "Bottling Operator",
      "Canning Operator",
    ],
    icon: Wrench,
    color: "#CFF7BC",
  },
  {
    title: "Packaging & Labelling",
    roles: [
      "Packing Operator",
      "Packaging Technician",
      "Labelling Operator",
      "Carton Packer",
      "Sealing Operator",
      "Palletizing Staff",
    ],
    icon: PackageCheck,
    color: "#A6E6EC",
  },
  {
    title: "Quality & Food Safety",
    roles: [
      "QA Inspector",
      "QC Technician",
      "Food Safety Officer",
      "HACCP Coordinator",
      "Hygiene Inspector",
      "Quality Controller",
    ],
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
  {
    title: "Warehouse & Cold Storage",
    roles: [
      "Warehouse Assistant",
      "Forklift Driver",
      "Cold Storage Operator",
      "Inventory Controller",
      "Goods Receiver",
      "Dispatch Assistant",
    ],
    icon: Snowflake,
    color: "#FFE994",
  },
  {
    title: "Supervisory & Management",
    roles: [
      "Shift Supervisor",
      "Production Supervisor",
      "Factory Manager",
      "Operations Manager",
      "Line Leader",
      "Team Leader",
    ],
    icon: UsersRound,
    color: "#CFF7BC",
  },
];

const stats = [
  { value: "3500+", label: "Food Processing Workers" },
  { value: "280+", label: "Factories Supported" },
  { value: "40+", label: "Food Production Projects" },
  { value: "24/7", label: "Recruitment Support" },
];

const RolesWeRecruit = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".food-role-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".food-role-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".food-role-card", {
        y: 35,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".food-role-stat", {
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
      setActive((prev) => (prev + 1) % roleGroups.length);
    }, 2400);

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
      bg.addColorStop(0.62, "#F6EEDB");
      bg.addColorStop(1, "#DCCFB0");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const floorY = h * 0.78;
      ctx.fillStyle = "#D7C8A8";
      ctx.fillRect(0, floorY, w, h - floorY);

      ctx.strokeStyle = "rgba(0,0,0,0.13)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(w, floorY);
      ctx.stroke();

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

      for (let i = 0; i < 34; i++) {
        const x = ((i * 89) % w) + Math.sin(time + i) * 8;
        const y = ((i * 47) % h) + Math.cos(time * 1.1 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.25)";
        ctx.fill();
      }
    };

    const drawMachine = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-118, -120, 236, 138, 18);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-92, -92, 72, 56, 10);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      rr(12, -96, 72, 66, 12);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(48 + i * 18, -14, 6 + Math.sin(time * 3 + i) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? "#67D946" : "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(-118, -28);
      ctx.lineTo(118, -28);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();
    };

    const drawConveyor = (x, y, s, length = 360) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-length / 2, -20, length, 42, 16);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-length / 2 + 18, 0);
      ctx.lineTo(length / 2 - 18, 0);
      ctx.strokeStyle = "#67D946";
      ctx.lineWidth = 3;
      ctx.setLineDash([14, 14]);
      ctx.lineDashOffset = -time * 58;
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 6; i++) {
        const px = -length / 2 + 45 + ((time * 48 + i * 70) % (length - 90));

        rr(px - 22, -42, 44, 30, 8);
        ctx.fillStyle = "#CFF7BC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(px + 13, -17, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
      }

      ctx.restore();
    };

    const drawWorker = (
      x,
      y,
      s,
      apron = "#F4F4F4",
      action = "inspect",
      flip = false,
      phase = 0
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
      ctx.moveTo(-8, 0);
      ctx.lineTo(-13, 28);
      ctx.moveTo(8, 0);
      ctx.lineTo(13, 28);
      ctx.stroke();

      rr(-18, -45, 36, 48, 8);
      ctx.fillStyle = apron;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      rr(-15, -40, 30, 42, 7);
      ctx.fillStyle = "#DDF4FF";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;
      ctx.stroke();

      let rightX = 38;
      let rightY = -26 + Math.sin(t * 3.5) * 4;

      if (action === "inspect") {
        rightX = 44;
        rightY = -42;
      }

      if (action === "pack") {
        rightX = 42;
        rightY = -26;
      }

      if (action === "clipboard") {
        rightX = 38;
        rightY = -32;
      }

      ctx.beginPath();
      ctx.moveTo(-15, -34);
      ctx.lineTo(-34, -18 + Math.sin(t * 3) * 3);
      ctx.moveTo(15, -34);
      ctx.lineTo(rightX, rightY);
      ctx.strokeStyle = apron;
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

      if (action === "inspect") {
        ctx.save();
        ctx.translate(rightX + 15, rightY - 4);
        ctx.rotate(-0.15);

        rr(-7, -5, 28, 12, 4);
        ctx.fillStyle = "#1C1810";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(21, 0);
        ctx.lineTo(48, 0);
        ctx.strokeStyle = "rgba(103,217,70,0.65)";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.restore();
      }

      if (action === "pack") {
        rr(rightX + 6, rightY - 14, 28, 24, 5);
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

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

      ctx.beginPath();
      ctx.moveTo(0, -45);
      ctx.lineTo(0, -52);
      ctx.strokeStyle = "#E7B58B";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -66, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-16, -73);
      ctx.quadraticCurveTo(0, -96, 16, -73);
      ctx.lineTo(16, -62);
      ctx.quadraticCurveTo(0, -70, -16, -62);
      ctx.closePath();
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rr(-12, -60, 24, 8, 4);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-5, -65, 2, 0, Math.PI * 2);
      ctx.arc(5, -65, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -58, 4, 0.1, Math.PI - 0.1);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawForklift = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.2) * 2);
      ctx.scale(s, s);

      rr(-52, -36, 90, 42, 10);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-28, -72, 42, 36, 8);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(42, -72);
      ctx.lineTo(42, 16);
      ctx.moveTo(42, 12);
      ctx.lineTo(88, 12);
      ctx.moveTo(42, -2);
      ctx.lineTo(82, -2);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      [-32, 22].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 15, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      });

      rr(78, -26, 42, 38, 5);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    const drawRoleBadge = () => {
      const item = roleGroups[activeRef.current];

      ctx.save();
      ctx.translate(w * 0.5, h * 0.13 + Math.sin(time * 1.2) * 5);

      rr(-152, -56, 304, 112, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-110, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ACTIVE ROLE GROUP", 30, -14);

      ctx.font = "900 17px Arimo";
      ctx.fillText(item.title.toUpperCase(), 30, 16);

      ctx.beginPath();
      ctx.arc(132, -40, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
    };

    const drawRoleOrbit = () => {
      const cx = w * 0.5;
      const cy = h * 0.45;
      const radius = Math.min(w, h) * 0.26;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.setLineDash([9, 13]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      roleGroups.forEach((item, index) => {
        const angle = (Math.PI * 2 * index) / roleGroups.length + time * 0.09;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.68;
        const isActive = index === activeRef.current;

        ctx.beginPath();
        ctx.arc(
          x,
          y,
          22 + (isActive ? Math.sin(time * 5) * 4 : 0),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = isActive ? item.color : "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = isActive ? 3 : 2.4;
        ctx.stroke();

        if (isActive) {
          ctx.beginPath();
          ctx.arc(x, y, 42 + Math.sin(time * 4) * 4, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(103,217,70,0.42)";
          ctx.lineWidth = 4;
          ctx.stroke();

          drawCheck(x + 22, y - 24, 0.45);
        }

        ctx.fillStyle = "#111";
        ctx.font = "900 9px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(String(index + 1).padStart(2, "0"), x, y + 3);
      });
    };

    const drawFloatingCard = (x, y, title, value, color, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.45 + phase) * 6);

      rr(-90, -32, 180, 64, 20);
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

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawBackground();
      drawRoleBadge();
      drawRoleOrbit();

      const s = Math.min(w, h) / 820;

      drawMachine(w * 0.22, h * 0.66, s * 0.82);
      drawMachine(w * 0.8, h * 0.65, s * 0.68);
      drawConveyor(w * 0.5, h * 0.76, s * 1.02, 390);

      drawWorker(w * 0.37, h * 0.86, s * 0.78, "#F4F4F4", "inspect", false, 0);
      drawWorker(
        w * 0.6,
        h * 0.86,
        s * 0.76,
        "#F4F4F4",
        "clipboard",
        true,
        1.2
      );
      drawWorker(w * 0.72, h * 0.86, s * 0.72, "#F4F4F4", "pack", false, 2.2);

      drawForklift(w * 0.1 + ((time * 35) % (w * 0.72)), h * 0.91, s * 0.76);

      drawFloatingCard(w * 0.22, h * 0.25, "Production", "Line workers", "#FFE994", 0);
      drawFloatingCard(w * 0.78, h * 0.25, "Quality", "Food safety", "#CFF7BC", 2);
      drawFloatingCard(w * 0.5, h * 0.94, "Deployment", "Factory team ready ✓", "#A6E6EC", 4);

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
        <div className="food-role-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Roles We Recruit
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Food", "factory", "talent", "for", "every", "production", "stage"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="food-role-word inline-block">{word}</span>
                </span>
              )
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We recruit production workers, machine operators, packaging teams,
            warehouse staff, quality inspectors, food safety professionals and
            factory leaders.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-5">
            {roleGroups.map(({ icon: Icon, ...item }, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`food-role-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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

          <div className="food-role-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:sticky lg:top-24 lg:h-[690px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="food-role-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        <div className="food-role-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <Factory size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Need workers for a specific food production role?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We support hiring across production, packaging, machine
                  operation, warehouse, cold storage, QA/QC, food safety and
                  factory supervision.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Request Food Staff
              <BadgeCheck size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RolesWeRecruit;