import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlertTriangle,
  Building2,
  Home,
  MapPinOff,
  MessageCircleWarning,
  PlaneLanding,
} from "lucide-react";

const challenges = [
  {
    title: "Arrival Confusion",
    text: "Workers may not know where to go after landing. We help coordinate the first arrival steps.",
    icon: PlaneLanding,
    color: "#FFE994",
  },
  {
    title: "Accommodation Issues",
    text: "We guide workers on housing rules, shared living and settlement expectations.",
    icon: Home,
    color: "#CFF7BC",
  },
  {
    title: "Workplace Uncertainty",
    text: "We support smoother workplace orientation and first-day coordination.",
    icon: Building2,
    color: "#A6E6EC",
  },
  {
    title: "Communication Gap",
    text: "We help reduce early misunderstanding between workers, employers and supervisors.",
    icon: MessageCircleWarning,
    color: "#FFF6C8",
  },
  {
    title: "Local Rule Confusion",
    text: "Workers need basic guidance on workplace conduct, timing and local expectations.",
    icon: MapPinOff,
    color: "#FFE994",
  },
  {
    title: "Early Adjustment Risk",
    text: "Post-arrival support helps workers settle faster and reduces early-stage problems.",
    icon: AlertTriangle,
    color: "#CFF7BC",
  },
];

const RelocationChallenges = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".relocation-ch-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".relocation-ch-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".relocation-ch-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.08,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".relocation-ch-line", {
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

    const workers = Array.from({ length: 42 }, (_, i) => ({
      t: Math.random(),
      lane: i % 6,
      speed: 0.0014 + Math.random() * 0.0018,
      phase: Math.random() * Math.PI * 2,
      size: 2.4 + Math.random() * 1.7,
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

    const drawQuestion = (x, y, s, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + i) * 6);
      ctx.rotate(Math.sin(time + i) * 0.12);
      ctx.scale(s, s);

      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.font = "900 42px Arimo";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("?", 0, 0);

      ctx.restore();
    };

    const drawHub = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 62, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        62,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 +
          time * 0.45 +
          Math.PI * 2 * (0.58 + Math.sin(time) * 0.2),
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

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SUPPORT", x, y - 4);
      ctx.fillText("HUB", x, y + 13);

      drawCheck(x + 42, y + 38, 0.75);
    };

    const drawHome = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(-38, -2);
      ctx.lineTo(0, -36);
      ctx.lineTo(38, -2);
      ctx.stroke();

      rr(-29, -2, 58, 54, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.stroke();

      rr(-9, 17, 18, 35, 5);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawCompany = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      rr(-48, -72, 96, 144, 14);
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(-34, -54, 68, 108, 9);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
          rr(-22 + col * 22, -38 + row * 21, 10, 10, 3);
          ctx.fillStyle = `rgba(244,197,66,${
            0.35 + 0.3 * Math.sin(time * 2 + row + col)
          })`;
          ctx.fill();
        }
      }

      rr(-13, 28, 26, 44, 6);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.restore();
    };

    const flow = (x1, y1, x2, y2, color) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 45, x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 48;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const hubX = w * 0.5;
      const hubY = h * 0.5;

      drawQuestion(w * 0.16, h * 0.24, 0.9, 1);
      drawQuestion(w * 0.2, h * 0.72, 0.7, 2);

      drawHome(w * 0.78, h * 0.32, Math.min(w, h) / 720);
      drawCompany(w * 0.84, h * 0.67, Math.min(w, h) / 650);

      flow(w * 0.2, h * 0.3, hubX - 70, hubY - 14, "rgba(0,0,0,0.13)");
      flow(w * 0.2, h * 0.7, hubX - 70, hubY + 14, "rgba(0,0,0,0.13)");
      flow(hubX + 70, hubY - 16, w * 0.74, h * 0.32, "#F4C542");
      flow(hubX + 70, hubY + 18, w * 0.78, h * 0.67, "#67D946");

      workers.forEach((p, i) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        const fromLeft = i % 2 === 0;
        const x1 = fromLeft ? w * 0.12 : hubX + 75;
        const x2 = fromLeft ? hubX - 80 : w * 0.82;

        const x = x1 + (x2 - x1) * p.t;
        const y =
          h * (0.23 + p.lane * 0.095) +
          Math.sin(p.t * Math.PI) * -30 +
          Math.sin(time * 2 + p.phase) * 3;

        const solved = !fromLeft || p.t > 0.75;
        drawWorker(x, y, p.size, solved ? "#67D946" : "rgba(0,0,0,0.42)");
      });

      drawHub(hubX, hubY);

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
        <div className="relocation-ch-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Relocation Challenges We Solve
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Less", "confusion,", "smoother", "arrival"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="relocation-ch-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="relocation-ch-line mx-auto mt-3 h-5 w-[360px] max-w-full"
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
            We help reduce early arrival problems by guiding workers from
            landing to accommodation, workplace orientation and employer
            coordination.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.3fr_0.85fr]">
          <div className="space-y-5">
            {challenges.slice(0, 3).map((item, index) => (
              <ChallengeCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <div className="hidden h-[520px] lg:block" />

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
      className="relocation-ch-card relative overflow-hidden rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
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

export default RelocationChallenges;
