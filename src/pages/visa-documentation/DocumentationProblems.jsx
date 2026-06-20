import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlertTriangle,
  CalendarX,
  FileWarning,
  FolderX,
  ShieldAlert,
  Stamp,
} from "lucide-react";

const problems = [
  {
    title: "Missing Documents",
    text: "We identify missing papers early and prepare a clear file checklist.",
    icon: FolderX,
    color: "#FFE994",
  },
  {
    title: "Incorrect Information",
    text: "Candidate details, passport data and contract information are reviewed.",
    icon: FileWarning,
    color: "#CFF7BC",
  },
  {
    title: "Expired Passport",
    text: "We help flag passport validity issues before visa processing starts.",
    icon: CalendarX,
    color: "#A6E6EC",
  },
  {
    title: "Visa File Delays",
    text: "Organized file preparation helps reduce unnecessary processing delays.",
    icon: Stamp,
    color: "#FFF6C8",
  },
  {
    title: "Compliance Risk",
    text: "We support cleaner documentation for safer workforce deployment.",
    icon: ShieldAlert,
    color: "#FFE994",
  },
  {
    title: "Unclear File Status",
    text: "Employers get better visibility on what is ready, pending or missing.",
    icon: AlertTriangle,
    color: "#CFF7BC",
  },
];

const DocumentationProblems = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".doc-problem-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".doc-problem-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".doc-problem-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
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

    const drawDoc = (x, y, scale, fixed, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + i) * 5);
      ctx.rotate(Math.sin(time + i) * 0.05);
      ctx.scale(scale, scale);

      rr(-36, -48, 72, 96, 12);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = fixed ? "#111" : "rgba(0,0,0,0.25)";
      ctx.lineWidth = fixed ? 2.5 : 1.8;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(14, -48);
      ctx.lineTo(36, -26);
      ctx.lineTo(14, -26);
      ctx.closePath();
      ctx.fillStyle = fixed ? "#CFF7BC" : "#FFF6C8";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      for (let n = 0; n < 4; n++) {
        rr(-20, -20 + n * 15, 40 - n * 5, 6, 4);
        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.fill();
      }

      if (fixed) drawCheck(20, 18, 0.6);
      else drawCross(20, 18, 0.55);

      ctx.restore();
    };

    const drawHub = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 60, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.13)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        60,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 +
          time * 0.45 +
          Math.PI * 2 * (0.56 + Math.sin(time) * 0.22),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 38, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      drawCheck(x, y + 2, 1.1);

      ctx.fillStyle = "#111";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SOLVED", x, y + 74);
    };

    const drawFlow = (x1, y1, x2, y2, color) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 45, x2, y2);
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

      const cx = w / 2;
      const cy = h / 2;
      const s = Math.min(w, h) / 650;

      const leftDocs = [
        [w * 0.18, h * 0.28],
        [w * 0.18, h * 0.5],
        [w * 0.18, h * 0.72],
      ];

      const rightDocs = [
        [w * 0.82, h * 0.28],
        [w * 0.82, h * 0.5],
        [w * 0.82, h * 0.72],
      ];

      leftDocs.forEach(([x, y], i) => {
        drawDoc(x, y, s, false, i);
        drawFlow(x + 45, y, cx - 70, cy + (i - 1) * 26, "rgba(0,0,0,0.12)");
      });

      drawHub(cx, cy);

      rightDocs.forEach(([x, y], i) => {
        drawFlow(cx + 70, cy + (i - 1) * 26, x - 45, y, "#F4C542");
        drawDoc(x, y, s, true, i + 3);
      });

      for (let i = 0; i < 16; i++) {
        const p = (time * 0.16 + i / 16) % 1;
        const x = cx - 80 + 160 * p;
        const y = cy + Math.sin(p * Math.PI * 2 + i) * 42;

        ctx.beginPath();
        ctx.arc(x, y, 3.8, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 ? "#67D946" : "#F4C542";
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
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <canvas ref={canvasRef} className="h-full w-full opacity-70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="doc-problem-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Common Documentation Problems We Solve
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Turn", "file", "problems", "into", "ready", "documents"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="doc-problem-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We help reduce paperwork confusion by identifying missing, incorrect
            or delayed documents before deployment.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.3fr_0.85fr]">
          <div className="space-y-5">
            {problems.slice(0, 3).map((item, index) => (
              <ProblemCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <div className="hidden h-[520px] lg:block" />

          <div className="space-y-5">
            {problems.slice(3).map((item, index) => (
              <ProblemCard key={item.title} item={item} index={index + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProblemCard = ({ item, index }) => {
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
      className="doc-problem-card relative overflow-hidden rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
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

export default DocumentationProblems;
