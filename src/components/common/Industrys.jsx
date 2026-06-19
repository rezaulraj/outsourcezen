import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const industries = [
  {
    title: "Construction",
    path: "/industries/construction",
    image: "https://images.pexels.com/photos/2383650/pexels-photo-2383650.jpeg",
    color: "#FFE994",
  },
  {
    title: "Manufacturing",
    path: "/industries/manufacturing",
    image:
      "https://images.pexels.com/photos/19544248/pexels-photo-19544248.jpeg",
    color: "#CFF7BC",
  },
  {
    title: "Hospitality",
    path: "/industries/hospitality",
    image: "https://images.pexels.com/photos/6816376/pexels-photo-6816376.jpeg",
    color: "#A6E6EC",
  },
  {
    title: "Healthcare",
    path: "/industries/healthcare",
    image:
      "https://images.pexels.com/photos/34605560/pexels-photo-34605560.jpeg",
    color: "#FFF6C8",
  },
  {
    title: "Agriculture & Farming",
    path: "/industries/agriculture-farming",
    image:
      "https://images.pexels.com/photos/11678442/pexels-photo-11678442.jpeg",
    color: "#CFF7BC",
  },
  {
    title: "Transportation & Logistics",
    path: "/industries/transportation-logistics",
    image: "https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg",
    color: "#FFE994",
  },
  {
    title: "Cleaning & Facility Management",
    path: "/industries/cleaning-facility-management",
    image:
      "https://images.pexels.com/photos/6197108/pexels-photo-6197108.jpeg",
    color: "#FFF6C8",
  },
  {
    title: "Oil, Gas & Energy",
    path: "/industries/oil-gas-energy",
    image:
      "https://images.pexels.com/photos/37589838/pexels-photo-37589838.jpeg",
    color: "#A6E6EC",
  },
  {
    title: "Retail & Supermarkets",
    path: "/industries/retail-supermarkets",
    image:
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=700&h=500&fit=crop",
    color: "#FFE994",
  },
  {
    title: "Food Processing",
    path: "/industries/food-processing",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=500&fit=crop",
    color: "#CFF7BC",
  },
  {
    title: "Shipbuilding & Marine",
    path: "/industries/shipbuilding-marine",
    image:
      "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=700&h=500&fit=crop",
    color: "#A6E6EC",
  },
  {
    title: "Security Services",
    path: "/industries/security-services",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&h=500&fit=crop",
    color: "#FFF6C8",
  },
  {
    title: "Skilled Trades",
    path: "/industries/skilled-trades",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=700&h=500&fit=crop",
    color: "#FFE994",
  },
];

