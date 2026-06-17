import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const resources = [
  {
    title: "How Workforce Planning Helps Employers Hire Faster",
    category: "Recruitment Strategy",
    date: "January 12, 2026",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop",
    color: "#FF6B4A",
  },
  {
    title: "Building Reliable Overseas Teams for Long-Term Growth",
    category: "Overseas Hiring",
    date: "December 28, 2025",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&h=600&fit=crop",
    color: "#10B8C4",
  },
];

const ResourcesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".resource-word", {
        y: 55,
        opacity: 0,
        rotateX: 65,
        duration: 0.9,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".resource-reveal", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.14,
        delay: 0.25,
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
      className="font-arimo relative bg-[#faeec8] py-20 lg:py-28"
    >
      <div className="absolute left-0 top-0 h-24 w-full bg-[#FBD6D2] [clip-path:ellipse(75%_45%_at_60%_0%)]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl">
            {["See", "what’s", "new", "and", "what’s", "next."].map(
              (word, index) => (
                <span key={index} className="inline-block overflow-hidden px-1">
                  <span className="resource-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <svg
            className="resource-line mx-auto mt-2 h-5 w-[300px] max-w-full"
            viewBox="0 0 300 24"
            fill="none"
          >
            <path
              d="M10 14C55 5 100 10 148 13C206 17 248 12 290 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="resource-reveal mt-2 text-sm text-black/75">
            Recruitment insights, workforce guides and hiring strategies to help
            your business grow faster.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {resources.map((item, index) => (
            <ResourceCard key={index} item={item} />
          ))}
        </div>

        <div className="resource-reveal">
          <AnimatedBookButton />
        </div>
      </div>
    </section>
  );
};

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
        href="/news"
        className="group relative z-10 inline-flex overflow-hidden rounded-full bg-black px-7 py-3 text-sm font-bold text-white transition-all duration-500 hover:scale-110 active:scale-95"
      >
        <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-700 ease-out group-hover:w-full" />
        <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
          Check out our resources
        </span>
      </a>
    </div>
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

    const w = 86;
    const h = 86;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.02;
      hover += ((hoverRef.current ? 1 : 0) - hover) * 0.08;

      const cx = w / 2;
      const cy = h / 2;
      const r = 30;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        r + 7,
        -Math.PI / 2 + time,
        -Math.PI / 2 + time + Math.PI * 2 * (0.35 + hover * 0.55),
      );
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.fillStyle = "#000";
      ctx.font = "700 8px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("HIRING", cx, cy - 3);
      ctx.fillText("INSIGHT", cx, cy + 8);

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frame);
  }, [item.color]);

  const handleEnter = () => {
    hoverRef.current = true;
    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.015,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    hoverRef.current = false;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="resource-reveal overflow-hidden rounded-xl bg-[var(--color-primary-bg)] p-4"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={item.img}
          alt={item.title}
          className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105"
        />

        <div className="absolute right-4 top-4">
          <canvas ref={canvasRef} />
        </div>
      </div>

      <div className="pt-5">
        <p className="text-[11px] font-medium uppercase tracking-wide text-black/70">
          {item.date}
        </p>

        <p className="mt-1 text-[11px] font-medium text-black/60">
          Industry: {item.category}
        </p>

        <h3 className="mt-3 text-xl font-medium leading-7 tracking-[-0.025em] text-black">
          {item.title}
        </h3>
      </div>
    </article>
  );
};

export default ResourcesSection;
