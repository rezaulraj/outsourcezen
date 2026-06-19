import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlertTriangle,
  Clock,
  FileWarning,
  ShieldCheck,
  UsersRound,
  Workflow,
} from "lucide-react";

const challenges = [
  {
    title: "Slow candidate supply",
    text: "We build a faster sourcing pipeline for large-volume workforce needs.",
    icon: Clock,
    accent: "#FFE994",
  },
  {
    title: "Poor worker quality",
    text: "We filter candidates by skills, documents, experience and job fit.",
    icon: ShieldCheck,
    accent: "#CFF7BC",
  },
  {
    title: "Too many unqualified profiles",
    text: "You receive shortlisted workers, not random applications.",
    icon: UsersRound,
    accent: "#A6E6EC",
  },
  {
    title: "Document delays",
    text: "We coordinate paperwork and deployment preparation clearly.",
    icon: FileWarning,
    accent: "#FFF6C8",
  },
  {
    title: "Complex hiring coordination",
    text: "One managed process keeps sourcing, screening and delivery aligned.",
    icon: Workflow,
    accent: "#FFE994",
  },
  {
    title: "Project deadline pressure",
    text: "We help employers scale teams faster when time is limited.",
    icon: AlertTriangle,
    accent: "#CFF7BC",
  },
];

const Challenges = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".challenge-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".challenge-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".challenge-card", {
        y: 45,
        opacity: 0,
        rotateX: 16,
        duration: 0.85,
        stagger: 0.08,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".challenge-line", {
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

    const drawArrow = (x, y, rot, scale, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.5 + i) * 6);
      ctx.rotate(rot + Math.sin(time + i) * 0.12);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.quadraticCurveTo(-5, -9, 12, -2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(12, -2);
      ctx.lineTo(3, -10);
      ctx.moveTo(12, -2);
      ctx.lineTo(4, 7);
      ctx.stroke();

      ctx.restore();
    };

    const drawMiniWorker = (x, y, r, color) => {
      ctx.beginPath();
      ctx.arc(x, y - r * 1.1, r * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y + r * 0.7, r, Math.PI, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(2, r * 0.5);
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawArrow(w * 0.12, h * 0.18, 0.25, 0.8, 1);
      drawArrow(w * 0.88, h * 0.18, Math.PI - 0.25, 0.75, 2);
      drawArrow(w * 0.12, h * 0.82, -0.35, 0.75, 3);
      drawArrow(w * 0.88, h * 0.82, Math.PI + 0.35, 0.7, 4);

      for (let i = 0; i < 34; i++) {
        const x = ((i * 97) % 100) / 100;
        const y = ((i * 53) % 100) / 100;
        const px = x * w;
        const py = y * h + Math.sin(time * 1.6 + i) * 5;
        const active = Math.sin(time + i) > 0.35;

        drawMiniWorker(px, py, 3, active ? "#F4C542" : "rgba(0,0,0,0.28)");
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
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="challenge-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Bulk Hiring Challenges We Solve
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["We", "remove", "hiring", "friction"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="challenge-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="challenge-line mx-auto mt-3 h-5 w-[320px] max-w-full"
            viewBox="0 0 320 24"
            fill="none"
          >
            <path
              d="M12 15C70 5 125 8 160 13C215 21 260 10 308 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            From worker shortage to documentation delays, we simplify the
            problems that slow down large-scale hiring.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((item, index) => (
            <ChallengeCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ChallengeCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const hoverRef = useRef(false);
  const Icon = item.icon;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame;
    let time = 0;
    let hover = 0;

    const w = 76;
    const h = 76;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.018;
      hover += ((hoverRef.current ? 1 : 0) - hover) * 0.08;

      const cx = w / 2;
      const cy = h / 2;
      const r = 28;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        r,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 + time * 0.45 + Math.PI * 2 * (0.42 + hover * 0.5),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        17,
        Math.PI / 2,
        Math.PI / 2 - Math.PI * 2 * (0.34 + Math.sin(time) * 0.14),
        true,
      );
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.stroke();

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frame);
  }, []);

  const onEnter = () => {
    hoverRef.current = true;
    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.018,
      rotate: index % 2 === 0 ? -1 : 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    hoverRef.current = false;
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
      className="challenge-card relative min-h-[270px] overflow-hidden rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6"
    >
      <div
        className="absolute -right-3 top-8 h-[calc(100%-62px)] w-5 rounded-r-2xl"
        style={{ backgroundColor: item.accent }}
      />

      <div className="relative z-10">
        <div className="relative mb-5 flex h-[76px] w-[76px] items-center justify-center">
          <canvas ref={canvasRef} className="absolute inset-0" />
          <Icon
            size={24}
            strokeWidth={2.4}
            className="relative z-10 text-black"
          />
        </div>

        <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-black/70">{item.text}</p>
      </div>
    </article>
  );
};

export default Challenges;
