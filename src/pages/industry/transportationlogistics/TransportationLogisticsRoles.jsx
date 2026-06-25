import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Boxes,
  ClipboardList,
  Forklift,
  MapPinned,
  PackageCheck,
  Route,
  ShieldCheck,
  Truck,
  UserCheck,
  Warehouse,
} from "lucide-react";

const categories = [
  {
    title: "Drivers & Fleet",
    roles: [
      "Truck Drivers",
      "Van Drivers",
      "Delivery Drivers",
      "Fleet Assistants",
    ],
    icon: Truck,
    color: "#FFE994",
  },
  {
    title: "Warehouse Operations",
    roles: ["Warehouse Workers", "Pickers", "Packers", "Loaders"],
    icon: Warehouse,
    color: "#CFF7BC",
  },
  {
    title: "Forklift & Equipment",
    roles: [
      "Forklift Operators",
      "Pallet Movers",
      "Material Handlers",
      "Yard Operators",
    ],
    icon: Forklift,
    color: "#A6E6EC",
  },
  {
    title: "Dispatch & Routing",
    roles: [
      "Dispatch Assistants",
      "Route Planners",
      "Transport Coordinators",
      "Schedulers",
    ],
    icon: Route,
    color: "#FFF6C8",
  },
  {
    title: "Sorting & Packing",
    roles: [
      "Sorting Workers",
      "Parcel Handlers",
      "Packaging Staff",
      "Quality Checkers",
    ],
    icon: Boxes,
    color: "#FFE994",
  },
  {
    title: "Supervision & Compliance",
    roles: [
      "Warehouse Supervisors",
      "Shift Leaders",
      "Safety Assistants",
      "Compliance Support",
    ],
    icon: ShieldCheck,
    color: "#CFF7BC",
  },
];

const stats = [
  { value: "7000+", label: "Logistics Workers" },
  { value: "48 Hours", label: "Initial Shortlisting" },
  { value: "25+", label: "Countries Served" },
  { value: "96%", label: "Employer Satisfaction" },
];

const TransportationLogisticsRoles = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".logi-role-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".logi-role-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".logi-role-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".logi-stat", {
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

      ctx.setTransform(dpr, 0, 0, 0, dpr, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rr = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
    };

    const drawGrid = () => {
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;

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

    const drawWorker = (x, y, s, color, box = false) => {
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
      ctx.lineTo(0, 22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(-16, 10 + Math.sin(time * 4 + x) * 3);
      ctx.moveTo(0, -2);
      ctx.lineTo(17, 10 + Math.cos(time * 4 + x) * 3);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 22);
      ctx.lineTo(-11, 42);
      ctx.moveTo(0, 22);
      ctx.lineTo(11, 42);
      ctx.stroke();

      if (box) {
        rr(16, 0, 28, 22, 5);
        ctx.fillStyle = "#FFF6C8";
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawBox = (x, y, s, color = "#FFF6C8") => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + x) * 2);
      ctx.scale(s, s);

      rr(-18, -14, 36, 28, 5);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -3);
      ctx.lineTo(18, -3);
      ctx.moveTo(0, -14);
      ctx.lineTo(0, 14);
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 1.3;
      ctx.stroke();

      ctx.restore();
    };

    const drawTruck = (x, y, s, color = "#FFE994", dir = 1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s * dir, s);

      rr(-62, -28, 82, 42, 10);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(18, -18, 42, 32, 8);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      [-35, 35].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 18, 11, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wx, 18, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawForklift = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4) * 2);
      ctx.scale(s, s);

      rr(-38, -20, 55, 34, 8);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(0, -48, 30, 30, 6);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(32, -42);
      ctx.lineTo(32, 16);
      ctx.moveTo(32, 12);
      ctx.lineTo(66, 12);
      ctx.stroke();

      drawBox(76, 5, 0.75, "#CFF7BC");

      [-20, 18].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 18, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wx, 18, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawWarehouse = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(-105, -60);
      ctx.lineTo(0, -110);
      ctx.lineTo(105, -60);
      ctx.lineTo(105, 85);
      ctx.lineTo(-105, 85);
      ctx.closePath();

      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("LOGISTICS HUB", 0, -48);

      [-55, 0, 55].forEach((bx) => {
        rr(bx - 20, 5, 40, 80, 7);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bx - 20, 30);
        ctx.lineTo(bx + 20, 30);
        ctx.moveTo(bx - 20, 55);
        ctx.lineTo(bx + 20, 55);
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      ctx.restore();
    };

    const drawConveyor = (x, y, width) => {
      ctx.beginPath();
      ctx.moveTo(x - width / 2, y);
      ctx.lineTo(x + width / 2, y);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      for (let i = 0; i < 7; i++) {
        const bx = x - width / 2 + ((time * 52 + i * 64) % width);
        drawBox(bx, y - 12, 0.55, i % 2 ? "#FFE994" : "#CFF7BC");
      }
    };

    const drawRoute = (points, color = "#67D946") => {
      ctx.beginPath();

      points.forEach(([x, y], index) => {
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 46;
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 4; i++) {
        const p = (time * 0.13 + i / 4) % 1;
        const total = points.length - 1;
        const seg = Math.min(Math.floor(p * total), total - 1);
        const local = p * total - seg;

        const [x1, y1] = points[seg];
        const [x2, y2] = points[seg + 1];

        const x = x1 + (x2 - x1) * local;
        const y = y1 + (y2 - y1) * local;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }
    };

    const drawRoleBadge = (x, y) => {
      const item = categories[activeRef.current];

      rr(x - 126, y - 42, 252, 84, 24);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x - 90, y, 22, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ACTIVE LOGISTICS GROUP", x + 20, y - 8);

      ctx.font = "800 17px Arimo";
      ctx.fillText(item.title, x + 20, y + 16);
    };

    const drawFloatingCard = (x, y, title, value, color) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.5 + x) * 5);

      rr(-84, -34, 168, 68, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-55, 0, 18, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 11px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(title, 20, -7);

      ctx.font = "900 15px Arimo";
      ctx.fillText(value, 20, 14);

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();

      drawRoute([
        [w * 0.16, h * 0.22],
        [w * 0.38, h * 0.34],
        [w * 0.5, h * 0.46],
        [w * 0.7, h * 0.34],
        [w * 0.84, h * 0.58],
      ]);

      drawWarehouse(w * 0.5, h * 0.42, Math.min(w, h) / 820);
      drawConveyor(w * 0.5, h * 0.62, Math.min(w * 0.54, 360));

      drawWorker(w * 0.25, h * 0.66, Math.min(w, h) / 780, "#F4C542", true);
      drawWorker(w * 0.62, h * 0.68, Math.min(w, h) / 780, "#67D946", true);
      drawWorker(w * 0.78, h * 0.68, Math.min(w, h) / 790, "#A6E6EC", false);

      drawForklift(
        w * 0.22 + ((time * 44) % (w * 0.3)),
        h * 0.77,
        Math.min(w, h) / 860,
      );

      drawTruck(
        w * 0.08 + ((time * 55) % (w * 0.78)),
        h * 0.86,
        Math.min(w, h) / 850,
        "#FFE994",
        1,
      );

      drawTruck(
        w * 0.92 - ((time * 42) % (w * 0.75)),
        h * 0.92,
        Math.min(w, h) / 900,
        "#CFF7BC",
        -1,
      );

      drawFloatingCard(w * 0.23, h * 0.28, "Route", "Active ✓", "#CFF7BC");
      drawFloatingCard(w * 0.75, h * 0.25, "Warehouse", "Staffed ✓", "#FFE994");

      drawRoleBadge(w * 0.5, h * 0.95);

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
      id="transportation-logistics-role"
      className="font-arimo bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="logi-role-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Roles We Recruit
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Logistics", "talent", "for", "every", "movement", "stage"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="logi-role-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We recruit reliable workers for transport fleets, warehouse
            operations, dispatch support, equipment handling, sorting and
            logistics supervision.
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
                  className={`logi-role-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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

          <div className="logi-role-reveal relative h-[460px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[560px] lg:sticky lg:top-24 lg:h-[690px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="logi-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

export default TransportationLogisticsRoles;
