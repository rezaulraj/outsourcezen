import React, { useEffect, useRef, useState } from "react";
import { WorldMap } from "react-svg-worldmap";
import { gsap } from "gsap";

const COUNTRIES = [
  {
    code: "np",
    name: "Nepal",
    city: "Kathmandu",
    x: 73,
    y: 27,
    agent: "https://i.pravatar.cc/120?img=47",
  },
  {
    code: "pk",
    name: "Pakistan",
    city: "Lahore",
    x: 69,
    y: 25,
    agent: "https://i.pravatar.cc/120?img=5",
  },
  {
    code: "bd",
    name: "Bangladesh",
    city: "Dhaka",
    x: 75,
    y: 31,
    agent: "https://i.pravatar.cc/120?img=12",
  },
  {
    code: "in",
    name: "India",
    city: "Mumbai",
    x: 71,
    y: 34,
    agent: "https://i.pravatar.cc/120?img=33",
  },
  {
    code: "ph",
    name: "Philippines",
    city: "Manila",
    x: 84,
    y: 41,
    agent: "https://i.pravatar.cc/120?img=51",
  },
  {
    code: "ae",
    name: "UAE",
    city: "Dubai",
    x: 62,
    y: 31,
    agent: "https://i.pravatar.cc/120?img=15",
  },
  {
    code: "lk",
    name: "Sri Lanka",
    city: "Colombo",
    x: 72,
    y: 42,
    agent: "https://i.pravatar.cc/120?img=29",
  },
  {
    code: "so",
    name: "Somalia",
    city: "Mogadishu",
    x: 55,
    y: 48,
    agent: "https://i.pravatar.cc/120?img=22",
  },
  {
    code: "ng",
    name: "Nigeria",
    city: "Lagos",
    x: 47,
    y: 44,
    agent: "https://i.pravatar.cc/120?img=58",
  },
];

// Formatting target nodes for the underlying SVG engine
const MAP_DATA = COUNTRIES.map((c) => ({
  country: c.code,
  value: 100, // Even fill weight across the target network
}));

const WORLD_DOTS = [
  // North America
  [12, 18],
  [14, 16],
  [16, 15],
  [18, 14],
  [20, 14],
  [22, 15],
  [10, 22],
  [12, 22],
  [14, 22],
  [16, 21],
  [18, 20],
  [20, 19],
  [9, 26],
  [11, 27],
  [13, 27],
  [15, 26],
  [17, 25],
  [19, 24],
  [21, 23],
  [10, 31],
  [12, 32],
  [14, 32],
  [16, 31],
  [18, 29],
  [13, 36],
  [15, 37],
  [17, 36],
  [19, 34],
  [16, 41],
  [18, 41],
  [20, 39],
  // Central America / Caribbean
  [18, 44],
  [19, 46],
  [20, 48],
  // South America
  [24, 52],
  [25, 54],
  [26, 56],
  [27, 58],
  [27, 60],
  [26, 62],
  [25, 64],
  [24, 66],
  [23, 68],
  [23, 70],
  [24, 72],
  [25, 74],
  [22, 56],
  [21, 58],
  [21, 60],
  [22, 62],
  [22, 64],
  [27, 50],
  [29, 51],
  [28, 53],
  // Europe
  [46, 16],
  [48, 15],
  [50, 14],
  [52, 15],
  [47, 18],
  [49, 18],
  [51, 17],
  [45, 20],
  [47, 21],
  [49, 21],
  [53, 19],
  [44, 23],
  [46, 24],
  [48, 24],
  [50, 23],
  // Africa
  [46, 28],
  [48, 28],
  [50, 29],
  [52, 30],
  [47, 32],
  [49, 32],
  [51, 33],
  [53, 33],
  [45, 35],
  [47, 36],
  [49, 37],
  [51, 38],
  [46, 40],
  [48, 41],
  [50, 42],
  [47, 44],
  [49, 45],
  [51, 46],
  [45, 48],
  [47, 49],
  [49, 50],
  [44, 52],
  [46, 53],
  // Middle East
  [55, 28],
  [57, 29],
  [59, 30],
  [56, 32],
  [58, 33],
  // Asia
  [54, 12],
  [58, 11],
  [62, 10],
  [66, 10],
  [70, 11],
  [74, 12],
  [78, 13],
  [82, 14],
  [86, 15],
  [60, 14],
  [64, 14],
  [68, 15],
  [72, 16],
  [76, 17],
  [80, 18],
  [58, 18],
  [62, 19],
  [66, 20],
  [70, 21],
  [74, 22],
  [62, 24],
  [66, 25],
  [70, 26],
  [74, 27],
  [78, 24],
  [76, 30],
  [80, 30],
  [84, 28],
  [82, 33],
  [86, 30],
  [86, 21],
  [90, 19],
  [88, 24],
  // Southeast Asia
  [82, 38],
  [85, 40],
  [88, 42],
  [80, 42],
  [84, 44],
  // Japan
  [92, 22],
  [93, 24],
  [94, 26],
  // Australia
  [82, 60],
  [85, 62],
  [88, 61],
  [91, 60],
  [84, 64],
  [87, 65],
  [80, 64],
  [90, 64],
  [86, 67],
];

