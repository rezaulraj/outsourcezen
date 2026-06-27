import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Building2,
  Globe2,
  MapPin,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const offices = [
  {
    country: "Scotland · UK",
    city: "Glasgow",
    type: "European HQ",
    address:
      "Hillington Business Centre, 15–17 Nasmyth Rd S, Hillington, Glasgow G52 4RE",
    flag: "🇬🇧",
    color: "#FFE994",
  },
  {
    country: "Bangladesh",
    city: "Dhaka",
    type: "Candidate Operations Centre",
    address: "Sector 10, Dhaka 1230, Bangladesh",
    flag: "🇧🇩",
    color: "#CFF7BC",
  },
  {
    country: "Romania",
    city: "Bucharest",
    type: "Regional Recruitment Hub",
    address: "201 Barbu Văcărescu, 020276 Bucharest, Romania",
    flag: "🇷🇴",
    color: "#A6E6EC",
  },
  {
    country: "Portugal",
    city: "Lisbon",
    type: "Employer Support Office",
    address: "Avenida da República 8, 3º Esq., 1050-195 Lisbon, Portugal",
    flag: "🇵🇹",
    color: "#FFF6C8",
  },
];

const stats = [
  { value: 30, suffix: "+", label: "Countries Served" },
  { value: 10000, suffix: "+", label: "Successful Placements" },
  { value: 20, suffix: "+", label: "Industries" },
  { value: 40, suffix: "+", label: "Recruitment Experts" },
];

