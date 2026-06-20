import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlertTriangle,
  FileWarning,
  MessageCircleWarning,
  SearchX,
  Timer,
  UserX,
} from "lucide-react";

const challenges = [
  {
    title: "Too Many Applications",
    text: "We filter large applicant pools and only move suitable candidates forward.",
    icon: SearchX,
    color: "#FFE994",
  },
  {
    title: "Fake Documents",
    text: "We help check document quality, consistency and candidate authenticity.",
    icon: FileWarning,
    color: "#CFF7BC",
  },
  {
    title: "Skill Mismatch",
    text: "We compare candidate skills with your exact job requirements.",
    icon: UserX,
    color: "#A6E6EC",
  },
  {
    title: "Poor Communication",
    text: "We review basic communication, attitude and role understanding.",
    icon: MessageCircleWarning,
    color: "#FFF6C8",
  },
  {
    title: "Interview Overload",
    text: "Your team spends time only on stronger shortlisted profiles.",
    icon: AlertTriangle,
    color: "#FFE994",
  },
  {
    title: "Slow Hiring Decisions",
    text: "Clear screening results help employers decide faster with confidence.",
    icon: Timer,
    color: "#CFF7BC",
  },
];

const ScreeningChallenges = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".screen-ch-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".screen-ch-reveal", {
        y: 35,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".screen-ch-card", {
        y: 45,
        opacity: 0,
        rotateX: 16,
        duration: 0.85,
        stagger: 0.08,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".screen-ch-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center",
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

    const particles = Array.from({ length: 38 }, (_, i) => ({
      t: Math.random(),
      lane: i % 5,
      speed: 0.0018 + Math.random() * 0.002,
      size: 2.5 + Math.random() * 1.8,
      score: 45 + ((i * 19) % 55),
      phase: Math.random() * Math.PI * 2,
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
      ctx.lineWidth = Math.max(2, r * 0.5);
      ctx.lineCap = "round";
      ctx.stroke();
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
      ctx.moveTo(-9, 0);
      ctx.lineTo(-3, 7);
      ctx.lineTo(11, -10);
      ctx.stroke();
      ctx.restore();
    };

    const drawCross = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-8, -8);
      ctx.lineTo(8, 8);
      ctx.moveTo(8, -8);
      ctx.lineTo(-8, 8);
      ctx.stroke();
      ctx.restore();
    };

    const drawScannerMachine = (x, y) => {
      const width = Math.min(w * 0.34, 240);
      const height = Math.min(h * 0.42, 290);

      roundedRect(x - width / 2, y - height / 2, width, height, 28);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      roundedRect(
        x - width / 2 + 22,
        y - height / 2 + 28,
        width - 44,
        height - 56,
        22,
      );
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 2;
      ctx.stroke();

      const scanY = y - height / 2 + 40 + ((time * 80) % (height - 80));

      const gradient = ctx.createLinearGradient(x, scanY - 20, x, scanY + 20);
      gradient.addColorStop(0, "rgba(244,197,66,0)");
      gradient.addColorStop(0.5, "rgba(244,197,66,0.48)");
      gradient.addColorStop(1, "rgba(244,197,66,0)");

      roundedRect(x - width / 2 + 30, scanY - 20, width - 60, 40, 20);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x - width / 2 + 42, scanY);
      ctx.lineTo(x + width / 2 - 42, scanY);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 10]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#111";
      ctx.font = "700 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SCAN", x, y - height / 2 + 20);

      return { width, height };
    };

    const drawResultCard = (x, y, approved, label) => {
      roundedRect(x - 56, y - 34, 112, 68, 18);
      ctx.fillStyle = approved ? "#CFF7BC" : "#FFF6C8";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (approved) drawCheck(x - 28, y, 0.9);
      else drawCross(x - 28, y, 0.75);

      ctx.fillStyle = "#111";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "left";
      ctx.fillText(label, x - 4, y - 4);

      ctx.font = "500 10px Arimo";
      ctx.fillStyle = "rgba(0,0,0,0.62)";
      ctx.fillText(approved ? "SHORTLIST" : "REVIEW", x - 4, y + 12);
    };

    const drawRadar = (x, y) => {
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(x, y, 28 + i * 17, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,0,0,${0.11 - i * 0.025})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        60,
        -Math.PI / 2 + time * 0.55,
        -Math.PI / 2 + time * 0.55 + Math.PI * 2 * 0.38,
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      drawCheck(x, y + 1, 0.8);
    };

    const drawFlowLine = (x1, y1, x2, y2, color) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 40, x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const machineX = w * 0.5;
      const machineY = h * 0.5;
      const radarX = w * 0.78;
      const radarY = h * 0.5;

      const machine = drawScannerMachine(machineX, machineY);

      particles.forEach((p, i) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        const startX = w * 0.08;
        const endX = machineX - machine.width * 0.5 - 18;
        const laneY = h * (0.22 + p.lane * 0.12);

        const x = startX + (endX - startX) * p.t;
        const y =
          laneY +
          Math.sin(p.t * Math.PI) * -28 +
          Math.sin(time * 2 + p.phase) * 3;

        const approved = p.score > 78;
        drawProfile(x, y, p.size, approved ? "#F4C542" : "rgba(0,0,0,0.42)");
      });

      drawFlowLine(
        machineX + machine.width * 0.5 + 8,
        machineY,
        radarX - 68,
        radarY,
        "rgba(0,0,0,0.13)",
      );

      for (let i = 0; i < 10; i++) {
        const t = (time * 0.18 + i / 10) % 1;
        const x =
          machineX +
          machine.width * 0.5 +
          16 +
          (radarX - machineX - machine.width * 0.5 - 86) * t;
        const y = machineY + Math.sin(t * Math.PI) * -30;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 ? "#67D946" : "#F4C542";
        ctx.fill();
      }

      drawRadar(radarX, radarY);

      drawResultCard(w * 0.78, h * 0.22, true, "92%");
      drawResultCard(w * 0.82, h * 0.78, false, "64%");

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
      className="font-arimo relative overflow-hidden bg-[#FFF9E6] py-24 lg:py-32"
    >
      <div
        className="absolute left-0 top-0 h-[50%] w-full bg-[#FFE994]"
        style={{ clipPath: "ellipse(84% 65% at 50% 0%)" }}
      />

      <div
        className="absolute bottom-0 left-0 h-[50%] w-full bg-[#CFF7BC]"
        style={{ clipPath: "ellipse(84% 65% at 50% 100%)" }}
      />

      <div className="pointer-events-none absolute inset-0 z-10">
        <canvas ref={canvasRef} className="h-full w-full opacity-80" />
      </div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="screen-ch-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Screening Challenges We Solve
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Stop", "bad", "hires", "before", "interview"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="screen-ch-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="screen-ch-line mx-auto mt-3 h-5 w-[340px] max-w-full"
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

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We reduce screening workload, remove weak profiles and help
            employers focus only on qualified candidates.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.3fr_0.85fr]">
          <div className="space-y-5">
            {challenges.slice(0, 3).map((item, index) => (
              <ChallengeCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <div className="screen-ch-reveal hidden h-[520px] lg:block" />

          <div className="space-y-5">
            {challenges.slice(3).map((item, index) => (
              <ChallengeCard key={item.title} item={item} index={index + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ChallengeCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const Icon = item.icon;

  const onEnter = () => {
    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.02,
      rotate: index % 2 === 0 ? -1 : 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="screen-ch-card relative overflow-hidden rounded-[28px] border border-black/10 bg-[var(--color-primary-bg)] p-5"
    >
      <div
        className="absolute -right-3 top-7 h-[calc(100%-54px)] w-5 rounded-r-2xl"
        style={{ backgroundColor: item.color }}
      />

      <div className="relative z-10">
        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-black/10"
          style={{ backgroundColor: item.color }}
        >
          <Icon size={22} strokeWidth={2.4} />
        </div>

        <h3 className="text-lg font-bold tracking-[-0.03em] text-black">
          {item.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-black/70">{item.text}</p>
      </div>
    </article>
  );
};

export default ScreeningChallenges;
