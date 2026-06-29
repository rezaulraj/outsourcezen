import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Clock3,
  MessageSquareCheck,
  PackageCheck,
  SearchCheck,
  ShoppingCart,
  Store,
  Truck,
  UserCheck,
  UserSearch,
} from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Store Requirement",
    text: "We understand the store type, required roles, shift coverage, location and hiring timeline.",
    icon: ClipboardList,
    color: "#FFE994",
  },
  {
    step: "02",
    title: "Talent Search",
    text: "We source suitable retail workers for checkout, shelves, warehouse, delivery and store support.",
    icon: UserSearch,
    color: "#CFF7BC",
  },
  {
    step: "03",
    title: "Candidate Screening",
    text: "Candidates are reviewed for availability, experience, communication and role suitability.",
    icon: SearchCheck,
    color: "#A6E6EC",
  },
  {
    step: "04",
    title: "Shortlist Sharing",
    text: "We share suitable profiles with the employer for review, interview or final selection.",
    icon: UserCheck,
    color: "#FFF6C8",
  },
  {
    step: "05",
    title: "Employer Review",
    text: "The employer confirms selected workers based on role fit, shift needs and store requirements.",
    icon: MessageSquareCheck,
    color: "#FFE994",
  },
  {
    step: "06",
    title: "Onboarding Support",
    text: "We support joining coordination, shift planning and basic placement preparation.",
    icon: PackageCheck,
    color: "#CFF7BC",
  },
  {
    step: "07",
    title: "Ongoing Coverage",
    text: "We help with replacement, seasonal demand, extra shifts and long-term retail staffing support.",
    icon: Truck,
    color: "#A6E6EC",
  },
];

const stats = [
  { value: "48h", label: "Initial Shortlist" },
  { value: "24/7", label: "Recruitment Support" },
  { value: "1500+", label: "Retail Professionals" },
  { value: "98%", label: "Client Satisfaction" },
];

const OurRecruitmentProcess = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".retail-process-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".retail-process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".retail-process-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.06,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".retail-process-stat", {
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
      setActive((prev) => (prev + 1) % processSteps.length);
    }, 2500);

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

    const drawProcessPath = () => {
      const points = [
        { x: w * 0.15, y: h * 0.3, label: "NEED", color: "#FFE994" },
        { x: w * 0.3, y: h * 0.43, label: "SEARCH", color: "#CFF7BC" },
        { x: w * 0.45, y: h * 0.32, label: "SCREEN", color: "#A6E6EC" },
        { x: w * 0.6, y: h * 0.44, label: "SHORTLIST", color: "#FFF6C8" },
        { x: w * 0.74, y: h * 0.33, label: "REVIEW", color: "#FFE994" },
        { x: w * 0.86, y: h * 0.47, label: "ONBOARD", color: "#CFF7BC" },
      ];

      ctx.beginPath();
      points.forEach((point, i) => {
        if (i === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });

      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 12]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      points.forEach((point, index) => {
        const done = index <= activeRef.current;

        ctx.beginPath();
        ctx.arc(
          point.x,
          point.y,
          25 + (done ? Math.sin(time * 3 + index) * 3 : 0),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = done ? point.color : "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = done ? 3 : 2.5;
        ctx.stroke();

        if (done) {
          ctx.beginPath();
          ctx.arc(point.x + 22, point.y - 24, 12, 0, Math.PI * 2);
          ctx.fillStyle = "#67D946";
          ctx.fill();
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 2;
          ctx.stroke();

          drawCheck(point.x + 22, point.y - 24, 0.45);
        }

        ctx.fillStyle = "#111";
        ctx.font = "900 9px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(point.label, point.x, point.y + 45);
      });

      for (let i = 0; i < 4; i++) {
        const p = (time * 0.16 + i * 0.25) % 1;
        const total = points.length - 1;
        const seg = Math.min(Math.floor(p * total), total - 1);
        const local = p * total - seg;

        const a = points[seg];
        const b = points[seg + 1];

        const x = a.x + (b.x - a.x) * local;
        const y = a.y + (b.y - a.y) * local;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(time * 2 + i) * 0.12);

        rr(-11, -15, 22, 22, 4);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }
    };

    const drawActiveBadge = () => {
      const step = processSteps[activeRef.current];

      ctx.save();
      ctx.translate(w * 0.5, h * 0.12 + Math.sin(time * 1.2) * 5);

      rr(-158, -56, 316, 112, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-116, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = step.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(`STEP ${step.step}`, 30, -15);

      ctx.font = "900 18px Arimo";
      ctx.fillText(step.title.toUpperCase(), 30, 16);

      ctx.beginPath();
      ctx.arc(138, -40, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
    };

    const drawHiringPanel = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.35) * 5);

      rr(-106, -52, 212, 104, 28);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("PROCESS READY", 0, -25);

      ["Profiles", "Shifts", "Onboarding"].forEach((item, i) => {
        const yy = 2 + i * 24;

        ctx.beginPath();
        ctx.arc(-56, yy, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        drawCheck(-56, yy, 0.38);

        ctx.fillStyle = "#111";
        ctx.font = "800 11px Arimo";
        ctx.textAlign = "left";
        ctx.fillText(item, -36, yy + 4);
      });

      ctx.restore();
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
      drawActiveBadge();
      drawProcessPath();

      const s = Math.min(w, h) / 820;

      drawShelf(w * 0.22, h * 0.69, s * 0.78);
      drawShelf(w * 0.82, h * 0.68, s * 0.68);
      drawCheckout(w * 0.5, h * 0.74, s * 0.84);

      drawPerson(w * 0.36, h * 0.86, s * 0.78, "#2E6A3F", "scan", false, 0);
      drawPerson(w * 0.6, h * 0.86, s * 0.76, "#386B8A", "clipboard", true, 1.2);
      drawPerson(w * 0.72, h * 0.86, s * 0.72, "#CFF7BC", "stock", false, 2.2);

      drawTrolley(w * 0.1 + ((time * 40) % (w * 0.72)), h * 0.91, s * 0.78);

      drawHiringPanel(w * 0.5, h * 0.6);

      drawFloatingCard(w * 0.2, h * 0.56, "Shortlist", "48h", "#FFE994", 0);
      drawFloatingCard(w * 0.8, h * 0.56, "Support", "24/7", "#CFF7BC", 2);
      drawFloatingCard(w * 0.5, h * 0.94, "Outcome", "Store team ready ✓", "#A6E6EC", 4);

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
        <div className="retail-process-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Recruitment Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "From",
              "store",
              "need",
              "to",
              "team",
              "onboarding",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="retail-process-word inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Our retail hiring process helps employers move quickly from staff
            requirement to reliable store team coverage.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="retail-process-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:sticky lg:top-24 lg:h-[720px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="space-y-5">
            {processSteps.map(({ icon: Icon, ...item }, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.step}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`retail-process-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">
                        Step {item.step}
                      </p>

                      <h3 className="mt-1 text-xl font-bold tracking-[-0.03em] text-black">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-black/70">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="retail-process-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        {/* <div className="retail-process-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <Store size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Built for fast-moving retail hiring
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We support the full retail recruitment journey — from store
                  requirement to screening, shortlist sharing, onboarding and
                  ongoing staffing coverage.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Start Hiring
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="retail-process-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Store requirement",
            "Talent search",
            "Screening",
            "Shortlist",
            "Onboarding",
            "Ongoing coverage",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2 text-sm font-bold text-black/65"
            >
              <BadgeCheck size={14} />
              {item}
            </span>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default OurRecruitmentProcess;