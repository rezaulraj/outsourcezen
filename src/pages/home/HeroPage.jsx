import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroPage = () => {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const cardRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(textRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.9,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(cardRef.current, {
        y: 45,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        delay: 0.45,
        ease: "power3.out",
      });

      gsap.to(progressRef.current, {
        width: "100%",
        duration: 4,
        repeat: -1,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width;
    let height;
    let animationFrame;
    let time = 0;

    const colors = ["#F5C637", "#C7D060", "#8FCE96", "#6ED1C7"];

    const faces = [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop&crop=face",
    ];

    const images = faces.map((src) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      return img;
    });

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0,
      );
    };

    const drawCircle = (x, y, r, color, start, progress, lineWidth = 11) => {
      ctx.beginPath();
      ctx.arc(x, y, r, start, start + Math.PI * 2 * progress);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const drawFaintRing = (x, y, r, lineWidth = 10) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(241,238,228,0.6)";
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const drawImageInsideRing = (img, x, y, ringR, lineWidth) => {
      if (!img.complete) return;
      const innerR = ringR - lineWidth / 2 - 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, innerR, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, x - innerR, y - innerR, innerR * 2, innerR * 2);
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.012;

      const size = Math.min(width / 6.3, 82);
      const gap = size * 1.28;
      const startX = width * 0.17;
      const startY = height * 0.16;
      const ringR = size * 0.42;
      const lineWidth = 10;

      const slots = [];
      let count = 0;
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 6; col++) {
          const x = startX + col * gap + (row % 2) * gap * 0.5;
          const y = startY + row * gap * 0.9;
          if (x > width - 40 || y > height - 30) continue;
          slots.push({ x, y, count });
          count++;
        }
      }

      const ACTIVE_COUNT = 12;
      const cycleLen = slots.length;
      const baseShift = Math.floor(time * 0.5);
      const activeIdx = new Set();
      for (let i = 0; i < ACTIVE_COUNT; i++) {
        activeIdx.add((baseShift * 3 + i * 5) % cycleLen);
      }

      const faceSlotFor = (faceIndex) => {
        const period = 2.6;
        const step = Math.floor(time / period) + faceIndex * 7;
        const arr = [...activeIdx];
        return slots[arr.length ? arr[step % arr.length] : faceIndex];
      };

      slots.forEach((slot, i) => {
        const { x, y } = slot;
        drawFaintRing(x, y, ringR, lineWidth * 0.85);

        if (activeIdx.has(i)) {
          const progress =
            0.55 + 0.35 * (0.5 + 0.5 * Math.sin(time * 1.1 + i * 0.6));
          const color = colors[i % colors.length];
          drawCircle(
            x,
            y,
            ringR,
            color,
            time * 0.5 + i * 0.3,
            progress,
            lineWidth,
          );
        }
      });

      images.forEach((img, i) => {
        const slot = faceSlotFor(i);
        if (!slot) return;
        const floatY = Math.sin(time * 2 + i) * 3;
        drawImageInsideRing(img, slot.x, slot.y + floatY, ringR, lineWidth);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="font-arimo min-h-screen bg-[var(--color-primary-bg)] pt-24"
    >
      <div className="container mx-auto grid min-h-[calc(100vh-96px)] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[620px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        <div className="max-w-xl">
          <div className="mb-6 inline-block">
            <p className="text-lg font-medium text-black">Outsourcing+</p>
            <div className="mt-1 h-[3px] w-full rounded-full bg-black"></div>
          </div>

          <h1
            ref={titleRef}
            className="text-5xl font-normal leading-[1.05] tracking-[-0.05em] text-black sm:text-6xl lg:text-7xl"
          >
            Built to make <br /> you better.
          </h1>

          <p
            ref={textRef}
            className="mt-6 max-w-lg text-lg leading-8 text-black/80"
          >
            We're not traditional outsourcers. We build world-class teams — from
            customer support to workforce solutions — helping you scale faster
            and smarter.
          </p>

          <a
            href="/contact"
            className="group relative mt-8 inline-flex overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
          >
            <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-700 ease-out group-hover:w-full"></span>
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
              Build your Dream Team
            </span>
          </a>

          <div
            ref={cardRef}
            className="mt-10 overflow-hidden rounded-3xl bg-[#A6E6EC] p-6 sm:p-8"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-full border-[8px] border-yellow-300 sm:mx-0">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
                  alt="Customer"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-base font-bold text-black">
                  Global Hiring Director, on Workforce Success
                </h4>
                <p className="mt-4 text-sm leading-6 text-black/75">
                  With years of experience building efficient workforce teams,
                  our approach helps employers hire faster, reduce risk and grow
                  with confidence.
                </p>
              </div>
            </div>

            <div className="mt-8 h-2 overflow-hidden rounded-full bg-black/20">
              <div
                ref={progressRef}
                className="h-full w-0 rounded-full bg-black"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
