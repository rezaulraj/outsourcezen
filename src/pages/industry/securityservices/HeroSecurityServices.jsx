import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  ClipboardCheck,
  Eye,
  Fingerprint,
  Globe2,
  LockKeyhole,
  Radio,
  ShieldCheck,
  Siren,
  UsersRound,
} from "lucide-react";

const stats = [
  { value: "3200+", label: "Security Staff" },
  { value: "180+", label: "Sites Protected" },
  { value: "25+", label: "Countries Supported" },
];

const HeroSecurityServices = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".security-word", {
        y: 70,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".security-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".security-line", {
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
      bg.addColorStop(0.5, "#F1E7D0");
      bg.addColorStop(1, "#D3C3A6");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const floorY = h * 0.8;
      ctx.fillStyle = "#B7A98F";
      ctx.fillRect(0, floorY, w, h - floorY);

      ctx.strokeStyle = "rgba(0,0,0,0.14)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(w, floorY);
      ctx.stroke();

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

      for (let i = 0; i < 35; i++) {
        const x = ((i * 89) % w) + Math.sin(time + i) * 8;
        const y = ((i * 47) % h) + Math.cos(time * 1.1 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.25)";
        ctx.fill();
      }
    };

    const drawBuilding = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-135, -260, 270, 280, 22);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      rr(-55, -65, 110, 85, 14);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          rr(-100 + c * 55, -220 + r * 42, 28, 24, 5);
          ctx.fillStyle =
            Math.sin(time * 2 + r + c) > 0.2 ? "#A6E6EC" : "#FFE994";
          ctx.fill();
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }
      }

      rr(-120, -285, 240, 34, 12);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.fillStyle = "#FFF9E6";
      ctx.font = "900 16px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SECURE SITE", 0, -262);

      ctx.restore();
    };

    const drawGate = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-145, -88, 290, 90, 18);
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(-130, -72, 260, 58, 14);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      const barX = -110 + ((time * 65) % 220);
      ctx.beginPath();
      ctx.moveTo(barX, -72);
      ctx.lineTo(barX, -14);
      ctx.strokeStyle = "rgba(103,217,70,0.65)";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ACCESS CONTROL", 0, -38);

      rr(-166, -120, 42, 122, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-145, -82, 12 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.restore();
    };

    const drawCctv = (x, y, s, angle = 0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.sin(time * 1.2) * 0.06);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(-42, 0);
      ctx.lineTo(-18, 18);
      ctx.stroke();

      rr(-15, 0, 70, 34, 8);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(47, 17, 11, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(56, 17);
      ctx.lineTo(130, 0);
      ctx.lineTo(130, 34);
      ctx.closePath();
      ctx.fillStyle = "rgba(103,217,70,0.12)";
      ctx.fill();

      ctx.restore();
    };

    const drawScreenGrid = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.2) * 4);
      ctx.scale(s, s);

      rr(-145, -112, 290, 198, 22);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.strokeStyle = "#CFF7BC";
      ctx.lineWidth = 2;
      ctx.stroke();

      const labels = ["Gate", "Lobby", "Parking", "Warehouse"];

      for (let i = 0; i < 4; i++) {
        const xx = -126 + (i % 2) * 132;
        const yy = -92 + Math.floor(i / 2) * 88;

        rr(xx, yy, 118, 72, 10);
        ctx.fillStyle = "#1E2B2A";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(xx + 14, yy + 45 + Math.sin(time * 2 + i) * 8);
        ctx.lineTo(xx + 42, yy + 30);
        ctx.lineTo(xx + 72, yy + 46);
        ctx.lineTo(xx + 103, yy + 25);
        ctx.strokeStyle = "#67D946";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#CFF7BC";
        ctx.font = "800 9px Arimo";
        ctx.fillText(labels[i], xx + 18, yy + 16);

        ctx.beginPath();
        ctx.arc(
          xx + 100,
          yy + 14,
          5 + Math.sin(time * 5 + i) * 1.5,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = i === 1 ? "#FFE994" : "#67D946";
        ctx.fill();
      }

      ctx.fillStyle = "#CFF7BC";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("LIVE CCTV MONITORING", 0, 68);

      ctx.restore();
    };

    const drawGuard = (x, y, s, flip = false, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.3 + phase) * 2);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(s, s);

      const t = time + phase;

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-9, 0);
      ctx.lineTo(-15, 32);
      ctx.moveTo(9, 0);
      ctx.lineTo(15, 32);
      ctx.stroke();

      rr(-21, -50, 42, 54, 9);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      rr(-15, -42, 30, 38, 7);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -38);
      ctx.lineTo(-39, -18 + Math.sin(t * 3) * 3);
      ctx.moveTo(18, -38);
      ctx.lineTo(42, -28 + Math.sin(t * 2.6) * 4);
      ctx.strokeStyle = "#1C1810";
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-39, -18 + Math.sin(t * 3) * 3, 5, 0, Math.PI * 2);
      ctx.arc(42, -28 + Math.sin(t * 2.6) * 4, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.save();
      ctx.translate(52, -30 + Math.sin(t * 2.6) * 4);
      ctx.rotate(-0.12);
      rr(-8, -12, 22, 28, 5);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(3, 2, 5 + Math.sin(time * 5) * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(0, -50);
      ctx.lineTo(0, -58);
      ctx.strokeStyle = "#E7B58B";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -72, 15, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rr(-19, -90, 38, 13, 5);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -80);
      ctx.quadraticCurveTo(0, -102, 18, -80);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-5, -71, 2, 0, Math.PI * 2);
      ctx.arc(5, -71, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -64, 4, 0.1, Math.PI - 0.1);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawPatrolCar = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.2) * 2);
      ctx.scale(s, s);

      rr(-70, -38, 140, 48, 14);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-35, -68, 72, 34, 10);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -78, 8 + Math.sin(time * 8) * 2, 0, Math.PI * 2);
      ctx.fillStyle = Math.sin(time * 8) > 0 ? "#67D946" : "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      [-42, 42].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(wx, 14, 11, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      });

      ctx.restore();
    };

    const drawFlowPanel = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.35) * 5);

      rr(-132, -64, 264, 128, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SECURITY HIRING FLOW", 0, -36);

      const steps = ["Source", "Verify", "Train", "Deploy"];

      steps.forEach((step, i) => {
        const px = -78 + i * 52;
        const active = i <= Math.floor((time * 0.7) % steps.length);

        ctx.beginPath();
        ctx.arc(px, 8, 17, 0, Math.PI * 2);
        ctx.fillStyle = active ? "#67D946" : "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        if (active) drawCheck(px, 8, 0.45);

        ctx.fillStyle = "#111";
        ctx.font = "800 9px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(step, px, 40);

        if (i < steps.length - 1) {
          ctx.beginPath();
          ctx.moveTo(px + 22, 8);
          ctx.lineTo(px + 32, 8);
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      ctx.restore();
    };

    const drawAlertPanel = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4) * 6);

      rr(-104, -70, 208, 140, 28);
      ctx.fillStyle = "#111";
      ctx.fill();
      ctx.strokeStyle = "#CFF7BC";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = "#CFF7BC";
      ctx.font = "900 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("LIVE SITE STATUS", 0, -42);

      const items = ["Gate secure", "CCTV online", "Patrol active"];

      items.forEach((item, i) => {
        const yy = -10 + i * 30;

        ctx.beginPath();
        ctx.arc(-58, yy, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();

        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.font = "800 11px Arimo";
        ctx.textAlign = "left";
        ctx.fillText(item, -42, yy + 4);
      });

      ctx.restore();
    };

    const drawFloatingCard = (x, y, title, value, color, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.45 + phase) * 6);

      rr(-92, -32, 184, 64, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-60, 0, 17, 0, Math.PI * 2);
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

      const s = Math.min(w, h) / 800;

      drawBuilding(w * 0.52, h * 0.72, s * 0.85);
      drawGate(w * 0.52, h * 0.81, s * 0.95);

      drawScreenGrid(w * 0.24, h * 0.38, s * 0.78);
      drawAlertPanel(w * 0.78, h * 0.35);

      drawCctv(w * 0.14, h * 0.2, s * 0.72, 0.1);
      drawCctv(w * 0.84, h * 0.2, s * 0.7, Math.PI - 0.1);

      drawGuard(w * 0.34, h * 0.88, s * 0.78, false, 0);
      drawGuard(w * 0.7, h * 0.88, s * 0.72, true, 1.2);

      drawPatrolCar(w * 0.13 + ((time * 30) % (w * 0.72)), h * 0.93, s * 0.72);

      drawFlowPanel(w * 0.5, h * 0.15);

      drawFloatingCard(
        w * 0.22,
        h * 0.67,
        "Access",
        "Controlled",
        "#FFE994",
        0,
      );
      drawFloatingCard(w * 0.78, h * 0.67, "Patrol", "Active", "#CFF7BC", 2);
      drawFloatingCard(
        w * 0.5,
        h * 0.97,
        "Outcome",
        "Site secured ✓",
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
            <span className="security-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#FFF9E6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <ShieldCheck size={14} strokeWidth={2.2} />
              Security Services Recruitment
            </span>

            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.04em] text-black sm:text-[3.7rem] lg:text-[4.35rem]">
              {["Reliable", "security"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2"
                >
                  <span className="security-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              {["workforce"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2"
                >
                  <span className="security-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative inline-block overflow-visible">
                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="security-word inline-block text-[#1f7a2e]">
                    for every site.
                  </span>
                </span>

                <svg
                  className="security-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="security-reveal mt-7 max-w-xl text-base leading-7 text-black/75">
              We connect employers with trained security guards, CCTV operators,
              patrol officers, access control staff, event security, loss
              prevention teams and site-ready supervisors.
            </p>

            <div className="security-reveal mt-7 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                [UsersRound, "Trained guards"],
                [Camera, "CCTV coverage"],
                [Globe2, "Multi-site support"],
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

            <div className="security-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Request Security Staff
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="/industries/security-services"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                Explore roles
              </a>
            </div>

            <div className="security-reveal mt-9 grid max-w-xl gap-3 sm:grid-cols-3">
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
            </div>
          </div>

          <div className="security-reveal relative h-[500px] w-full overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[620px] lg:h-[720px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSecurityServices;
