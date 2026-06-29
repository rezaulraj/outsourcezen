import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Clock3,
  PackageCheck,
  SearchCheck,
  ShoppingCart,
  Store,
  Truck,
  UserCheck,
  UsersRound,
} from "lucide-react";

const points = [
  {
    title: "Store workforce hiring",
    text: "Recruitment for cashiers, sales assistants, shelf stackers, supervisors and daily store teams.",
    icon: Store,
    color: "#FFE994",
  },
  {
    title: "Customer-focused staff",
    text: "We support hiring people who can serve customers, handle store tasks and work in fast-moving retail environments.",
    icon: UsersRound,
    color: "#CFF7BC",
  },
  {
    title: "Seasonal & urgent support",
    text: "Retailers often need quick staff for seasonal rush, store openings, promotions and weekend coverage.",
    icon: Clock3,
    color: "#A6E6EC",
  },
  {
    title: "Operations-ready teams",
    text: "We help employers source workers for checkout, shelves, stockroom, delivery and customer service support.",
    icon: PackageCheck,
    color: "#FFF6C8",
  },
];

const steps = [
  "Store Need",
  "Talent Search",
  "Screening",
  "Shortlist",
  "Employer Review",
  "Onboarding",
];

const stats = [
  { value: "1500+", label: "Retail Professionals" },
  { value: "200+", label: "Stores Supported" },
  { value: "25+", label: "Countries Covered" },
  { value: "98%", label: "Client Satisfaction" },
];

const WhatIsRetailSupermarketRecruitment = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".retail-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".retail-what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".retail-what-card", {
        y: 35,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.4,
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

      for (let i = 0; i <= 9; i++) {
        const x = (i / 9) * w;
        ctx.beginPath();
        ctx.moveTo(w / 2 + (x - w / 2) * 0.12, floorY);
        ctx.lineTo(x, h);
        ctx.strokeStyle = "rgba(0,0,0,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = 1; i <= 7; i++) {
        const y = floorY + (h - floorY) * Math.pow(i / 7, 1.55);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = "rgba(0,0,0,0.07)";
        ctx.stroke();
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

      rr(-110, -48, 220, 62, 14);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

      rr(-78, -104, 78, 58, 10);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-39, -46);
      ctx.lineTo(-39, -30);
      ctx.moveTo(-63, -30);
      ctx.lineTo(-15, -30);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(34, -84, 56, 36, 9);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      const scanX = 62 + Math.sin(time * 7) * 22;
      ctx.beginPath();
      ctx.moveTo(scanX, -96);
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
      phase = 0,
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

    const drawFlow = () => {
      const points = [
        { x: w * 0.16, y: h * 0.26, label: "NEED", color: "#FFE994" },
        { x: w * 0.32, y: h * 0.4, label: "SEARCH", color: "#CFF7BC" },
        { x: w * 0.5, y: h * 0.31, label: "SCREEN", color: "#A6E6EC" },
        { x: w * 0.68, y: h * 0.42, label: "SHORTLIST", color: "#FFF6C8" },
        { x: w * 0.84, y: h * 0.29, label: "ONBOARD", color: "#FFE994" },
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
        ctx.beginPath();
        ctx.arc(
          point.x,
          point.y,
          25 + Math.sin(time * 3 + index) * 2,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = point.color;
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        if (index <= Math.floor((time * 0.58) % points.length)) {
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

    const drawHiringPanel = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.35) * 5);

      rr(-110, -56, 220, 112, 28);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("STORE TEAM READY", 0, -28);

      ["Cashiers", "Stockers", "Supervisors"].forEach((item, i) => {
        const yy = 2 + i * 24;

        ctx.beginPath();
        ctx.arc(-58, yy, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        drawCheck(-58, yy, 0.38);

        ctx.fillStyle = "#111";
        ctx.font = "800 11px Arimo";
        ctx.textAlign = "left";
        ctx.fillText(item, -38, yy + 4);
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

    const drawParticles = () => {
      for (let i = 0; i < 34; i++) {
        const x = ((i * 89) % w) + Math.sin(time + i) * 8;
        const y = ((i * 47) % h) + Math.cos(time * 1.1 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.25)";
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawBackground();
      drawGrid();
      drawParticles();
      drawFlow();

      const s = Math.min(w, h) / 790;

      drawShelf(w * 0.23, h * 0.68, s * 0.82);
      drawShelf(w * 0.8, h * 0.67, s * 0.72);
      drawCheckout(w * 0.5, h * 0.73, s * 0.9);

      drawPerson(w * 0.38, h * 0.84, s * 0.82, "#2E6A3F", "scan", false, 0);
      drawPerson(
        w * 0.62,
        h * 0.84,
        s * 0.78,
        "#386B8A",
        "clipboard",
        true,
        1.3,
      );
      drawPerson(w * 0.73, h * 0.84, s * 0.74, "#CFF7BC", "stock", false, 2.2);

      drawTrolley(w * 0.1 + ((time * 40) % (w * 0.72)), h * 0.91, s * 0.82);

      drawHiringPanel(w * 0.5, h * 0.58);

      drawFloatingCard(
        w * 0.22,
        h * 0.16,
        "Retail Hiring",
        "Store staff",
        "#FFE994",
        0,
      );
      drawFloatingCard(
        w * 0.78,
        h * 0.17,
        "Coverage",
        "Daily shifts",
        "#CFF7BC",
        2,
      );
      drawFloatingCard(
        w * 0.5,
        h * 0.94,
        "Outcome",
        "Team onboarded ✓",
        "#A6E6EC",
        4,
      );

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
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="retail-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
              What Is Retail & Supermarket Recruitment?
            </p>

            <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
              {[
                "Reliable",
                "store",
                "teams",
                "for",
                "daily",
                "retail",
                "operations",
              ].map((word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="retail-what-word inline-block">{word}</span>
                </span>
              ))}
            </h2>

            <p className="retail-what-reveal mt-6 max-w-xl text-base leading-7 text-black/75">
              Retail and supermarket recruitment means sourcing, screening and
              coordinating reliable workers for checkout counters, shelves,
              stockrooms, customer service, warehouse support, delivery and
              store management.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map(({ icon: Icon, ...item }) => (
                <article
                  key={item.title}
                  className="retail-what-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={22} strokeWidth={2.4} />
                  </div>

                  <h3 className="text-lg font-bold tracking-[-0.03em] text-black">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-black/70">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>

            {/* <div className="retail-what-reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
              >
                Hire Retail Staff
                <ArrowRight size={16} />
              </a>

              <a
                href="/industries/retail-supermarkets"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black"
              >
                View retail roles
              </a>
            </div> */}
          </div>

          <div className="retail-what-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:h-[680px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        {/* <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="retail-what-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        <div className="retail-what-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((item, index) => (
              <div
                key={item}
                className="rounded-[24px] border border-black/10 bg-white/55 p-4"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#CFF7BC] text-sm font-bold text-black">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p className="text-sm font-bold leading-5 text-black">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FFE994]">
                <ShoppingCart size={24} strokeWidth={2.4} />
              </div>

              <p className="max-w-2xl text-sm leading-6 text-black/70">
                This recruitment support is designed for retailers that need
                reliable people for daily operations, customer service and store
                performance.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Start Hiring
              <BadgeCheck size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsRetailSupermarketRecruitment;
