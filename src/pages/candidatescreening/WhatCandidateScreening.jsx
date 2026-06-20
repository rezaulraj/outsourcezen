import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  FileSearch,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

const points = [
  {
    icon: FileSearch,
    title: "Profile review",
    text: "We review CVs, documents, experience and role requirements before shortlisting.",
  },
  {
    icon: ShieldCheck,
    title: "Risk reduction",
    text: "Screening helps reduce fake documents, skill mismatch and unsuitable candidates.",
  },
  {
    icon: UserRoundCheck,
    title: "Better interviews",
    text: "Your team spends time only on candidates who match the job requirement.",
  },
  {
    icon: BadgeCheck,
    title: "Qualified shortlist",
    text: "You receive verified profiles with stronger job fit and hiring readiness.",
  },
];

const WhatCandidateScreening = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".what-screen-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".what-screen-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".what-screen-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.09,
        delay: 0.42,
        ease: "power3.out",
      });

      gsap.from(".what-screen-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
        duration: 1,
        delay: 0.55,
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

    const candidates = Array.from({ length: 42 }, (_, i) => ({
      t: Math.random(),
      lane: i % 5,
      speed: 0.0014 + Math.random() * 0.0018,
      size: 2.4 + Math.random() * 1.5,
      score: 55 + ((i * 17) % 45),
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

    const drawProfile = (x, y, r, color) => {
      ctx.beginPath();
      ctx.arc(x, y - r * 1.15, r * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y + r * 0.75, r, Math.PI, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(2, r * 0.55);
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const drawFunnel = (x, y, width, height) => {
      ctx.save();
      ctx.translate(x, y);

      ctx.beginPath();
      ctx.moveTo(-width / 2, -height / 2);
      ctx.lineTo(width / 2, -height / 2);
      ctx.lineTo(width * 0.18, height * 0.05);
      ctx.lineTo(width * 0.18, height / 2);
      ctx.lineTo(-width * 0.18, height / 2);
      ctx.lineTo(-width * 0.18, height * 0.05);
      ctx.closePath();

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      const scanY = -height / 2 + ((time * 70) % height);

      const gradient = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      gradient.addColorStop(0, "rgba(244,197,66,0)");
      gradient.addColorStop(0.5, "rgba(244,197,66,0.35)");
      gradient.addColorStop(1, "rgba(244,197,66,0)");

      roundedRect(-width / 2 + 10, scanY - 18, width - 20, 36, 18);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore();
    };

    const drawApprovedCard = (x, y, score) => {
      roundedRect(x - 60, y - 38, 120, 76, 18);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x - 34, y - 10, 12, 0, Math.PI * 2);
      ctx.fillStyle = "#F4C542";
      ctx.fill();

      roundedRect(x - 12, y - 18, 42, 7, 4);
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fill();

      roundedRect(x - 12, y - 5, 30, 6, 4);
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fill();

      roundedRect(x - 42, y + 20, 84, 7, 4);
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fill();

      roundedRect(x - 42, y + 20, 84 * (score / 100), 7, 4);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.fillStyle = "#111";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "right";
      ctx.fillText(score, x + 42, y - 8);
    };

    const drawHub = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 46, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 9;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        46,
        -Math.PI / 2 + time * 0.4,
        -Math.PI / 2 + time * 0.4 + Math.PI * 2 * (0.55 + Math.sin(time) * 0.2),
      );
      ctx.strokeStyle = "#67D946";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x - 10, y);
      ctx.lineTo(x - 3, y + 8);
      ctx.lineTo(x + 12, y - 11);
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const funnelX = w * 0.43;
      const funnelY = h * 0.48;
      const funnelW = Math.min(w * 0.42, 260);
      const funnelH = Math.min(h * 0.56, 340);

      drawFunnel(funnelX, funnelY, funnelW, funnelH);

      candidates.forEach((c, i) => {
        c.t += c.speed;
        if (c.t > 1) c.t = 0;

        const startX = w * 0.08;
        const endX = funnelX - funnelW * 0.28;
        const x = startX + (endX - startX) * c.t;
        const y =
          h * (0.25 + c.lane * 0.12) +
          Math.sin(c.t * Math.PI) * -30 +
          Math.sin(time * 2 + i) * 3;

        drawProfile(
          x,
          y,
          c.size,
          c.score >= 80 ? "#F4C542" : "rgba(0,0,0,0.4)",
        );
      });

      const hubX = w * 0.77;
      const hubY = h * 0.48;

      ctx.beginPath();
      ctx.moveTo(funnelX + funnelW * 0.18, funnelY + funnelH * 0.34);
      ctx.quadraticCurveTo(w * 0.62, h * 0.36, hubX - 55, hubY);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 9; i++) {
        const t = (time * 0.18 + i / 9) % 1;
        const x =
          funnelX + funnelW * 0.2 + (hubX - funnelX - funnelW * 0.45) * t;
        const y = funnelY + funnelH * 0.34 + Math.sin(t * Math.PI) * -38;

        drawProfile(x, y, 3.1, "#67D946");
      }

      drawHub(hubX, hubY);

      drawApprovedCard(w * 0.74, h * 0.2, 95);
      drawApprovedCard(w * 0.83, h * 0.73, 92);

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
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
        <div>
          <p className="what-screen-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
            What Is Candidate Screening?
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Filter", "better", "before", "you", "interview"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="what-screen-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="what-screen-line mt-3 h-5 w-[340px] max-w-full"
            viewBox="0 0 340 24"
            fill="none"
          >
            <path
              d="M12 15C75 5 135 8 170 13C230 21 285 10 328 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="what-screen-reveal mt-5 max-w-xl text-base leading-7 text-black/75">
            Candidate screening is the process of reviewing and verifying
            applicants before they reach your interview stage. We check skills,
            experience, documents and job readiness so employers receive a
            stronger shortlist.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="what-screen-card rounded-3xl border border-black/10 bg-[#FFF9E6] p-5"
              >
                <Icon size={22} className="mb-4" />
                <h3 className="text-base font-bold text-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/70">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="what-screen-reveal relative h-[390px] sm:h-[480px] lg:h-[560px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
      </div>
    </section>
  );
};

export default WhatCandidateScreening;