const FLAG_URL = (code) => `https://flagcdn.com/h40/${code}.png`;

const RegionalRecruitmentPartners = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const mapContainerRef = useRef(null);
  const pathRef = useRef(null);
  const pinRefs = useRef([]);
  const [hovered, setHovered] = useState(null);
  const [metrics, setMetrics] = useState({
    mapW: 0,
    mapH: 0,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".source-backdrop-curve",
        { scale: 0.92, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
        },
      );

      gsap.from(".source-word", {
        y: 60,
        opacity: 0,
        rotateX: 45,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
      });

      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.fromTo(
          pathRef.current,
          { strokeDasharray: pathLength, strokeDashoffset: pathLength },
          {
            strokeDashoffset: 0,
            duration: 1.2,
            delay: 0.5,
            ease: "power2.inOut",
          },
        );
      }

      gsap.from(".source-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.fromTo(
        pinRefs.current,
        { opacity: 0, scale: 0, y: -40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          delay: 0.8,
          ease: "back.out(1.7)",
          onComplete: () => {
            pinRefs.current.forEach((pin, idx) => {
              if (!pin) return;
              gsap.to(pin, {
                y: "-=8",
                duration: 1.8 + (idx % 3) * 0.3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: idx * 0.1,
              });
            });
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, frame;
    let dotsAppear = 0;

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

      const mapAspect = 2 / 1;
      let mapW = w;
      let mapH = mapW / mapAspect;

      if (mapH > h) {
        mapH = h;
        mapW = mapH * mapAspect;
      }

      const offsetX = (w - mapW) / 2;
      const offsetY = (h - mapH) / 2;
      setMetrics({ mapW, mapH, offsetX, offsetY });
    };

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      dotsAppear = Math.min(1, dotsAppear + 0.012);

      const mapAspect = 2 / 1;
      let currentMapW = w;
      let currentMapH = currentMapW / mapAspect;

      if (currentMapH > h) {
        currentMapH = h;
        currentMapW = currentMapH * mapAspect;
      }

      const currentOffsetX = (w - currentMapW) / 2;
      const currentOffsetY = (h - currentMapH) / 2;
      const dotR = Math.max(1.8, currentMapW / 280);

      WORLD_DOTS.forEach(([px, py], i) => {
        const delay = (i % 65) * 0.006;
        const local = easeOutCubic(
          Math.max(0, Math.min(1, (dotsAppear - delay) / (1 - delay))),
        );
        if (local <= 0) return;

        const scrX = currentOffsetX + (px / 100) * currentMapW;
        const scrY = currentOffsetY + (py / 100) * currentMapH;

        ctx.beginPath();
        ctx.arc(scrX, scrY, dotR * local, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 37, 88, ${0.15 * local})`;
        ctx.fill();
      });

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

  const handleMouseEnter = (idx) => {
    setHovered(idx);
    gsap.to(pinRefs.current[idx], {
      scale: 1.15,
      zIndex: 100,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (idx) => {
    setHovered(null);
    gsap.to(pinRefs.current[idx], {
      scale: 1,
      zIndex: 10 + idx,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const mapStyleProperties = ({ countryCode }) => {
    const isTargetNode = COUNTRIES.some(
      (c) => c.code === countryCode.toLowerCase(),
    );
    return {
      fill: isTargetNode ? "#ecf75f" : "#f1f5f9",
      fillOpacity: isTargetNode ? 1.0 : 0.6,
      stroke: "#4372af",
      strokeWidth: 1,
      strokeOpacity: 0.8,
      transition: "all 0.3s ease",
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20 lg:py-28 font-arimo"
    >
      {/* Top 50% curve */}
      <div
        className="source-backdrop-curve absolute inset-x-0 top-0 h-full bg-[#CFF7BC]"
        style={{
          clipPath: "ellipse(82% 45% at 50% 48%)",
        }}
      />

      {/* Bottom visible curvy road cut */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 z-[2] h-[190px] w-full"
        viewBox="0 0 1440 190"
        preserveAspectRatio="none"
      >
        <path
          d="M0 85
       C160 145 300 25 470 90
       C640 155 790 35 960 95
       C1130 155 1280 35 1440 90
       L1440 190
       L0 190
       Z"
          fill="var(--color-primary-bg)"
        />
      </svg>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-2xl text-center flex flex-col items-center">
          <h2 className="relative text-4xl font-normal tracking-tight text-gray-950 sm:text-5xl lg:text-6xl pb-4">
            {["Regional", "Recruitment", "Partners"].map((word, index) => (
              <span key={index} className="inline-block overflow-hidden px-1.5">
                <span className="source-word inline-block">{word}</span>
              </span>
            ))}
            <div className="absolute left-1/2 bottom-0 w-48 sm:w-64 h-3 -translate-x-1/2 overflow-visible">
              <svg
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  ref={pathRef}
                  d="M4 8C45 2.5 155 2.5 196 8"
                  stroke="#000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </h2>
          <p className="source-reveal mx-auto mt-6 max-w-xl text-base font-normal text-gray-900 leading-relaxed">
            Strategic global corridors monitored by our expert native scouting
            agents. We verify local talent right where they operate.
          </p>
        </div>

        <div
          ref={mapContainerRef}
          className="source-reveal relative mx-auto w-full max-w-4xl aspect-[2/1] min-h-[360px] sm:min-h-[460px] lg:min-h-[520px]"
        >
          <div className="absolute inset-0 w-full md:left-70 h-full opacity-90 select-none pointer-events-none flex items-center justify-center">
            <WorldMap
              data={MAP_DATA}
              size="responsive"
              backgroundColor="transparent"
              styleFunction={mapStyleProperties}
              showTooltip={false}
            />
          </div>

          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10"
          />

          {COUNTRIES.map((c, idx) => {
            const screenX = metrics.offsetX + (c.x / 100) * metrics.mapW;
            const screenY = metrics.offsetY + (c.y / 100) * metrics.mapH;

            return (
              <div
                key={c.code}
                ref={(el) => (pinRefs.current[idx] = el)}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                style={{
                  position: "absolute",
                  left: `${screenX}px`,
                  top: `${screenY}px`,
                  transform: "translate(-50%, -100%)",
                  zIndex: 20 + idx,
                }}
                className="flex flex-col items-center cursor-pointer select-none"
              >
                <div
                  className={`absolute bottom-full mb-3 pointer-events-none flex flex-col items-center transition-all duration-300 ease-out ${
                    hovered === idx
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-2 scale-95"
                  }`}
                >
                  <div className="whitespace-nowrap rounded-xl bg-[#1e2558] px-4 py-2.5 shadow-2xl text-center border border-white/10">
                    <p className="text-xs font-black text-white leading-tight">
                      {c.name}
                    </p>
                    <p className="text-[10px] font-bold text-[#4eb956] mt-0.5 tracking-wider uppercase">
                      {c.city} Hub
                    </p>
                  </div>
                  <div className="h-2 w-2 -mt-1 rotate-45 bg-[#FFE994]" />
                </div>

                <div className="relative">
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#000] via-[#FFE994] to-amber-400 opacity-60 blur-sm animate-pulse" />
                  <div className="absolute h-16 w-16 -top-1 -left-1 rounded-full bg-[#4eb956]/20 animate-ping duration-[3000ms] pointer-events-none" />

                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full border-[3px] border-white bg-white overflow-hidden shadow-xl transition-transform duration-300">
                    <img
                      src={c.agent}
                      alt={`${c.name} Agent`}
                      className="h-full w-full object-cover"
                      draggable="false"
                    />
                  </div>

                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-md">
                    <img
                      src={FLAG_URL(c.code)}
                      alt={c.name}
                      className="h-full w-full object-cover"
                      draggable="false"
                    />
                  </span>
                </div>

                <svg
                  viewBox="0 0 24 16"
                  className="mt-0.5 h-4 w-5 text-[#1e2558] filter drop-shadow-[0_3px_2px_rgba(30,37,88,0.25)]"
                >
                  <path d="M12 16 L3 2 Q12 -2 21 2 Z" fill="currentColor" />
                </svg>

                <div className="mt-1 h-1 w-6 rounded-full bg-[#1e2558]/20 blur-[1px]" />
              </div>
            );
          })}
        </div>

        <div className="source-reveal mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-bold text-gray-950">
          <div className="flex items-center gap-2.5 bg-white/90 border border-slate-100 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4eb956] animate-ping" />
            <span className="tracking-wide font-normal">
              9 Elite Corridors Vetted
            </span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/90 border border-slate-100 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFE994]" />
            <span className="tracking-wide font-normal">
              Real-time Local Infrastructure
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalRecruitmentPartners;
