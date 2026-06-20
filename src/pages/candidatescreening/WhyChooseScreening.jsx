import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  Clock3,
  FileSearch,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";

const benefits = [
  {
    title: "Better candidate quality",
    text: "Only stronger, verified profiles move forward to your interview stage.",
    icon: BadgeCheck,
    value: "95%",
    label: "Screening Accuracy",
    color: "#FFE994",
  },
  {
    title: "Less interview workload",
    text: "Your HR team avoids weak applicants and focuses on suitable candidates.",
    icon: UsersRound,
    value: "72hr",
    label: "Initial Shortlist",
    color: "#CFF7BC",
  },
  {
    title: "Reduced hiring risk",
    text: "Skills, documents and role fit are reviewed before employer evaluation.",
    icon: ShieldCheck,
    value: "10K+",
    label: "Candidates Checked",
    color: "#A6E6EC",
  },
  {
    title: "Clear decision support",
    text: "Each shortlist is organized with notes, scores and recommendation logic.",
    icon: Target,
    value: "15+",
    label: "Industries Served",
    color: "#FFF6C8",
  },
];

const WhyChooseScreening = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-screen-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".why-screen-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".why-screen-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.09,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".why-screen-line", {
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

    const particles = Array.from({ length: 42 }, (_, i) => ({
      angle: (Math.PI * 2 * i) / 42,
      radius: 0.23 + (i % 4) * 0.045,
      speed: 0.12 + (i % 5) * 0.018,
      size: 2.5 + (i % 3) * 0.9,
      phase: i * 0.45,
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

    const drawHub = (cx, cy) => {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, 50 + i * 28, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,0,0,${0.1 - i * 0.018})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, 62, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.13)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        62,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 +
          time * 0.45 +
          Math.PI * 2 * (0.62 + Math.sin(time) * 0.2),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        40,
        Math.PI / 2 - time * 0.55,
        Math.PI / 2 - time * 0.55 - Math.PI * 2 * 0.55,
        true,
      );
      ctx.strokeStyle = "#67D946";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 34, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      drawCheck(cx, cy + 1, 1.1);

      ctx.fillStyle = "#111";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("TRUSTED", cx, cy + 66);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const cx = w / 2;
      const cy = h / 2;

      particles.forEach((p, i) => {
        const r = Math.min(w, h) * p.radius;
        const angle = p.angle + time * p.speed;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r * 0.72;

        const approved = Math.sin(time + p.phase) > -0.1;
        drawProfile(x, y, p.size, approved ? "#F4C542" : "rgba(0,0,0,0.35)");

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(0,0,0,0.06)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
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
        <div className="why-screen-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Why Employers Choose Our Screening
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Reliable", "shortlists,", "less", "hiring", "risk"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="why-screen-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <svg
            className="why-screen-line mx-auto mt-3 h-5 w-[360px] max-w-full"
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
            Our screening process helps employers save time, reduce unsuitable
            interviews and make confident hiring decisions.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr_0.9fr]">
          <div className="space-y-6">
            {benefits.slice(0, 2).map((item, index) => (
              <BenefitCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <div className="why-screen-reveal relative h-[390px] sm:h-[480px] lg:h-[560px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="space-y-6">
            {benefits.slice(2).map((item, index) => (
              <BenefitCard key={item.title} item={item} index={index + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BenefitCard = ({ item, index }) => {
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
      className="why-screen-card relative overflow-hidden rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6"
    >
      <div
        className="absolute -right-3 top-8 h-[calc(100%-64px)] w-5 rounded-r-2xl"
        style={{ backgroundColor: item.color }}
      />

      <div className="relative z-10">
        <div
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-black/10"
          style={{ backgroundColor: item.color }}
        >
          <Icon size={24} strokeWidth={2.4} />
        </div>

        <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-black/70">{item.text}</p>

        <div className="mt-6 border-t border-black/10 pt-5">
          <p className="text-4xl font-normal tracking-[-0.05em] text-black">
            {item.value}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-black/50">
            {item.label}
          </p>
        </div>
      </div>
    </article>
  );
};

export default WhyChooseScreening;
