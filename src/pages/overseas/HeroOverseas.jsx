import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Globe2, Plane, FileCheck, Users } from "lucide-react";

const HeroOverseas = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".os-word", {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: "power3.out",
      });

      gsap.from(".os-reveal", {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.45,
        ease: "power3.out",
      });

      gsap.from(".os-underline", {
        scaleX: 0,
        opacity: 0,
        duration: 0.9,
        delay: 0.7,
        transformOrigin: "left center",
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w;
    let h;
    let frame;
    let time = 0;

    // --- icon library: each represents a real step in sourcing talent ---
    const drawCheckIcon = (s) => {
      ctx.beginPath();
      ctx.moveTo(-7 * s, 0);
      ctx.lineTo(-2 * s, 6 * s);
      ctx.lineTo(8 * s, -7 * s);
      ctx.stroke();
    };

    const drawStarIcon = (s) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const outerAngle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        const innerAngle = outerAngle + Math.PI / 5;
        const ox = Math.cos(outerAngle) * 9 * s;
        const oy = Math.sin(outerAngle) * 9 * s;
        const ix = Math.cos(innerAngle) * 3.6 * s;
        const iy = Math.sin(innerAngle) * 3.6 * s;
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
        ctx.lineTo(ix, iy);
      }
      ctx.closePath();
      ctx.stroke();
    };

    const drawDocIcon = (s) => {
      ctx.beginPath();
      ctx.moveTo(-6 * s, -10 * s);
      ctx.lineTo(3 * s, -10 * s);
      ctx.lineTo(6 * s, -7 * s);
      ctx.lineTo(6 * s, 10 * s);
      ctx.lineTo(-6 * s, 10 * s);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-3 * s, -3 * s);
      ctx.lineTo(3 * s, -3 * s);
      ctx.moveTo(-3 * s, 1.5 * s);
      ctx.lineTo(3 * s, 1.5 * s);
      ctx.moveTo(-3 * s, 6 * s);
      ctx.lineTo(1 * s, 6 * s);
      ctx.stroke();
    };

    const drawHandshakeIcon = (s) => {
      ctx.beginPath();
      ctx.moveTo(-9 * s, -1 * s);
      ctx.lineTo(-2 * s, 5 * s);
      ctx.lineTo(2 * s, 1 * s);
      ctx.lineTo(9 * s, 7 * s);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-9 * s, -1 * s);
      ctx.lineTo(-4 * s, -7 * s);
      ctx.lineTo(2 * s, -6 * s);
      ctx.moveTo(9 * s, 7 * s);
      ctx.lineTo(5 * s, -5 * s);
      ctx.lineTo(0 * s, -6 * s);
      ctx.stroke();
    };

    const drawChatIcon = (s) => {
      ctx.beginPath();
      ctx.moveTo(-8 * s, -7 * s);
      ctx.lineTo(8 * s, -7 * s);
      ctx.lineTo(8 * s, 3 * s);
      ctx.lineTo(0 * s, 3 * s);
      ctx.lineTo(-4 * s, 9 * s);
      ctx.lineTo(-4 * s, 3 * s);
      ctx.lineTo(-8 * s, 3 * s);
      ctx.closePath();
      ctx.stroke();
    };

    const drawGlobeIcon = (s) => {
      ctx.beginPath();
      ctx.arc(0, 0, 9 * s, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, 4 * s, 9 * s, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-9 * s, 0);
      ctx.lineTo(9 * s, 0);
      ctx.stroke();
    };

    const drawBriefcaseIcon = (s) => {
      ctx.beginPath();
      ctx.moveTo(-9 * s, -4 * s);
      ctx.lineTo(9 * s, -4 * s);
      ctx.lineTo(9 * s, 8 * s);
      ctx.lineTo(-9 * s, 8 * s);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-4 * s, -4 * s);
      ctx.lineTo(-4 * s, -8 * s);
      ctx.lineTo(4 * s, -8 * s);
      ctx.lineTo(4 * s, -4 * s);
      ctx.stroke();
    };

    const iconDrawers = {
      check: drawCheckIcon,
      star: drawStarIcon,
      doc: drawDocIcon,
      handshake: drawHandshakeIcon,
      chat: drawChatIcon,
      globe: drawGlobeIcon,
      briefcase: drawBriefcaseIcon,
    };
    const iconOrder = [
      "check",
      "star",
      "doc",
      "handshake",
      "chat",
      "globe",
      "briefcase",
    ];

    const faceUrls = [
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=160&h=160&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=160&h=160&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=160&h=160&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=face",
    ];
    const faceImages = faceUrls.map((src) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      return img;
    });

    const palette = ["#D9A441", "#8FB996", "#3F7D58", "#C97B53", "#4F8FBF"];

    const COLS = 6;
    const ROWS = 6;

    const CONTENT_LIBRARY = [
      { kind: "empty" },
      ...iconOrder.map((key) => ({ kind: "icon", iconKey: key })),
      ...faceImages.map((_, i) => ({ kind: "face", faceIdx: i })),
      { kind: "empty" },
      { kind: "empty" },
    ];

    const ringSlots = [];
    let idx = 0;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        ringSlots.push({
          row,
          col,
          colorIdx: idx % palette.length,
          phase: (idx % 7) * 0.9,
          speed: 0.5 + (idx % 5) * 0.07,
          cycleLen: 2.8 + ((idx * 0.37) % 1.6),
          cycleOffset: (idx * 0.71) % 3,
          librarySeed: idx,
        });
        idx++;
      }
    }

    const FADE_PORTION = 0.28;
    const contentForSlot = (slot, t) => {
      const localT = t + slot.cycleOffset;
      const cyclePos = localT / slot.cycleLen;
      const cycleIndex = Math.floor(cyclePos);
      const cycleFrac = cyclePos - cycleIndex;

      const libLen = CONTENT_LIBRARY.length;
      const currentItem =
        CONTENT_LIBRARY[(slot.librarySeed + cycleIndex) % libLen];
      const nextItem =
        CONTENT_LIBRARY[(slot.librarySeed + cycleIndex + 1) % libLen];

      let fade = 1; // opacity of "currentItem"
      let incoming = null;
      let incomingFade = 0;

      if (cycleFrac > 1 - FADE_PORTION) {
        const t2 = (cycleFrac - (1 - FADE_PORTION)) / FADE_PORTION;
        fade = 1 - t2;
        incoming = nextItem;
        incomingFade = t2;
      }

      return { current: currentItem, fade, incoming, incomingFade };
    };

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

    const easeOutBack = (t) => {
      const c1 = 1.4;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    const drawTrackRing = (x, y, r, lineWidth) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(27,67,50,0.12)";
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const drawProgressArc = (x, y, r, lineWidth, color, start, progress) => {
      ctx.beginPath();
      ctx.arc(x, y, r, start, start + Math.PI * 2 * progress);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const drawContent = (item, alpha, r, lineWidth, color, iconScaleBase) => {
      if (!item || alpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = alpha;

      if (item.kind === "face") {
        const img = faceImages[item.faceIdx];
        if (img.complete && img.naturalWidth) {
          const innerR = r - lineWidth / 2 - 2;
          ctx.save();
          ctx.beginPath();
          ctx.arc(0, 0, innerR, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, -innerR, -innerR, innerR * 2, innerR * 2);
          ctx.restore();
        }
      } else if (item.kind === "icon") {
        ctx.beginPath();
        ctx.arc(0, 0, r - lineWidth / 2 - 2, 0, Math.PI * 2);
        ctx.fillStyle = "#FAF6EC";
        ctx.fill();

        ctx.strokeStyle = color;
        ctx.lineWidth = 2.1;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        const drawIcon = iconDrawers[item.iconKey];
        if (drawIcon) drawIcon(iconScaleBase);
      }
      // "empty" kind intentionally renders nothing extra — just the ring.

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.012;

      const marginX = w * 0.07;
      const marginY = h * 0.05;
      const usableW = w - marginX * 2;
      const usableH = h - marginY * 2;

      const cellW = usableW / COLS;
      const cellH = usableH / ROWS;
      const cellSize = Math.min(cellW, cellH);
      const r = cellSize * 0.4;
      const lineWidth = Math.max(5, r * 0.22);

      const gridW = cellSize * COLS;
      const gridH = cellSize * ROWS;
      const offsetX = marginX + (usableW - gridW) / 2 + cellSize / 2;
      const offsetY = marginY + (usableH - gridH) / 2 + cellSize / 2;

      ringSlots.forEach((slot) => {
        const x = offsetX + slot.col * cellSize;
        const y = offsetY + slot.row * cellSize;

        const delay = (slot.col + slot.row) * 0.035;
        const raw = Math.max(0, Math.min(1, time * 0.5 - delay));
        const appear = easeOutBack(raw);
        if (appear <= 0) return;

        const scale = Math.min(1, 0.5 + appear * 0.5);
        const drift = Math.max(0, 1 - appear) * 8;

        ctx.save();
        ctx.translate(x, y + drift);
        ctx.scale(scale, scale);

        drawTrackRing(0, 0, r, lineWidth * 0.85);

        const color = palette[slot.colorIdx];
        const progress =
          0.5 + 0.4 * (0.5 + 0.5 * Math.sin(time * slot.speed + slot.phase));
        const rotation = time * 0.4 + slot.phase;

        drawProgressArc(0, 0, r, lineWidth, color, rotation, progress);

        const iconScale = (r / 16) * 0.85;
        const { current, fade, incoming, incomingFade } = contentForSlot(
          slot,
          time,
        );

        drawContent(current, fade, r, lineWidth, color, iconScale);
        if (incoming) {
          drawContent(incoming, incomingFade, r, lineWidth, color, iconScale);
        }

        ctx.restore();
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

  return (
    <section
      ref={heroRef}
      className="font-arimo relative overflow-hidden pt-26"
    >
      <div className="relative z-10 container mx-auto rounded-xl bg-[#FFF4C7] px-4 pb-12 pt-24 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="os-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <Globe2 size={14} strokeWidth={2.2} />
              Overseas Recruitment
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Hire", "verified", "global", "workers"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="os-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="os-word inline-block">with</span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="os-word inline-block text-[#1f7a2e]">
                    confidence.
                  </span>
                </span>

                <svg
                  className="os-underline pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="os-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              We help employers recruit skilled and reliable overseas workers
              through verified sourcing, candidate screening, trade testing,
              documentation support and smooth deployment coordination.
            </p>

            <div className="os-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [Users, "Verified workers"],
                [FileCheck, "Visa support"],
                [Plane, "Deployment ready"],
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

            <div className="os-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Start overseas hiring
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
                See process
              </a>
            </div>
          </div>

          <div className="os-reveal relative h-[380px] w-full sm:h-[460px] lg:h-[560px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOverseas;
