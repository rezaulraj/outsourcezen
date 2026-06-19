import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const resources = [
  {
    title: "How to Build a Reliable Overseas Workforce Pipeline",
    category: "Hiring Guide",
    date: "Jan 12, 2026",
    link: "/resources/overseas-workforce-pipeline",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=550&fit=crop",
    text: "A simple guide for employers planning bulk recruitment with less risk.",
    color: "#FFE994",
  },
  {
    title: "What Employers Should Check Before Hiring Workers",
    category: "Screening",
    date: "Jan 08, 2026",
    link: "/resources/worker-screening-checklist",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=550&fit=crop",
    text: "Key checks for documents, skills, experience and deployment readiness.",
    color: "#CFF7BC",
  },
  {
    title: "Best Industries for International Workforce Recruitment",
    category: "Industries",
    date: "Jan 02, 2026",
    link: "/resources/international-workforce-industries",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=550&fit=crop",
    text: "Explore sectors where verified global workers can create strong value.",
    color: "#A6E6EC",
  },
];

const AnimatedBookButton = () => {
  const canvasRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame;
    let time = 0;
    let hover = 0;

    const w = 320;
    const h = 140;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const lerp = (a, b, t) => a + (b - a) * t;

    const drawArrow = (x, y, angle, scale = 1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.quadraticCurveTo(-8, -10, 8, -4);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(8, -4);
      ctx.lineTo(0, -13);
      ctx.moveTo(8, -4);
      ctx.lineTo(0, 6);
      ctx.stroke();

      ctx.restore();
    };

    const drawDot = (x, y, r) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      time += 0.02;
      hover += ((hoverRef.current ? 1 : 0) - hover) * 0.09;

      const clickPulse = hoverRef.current
        ? 1 + Math.sin(time * 12) * 0.08
        : 1 + Math.sin(time * 2) * 0.03;

      const arrows = [
        {
          from: [50, 35, 0.15],
          to: [110, 55, 0.45],
        },
        {
          from: [270, 35, Math.PI - 0.15],
          to: [210, 55, Math.PI - 0.45],
        },
        {
          from: [70, 105, -0.45],
          to: [112, 85, -0.15],
        },
        {
          from: [250, 105, Math.PI + 0.45],
          to: [208, 85, Math.PI + 0.15],
        },
      ];

      arrows.forEach((item, i) => {
        const wave = Math.sin(time * 2 + i) * (1 - hover) * 6;
        const x = lerp(item.from[0], item.to[0], hover);
        const y = lerp(item.from[1], item.to[1], hover) + wave;
        const angle = lerp(item.from[2], item.to[2], hover);

        drawArrow(x, y, angle, clickPulse);
      });

      const dots = [
        {
          from: [42, 78],
          to: [120, 70],
        },
        {
          from: [118, 18],
          to: [145, 48],
        },
        {
          from: [278, 78],
          to: [200, 70],
        },
        {
          from: [180, 118],
          to: [170, 92],
        },
      ];

      dots.forEach((item, i) => {
        const x = lerp(item.from[0], item.to[0], hover);
        const y =
          lerp(item.from[1], item.to[1], hover) +
          Math.sin(time * 2.5 + i) * (1 - hover) * 4;

        drawDot(x, y, 4 + hover * 1.5);
      });

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      className="relative mx-auto mt-12 flex h-[140px] w-[320px] items-center justify-center overflow-visible"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
      />

      <a
        href="/resources"
        className="group relative z-10 inline-flex overflow-hidden rounded-full bg-black px-7 py-3 text-sm font-bold text-white transition-all duration-500 hover:scale-110 active:scale-95"
      >
        <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-700 ease-out group-hover:w-full" />
        <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
          View all resources
        </span>
      </a>
    </div>
  );
};

const Resources = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".resource-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".resource-reveal", {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".resource-card", {
        y: 55,
        opacity: 0,
        rotateX: 18,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".resource-line", {
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

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative overflow-hidden bg-[#CFEFC4] pb-24 pt-32 lg:pb-32 lg:pt-40"
    >
      {/* top 50% curve */}
      <div
        className="absolute left-0 top-0 h-[160px] w-full bg-[var(--color-primary-bg)]"
        style={{
          clipPath: "ellipse(78% 55% at 50% 0%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="resource-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Latest Resources
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Hiring", "Insights", "for", "Employers"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="resource-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="resource-line mx-auto mt-3 h-5 w-[320px] max-w-full"
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
            Practical recruitment guides, employer checklists and workforce
            insights to help you hire better.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {resources.map((item) => (
            <ResourceCard key={item.title} item={item} />
          ))}
        </div>

        <div className="resource-reveal mt-12 flex justify-center">
          <AnimatedBookButton />
        </div>
      </div>
    </section>
  );
};

const ResourceCard = ({ item }) => {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame;
    let time = 0;
    let hover = 0;

    const w = 70;
    const h = 70;
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

      ctx.beginPath();
      ctx.arc(cx, cy, 27, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.14)";
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        27,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 + time * 0.45 + Math.PI * 2 * (0.45 + hover * 0.48),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1 + hover * 0.12, 1 + hover * 0.12);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.roundRect(-13, -12, 26, 24, 5);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-7, -4);
      ctx.lineTo(7, -4);
      ctx.moveTo(-7, 3);
      ctx.lineTo(4, 3);
      ctx.stroke();

      ctx.restore();

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frame);
  }, []);

  const onEnter = () => {
    hoverRef.current = true;
    gsap.to(cardRef.current, {
      y: -12,
      scale: 1.02,
      rotate: -1,
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
      href={item.link}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="resource-card group relative block"
    >
      <svg
        className="absolute -bottom-5 -right-5 h-full w-full"
        viewBox="0 0 420 470"
        preserveAspectRatio="none"
      >
        <path
          d="M36 20H360C392 20 402 45 398 82L374 420C371 450 350 462 318 455L42 408C18 404 8 380 14 350L36 20Z"
          fill={item.color}
        />
      </svg>

      <svg
        className="absolute -bottom-2 -right-2 h-full w-full"
        viewBox="0 0 420 470"
        preserveAspectRatio="none"
      >
        <path
          d="M30 18H356C388 18 402 42 396 78L370 412C366 445 345 458 315 450L40 405C18 401 8 378 14 348L30 18Z"
          fill="#F4C542"
          opacity="0.75"
        />
      </svg>

      <article className="relative min-h-[470px] overflow-hidden rounded-[30px] border border-black/15 bg-[var(--color-primary-bg)] p-5 transition-all duration-700">
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(255,204,0,0.22),transparent_62%)]" />

        <div className="relative z-10">
          <div className="relative h-56 overflow-hidden rounded-3xl border border-black/10">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute right-4 top-4 rounded-full bg-[#FFF9E6] p-2">
              <canvas ref={canvasRef} />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-4">
              <p className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                {item.category}
              </p>

              <span className="text-xs font-medium text-black/55">
                {item.date}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold leading-tight tracking-[-0.035em] text-black">
              {item.title}
            </h3>

            <p className="mt-4 text-sm leading-6 text-black/70">{item.text}</p>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm font-bold text-black">Read article</span>
              <span className="text-2xl text-black transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
};

export default Resources;
