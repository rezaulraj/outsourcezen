import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const solutions = [
  {
    title: "Global Talent Sourcing",
    text: "We find suitable overseas candidates from trusted local channels and verified recruitment networks.",
    tag: "Source",
    color: "#FFE994",
    path: "/solutions/global-talent-sourcing",
  },
  {
    title: "Candidate Screening",
    text: "We check experience, documents, role fit and communication before sharing shortlisted workers.",
    tag: "Screen",
    color: "#CFF7BC",
    path: "/solutions/candidate-screening",
  },
  {
    title: "Trade Testing",
    text: "Skill-based testing helps employers select workers who can perform the job from day one.",
    tag: "Test",
    color: "#A6E6EC",
    path: "/solutions/trade-testing",
  },
  {
    title: "Visa Documentation",
    text: "We coordinate paperwork, visa files, contracts and deployment documents for smoother hiring.",
    tag: "Docs",
    color: "#FFF6C8",
    path: "/solutions/visa-documentation",
  },
  {
    title: "Pre-Departure Training",
    text: "Selected workers receive orientation on workplace rules, safety, culture and employer expectations.",
    tag: "Train",
    color: "#FFE994",
    path: "/solutions/pre-departure-training",
  },
  {
    title: "Relocation & Onboarding",
    text: "We support arrival coordination, onboarding communication and post-placement follow-up.",
    tag: "Deploy",
    color: "#CFF7BC",
    path: "/solutions/relocation-onboarding",
  },
];

