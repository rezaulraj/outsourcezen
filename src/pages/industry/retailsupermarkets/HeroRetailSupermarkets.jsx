import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  ShoppingCart,
  ShieldCheck,
  Store,
  UsersRound,
} from "lucide-react";

const stats = [
  { value: "1500+", label: "Retail Professionals" },
  { value: "200+", label: "Stores Supported" },
  { value: "25+", label: "Countries Covered" },
];

const HeroRetailSupermarkets = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".retail-word", {
        y: 70,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".retail-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".retail-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
        duration: 1,
        delay: 0.75,
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

    const drawBackground = () => {
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#FFF9E6");
      bg.addColorStop(0.6, "#F6EEDB");
      bg.addColorStop(1, "#DCCFB0");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

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

    const drawFloor = () => {
      const y = h * 0.78;

      ctx.fillStyle = "#D7C8A8";
      ctx.fillRect(0, y, w, h - y);

      ctx.strokeStyle = "rgba(0,0,0,0.13)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();

      for (let i = 0; i <= 9; i++) {
        const x = (i / 9) * w;
        ctx.beginPath();
        ctx.moveTo(w / 2 + (x - w / 2) * 0.12, y);
        ctx.lineTo(x, h);
        ctx.strokeStyle = "rgba(0,0,0,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = 1; i <= 7; i++) {
        const yy = y + (h - y) * Math.pow(i / 7, 1.55);
        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.lineTo(w, yy);
        ctx.strokeStyle = "rgba(0,0,0,0.07)";
        ctx.stroke();
      }
    };

    const drawShelf = (x, y, s, rows = 4, cols = 5) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-120, -150, 240, 172, 16);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let r = 0; r < rows; r++) {
        const yy = -118 + r * 38;

        ctx.beginPath();
        ctx.moveTo(-108, yy + 24);
        ctx.lineTo(108, yy + 24);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.stroke();

        for (let c = 0; c < cols; c++) {
          const px = -88 + c * 44;
          const bounce = Math.sin(time * 1.2 + r + c) * 1.5;

          rr(px - 13, yy - 2 + bounce, 26, 27, 5);
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

      rr(-115, -48, 230, 62, 14);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

      rr(-80, -105, 80, 58, 10);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-40, -47);
      ctx.lineTo(-40, -30);
      ctx.moveTo(-65, -30);
      ctx.lineTo(-15, -30);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(35, -86, 56, 36, 9);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      const scanX = 64 + Math.sin(time * 7) * 22;
      ctx.beginPath();
      ctx.moveTo(scanX, -98);
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

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(-38 + i * 20, -32);
        ctx.lineTo(-28 + i * 16, 8);
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

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

    const drawBarcodeCard = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4) * 7);

      rr(-112, -60, 224, 120, 28);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("RETAIL HIRING LIVE", 0, -32);

      for (let i = 0; i < 16; i++) {
        const xBar = -72 + i * 9;
        const height = 22 + ((i * 7) % 20);
        ctx.beginPath();
        ctx.moveTo(xBar, 2 - height / 2);
        ctx.lineTo(xBar, 2 + height / 2);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = i % 3 === 0 ? 4 : 2;
        ctx.stroke();
      }

      const scanX = -82 + ((time * 85) % 164);
      ctx.beginPath();
      ctx.moveTo(scanX, -18);
      ctx.lineTo(scanX, 26);
      ctx.strokeStyle = "rgba(103,217,70,0.85)";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.font = "800 12px Arimo";
      ctx.fillText("Cashiers · Stockers · Supervisors", 0, 46);

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

    const drawRolePanel = () => {
      const roles = [
        "Cashiers",
        "Sales Assistants",
        "Shelf Stackers",
        "Store Supervisors",
      ];
      const active = Math.floor(time * 1.1) % roles.length;

      ctx.save();
      ctx.translate(w * 0.75, h * 0.32 + Math.sin(time * 1.2) * 5);

      rr(-118, -92, 236, 184, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 16px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("WE HIRE", 0, -62);

      roles.forEach((role, index) => {
        const y = -26 + index * 34;

        ctx.beginPath();
        ctx.arc(-76, y - 4, 11, 0, Math.PI * 2);
        ctx.fillStyle = index === active ? "#67D946" : "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (index === active) {
          ctx.save();
          ctx.translate(-76, y - 4);
          ctx.scale(0.45, 0.45);
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(-8, 0);
          ctx.lineTo(-3, 6);
          ctx.lineTo(10, -9);
          ctx.stroke();
          ctx.restore();
        }

        ctx.fillStyle = "#111";
        ctx.font = "800 12px Arimo";
        ctx.textAlign = "left";
        ctx.fillText(role, -54, y);
      });

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawBackground();
      drawFloor();

      const s = Math.min(w, h) / 770;

      drawShelf(w * 0.22, h * 0.58, s * 0.9);
      drawShelf(w * 0.82, h * 0.58, s * 0.75);
      drawCheckout(w * 0.5, h * 0.73, s * 0.95);

      drawPerson(w * 0.42, h * 0.82, s * 0.9, "#2E6A3F", "scan", false, 0);
      drawPerson(w * 0.68, h * 0.82, s * 0.82, "#386B8A", "stock", true, 1.4);

      drawTrolley(w * 0.1 + ((time * 42) % (w * 0.72)), h * 0.9, s * 0.85);

      drawBarcodeCard(w * 0.5, h * 0.19);
      drawRolePanel();

      drawFloatingCard(
        w * 0.23,
        h * 0.28,
        "Quick Hiring",
        "48h shortlist",
        "#FFE994",
        0,
      );
      drawFloatingCard(
        w * 0.25,
        h * 0.76,
        "Store Teams",
        "Ready staff",
        "#CFF7BC",
        2,
      );
      drawFloatingCard(
        w * 0.5,
        h * 0.94,
        "Support",
        "24/7 coverage",
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
      className="font-arimo overflow-hidden bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="retail-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#FFF9E6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <ShoppingCart size={14} strokeWidth={2.2} />
              Retail & Supermarket Recruitment
            </span>

            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.04em] text-black sm:text-[3.7rem] lg:text-[4.35rem]">
              {["Right", "people."].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2"
                >
                  <span className="retail-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative inline-block overflow-visible">
                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="retail-word inline-block text-[#1f7a2e]">
                    Stronger stores.
                  </span>
                </span>

                <svg
                  className="retail-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
                  viewBox="0 0 320 24"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M2 17C58 6 130 4 188 10C228 14 268 18 318 9"
                    stroke="#1f7a2e"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="retail-reveal mt-7 max-w-xl text-base leading-7 text-black/75">
              We help retailers and supermarkets build reliable store teams for
              checkout, shelves, customer service, warehouse support, delivery
              and daily store operations.
            </p>

            <div className="retail-reveal mt-7 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                [UsersRound, "Skilled staff"],
                [Clock3, "Quick hiring"],
                [ShieldCheck, "Trusted support"],
              ].map(([Icon, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-black/10 bg-[#FFF9E6] px-4 py-3 text-sm font-bold text-black"
                >
                  <Icon size={18} className="mb-2" />
                  {label}
                </div>
              ))}
            </div>

            <div className="retail-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Hire Retail Staff
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="#retails-roles"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                Explore Roles
              </a>
            </div>

            {/* <div className="retail-reveal mt-9 grid max-w-xl gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-black/10 bg-[#FFF9E6] p-4"
                >
                  <p className="text-2xl font-normal tracking-[-0.05em] text-black">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-black/45">
                    {item.label}
                  </p>
                </div>
              ))}
            </div> */}
          </div>

          <div className="retail-reveal relative h-[500px] w-full overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[620px] lg:h-[720px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRetailSupermarkets;
