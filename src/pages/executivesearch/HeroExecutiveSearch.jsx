import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Crown, Search, ShieldCheck } from "lucide-react";

const HeroExecutiveSearch = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ex-word", {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: "power3.out",
      });

      gsap.from(".ex-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.45,
        ease: "power3.out",
      });

      gsap.from(".ex-underline", {
        scaleX: 0,
        opacity: 0,
        duration: 0.9,
        delay: 0.75,
        transformOrigin: "left center",
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h, frame;
    let time = 0;

    const faceUrls = [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=180&h=180&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=180&h=180&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=180&h=180&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=180&h=180&fit=crop&crop=face",
    ];

    const faces = faceUrls.map((src) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      return img;
    });

    const nodes = [
      { x: 0.5, y: 0.5, r: 58, face: 0 },
      { x: 0.28, y: 0.28, r: 38, face: 1 },
      { x: 0.72, y: 0.28, r: 38, face: 2 },
      { x: 0.28, y: 0.72, r: 38, face: 3 },
      { x: 0.72, y: 0.72, r: 38, face: 1 },
      { x: 0.5, y: 0.16, r: 32, icon: "crown" },
      { x: 0.5, y: 0.84, r: 32, icon: "check" },
    ];

    const links = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [1, 2],
      [3, 4],
    ];

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

    const drawCrown = (s) => {
      ctx.beginPath();
      ctx.moveTo(-14 * s, 8 * s);
      ctx.lineTo(-10 * s, -8 * s);
      ctx.lineTo(-2 * s, 2 * s);
      ctx.lineTo(5 * s, -10 * s);
      ctx.lineTo(12 * s, 2 * s);
      ctx.lineTo(18 * s, -7 * s);
      ctx.lineTo(14 * s, 8 * s);
      ctx.closePath();
      ctx.stroke();
    };

    const drawCheck = (s) => {
      ctx.beginPath();
      ctx.moveTo(-12 * s, 0);
      ctx.lineTo(-4 * s, 8 * s);
      ctx.lineTo(13 * s, -11 * s);
      ctx.stroke();
    };

    const drawNode = (node, i) => {
      const x = node.x * w;
      const y = node.y * h + Math.sin(time * 1.25 + i) * 7;
      const r = Math.min(node.r, Math.min(w, h) * 0.12);

      ctx.save();
      ctx.translate(x, y);

      ctx.beginPath();
      ctx.arc(0, 0, r + 8, 0, Math.PI * 2);
      ctx.strokeStyle = i === 0 ? "#F4C542" : "rgba(0,0,0,0.12)";
      ctx.lineWidth = i === 0 ? 7 : 5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        0,
        0,
        r + 8,
        -Math.PI / 2 + time * 0.35,
        -Math.PI / 2 +
          time * 0.35 +
          Math.PI * 2 * (0.45 + Math.sin(time + i) * 0.2),
      );
      ctx.strokeStyle = i === 0 ? "#67D946" : "#F4C542";
      ctx.lineWidth = i === 0 ? 7 : 5;
      ctx.lineCap = "round";
      ctx.stroke();

      if (node.face !== undefined) {
        const img = faces[(node.face + Math.floor(time / 3)) % faces.length];

        if (img.complete && img.naturalWidth) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, -r, -r, r * 2, r * 2);
          ctx.restore();
        }
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();

        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        if (node.icon === "crown") drawCrown(r / 22);
        if (node.icon === "check") drawCheck(r / 22);
      }

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const cx = w / 2;
      const cy = h / 2;
      const pulse = 0.35 + (Math.sin(time * 1.3) + 1) * 0.25;

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(
          cx,
          cy,
          Math.min(w, h) * (0.18 + i * 0.11 + pulse * 0.04),
          0,
          Math.PI * 2,
        );
        ctx.strokeStyle = `rgba(0,0,0,${0.08 - i * 0.018})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      links.forEach(([a, b], i) => {
        const from = nodes[a];
        const to = nodes[b];

        ctx.beginPath();
        ctx.moveTo(from.x * w, from.y * h);
        ctx.lineTo(to.x * w, to.y * h);
        ctx.strokeStyle = "rgba(0,0,0,0.12)";
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 10]);
        ctx.lineDashOffset = -time * 35 - i * 10;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      nodes.forEach(drawNode);

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
      ref={heroRef}
      className="font-arimo relative overflow-hidden pt-26"
    >
      <div className="relative z-10 container mx-auto rounded-xl bg-[#FBD6D2] px-4 pb-12 pt-24 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="ex-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <Crown size={14} strokeWidth={2.2} />
              Executive Search
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Find", "leaders", "who", "shape"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="ex-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="ex-word inline-block">what's</span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="ex-word inline-block text-[#1f7a2e]">
                    next.
                  </span>
                </span>

                <svg
                  className="ex-underline pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
                  viewBox="0 0 320 24"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M2 17C58 6 130 4 188 10C228 14 268 18 318 9"
                    stroke="#1f7a2e"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="ex-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              Confidential executive recruitment for employers seeking proven
              managers, specialists and decision-makers who create lasting
              business impact.
            </p>

            <div className="ex-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [Search, "Targeted search"],
                [ShieldCheck, "Confidential hiring"],
                [Crown, "Senior leaders"],
              ].map(([Icon, label]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white/70 px-4 py-3 text-sm font-bold text-black"
                >
                  <Icon size={18} className="mb-2" />
                  {label}
                </div>
              ))}
            </div>

            <div className="ex-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Book Executive Consultation
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="/process"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                Explore process
              </a>
            </div>
          </div>

          <div className="ex-reveal relative h-[380px] w-full sm:h-[460px] lg:h-[560px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroExecutiveSearch;
