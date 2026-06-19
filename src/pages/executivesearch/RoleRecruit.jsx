import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BriefcaseBusiness,
  Building2,
  Crown,
  Factory,
  Hotel,
  ShieldCheck,
  UserRoundCheck,
  Wrench,
} from "lucide-react";

const roles = [
  {
    title: "General Managers",
    text: "Senior leaders for daily operations, team performance and business growth.",
    icon: Crown,
    color: "#FFE994",
  },
  {
    title: "Operations Managers",
    text: "Experienced managers who improve workflow, quality and delivery.",
    icon: Building2,
    color: "#CFF7BC",
  },
  {
    title: "HR & Recruitment Heads",
    text: "People leaders for hiring, workforce planning and compliance.",
    icon: UserRoundCheck,
    color: "#A6E6EC",
  },
  {
    title: "Project Managers",
    text: "Reliable project leaders for deadlines, teams and client coordination.",
    icon: BriefcaseBusiness,
    color: "#FFF6C8",
  },
  {
    title: "Factory Supervisors",
    text: "Production-focused supervisors for manufacturing and industrial sites.",
    icon: Factory,
    color: "#FFE994",
  },
  {
    title: "Hospitality Managers",
    text: "Hotel, restaurant and facility leaders with strong service standards.",
    icon: Hotel,
    color: "#CFF7BC",
  },
  {
    title: "Safety & Compliance Leads",
    text: "Leaders who manage workplace safety, rules and documentation.",
    icon: ShieldCheck,
    color: "#A6E6EC",
  },
  {
    title: "Technical Specialists",
    text: "Skilled specialists for maintenance, engineering and trade operations.",
    icon: Wrench,
    color: "#FFF6C8",
  },
];

const RoleRecruit = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".role-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".role-reveal", {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".role-card", {
        y: 50,
        opacity: 0,
        rotateX: 18,
        duration: 0.85,
        stagger: 0.07,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".role-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center",
        duration: 1,
        delay: 0.6,
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

    const drawCrown = (x, y, scale, rot, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + i) * 7);
      ctx.rotate(rot + Math.sin(time + i) * 0.15);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-18, 10);
      ctx.lineTo(-12, -8);
      ctx.lineTo(-3, 5);
      ctx.lineTo(5, -12);
      ctx.lineTo(14, 5);
      ctx.lineTo(20, -8);
      ctx.lineTo(16, 10);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    };

    const drawCircleMark = (x, y, r, color, i) => {
      ctx.beginPath();
      ctx.arc(x, y + Math.sin(time * 1.7 + i) * 5, r, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.015;

      drawCrown(w * 0.12, h * 0.22, 0.75, 0.25, 1);
      drawCrown(w * 0.88, h * 0.24, 0.65, -0.2, 2);
      drawCrown(w * 0.18, h * 0.82, 0.62, -0.3, 3);
      drawCrown(w * 0.82, h * 0.78, 0.58, 0.2, 4);

      drawCircleMark(w * 0.5, h * 0.1, 14, "#F4C542", 5);
      drawCircleMark(w * 0.07, h * 0.52, 10, "#67D946", 6);
      drawCircleMark(w * 0.92, h * 0.55, 10, "#A6E6EC", 7);
      drawCircleMark(w * 0.5, h * 0.93, 12, "#111", 8);

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
      className="font-arimo relative overflow-hidden bg-[#111] py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[#FFF9E6]" />

      <div
        className="absolute inset-x-0 top-0 h-[55%] bg-[#FFE994]"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 78%, 86% 66%, 72% 78%, 58% 66%, 44% 78%, 30% 66%, 15% 78%, 0 66%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-[48%] bg-[#CFF7BC]" />

      <div className="pointer-events-none absolute inset-0 z-10">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="role-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Roles We Recruit
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Leadership", "and", "specialist", "talent"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="role-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="role-line mx-auto mt-3 h-5 w-[330px] max-w-full"
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
            We help employers find proven managers, supervisors and specialists
            for high-impact business roles.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role, index) => (
            <RoleCard key={role.title} role={role} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const RoleCard = ({ role, index }) => {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const hoverRef = useRef(false);
  const Icon = role.icon;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame;
    let time = 0;
    let hover = 0;

    const w = 74;
    const h = 74;
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
      const r = 27;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.13)";
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        r,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 + time * 0.45 + Math.PI * 2 * (0.42 + hover * 0.48),
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
        Math.PI / 2 - Math.PI * 2 * (0.35 + Math.sin(time) * 0.15),
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
      scale: 1.02,
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
      className="role-card group relative min-h-[285px] overflow-hidden rounded-[30px] border border-black/15 bg-[var(--color-primary-bg)] p-5"
    >
      <div
        className="absolute -right-3 top-8 h-[calc(100%-60px)] w-5 rounded-r-2xl"
        style={{ backgroundColor: role.color }}
      />

      <div className="relative z-10">
        <div className="relative mb-5 flex h-[74px] w-[74px] items-center justify-center">
          <canvas ref={canvasRef} className="absolute inset-0" />
          <Icon
            size={24}
            strokeWidth={2.4}
            className="relative z-10 text-black"
          />
        </div>

        <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
          {role.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-black/70">{role.text}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {["Confidential", "Experienced", "Verified"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#FFE994] px-3 py-1 text-xs font-semibold text-black"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default RoleRecruit;
