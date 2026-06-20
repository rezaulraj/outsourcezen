import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  FileCheck,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const HeroCandidateScreening = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".screen-word", {
        y: 55,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".screen-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".screen-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
        duration: 1,
        delay: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h, frame;
    let time = 0;

    const cards = Array.from({ length: 9 }, (_, i) => ({
      row: Math.floor(i / 3),
      col: i % 3,
      phase: i * 0.55,
      speed: 0.85 + (i % 4) * 0.12,
      score: [92, 78, 95, 64, 88, 81, 97, 73, 90][i],
    }));

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

    const roundedRect = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
    };

    const drawCheck = (x, y, s, color = "#111") => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);
      ctx.strokeStyle = color;
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

    const drawCross = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);
      ctx.strokeStyle = "rgba(0,0,0,0.38)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-7, -7);
      ctx.lineTo(7, 7);
      ctx.moveTo(7, -7);
      ctx.lineTo(-7, 7);
      ctx.stroke();
      ctx.restore();
    };

    const drawCandidateCard = (x, y, width, height, card, i) => {
      const approved = card.score >= 82;
      const lift = Math.sin(time * card.speed + card.phase) * 5;

      ctx.save();
      ctx.translate(x, y + lift);

      roundedRect(-width / 2, -height / 2, width, height, 16);
      ctx.fillStyle = approved ? "#FFF9E6" : "rgba(255,255,255,0.62)";
      ctx.fill();
      ctx.strokeStyle = approved ? "#111" : "rgba(0,0,0,0.12)";
      ctx.lineWidth = approved ? 2 : 1.4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-width / 2 + 24, -height / 2 + 25, 10, 0, Math.PI * 2);
      ctx.fillStyle = approved ? "#F4C542" : "rgba(0,0,0,0.18)";
      ctx.fill();

      roundedRect(-width / 2 + 43, -height / 2 + 17, width * 0.42, 7, 4);
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fill();

      roundedRect(-width / 2 + 43, -height / 2 + 31, width * 0.28, 6, 4);
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fill();

      roundedRect(-width / 2 + 16, height / 2 - 28, width - 32, 8, 5);
      ctx.fillStyle = "rgba(0,0,0,0.10)";
      ctx.fill();

      roundedRect(
        -width / 2 + 16,
        height / 2 - 28,
        (width - 32) * (card.score / 100),
        8,
        5,
      );
      ctx.fillStyle = approved ? "#67D946" : "#F4C542";
      ctx.fill();

      ctx.fillStyle = "#111";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "right";
      ctx.fillText(card.score, width / 2 - 16, -height / 2 + 31);

      if (approved) drawCheck(width / 2 - 21, height / 2 - 48, 0.8);
      else drawCross(width / 2 - 21, height / 2 - 48, 0.8);

      ctx.restore();
    };

    const drawScanner = (x, y, width, height) => {
      const scanY = y - height / 2 + ((time * 75) % height);

      ctx.save();
      ctx.globalAlpha = 0.88;

      const gradient = ctx.createLinearGradient(x, scanY - 18, x, scanY + 18);
      gradient.addColorStop(0, "rgba(244,197,66,0)");
      gradient.addColorStop(0.5, "rgba(244,197,66,0.38)");
      gradient.addColorStop(1, "rgba(244,197,66,0)");

      roundedRect(x - width / 2, scanY - 18, width, 36, 18);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x - width / 2 + 20, scanY);
      ctx.lineTo(x + width / 2 - 20, scanY);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.setLineDash([7, 9]);
      ctx.lineDashOffset = -time * 40;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();
    };

    const drawBrainHub = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 54, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        54,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 +
          time * 0.45 +
          Math.PI * 2 * (0.55 + Math.sin(time) * 0.22),
      );
      ctx.strokeStyle = "#67D946";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 36, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      drawCheck(x, y + 2, 1.25);
    };

    const drawFloatingToken = (x, y, label, color, i) => {
      const fy = y + Math.sin(time * 1.4 + i) * 8;
      ctx.save();
      ctx.translate(x, fy);
      ctx.rotate(Math.sin(time + i) * 0.12);

      roundedRect(-28, -15, 56, 30, 16);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "700 11px Arimo";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, 0, 1);

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const gridX = w * 0.42;
      const gridY = h * 0.47;
      const cardW = Math.min(128, w * 0.22);
      const cardH = Math.min(82, h * 0.14);
      const gapX = cardW * 1.08;
      const gapY = cardH * 1.15;

      cards.forEach((card, i) => {
        const x = gridX + (card.col - 1) * gapX;
        const y = gridY + (card.row - 1) * gapY;
        drawCandidateCard(x, y, cardW, cardH, card, i);
      });

      drawScanner(gridX, gridY, gapX * 2.9, gapY * 2.9);

      const hubX = w * 0.78;
      const hubY = h * 0.48;

      ctx.beginPath();
      ctx.moveTo(gridX + gapX * 1.5, gridY);
      ctx.quadraticCurveTo(w * 0.64, h * 0.38, hubX - 62, hubY);
      ctx.strokeStyle = "rgba(0,0,0,0.14)";
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      drawBrainHub(hubX, hubY);

      for (let i = 0; i < 10; i++) {
        const t = (time * 0.18 + i / 10) % 1;
        const x = gridX + gapX * 1.45 + (hubX - gridX - gapX * 1.95) * t;
        const y = gridY + Math.sin(t * Math.PI) * -35;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "#F4C542" : "#67D946";
        ctx.fill();
      }

      drawFloatingToken(w * 0.16, h * 0.17, "CV", "#FFE994", 1);
      drawFloatingToken(w * 0.82, h * 0.18, "ID", "#CFF7BC", 2);
      drawFloatingToken(w * 0.15, h * 0.83, "SKILL", "#A6E6EC", 3);
      drawFloatingToken(w * 0.83, h * 0.82, "DOC", "#FFF6C8", 4);

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
      className="font-arimo relative overflow-hidden bg-[#FFF9E6] pt-26"
    >
      <div className="relative z-10 container mx-auto rounded-xl px-4  bg-[#CFF7BC] pb-12 pt-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="screen-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <ShieldCheck size={14} strokeWidth={2.2} />
              Candidate Screening
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Screen", "smarter."].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="screen-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="screen-word inline-block">Hire</span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="screen-word inline-block text-[#1f7a2e]">
                    faster.
                  </span>
                </span>

                <svg
                  className="screen-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="screen-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              We verify skills, documents, experience and job readiness through
              a structured screening process designed to reduce hiring risk.
            </p>

            <div className="screen-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [UserCheck, "10K+ screened"],
                [BadgeCheck, "95% accuracy"],
                [FileCheck, "72hr shortlist"],
              ].map(([Icon, label]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-[#FFF9E6] px-4 py-3 text-sm font-bold text-black"
                >
                  <Icon size={18} className="mb-2" />
                  {label}
                </div>
              ))}
            </div>

            <div className="screen-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Request Candidates
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="/process"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                Learn process
              </a>
            </div>
          </div>

          <div className="screen-reveal relative h-[420px] w-full sm:h-[500px] lg:h-[590px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCandidateScreening;
