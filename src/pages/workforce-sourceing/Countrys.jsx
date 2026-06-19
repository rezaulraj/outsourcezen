import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const countries = [
  {
    name: "Nepal",
    flag: "https://flagcdn.com/h80/np.png",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&h=500&fit=crop",
    tag: "Reliable Field Workforce",
    why: "Loyal, disciplined and strong for construction, security, hospitality and outdoor work.",
    stat: "89%",
    statLabel: "Retention",
    bg: "#FFF6C8",
    layer: "#67D946",
  },
  {
    name: "Bangladesh",
    flag: "https://flagcdn.com/h80/bd.png",
    image:
      "https://images.unsplash.com/photo-1674885674914-8405f1a986a3?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "High-Volume Hiring",
    why: "Large hardworking labor pool for manufacturing, cleaning, logistics and service roles.",
    stat: "50K+",
    statLabel: "Talent Pool",
    bg: "#FFFDF3",
    layer: "#F4C542",
  },
  {
    name: "India",
    flag: "https://flagcdn.com/h80/in.png",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Skilled Workforce",
    why: "Strong for healthcare, hospitality, factory, drivers, maintenance and skilled trades.",
    stat: "85%",
    statLabel: "Skill Match",
    bg: "#FFF3B5",
    layer: "#8FCE96",
  },
  {
    name: "Pakistan",
    flag: "https://flagcdn.com/h80/pk.png",
    image:
      "https://images.unsplash.com/photo-1608020932658-d0e19a69580b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Industrial Strength",
    why: "Good source for construction, transport, warehouse, textile and heavy labor roles.",
    stat: "92%",
    statLabel: "Work Ready",
    bg: "#FFF8D9",
    layer: "#67D946",
  },
  {
    name: "Philippines",
    flag: "https://flagcdn.com/h80/ph.png",
    image:
      "https://images.unsplash.com/photo-1531761535209-180857e963b9?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Service Excellence",
    why: "Excellent for hospitality, care, housekeeping, customer service and support roles.",
    stat: "90%",
    statLabel: "Service Fit",
    bg: "#FFF6C8",
    layer: "#F4C542",
  },
  {
    name: "Sri Lanka",
    flag: "https://flagcdn.com/h80/lk.png",
    image:
      "https://images.unsplash.com/photo-1612862862126-865765df2ded?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Hospitality Ready",
    why: "Reliable for hotel, cleaning, facility management, kitchen and service operations.",
    stat: "87%",
    statLabel: "Reliability",
    bg: "#FFFDF3",
    layer: "#8FCE96",
  },
  {
    name: "Indonesia",
    flag: "https://flagcdn.com/h80/id.png",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700&h=500&fit=crop",
    tag: "Agriculture & Care",
    why: "Strong for farming, plantation, domestic care, hospitality and general labor.",
    stat: "88%",
    statLabel: "Adaptability",
    bg: "#FFF3B5",
    layer: "#67D946",
  },
  {
    name: "Nigeria",
    flag: "https://flagcdn.com/h80/ng.png",
    image:
      "https://images.unsplash.com/photo-1537372023620-37161b1ad8ac?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Energetic Workforce",
    why: "Great for retail, warehouse, logistics, cleaning, operations and support roles.",
    stat: "86%",
    statLabel: "Energy Fit",
    bg: "#FFF8D9",
    layer: "#F4C542",
  },
  {
    name: "UAE",
    flag: "https://flagcdn.com/h80/ae.png",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&h=500&fit=crop",
    tag: "GCC-Ready Talent",
    why: "Useful corridor for experienced workers already familiar with Gulf work culture.",
    stat: "24/7",
    statLabel: "GCC Access",
    bg: "#FFF6C8",
    layer: "#8FCE96",
  },
];

const Countrys = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".country-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".country-card", {
        y: 55,
        opacity: 0,
        rotateX: 18,
        duration: 0.9,
        stagger: 0.08,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".country-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        delay: 0.2,
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
          fill="var(--color-primary-bg)"
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 h-[160px] w-full"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0 160V95C230 35 455 100 720 60C980 24 1210 76 1440 40V160H0Z"
          fill="#FFE994"
        />
      </svg>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="country-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Global Hiring Corridors
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Why", "These", "Countries", "Work"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="country-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Short country insights for employers who need reliable, verified and
            ready-to-deploy workers.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-9 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => (
            <CountryCard key={country.name} country={country} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CountryCard = ({ country }) => {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame;
    let progress = 0;
    let time = 0;

    const w = 92;
    const h = 92;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.018;
      progress += (1 - progress) * 0.035;

      ctx.beginPath();
      ctx.arc(46, 46, 28, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.13)";
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.save();
      ctx.shadowColor = "#F4C542";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(46, 46, 28, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(
        46,
        46,
        18,
        Math.PI / 2,
        Math.PI / 2 - Math.PI * 2 * (0.45 + Math.sin(time) * 0.18),
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
    gsap.to(cardRef.current, {
      y: -12,
      scale: 1.02,
      rotate: -1,
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
      className="country-card group relative"
    >
      <svg
        className="absolute -right-5 -bottom-5 h-full w-full"
        viewBox="0 0 420 520"
        preserveAspectRatio="none"
      >
        <path
          d="M38 20H360C392 20 402 45 398 82L374 470C371 500 350 512 318 505L42 448C18 443 8 420 14 390L38 20Z"
          fill={country.layer}
        />
      </svg>

      <svg
        className="absolute -right-2 -bottom-2 h-full w-full"
        viewBox="0 0 420 520"
        preserveAspectRatio="none"
      >
        <path
          d="M30 18H356C388 18 402 42 396 78L370 462C366 495 345 508 315 500L40 445C18 441 8 418 14 388L30 18Z"
          fill="#F4C542"
          opacity="0.85"
        />
      </svg>

      <div
        className="relative min-h-[520px] overflow-hidden rounded-[30px] border border-black/15 p-6 transition-all duration-700"
        style={{ backgroundColor: country.bg }}
      >
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(255,204,0,0.25),transparent_62%)]" />

        <div className="relative z-10">
          <div className="relative h-44 overflow-hidden rounded-3xl border border-black/10">
            <img
              src={country.image}
              alt={country.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <img
              src={country.flag}
              alt={country.name}
              className="absolute left-4 top-4 h-10 w-14 rounded object-cover ring-2 ring-white"
            />
          </div>

          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-3xl font-bold tracking-[-0.04em] text-black">
                {country.name}
              </h3>

              <p className="mt-2 inline-flex rounded-full bg-black px-4 py-2 text-xs font-bold text-white">
                ★ {country.tag}
              </p>
            </div>

            <div className="shrink-0">
              <canvas ref={canvasRef} />
            </div>
          </div>

          <div className="mt-5 rounded-3xl bg-[#FFE994] p-4">
            <h4 className="text-sm font-bold text-black">
              Why {country.name}?
            </h4>

            <p className="mt-2 text-sm leading-6 text-black/75">
              {country.why}
            </p>
          </div>

          <div className="mt-5 flex items-end justify-between rounded-3xl bg-white/65 p-4">
            <div>
              <p className="text-4xl font-normal tracking-[-0.05em] text-black">
                {country.stat}
              </p>
              <p className="mt-1 text-xs text-black/60">{country.statLabel}</p>
            </div>

            <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
              Employer Fit
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Countrys;