const OurGlobalPresence = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".global-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".global-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".global-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.4,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % offices.length);
    }, 2600);

    return () => clearInterval(timer);
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

    const rr = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
    };

    const drawGrid = () => {
      ctx.save();
      ctx.globalAlpha = 0.075;
      ctx.strokeStyle = "#111";

      for (let x = 0; x < w; x += 42) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = 0; y < h; y += 42) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawMapShape = () => {
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = "#111";

      const blobs = [
        [0.2, 0.38, 120, 58],
        [0.35, 0.32, 100, 44],
        [0.52, 0.39, 150, 64],
        [0.66, 0.35, 120, 52],
        [0.78, 0.48, 100, 42],
        [0.47, 0.55, 90, 36],
        [0.28, 0.56, 72, 30],
      ];

      blobs.forEach(([x, y, bw, bh], i) => {
        ctx.beginPath();
        ctx.ellipse(
          w * x,
          h * y,
          Math.min(w, bw) * 0.28,
          Math.min(h, bh) * 0.28,
          Math.sin(i) * 0.4,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      });

      ctx.restore();
    };

    const getPoints = () => [
      {
        name: "Scotland",
        x: w * 0.43,
        y: h * 0.33,
        color: "#FFE994",
        label: "UK",
      },
      {
        name: "Bangladesh",
        x: w * 0.66,
        y: h * 0.51,
        color: "#CFF7BC",
        label: "BD",
      },
      {
        name: "Romania",
        x: w * 0.5,
        y: h * 0.41,
        color: "#A6E6EC",
        label: "RO",
      },
      {
        name: "Portugal",
        x: w * 0.38,
        y: h * 0.46,
        color: "#FFF6C8",
        label: "PT",
      },
    ];

    const drawConnection = (a, b, index) => {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(
        (a.x + b.x) / 2,
        Math.min(a.y, b.y) - h * 0.13,
        b.x,
        b.y,
      );
      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 13]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      const p = (time * 0.16 + index * 0.22) % 1;
      const cx =
        (1 - p) * (1 - p) * a.x +
        2 * (1 - p) * p * ((a.x + b.x) / 2) +
        p * p * b.x;
      const cy =
        (1 - p) * (1 - p) * a.y +
        2 * (1 - p) * p * (Math.min(a.y, b.y) - h * 0.13) +
        p * p * b.y;

      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = index % 2 ? "#67D946" : "#F4C542";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.8;
      ctx.stroke();
    };

    const drawMarker = (point, index) => {
      const active = activeRef.current === index;
      const pulse = active
        ? Math.sin(time * 5) * 5
        : Math.sin(time * 3 + index) * 2;

      ctx.save();
      ctx.translate(point.x, point.y);

      ctx.beginPath();
      ctx.arc(0, 0, 26 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = point.color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = active ? 3 : 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.fillStyle = "#111";
      ctx.font = "900 11px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(point.label, 0, 48);

      if (active) {
        ctx.beginPath();
        ctx.arc(0, 0, 46 + Math.sin(time * 4) * 4, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(103,217,70,0.45)";
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawFloatingCard = (x, y, title, value, color, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + phase) * 6);

      rr(-92, -34, 184, 68, 22);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-60, 0, 18, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 11px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(title, 20, -7);

      ctx.font = "900 15px Arimo";
      ctx.fillText(value, 20, 14);

      ctx.restore();
    };

    const drawActiveBadge = () => {
      const office = offices[activeRef.current];

      ctx.save();
      ctx.translate(w * 0.5, h * 0.13 + Math.sin(time * 1.2) * 5);

      rr(-150, -54, 300, 108, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-108, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = office.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ACTIVE GLOBAL OFFICE", 30, -14);

      ctx.font = "900 18px Arimo";
      ctx.fillText(`${office.city.toUpperCase()} · ${office.flag}`, 30, 16);

      ctx.beginPath();
      ctx.arc(130, -38, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
    };

    const drawParticles = () => {
      for (let i = 0; i < 36; i++) {
        const x = ((i * 89) % w) + Math.sin(time + i) * 9;
        const y = ((i * 49) % h) + Math.cos(time * 1.1 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.3 + Math.sin(time * 2 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.26)";
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();
      drawParticles();
      drawMapShape();

      const points = getPoints();

      drawConnection(points[0], points[2], 0);
      drawConnection(points[2], points[3], 1);
      drawConnection(points[2], points[1], 2);
      drawConnection(points[0], points[1], 3);
      drawConnection(points[3], points[1], 4);

      points.forEach((point, index) => drawMarker(point, index));

      drawActiveBadge();

      drawFloatingCard(
        w * 0.22,
        h * 0.68,
        "Hiring",
        "Global roles",
        "#FFE994",
        0,
      );
      drawFloatingCard(
        w * 0.78,
        h * 0.67,
        "Deployment",
        "Cross-border ✓",
        "#CFF7BC",
        2,
      );
      drawFloatingCard(
        w * 0.5,
        h * 0.84,
        "Network",
        "30+ countries",
        "#A6E6EC",
        4,
      );

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
      className="font-arimo bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="global-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Global Presence
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Connected",
              "offices",
              "supporting",
              "global",
              "workforce",
              "growth",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="global-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Our offices and support teams connect employers, candidates and
            workforce opportunities across Europe and Asia.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="global-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:sticky lg:top-24 lg:h-[680px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="space-y-5">
            {offices.map((office, index) => {
              const isActive = active === index;

              return (
                <button
                  key={office.country}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`global-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "border-black bg-[#FFF9E6]"
                      : "border-black/10 bg-[#FFF9E6]/75 hover:border-black/30"
                  }`}
                >
                  <div className="flex gap-5">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl"
                      style={{ backgroundColor: office.color }}
                    >
                      {office.flag}
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">
                        {office.type}
                      </p>

                      <h3 className="mt-1 text-xl font-bold tracking-[-0.03em] text-black">
                        {office.country}
                      </h3>

                      <p className="mt-2 text-sm font-bold text-black/70">
                        {office.city}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-black/65">
                        {office.address}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <StatisticCard key={item.label} item={item} />
          ))}
        </div>

        <div className="global-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <MapPin size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Ready to hire across borders?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  Connect with our team for overseas recruitment, workforce
                  sourcing, documentation support and international hiring
                  coordination.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Contact Our Team
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatisticCard = ({ item }) => {
  const valueRef = useRef(null);

  useEffect(() => {
    const counter = { value: 0 };

    gsap.to(counter, {
      value: item.value,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (!valueRef.current) return;
        valueRef.current.textContent =
          Math.floor(counter.value).toLocaleString() + item.suffix;
      },
    });
  }, [item]);

  return (
    <article className="global-card rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#CFF7BC]">
        {item.label.includes("Countries") && <Globe2 size={24} />}
        {item.label.includes("Placements") && <ShieldCheck size={24} />}
        {item.label.includes("Industries") && <Building2 size={24} />}
        {item.label.includes("Experts") && <UsersRound size={24} />}
      </div>

      <p
        ref={valueRef}
        className="text-4xl font-normal tracking-[-0.06em] text-black"
      >
        0
      </p>

      <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
        {item.label}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-black/[0.05] px-3 py-1 text-xs font-bold text-black/55">
        <Sparkles size={13} />
        Global support
      </div>
    </article>
  );
};

export default OurGlobalPresence;