const Solutions = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".solution-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".solution-reveal", {
        y: 38,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".solution-card", {
        y: 55,
        opacity: 0,
        rotateX: 16,
        duration: 0.9,
        stagger: 0.09,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".solution-line", {
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

    const drawPlane = (x, y, rot, scale, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + i) * 8);
      ctx.rotate(rot + Math.sin(time + i) * 0.16);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(20, -8);
      ctx.lineTo(8, 3);
      ctx.lineTo(20, 12);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-3, 3);
      ctx.lineTo(-13, 14);
      ctx.moveTo(-4, -1);
      ctx.lineTo(-13, -13);
      ctx.stroke();

      ctx.restore();
    };

    const drawTriangleMark = (x, y, size, color, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.7 + i) * 6);
      ctx.rotate(time * 0.12 + i);

      ctx.beginPath();
      for (let p = 0; p < 3; p++) {
        const angle = -Math.PI / 2 + (Math.PI * 2 * p) / 3;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        if (p === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawPlane(w * 0.12, h * 0.22, 0.25, 0.9, 1);
      drawPlane(w * 0.88, h * 0.25, Math.PI - 0.2, 0.8, 2);
      drawPlane(w * 0.17, h * 0.82, -0.3, 0.75, 3);
      drawPlane(w * 0.82, h * 0.8, Math.PI + 0.25, 0.75, 4);

      drawTriangleMark(w * 0.5, h * 0.16, 18, "#F4C542", 5);
      drawTriangleMark(w * 0.08, h * 0.52, 14, "#67D946", 6);
      drawTriangleMark(w * 0.92, h * 0.55, 14, "#A6E6EC", 7);
      drawTriangleMark(w * 0.48, h * 0.93, 16, "#111", 8);

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
      <div className="pointer-events-none absolute inset-0">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="solution-reveal mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Overseas Recruitment Solutions
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["End-to-end", "hiring", "support"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="solution-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="solution-line mx-auto mt-3 h-5 w-[320px] max-w-full"
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
            From sourcing to screening, documentation and deployment — every
            stage is managed for employers who need reliable overseas workers.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((item, index) => (
            <SolutionCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame;
    let time = 0;
    let hover = 0;

    const w = 84;
    const h = 84;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const drawIcon = () => {
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (index === 0) {
        ctx.beginPath();
        ctx.arc(-5, -5, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(3, 3);
        ctx.lineTo(15, 15);
        ctx.stroke();
      }

      if (index === 1) {
        ctx.beginPath();
        ctx.arc(0, -9, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 14, 16, Math.PI, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(18, -10);
        ctx.lineTo(24, -4);
        ctx.lineTo(35, -18);
        ctx.stroke();
      }

      if (index === 2) {
        ctx.beginPath();
        ctx.moveTo(-18, 10);
        ctx.lineTo(18, -10);
        ctx.moveTo(18, -10);
        ctx.lineTo(10, -12);
        ctx.moveTo(18, -10);
        ctx.lineTo(15, -2);
        ctx.stroke();
      }

      if (index === 3) {
        ctx.beginPath();
        ctx.roundRect(-14, -18, 28, 36, 4);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-7, -6);
        ctx.lineTo(7, -6);
        ctx.moveTo(-7, 3);
        ctx.lineTo(7, 3);
        ctx.moveTo(-7, 12);
        ctx.lineTo(2, 12);
        ctx.stroke();
      }

      if (index === 4) {
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-11, 0);
        ctx.lineTo(11, 0);
        ctx.moveTo(0, -11);
        ctx.lineTo(0, 11);
        ctx.stroke();
      }

      if (index === 5) {
        ctx.beginPath();
        ctx.moveTo(-17, -3);
        ctx.lineTo(-3, 11);
        ctx.lineTo(17, -13);
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.018;
      hover += ((hoverRef.current ? 1 : 0) - hover) * 0.08;

      const cx = w / 2;
      const cy = h / 2;

      ctx.save();
      ctx.translate(cx, cy);

      const size = 34;

      const points = [];
      for (let i = 0; i < 3; i++) {
        const angle = -Math.PI / 2 + time * 0.35 + (Math.PI * 2 * i) / 3;
        points.push([Math.cos(angle) * size, Math.sin(angle) * size]);
      }

      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      ctx.lineTo(points[1][0], points[1][1]);
      ctx.lineTo(points[2][0], points[2][1]);
      ctx.closePath();
      ctx.strokeStyle = "rgba(0,0,0,0.14)";
      ctx.lineWidth = 7;
      ctx.lineJoin = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);

      const progress = 1.2 + hover * 1.8;
      for (let side = 0; side < 3; side++) {
        if (progress <= side) break;

        const start = points[side];
        const end = points[(side + 1) % 3];
        const local = Math.min(1, progress - side);

        ctx.lineTo(
          start[0] + (end[0] - start[0]) * local,
          start[1] + (end[1] - start[1]) * local,
        );
      }

      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      ctx.scale(0.72 + hover * 0.08, 0.72 + hover * 0.08);
      drawIcon();

      ctx.restore();

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frame);
  }, [index]);

  const onEnter = () => {
    hoverRef.current = true;
    gsap.to(cardRef.current, {
      y: -12,
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
    <a
      ref={cardRef}
      href={item.path}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="solution-card group relative block"
    >
      <svg
        className="absolute -bottom-5 -right-5 h-full w-full"
        viewBox="0 0 420 430"
        preserveAspectRatio="none"
      >
        <path
          d="M36 20H360C392 20 402 45 398 82L374 380C371 410 350 422 318 415L42 368C18 364 8 340 14 310L36 20Z"
          fill={item.color}
        />
      </svg>

      <svg
        className="absolute -bottom-2 -right-2 h-full w-full"
        viewBox="0 0 420 430"
        preserveAspectRatio="none"
      >
        <path
          d="M30 18H356C388 18 402 42 396 78L370 372C366 405 345 418 315 410L40 365C18 361 8 338 14 308L30 18Z"
          fill="#F4C542"
          opacity="0.75"
        />
      </svg>

      <article className="relative min-h-[430px] overflow-hidden rounded-[30px] border border-black/15 bg-[var(--color-primary-bg)] p-6 transition-all duration-700">
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(255,204,0,0.22),transparent_62%)]" />

        <div className="relative z-10">
          <canvas ref={canvasRef} />

          <p className="mt-6 inline-flex rounded-full bg-black px-4 py-2 text-xs font-bold text-white">
            {item.tag}
          </p>

          <h3 className="mt-5 text-2xl font-bold tracking-[-0.035em] text-black">
            {item.title}
          </h3>

          <p className="mt-4 text-sm leading-6 text-black/70">{item.text}</p>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-sm font-bold text-black">Learn more</span>
            <span className="text-2xl text-black transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </article>
    </a>
  );
};

export default Solutions;
