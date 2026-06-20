import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BriefcaseBusiness,
  HardHat,
  Languages,
  Plane,
  Home,
  ShieldCheck,
  MessageSquareText,
  AlertTriangle,
} from "lucide-react";

const lessons = [
  {
    title: "Job Expectations",
    text: "Workers learn daily duties, work discipline, reporting rules and employer expectations.",
    icon: BriefcaseBusiness,
    color: "#FFE994",
  },
  {
    title: "Workplace Safety",
    text: "They understand basic PPE use, site safety, hazard awareness and safe behavior at work.",
    icon: HardHat,
    color: "#CFF7BC",
  },
  {
    title: "Communication Basics",
    text: "They practice simple workplace communication, asking questions and following instructions.",
    icon: MessageSquareText,
    color: "#A6E6EC",
  },
  {
    title: "Culture & Behavior",
    text: "Workers learn workplace manners, punctuality, respect and cultural adjustment before travel.",
    icon: Languages,
    color: "#FFF6C8",
  },
  {
    title: "Accommodation Rules",
    text: "They understand shared living, cleanliness, house rules and responsible daily routines.",
    icon: Home,
    color: "#FFE994",
  },
  {
    title: "Travel Guidance",
    text: "They learn airport steps, documents to carry, arrival process and basic travel awareness.",
    icon: Plane,
    color: "#CFF7BC",
  },
  {
    title: "Emergency Awareness",
    text: "Workers are guided on emergency contacts, safety response and what to do if problems arise.",
    icon: AlertTriangle,
    color: "#A6E6EC",
  },
  {
    title: "Worker Responsibility",
    text: "They learn contract responsibility, company rules, attendance and professional conduct.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
];

const WhatWorkersLearn = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".learn-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".learn-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".learn-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.07,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".learn-line", {
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

    const nodes = Array.from({ length: 8 }, (_, i) => ({
      angle: -Math.PI / 2 + (Math.PI * 2 * i) / 8,
      phase: i * 0.65,
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

    const drawLessonNode = (x, y, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + i) * 5);
      ctx.rotate(Math.sin(time + i) * 0.05);

      ctx.beginPath();
      ctx.arc(0, 0, 27, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        0,
        0,
        34,
        -Math.PI / 2 + time * 0.42,
        -Math.PI / 2 +
          time * 0.42 +
          Math.PI * 2 * (0.45 + Math.sin(time + i) * 0.16),
      );
      ctx.strokeStyle = i % 2 === 0 ? "#F4C542" : "#67D946";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.stroke();

      drawCheck(0, 1, 0.75);

      ctx.restore();
    };

    const drawWorker = (x, y, r, color) => {
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

    const drawHub = (cx, cy) => {
      rr(cx - 62, cy - 44, 124, 88, 22);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("WORKER", cx, cy - 10);
      ctx.fillText("READY", cx, cy + 12);

      ctx.beginPath();
      ctx.arc(cx, cy, 70, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.11)";
      ctx.lineWidth = 9;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        70,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 + time * 0.45 + Math.PI * 2 * (0.6 + Math.sin(time) * 0.2),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.stroke();

      drawCheck(cx + 70, cy - 42, 0.75);
    };

    const drawMovingDot = (x1, y1, x2, y2, i) => {
      const p = (time * 0.16 + i * 0.1) % 1;
      const x = x1 + (x2 - x1) * p;
      const y = y1 + (y2 - y1) * p;

      drawWorker(x, y, 2.9, i % 2 ? "#67D946" : "#F4C542");
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.33;

      nodes.forEach((node, i) => {
        const x = cx + Math.cos(node.angle) * radius;
        const y =
          cy +
          Math.sin(node.angle) * radius * 0.75 +
          Math.sin(time * 1.3 + node.phase) * 5;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = "rgba(0,0,0,0.10)";
        ctx.lineWidth = 2;
        ctx.setLineDash([7, 10]);
        ctx.lineDashOffset = -time * 38;
        ctx.stroke();
        ctx.setLineDash([]);

        drawMovingDot(x, y, cx, cy, i);
        drawLessonNode(x, y, i);
      });

      drawHub(cx, cy);

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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="learn-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            What Workers Learn
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Practical", "training", "for", "real", "workplaces"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="learn-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <svg
            className="learn-line mx-auto mt-3 h-5 w-[360px] max-w-full"
            viewBox="0 0 360 24"
            fill="none"
          >
            <path
              d="M12 15C80 5 145 8 180 13C245 21 300 10 348 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Each lesson is designed to help workers understand the workplace,
            avoid confusion and arrive prepared for their new role.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.1fr_0.85fr]">
          <div className="space-y-5">
            {lessons.slice(0, 4).map((item, index) => (
              <LessonCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <div className="learn-reveal relative h-[420px] sm:h-[520px] lg:h-[620px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="space-y-5">
            {lessons.slice(4).map((item, index) => (
              <LessonCard key={item.title} item={item} index={index + 4} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const LessonCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const Icon = item.icon;

  const onEnter = () => {
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.018,
      rotate: index % 2 === 0 ? -1 : 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="learn-card rounded-[26px] border border-black/10 bg-[#FFF9E6] p-5"
    >
      <div className="flex gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: item.color }}
        >
          <Icon size={22} strokeWidth={2.4} />
        </div>

        <div>
          <h3 className="text-base font-bold tracking-[-0.02em] text-black">
            {item.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-black/70">{item.text}</p>
        </div>
      </div>
    </article>
  );
};

export default WhatWorkersLearn;
