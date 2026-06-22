import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  CalendarClock,
  Languages,
  RefreshCcw,
  Sparkles,
  Star,
  UserX,
} from "lucide-react";

const challenges = [
  {
    title: "Seasonal Staffing",
    solution: "Rapid access to hospitality talent pools.",
    icon: CalendarClock,
    color: "#FFE994",
  },
  {
    title: "High Turnover",
    solution: "Better matching and pre-screened candidates.",
    icon: RefreshCcw,
    color: "#CFF7BC",
  },
  {
    title: "Last-Minute Vacancies",
    solution: "Fast-response recruitment support.",
    icon: UserX,
    color: "#A6E6EC",
  },
  {
    title: "Guest Satisfaction",
    solution: "Guest-focused candidate selection.",
    icon: Star,
    color: "#FFF6C8",
  },
  {
    title: "Multilingual Needs",
    solution: "Language-capable hospitality professionals.",
    icon: Languages,
    color: "#FFE994",
  },
  {
    title: "Service Consistency",
    solution: "Service-oriented hiring standards.",
    icon: Sparkles,
    color: "#CFF7BC",
  },
];

const segColors = [
  "#FFE994",
  "#CFF7BC",
  "#A6E6EC",
  "#FFF6C8",
  "#FFE994",
  "#CFF7BC",
];
const segLabels = [
  "SEASONAL",
  "TURNOVER",
  "VACANCY",
  "GUEST",
  "LANGUAGE",
  "CONSISTENCY",
];

