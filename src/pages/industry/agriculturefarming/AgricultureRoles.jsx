import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Beef,
  Boxes,
  Droplets,
  Leaf,
  Sprout,
  Tractor,
  UsersRound,
  Wheat,
} from "lucide-react";

const categories = [
  {
    title: "Crop Production",
    roles: [
      "Fruit Pickers",
      "Vegetable Harvesters",
      "Field Workers",
      "Crop Planters",
    ],
    icon: Wheat,
    color: "#FFE994",
  },
  {
    title: "Greenhouse",
    roles: [
      "Greenhouse Workers",
      "Irrigation Operators",
      "Plant Care Workers",
      "Nursery Staff",
    ],
    icon: Sprout,
    color: "#CFF7BC",
  },
  {
    title: "Livestock",
    roles: [
      "Dairy Workers",
      "Poultry Workers",
      "Livestock Handlers",
      "Animal Care Workers",
    ],
    icon: Beef,
    color: "#A6E6EC",
  },
  {
    title: "Equipment",
    roles: [
      "Tractor Drivers",
      "Machinery Operators",
      "Irrigation Technicians",
      "Farm Drivers",
    ],
    icon: Tractor,
    color: "#FFF6C8",
  },
  {
    title: "Packing & Sorting",
    roles: [
      "Packing Workers",
      "Sorting Workers",
      "Warehouse Helpers",
      "Quality Checkers",
    ],
    icon: Boxes,
    color: "#FFE994",
  },
  {
    title: "Supervisory",
    roles: [
      "Farm Supervisors",
      "Team Leaders",
      "Harvest Coordinators",
      "Field Foremen",
    ],
    icon: UsersRound,
    color: "#CFF7BC",
  },
];

const stats = [
  { value: "8000+", label: "Agricultural Workers" },
  { value: "72 Hours", label: "Initial Shortlisting" },
  { value: "22+", label: "Countries Served" },
  { value: "96%", label: "Employer Satisfaction" },
];

const AgricultureRoles = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".agri-role-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".agri-role-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".agri-role-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".agri-stat", {
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

    const drawField = () => {
      const groundY = h * 0.64;

      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.quadraticCurveTo(w * 0.5, groundY - 42, w, groundY);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();

      for (let i = 0; i < 13; i++) {
        const y = groundY + i * 22;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.quadraticCurveTo(w * 0.5, y - 34, w, y);
        ctx.strokeStyle = "rgba(0,0,0,0.12)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      for (let i = 0; i < 76; i++) {
        const x = (i * 59 + Math.sin(time + i) * 5) % w;
        const y = groundY + 25 + ((i * 41) % (h * 0.24));
        const height = 14 + (i % 5) * 4;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 5, y - height);
        ctx.moveTo(x, y);
        ctx.lineTo(x + 5, y - height * 0.9);
        ctx.strokeStyle = "rgba(0,0,0,0.32)";
        ctx.lineWidth = 1.35;
        ctx.stroke();
      }
    };

    const drawFarmer = (x, y, s, color, tool = 0) => {
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
      ctx.moveTo(-18, -28);
      ctx.lineTo(18, -28);
      ctx.moveTo(-11, -28);
      ctx.quadraticCurveTo(0, -43, 11, -28);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(0, 22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(-16, 10 + Math.sin(time * 4 + tool) * 4);
      ctx.moveTo(0, -2);
      ctx.lineTo(17, 10 + Math.cos(time * 4 + tool) * 4);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 22);
      ctx.lineTo(-11, 42);
      ctx.moveTo(0, 22);
      ctx.lineTo(11, 42);
      ctx.stroke();

      if (tool === 0) {
        ctx.beginPath();
        ctx.moveTo(18, 8);
        ctx.lineTo(40, -5);
        ctx.stroke();
      }

      if (tool === 1) {
        rr(16, 4, 28, 20, 6);
        ctx.fillStyle = "#FFF6C8";
        ctx.fill();
        ctx.stroke();
      }

      if (tool === 2) {
        ctx.beginPath();
        ctx.moveTo(-20, 9);
        ctx.lineTo(-38, 25);
        ctx.moveTo(-38, 25);
        ctx.lineTo(-22, 25);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawTractor = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-50, -23, 75, 40, 10);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(2, -53, 43, 33, 8);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(45, -18);
      ctx.lineTo(68, -5);
      ctx.lineTo(65, 15);
      ctx.stroke();

      [-30, 32].forEach((wx, i) => {
        ctx.beginPath();
        ctx.arc(wx, 21, i === 0 ? 17 : 12, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wx, 21, i === 0 ? 7 : 5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawGreenhouse = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(-62, 42);
      ctx.lineTo(-62, 0);
      ctx.quadraticCurveTo(0, -62, 62, 0);
      ctx.lineTo(62, 42);
      ctx.closePath();

      ctx.fillStyle = "rgba(166, 230, 236, 0.45)";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = -35; i <= 35; i += 35) {
        ctx.beginPath();
        ctx.moveTo(i, 42);
        ctx.lineTo(i, -28);
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      for (let i = -35; i <= 35; i += 24) {
        ctx.beginPath();
        ctx.arc(i, 23, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawAnimal = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-35, -18, 70, 32, 12);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(42, -12, 13, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(51, -22);
      ctx.lineTo(59, -34);
      ctx.moveTo(35, -22);
      ctx.lineTo(29, -34);
      ctx.stroke();

      [-22, -6, 12, 26].forEach((lx) => {
        ctx.beginPath();
        ctx.moveTo(lx, 14);
        ctx.lineTo(lx, 32);
        ctx.stroke();
      });

      ctx.restore();
    };

    const drawBasket = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-26, -10, 52, 30, 8);
      ctx.fillStyle = "#FFF6C8";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      [-13, 3, 17].forEach((cx, i) => {
        ctx.beginPath();
        ctx.arc(cx, -15 - (i % 2) * 4, 8, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 ? "#67D946" : "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.3;
        ctx.stroke();
      });

      ctx.restore();
    };

    const drawBoxes = () => {
      for (let i = 0; i < 7; i++) {
        const x = w * 0.16 + ((time * 42 + i * 72) % (w * 0.66));
        const y = h * 0.79 + Math.sin(time + i) * 5;

        rr(x - 17, y - 12, 34, 24, 6);
        ctx.fillStyle = i % 2 ? "#FFE994" : "#FFF6C8";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const drawWater = () => {
      const y = h * 0.87;

      ctx.beginPath();
      ctx.moveTo(w * 0.12, y);
      ctx.lineTo(w * 0.9, y);
      ctx.strokeStyle = "rgba(0,0,0,0.28)";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i < 16; i++) {
        const x = w * 0.14 + i * ((w * 0.74) / 15);
        const dropY = y + 10 + ((time * 50 + i * 17) % 32);

        ctx.beginPath();
        ctx.arc(x, dropY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
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
      ctx.fillText("ACTIVE FARM GROUP", x + 20, y - 8);

      ctx.font = "800 17px Arimo";
      ctx.fillText(item.title, x + 20, y + 16);
    };

    const drawSunAndBirds = () => {
      const sx = w * 0.82;
      const sy = h * 0.13;
      const r = 25 + Math.sin(time * 1.5) * 3;

      ctx.beginPath();
      ctx.arc(sx, sy, r + 14, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,233,148,0.24)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i < 5; i++) {
        const x = ((time * 28 + i * 140) % (w + 120)) - 60;
        const y = h * 0.16 + Math.sin(time + i) * 18;

        ctx.beginPath();
        ctx.moveTo(x - 8, y);
        ctx.quadraticCurveTo(x, y - 8, x + 8, y);
        ctx.moveTo(x + 8, y);
        ctx.quadraticCurveTo(x + 16, y - 8, x + 24, y);
        ctx.strokeStyle = "rgba(0,0,0,0.32)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawSunAndBirds();
      drawField();

      drawGreenhouse(w * 0.22, h * 0.5, Math.min(w, h) / 830);
      drawAnimal(w * 0.78, h * 0.54, Math.min(w, h) / 760);

      const tractorX = w * 0.12 + ((time * 55) % (w * 0.72));
      drawTractor(tractorX, h * 0.66, Math.min(w, h) / 820);

      drawFarmer(w * 0.33, h * 0.65, Math.min(w, h) / 760, "#F4C542", 0);
      drawFarmer(w * 0.53, h * 0.67, Math.min(w, h) / 760, "#67D946", 1);
      drawFarmer(w * 0.68, h * 0.67, Math.min(w, h) / 760, "#A6E6EC", 2);

      drawBasket(w * 0.72, h * 0.7, Math.min(w, h) / 800);
      drawBoxes();
      drawWater();

      drawRoleBadge(w * 0.5, h * 0.93);

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="agri-role-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Roles We Recruit
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Agricultural",
              "talent",
              "for",
              "every",
              "farm",
              "operation",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="agri-role-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We recruit dependable workers for crop production, greenhouse
            operations, livestock care, equipment handling, packing and farm
            supervision.
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
                  className={`agri-role-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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

          <div className="agri-role-reveal relative h-[460px] overflow-hidden bg-[#FFF9E6] sm:h-[560px] lg:sticky lg:top-24 lg:h-[690px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="agri-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

export default AgricultureRoles;
