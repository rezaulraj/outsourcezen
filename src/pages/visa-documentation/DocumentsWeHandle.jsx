import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  FileCheck,
  HeartPulse,
  IdCard,
  Plane,
  ShieldCheck,
  Stamp,
  TicketCheck,
} from "lucide-react";

const documents = [
  {
    title: "Passport Copy",
    text: "Validity, identity details and basic candidate information.",
    icon: IdCard,
    color: "#FFE994",
  },
  {
    title: "Employment Contract",
    text: "Job offer, salary, position and employer agreement files.",
    icon: FileCheck,
    color: "#CFF7BC",
  },
  {
    title: "Medical Report",
    text: "Health fitness document required for workforce deployment.",
    icon: HeartPulse,
    color: "#A6E6EC",
  },
  {
    title: "Police Clearance",
    text: "Clearance support for safer and more compliant recruitment.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
  {
    title: "Visa Application File",
    text: "Organized documents prepared for visa processing.",
    icon: Stamp,
    color: "#FFE994",
  },
  {
    title: "Work Permit Support",
    text: "Role, employer and country-specific permit documents.",
    icon: BadgeCheck,
    color: "#CFF7BC",
  },
  {
    title: "Ticket & Travel Docs",
    text: "Travel documents, ticket coordination and arrival readiness.",
    icon: TicketCheck,
    color: "#A6E6EC",
  },
  {
    title: "Deployment Checklist",
    text: "Final file review before workers are ready to mobilize.",
    icon: Plane,
    color: "#FFF6C8",
  },
];

const DocumentsWeHandle = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".docs-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".docs-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".docs-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.07,
        delay: 0.42,
        ease: "power3.out",
      });

      gsap.from(".docs-line", {
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

    let w;
    let h;
    let frame;
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

    const withShadow = (blur, color, fn) => {
      ctx.save();
      ctx.shadowBlur = blur;
      ctx.shadowColor = color;
      ctx.shadowOffsetY = blur * 0.32;
      fn();
      ctx.restore();
    };

    const drawCheck = (x, y, s, color = "#16241c") => {
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

    const drawDocumentNode = (x, y, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.15 + i) * 4.5);
      ctx.rotate(Math.sin(time * 0.8 + i) * 0.04);

      withShadow(12, "rgba(20,20,10,0.2)", () => {
        rr(-26, -34, 52, 68, 10);
        const g = ctx.createLinearGradient(-26, -34, 26, 34);
        g.addColorStop(0, "#ffffff");
        g.addColorStop(1, "#fbf1d8");
        ctx.fillStyle = g;
        ctx.fill();
      });

      rr(-26, -34, 52, 68, 10);
      ctx.strokeStyle = "rgba(22,36,28,0.7)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(10, -34);
      ctx.lineTo(26, -18);
      ctx.lineTo(10, -18);
      ctx.closePath();
      const foldG = ctx.createLinearGradient(10, -34, 26, -18);
      foldG.addColorStop(0, "#ffe994");
      foldG.addColorStop(1, "#e7b53a");
      ctx.fillStyle = foldG;
      ctx.fill();
      ctx.strokeStyle = "rgba(22,36,28,0.55)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let n = 0; n < 3; n++) {
        rr(-14, -10 + n * 13, 28 - n * 5, 5, 3);
        ctx.fillStyle = "rgba(22,36,28,0.13)";
        ctx.fill();
      }

      drawCheck(15, 15, 0.5);

      ctx.restore();
    };

    const drawHub = (cx, cy) => {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, 50 + i * 25, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(22,36,28,${0.08 - i * 0.015})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, 62, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(22,36,28,0.1)";
      ctx.lineWidth = 9;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        62,
        -Math.PI / 2 + time * 0.38,
        -Math.PI / 2 +
          time * 0.38 +
          Math.PI * 2 * (0.58 + Math.sin(time * 0.7) * 0.18),
      );
      const outerArc = ctx.createLinearGradient(
        cx - 62,
        cy - 62,
        cx + 62,
        cy + 62,
      );
      outerArc.addColorStop(0, "#ffe994");
      outerArc.addColorStop(1, "#e7b53a");
      ctx.strokeStyle = outerArc;
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        42,
        Math.PI / 2 - time * 0.46,
        Math.PI / 2 - time * 0.46 - Math.PI * 2 * 0.55,
        true,
      );
      const innerArc = ctx.createLinearGradient(
        cx - 42,
        cy - 42,
        cx + 42,
        cy + 42,
      );
      innerArc.addColorStop(0, "#7fe05b");
      innerArc.addColorStop(1, "#4fb52f");
      ctx.strokeStyle = innerArc;
      ctx.lineWidth = 6.5;
      ctx.lineCap = "round";
      ctx.stroke();

      withShadow(26, "rgba(20,20,10,0.24)", () => {
        rr(cx - 34, cy - 42, 68, 84, 13);
        const cardG = ctx.createLinearGradient(
          cx - 34,
          cy - 42,
          cx + 34,
          cy + 42,
        );
        cardG.addColorStop(0, "#fffdf5");
        cardG.addColorStop(1, "#fbf0d2");
        ctx.fillStyle = cardG;
        ctx.fill();
      });

      rr(cx - 34, cy - 42, 68, 84, 13);
      ctx.strokeStyle = "rgba(22,36,28,0.85)";
      ctx.lineWidth = 2.4;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 12, cy - 42);
      ctx.lineTo(cx + 34, cy - 20);
      ctx.lineTo(cx + 12, cy - 20);
      ctx.closePath();
      const fold2 = ctx.createLinearGradient(
        cx + 12,
        cy - 42,
        cx + 34,
        cy - 20,
      );
      fold2.addColorStop(0, "#ffe994");
      fold2.addColorStop(1, "#e7b53a");
      ctx.fillStyle = fold2;
      ctx.fill();
      ctx.strokeStyle = "rgba(22,36,28,0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();

      drawCheck(cx + 14, cy + 14, 0.72);

      ctx.fillStyle = "#16241c";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("READY FILE", cx, cy + 76);
    };

    const drawMovingDot = (x1, y1, x2, y2, i) => {
      const p = (time * 0.14 + i * 0.1) % 1;
      const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const x = x1 + (x2 - x1) * ease;
      const y = y1 + (y2 - y1) * ease;

      const glowAlpha = 0.5 * Math.sin(p * Math.PI) + 0.15;
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fillStyle =
        i % 2
          ? `rgba(79,181,47,${glowAlpha})`
          : `rgba(231,181,58,${glowAlpha})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 ? "#4fb52f" : "#e7b53a";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.012;

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.34;

      nodes.forEach((node, i) => {
        const x = cx + Math.cos(node.angle) * radius;
        const y =
          cy +
          Math.sin(node.angle) * radius * 0.75 +
          Math.sin(time * 1.1 + node.phase) * 4.5;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(22,36,28,0.09)";
        ctx.lineWidth = 1.8;
        ctx.setLineDash([6, 9]);
        ctx.lineDashOffset = -time * 32;
        ctx.stroke();
        ctx.setLineDash([]);

        drawMovingDot(x, y, cx, cy, i);
        drawDocumentNode(x, y, i);
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
        <div className="docs-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Documents We Handle
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Every", "file", "prepared", "with", "care"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="docs-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="docs-line mx-auto mt-3 h-5 w-[330px] max-w-full"
            viewBox="0 0 330 24"
            fill="none"
          >
            <path
              d="M12 15C70 5 130 8 165 13C225 21 275 10 318 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We help organize the essential documents needed for visa processing,
            employment approval and workforce deployment.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.1fr_0.85fr]">
          <div className="space-y-5">
            {documents.slice(0, 4).map((item, index) => (
              <DocumentCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <div className="docs-reveal relative h-[420px] sm:h-[520px] lg:h-[620px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="space-y-5">
            {documents.slice(4).map((item, index) => (
              <DocumentCard key={item.title} item={item} index={index + 4} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DocumentCard = ({ item, index }) => {
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
      className="docs-card rounded-[26px] border border-black/10 bg-[#FFF9E6] p-5"
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

export default DocumentsWeHandle;
