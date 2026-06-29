import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  Boxes,
  ClipboardCheck,
  CreditCard,
  PackageCheck,
  ShieldCheck,
  ShoppingBasket,
  Store,
  Truck,
  UsersRound,
} from "lucide-react";

const roleGroups = [
  {
    title: "Front Store Staff",
    roles: [
      "Cashiers",
      "Sales Assistants",
      "Customer Service Staff",
      "Checkout Operators",
      "Floor Assistants",
      "Greeters",
    ],
    icon: CreditCard,
    color: "#FFE994",
  },
  {
    title: "Shelf & Stock Team",
    roles: [
      "Shelf Stackers",
      "Stock Replenishers",
      "Merchandisers",
      "Inventory Assistants",
      "Price Label Staff",
      "Stock Controllers",
    ],
    icon: Boxes,
    color: "#CFF7BC",
  },
  {
    title: "Store Management",
    roles: [
      "Store Supervisors",
      "Store Managers",
      "Department Managers",
      "Shift Leaders",
      "Team Leaders",
      "Assistant Managers",
    ],
    icon: Store,
    color: "#A6E6EC",
  },
  {
    title: "Fresh Food & Specialty",
    roles: [
      "Butchers",
      "Bakery Staff",
      "Fresh Food Assistants",
      "Deli Counter Staff",
      "Fish Counter Staff",
      "Produce Assistants",
    ],
    icon: ShoppingBasket,
    color: "#FFF6C8",
  },
  {
    title: "Warehouse & Delivery",
    roles: [
      "Warehouse Assistants",
      "Pickers & Packers",
      "Delivery Drivers",
      "Dispatch Assistants",
      "Goods Receiving Staff",
      "Backroom Staff",
    ],
    icon: Truck,
    color: "#FFE994",
  },
  {
    title: "Support & Security",
    roles: [
      "Security Guards",
      "Cleaners",
      "Maintenance Helpers",
      "Trolley Collectors",
      "Loss Prevention Staff",
      "Facility Support Staff",
    ],
    icon: ShieldCheck,
    color: "#CFF7BC",
  },
];