const Industrys = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".industry-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".industry-reveal", {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".industry-card", {
        y: 55,
        opacity: 0,
        rotateX: 18,
        duration: 0.9,
        stagger: 0.055,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".industry-line", {
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
      className="font-arimo relative overflow-hidden bg-[#FFF9E6] py-24 lg:py-32"
    >
      <svg
        className="absolute left-0 top-0 h-[120px] w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H1440V48C1160 86 960 22 720 55C470 95 230 74 0 30V0Z"
          fill="#FBD6D2"
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 h-[160px] w-full"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0 160V95C230 35 455 100 720 60C980 24 1210 76 1440 40V160H0Z"
          fill="var(--color-primary-bg)"
        />
      </svg>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="industry-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Industries We Serve
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Workforce", "for", "Every", "Industry"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="industry-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="industry-line mx-auto mt-3 h-5 w-[320px] max-w-full"
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
            We supply reliable, screened and job-ready workers across essential
            business sectors.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {industries.map((item, index) => (
            <IndustryCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const IndustryCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame;
    let time = 0;
    let hover = 0;
    let isHover = false;

    const w = 70;
    const h = 70;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    canvas.dataset.hover = "false";

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.018;
      isHover = canvas.dataset.hover === "true";
      hover += ((isHover ? 1 : 0) - hover) * 0.08;

      const cx = w / 2;
      const cy = h / 2;
      const progress = 0.45 + hover * 0.48;

      ctx.beginPath();
      ctx.arc(cx, cy, 27, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.14)";
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.save();
      ctx.shadowColor = "#F4C542";
      ctx.shadowBlur = 9;
      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        27,
        -Math.PI / 2 + time * 0.4,
        -Math.PI / 2 + time * 0.4 + Math.PI * 2 * progress,
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1 + hover * 0.1, 1 + hover * 0.1);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const type = index % 6;

      if (type === 0) {
        ctx.strokeRect(-12, -4, 24, 16);
        ctx.beginPath();
        ctx.moveTo(-8, -4);
        ctx.lineTo(-8, -14);
        ctx.moveTo(8, -4);
        ctx.lineTo(8, -14);
        ctx.stroke();
      }

      if (type === 1) {
        ctx.beginPath();
        ctx.moveTo(-13, 10);
        ctx.lineTo(-13, -8);
        ctx.lineTo(-2, -14);
        ctx.lineTo(-2, 10);
        ctx.moveTo(4, 10);
        ctx.lineTo(4, -10);
        ctx.lineTo(14, -14);
        ctx.lineTo(14, 10);
        ctx.stroke();
      }

      if (type === 2) {
        ctx.beginPath();
        ctx.roundRect(-13, -10, 26, 22, 5);
        ctx.stroke();
        ctx.moveTo(-7, -10);
        ctx.lineTo(-7, -16);
        ctx.lineTo(7, -16);
        ctx.lineTo(7, -10);
        ctx.stroke();
      }

      if (type === 3) {
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(0, 15);
        ctx.moveTo(-15, 0);
        ctx.lineTo(15, 0);
        ctx.stroke();
      }

      if (type === 4) {
        ctx.beginPath();
        ctx.moveTo(-12, 12);
        ctx.quadraticCurveTo(0, -16, 12, 12);
        ctx.moveTo(0, -8);
        ctx.lineTo(0, 14);
        ctx.stroke();
      }

      if (type === 5) {
        ctx.beginPath();
        ctx.moveTo(-14, 6);
        ctx.lineTo(12, 6);
        ctx.lineTo(8, -8);
        ctx.lineTo(-6, -8);
        ctx.closePath();
        ctx.stroke();
        ctx.arc(-7, 10, 3, 0, Math.PI * 2);
        ctx.arc(8, 10, 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frame);
  }, [index]);

  const onEnter = () => {
    canvasRef.current.dataset.hover = "true";

    gsap.to(cardRef.current, {
      y: -12,
      scale: 1.02,
      rotate: index % 2 === 0 ? -1 : 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    canvasRef.current.dataset.hover = "false";

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
      className="industry-card group relative block"
    >
      <svg
        className="absolute -bottom-5 -right-12 h-full w-full"
        viewBox="0 0 420 420"
        preserveAspectRatio="none"
      >
        <path
          d="M36 20H360C392 20 402 45 398 82L374 370C371 400 350 412 318 405L42 358C18 354 8 330 14 300L36 20Z"
          fill={item.color}
        />
      </svg>

      <svg
        className="absolute -bottom-2 -right-10 h-full w-full"
        viewBox="0 0 420 420"
        preserveAspectRatio="none"
      >
        <path
          d="M30 18H356C388 18 402 42 396 78L370 362C366 395 345 408 315 400L40 355C18 351 8 328 14 298L30 18Z"
          fill="#F4C542"
          opacity="0.75"
        />
      </svg>

      <div
        className="relative min-h-[410px] overflow-hidden rounded-[30px] border border-black/15 p-5 transition-all duration-700"
        style={{ backgroundColor: item.color }}
      >
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.5),transparent_62%)]" />

        <div className="relative z-10">
          <div className="relative h-48 overflow-hidden rounded-3xl border border-black/10">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute right-4 top-4 rounded-full bg-[#FFF9E6] p-2">
              <canvas ref={canvasRef} />
            </div>
          </div>

          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/45">
                Industry
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-black">
                {item.title}
              </h3>
            </div>

            <span className="mt-2 text-2xl text-black transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </div>

          <p className="mt-5 text-sm leading-6 text-black/70">
            Screened workers ready for hiring, onboarding and deployment in this
            sector.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Verified", "Job Ready", "Fast Supply"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-black"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

export default Industrys;