const HospitalityChallenges = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hc-word", {
        y: 60,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });
      gsap.from(".hc-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });
      gsap.from(".hc-card", {
        y: 36,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.06,
        delay: 0.4,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w,
      h,
      frame,
      time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.parentElement.offsetWidth;
      h = canvas.parentElement.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawStar5 = (cx, cy, r, fill, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = fill;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const ai = a + Math.PI / 5;
        if (i === 0) ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        else ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        ctx.lineTo(cx + r * 0.42 * Math.cos(ai), cy + r * 0.42 * Math.sin(ai));
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.012;

      const cx = w / 2;
      const cy = h / 2;
      const n = 6;
      const outerR = Math.min(w, h) * 0.42;
      const innerR = Math.min(w, h) * 0.17;
      const nodeR = Math.min(w, h) * 0.085;
      const sliceAngle = (Math.PI * 2) / n;
      const rotOffset = time * 0.18;

      // ── outer ring track ─────────────────────────────────────────────
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.07)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, outerR - nodeR - 6, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── spokes + flowing dots ─────────────────────────────────────────
      for (let i = 0; i < n; i++) {
        const angle = rotOffset + i * sliceAngle;
        const nx = cx + Math.cos(angle) * (outerR - nodeR - 2);
        const ny = cy + Math.sin(angle) * (outerR - nodeR - 2);

        ctx.beginPath();
        ctx.moveTo(
          cx + Math.cos(angle) * innerR,
          cy + Math.sin(angle) * innerR,
        );
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 9]);
        ctx.lineDashOffset = -time * 36;
        ctx.stroke();
        ctx.setLineDash([]);

        // flowing dot along spoke
        const p = (time * 0.3 + i / n) % 1;
        const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const dx =
          cx +
          Math.cos(angle) * innerR +
          (nx - cx - Math.cos(angle) * innerR) * eased;
        const dy =
          cy +
          Math.sin(angle) * innerR +
          (ny - cy - Math.sin(angle) * innerR) * eased;
        const dotAlpha = Math.sin(eased * Math.PI) * 0.85;

        ctx.save();
        ctx.globalAlpha = dotAlpha * 0.5;
        ctx.beginPath();
        ctx.arc(dx, dy, 6, 0, Math.PI * 2);
        ctx.fillStyle = segColors[i];
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fillStyle = segColors[i];
        ctx.globalAlpha = dotAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ── segment nodes ─────────────────────────────────────────────────
      for (let i = 0; i < n; i++) {
        const angle = rotOffset + i * sliceAngle;
        const nx = cx + Math.cos(angle) * (outerR - nodeR - 2);
        const ny = cy + Math.sin(angle) * (outerR - nodeR - 2);
        const pulse = 0.5 + 0.5 * Math.sin(time * 1.6 + i);

        // glow ring
        ctx.save();
        ctx.globalAlpha = 0.22 + pulse * 0.15;
        ctx.beginPath();
        ctx.arc(nx, ny, nodeR + pulse * 5, 0, Math.PI * 2);
        ctx.fillStyle = segColors[i];
        ctx.fill();
        ctx.restore();

        // node fill
        ctx.beginPath();
        ctx.arc(nx, ny, nodeR, 0, Math.PI * 2);
        const ng = ctx.createRadialGradient(
          nx,
          ny - nodeR * 0.3,
          2,
          nx,
          ny,
          nodeR,
        );
        ng.addColorStop(0, "#fffdf5");
        ng.addColorStop(1, segColors[i]);
        ctx.fillStyle = ng;
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.75)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // progress arc
        ctx.beginPath();
        ctx.arc(
          nx,
          ny,
          nodeR,
          -Math.PI / 2 + time * 0.4,
          -Math.PI / 2 + time * 0.4 + Math.PI * 2 * (0.5 + pulse * 0.3),
        );
        ctx.strokeStyle = "rgba(0,0,0,0.55)";
        ctx.lineWidth = 3.5;
        ctx.lineCap = "round";
        ctx.stroke();

        // label
        ctx.fillStyle = "#16241c";
        ctx.font = `700 ${Math.max(7, nodeR * 0.34)}px Arimo`;
        ctx.textAlign = "center";
        ctx.fillText(segLabels[i], nx, ny + 4);
      }

      // ── inner hub ─────────────────────────────────────────────────────
      // shadow
      ctx.save();
      ctx.shadowBlur = 28;
      ctx.shadowColor = "rgba(20,20,10,0.18)";
      ctx.shadowOffsetY = 8;
      ctx.beginPath();
      ctx.arc(cx, cy, innerR + 10, 0, Math.PI * 2);
      ctx.fillStyle = "#fffdf5";
      ctx.fill();
      ctx.restore();

      // rotating accent arc behind hub
      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        innerR + 10,
        -Math.PI / 2 + time * 0.3,
        -Math.PI / 2 + time * 0.3 + Math.PI * 2 * 0.7,
      );
      const arcG = ctx.createLinearGradient(
        cx - innerR,
        cy - innerR,
        cx + innerR,
        cy + innerR,
      );
      arcG.addColorStop(0, "#FFE994");
      arcG.addColorStop(1, "#67D946");
      ctx.strokeStyle = arcG;
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.stroke();

      // hub face
      ctx.beginPath();
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
      ctx.fillStyle = "#fffdf5";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.8)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 5 star rating inside hub
      const starSize = Math.max(6, innerR * 0.25);
      const starY = cy - innerR * 0.18;
      for (let s = 0; s < 5; s++) {
        const sx = cx - starSize * 2.2 * 2 + s * starSize * 2.2;
        drawStar5(sx, starY, starSize, "#e7b53a");
      }

      ctx.fillStyle = "#16241c";
      ctx.font = `800 ${Math.max(10, innerR * 0.22)}px Arimo`;
      ctx.textAlign = "center";
      ctx.fillText("GUEST", cx, cy + innerR * 0.22);
      ctx.font = `800 ${Math.max(9, innerR * 0.19)}px Arimo`;
      ctx.fillStyle = "#4fb52f";
      ctx.fillText("EXPERIENCE", cx, cy + innerR * 0.48);

      // ambient gold dust
      for (let i = 0; i < 22; i++) {
        const dx = ((i * 83) % w) + Math.sin(time * 0.9 + i) * 14;
        const dy = ((i * 61) % h) + Math.cos(time * 1.1 + i) * 12;
        const dr = 1.1 + Math.sin(time * 1.8 + i) * 0.6;
        ctx.beginPath();
        ctx.arc(dx, dy, Math.max(0.3, dr), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.3)";
        ctx.fill();
      }

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
      className="font-arimo bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="hc-reveal mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Hospitality Challenges We Solve
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Keeping", "service", "running", "smoothly"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="hc-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/65">
            Reliable staff, smooth flow and consistent guest experience — even
            during peak seasons, urgent vacancies and high-pressure operations.
          </p>
        </div>

        {/* canvas */}
        <div className="hc-reveal relative mx-auto mb-10 h-[300px] max-w-3xl overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] shadow-sm sm:h-[380px] lg:h-[440px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        {/* challenge cards — compact 2-col on md, 3-col on xl */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {challenges.map(({ title, solution, icon: Icon, color }, index) => (
            <article
              key={title}
              className="hc-card flex gap-4 rounded-[24px] border border-black/10 bg-[#FFF9E6] p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/10"
                style={{ backgroundColor: color }}
              >
                <Icon size={20} strokeWidth={2.4} />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-[-0.02em] text-black">
                    {title}
                  </h3>
                  <span className="text-xs font-bold text-black/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-black/60">
                  {solution}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalityChallenges;