const stats = [
  { value: "1500+", label: "Retail Professionals" },
  { value: "200+", label: "Stores Supported" },
  { value: "25+", label: "Countries Covered" },
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
      gsap.from(".retail-role-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".retail-role-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".retail-role-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".retail-role-stat", {
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

    const drawShelf = (x, y, s, rows = 4, cols = 5) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-118, -145, 236, 166, 16);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let r = 0; r < rows; r++) {
        const yy = -115 + r * 36;

        ctx.beginPath();
        ctx.moveTo(-106, yy + 24);
        ctx.lineTo(106, yy + 24);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.stroke();

        for (let c = 0; c < cols; c++) {
          const px = -86 + c * 42;
          const bounce = Math.sin(time * 1.2 + r + c) * 1.5;

          rr(px - 12, yy - 1 + bounce, 24, 26, 5);
          ctx.fillStyle =
            (r + c) % 3 === 0
              ? "#FFE994"
              : (r + c) % 3 === 1
              ? "#CFF7BC"
              : "#A6E6EC";
          ctx.fill();
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const drawCheckout = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-105, -46, 210, 60, 14);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

      rr(-74, -102, 74, 56, 10);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(30, -82, 55, 35, 9);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      const scanX = 58 + Math.sin(time * 7) * 21;
      ctx.beginPath();
      ctx.moveTo(scanX, -94);
      ctx.lineTo(scanX, -38);
      ctx.strokeStyle = "rgba(103,217,70,0.75)";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();
    };

    const drawPerson = (
      x,
      y,
      s,
      apron = "#2E6A3F",
      action = "scan",
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
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(-15, -40, 30, 42, 7);
      ctx.fillStyle = apron;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      let rightX = 36;
      let rightY = -26 + Math.sin(t * 3.5) * 4;

      if (action === "scan") {
        rightX = 46;
        rightY = -34;
      }

      if (action === "stock") {
        rightX = 44;
        rightY = -50;
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
      ctx.strokeStyle = "#111";
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

      if (action === "scan") {
        ctx.save();
        ctx.translate(rightX + 12, rightY);
        ctx.rotate(-0.25);

        rr(-6, -5, 26, 12, 4);
        ctx.fillStyle = "#1C1810";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(18, 0);
        ctx.lineTo(44, 0);
        ctx.strokeStyle = "rgba(103,217,70,0.65)";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.restore();
      }

      if (action === "stock") {
        rr(rightX + 8, rightY - 16, 26, 25, 5);
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
      ctx.arc(0, -70, 15, Math.PI * 0.85, Math.PI * 2.15);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(-5, -65, 2, 0, Math.PI * 2);
      ctx.arc(5, -65, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -60, 4, 0.1, Math.PI - 0.1);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawTrolley = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.2) * 2);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-50, -35);
      ctx.lineTo(38, -28);
      ctx.lineTo(24, 10);
      ctx.lineTo(-32, 10);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(38, -28);
      ctx.lineTo(62, -55);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      [-24, 18].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 18, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      });

      [
        ["#FFE994", -25, -42],
        ["#CFF7BC", 5, -44],
        ["#A6E6EC", 22, -36],
      ].forEach(([color, bx, by]) => {
        rr(bx, by, 25, 25, 5);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      ctx.restore();
    };

    const drawRoleBadge = () => {
      const item = roleGroups[activeRef.current];

      ctx.save();
      ctx.translate(w * 0.5, h * 0.13 + Math.sin(time * 1.2) * 5);

      rr(-150, -54, 300, 108, 30);
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
      ctx.fillText("ACTIVE ROLE GROUP", 30, -14);

      ctx.font = "900 18px Arimo";
      ctx.fillText(item.title.toUpperCase(), 30, 16);

      ctx.beginPath();
      ctx.arc(130, -38, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
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

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawBackground();
      drawRoleBadge();
      drawRoleOrbit();

      const s = Math.min(w, h) / 800;

      drawShelf(w * 0.22, h * 0.69, s * 0.8);
      drawShelf(w * 0.82, h * 0.68, s * 0.7);
      drawCheckout(w * 0.5, h * 0.74, s * 0.86);

      drawPerson(w * 0.36, h * 0.86, s * 0.8, "#2E6A3F", "scan", false, 0);
      drawPerson(w * 0.6, h * 0.86, s * 0.78, "#386B8A", "clipboard", true, 1.2);
      drawPerson(w * 0.72, h * 0.86, s * 0.74, "#CFF7BC", "stock", false, 2.2);

      drawTrolley(w * 0.1 + ((time * 40) % (w * 0.72)), h * 0.91, s * 0.8);

      drawFloatingCard(w * 0.22, h * 0.24, "Front Store", "Cashiers", "#FFE994", 0);
      drawFloatingCard(w * 0.78, h * 0.24, "Operations", "Stock team", "#CFF7BC", 2);
      drawFloatingCard(w * 0.5, h * 0.94, "Deployment", "Store team ready ✓", "#A6E6EC", 4);

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
      id="retails-roles"
      className="font-arimo bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="retail-role-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Roles We Recruit
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Retail", "talent", "for", "every", "store", "operation"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="retail-role-word inline-block">{word}</span>
                </span>
              )
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We recruit store-facing staff, stockroom workers, supervisors,
            fresh food teams, warehouse support and customer service
            professionals.
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
                  className={`retail-role-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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

          <div className="retail-role-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:sticky lg:top-24 lg:h-[690px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="retail-role-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        <div className="retail-role-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <UsersRound size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Need retail staff for a specific store role?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We support hiring for checkout, shelves, fresh food counters,
                  warehouse, delivery, supervision, security and daily retail
                  operations.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Request Retail Staff
              <BadgeCheck size={16} />
            </a>
          </div>
        </div>

        <div className="retail-role-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Cashiers",
            "Shelf Stackers",
            "Store Supervisors",
            "Warehouse Staff",
            "Fresh Food Teams",
            "Delivery Drivers",
            "Security",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2 text-sm font-bold text-black/65"
            >
              <ClipboardCheck size={14} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesWeRecruit;