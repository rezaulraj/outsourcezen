import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Building2,
  ClipboardCheck,
  Home,
  MapPinCheck,
  MessageSquareText,
  PlaneLanding,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const supports = [
  {
    title: "Airport Arrival Support",
    text: "Workers receive guidance after landing so their first movement is clear.",
    icon: PlaneLanding,
    color: "#FFE994",
  },
  {
    title: "Accommodation Guidance",
    text: "We explain housing rules, shared living, cleanliness and daily routines.",
    icon: Home,
    color: "#CFF7BC",
  },
  {
    title: "First-Day Coordination",
    text: "We help workers understand where to report and who to meet first.",
    icon: ClipboardCheck,
    color: "#A6E6EC",
  },
  {
    title: "Workplace Orientation",
    text: "Workers are introduced to basic workplace rules and supervisor expectations.",
    icon: Building2,
    color: "#FFF6C8",
  },
  {
    title: "Communication Support",
    text: "Early follow-up helps reduce misunderstanding between employer and worker.",
    icon: MessageSquareText,
    color: "#FFE994",
  },
  {
    title: "Local Guidance",
    text: "Workers receive simple guidance on timing, transport, conduct and daily life.",
    icon: MapPinCheck,
    color: "#CFF7BC",
  },
  {
    title: "Group Settlement",
    text: "Large worker groups are guided together for smoother settlement and onboarding.",
    icon: UsersRound,
    color: "#A6E6EC",
  },
  {
    title: "Post-Placement Follow-up",
    text: "Follow-up support helps identify early adjustment issues before they grow.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
];

const OnboardingSupport = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".onboard-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".onboard-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".onboard-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.07,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".onboard-line", {
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

    const drawSupportNode = (x, y, i) => {
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

    const drawHub = (cx, cy) => {
      rr(cx - 70, cy - 46, 140, 92, 24);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ONBOARDING", cx, cy - 10);
      ctx.fillText("SUPPORT", cx, cy + 13);

      ctx.beginPath();
      ctx.arc(cx, cy, 76, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.11)";
      ctx.lineWidth = 9;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        76,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 + time * 0.45 + Math.PI * 2 * (0.6 + Math.sin(time) * 0.2),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.stroke();

      drawCheck(cx + 75, cy - 46, 0.75);
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
        drawSupportNode(x, y, i);
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
      <div
        className="absolute inset-x-0 top-0 h-full bg-[#CFF7BC]"
        style={{
          clipPath: "ellipse(82% 45% at 50% 48%)",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="onboard-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Onboarding Support We Provide
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Support", "from", "arrival", "to", "first", "workday"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="onboard-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <svg
            className="onboard-line mx-auto mt-3 h-5 w-[360px] max-w-full"
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
            We help workers settle after arrival, understand their surroundings,
            start work correctly and communicate clearly during the first stage.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.1fr_0.85fr]">
          <div className="space-y-5">
            {supports.slice(0, 4).map((item, index) => (
              <SupportCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <div className="onboard-reveal relative h-[420px] sm:h-[520px] lg:h-[620px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="space-y-5">
            {supports.slice(4).map((item, index) => (
              <SupportCard key={item.title} item={item} index={index + 4} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SupportCard = ({ item, index }) => {
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
      className="onboard-card rounded-[26px] border border-black/10 bg-[#FFF9E6] p-5"
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

export default OnboardingSupport;
