import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const OurGole = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".goal-word", {
        y: 70,
        opacity: 0,
        rotateX: 70,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.from(".goal-reveal", {
        y: 45,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".curve-line", {
        scaleX: 0,
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

    const roundRect = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
    };

    const drawCircle = (x, y, r, color) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawDashedCurve = (x1, y1, cx, cy, x2, y2, progress) => {
      ctx.save();
      ctx.setLineDash([12, 12]);
      ctx.lineDashOffset = -time * 45;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#111";

      ctx.beginPath();
      ctx.moveTo(x1, y1);

      const steps = 60;
      for (let i = 0; i <= steps * progress; i++) {
        const t = i / steps;
        const x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
        const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
        ctx.lineTo(x, y);
      }

      ctx.stroke();
      ctx.restore();
    };

    const drawProgressCard = (x, y, width, label, value, progress, large) => {
      const height = large ? 82 : 72;

      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.08)";
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 8;

      ctx.fillStyle = "#FFFEF9";
      roundRect(x, y, width, height, 18);
      ctx.fill();

      ctx.shadowColor = "transparent";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#7ADAD7";
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = `700 ${large ? 17 : 15}px Arimo`;
      ctx.textAlign = "left";
      ctx.fillText(label, x + 28, y + 28);

      if (large) {
        ctx.font = "700 11px Arimo";
        ctx.textAlign = "right";
        ctx.fillText("08 MIN   34 SEC", x + width - 28, y + 28);
      }

      ctx.fillStyle = "rgba(109,211,207,0.22)";
      roundRect(x + 28, y + 44, width - 86, 14, 8);
      ctx.fill();

      ctx.fillStyle = "#11B8C3";
      roundRect(x + 28, y + 44, (width - 86) * progress, 14, 8);
      ctx.fill();

      ctx.fillStyle = "#111";
      ctx.font = "500 11px Arimo";
      ctx.textAlign = "left";
      ctx.fillText("DATA 1", x + 28, y + 68);

      drawCircle(x + width - 2, y + height / 2, 30, "#DDF8F8");
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "700 16px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(value, x + width - 2, y + height / 2 + 5);

      ctx.restore();
    };

    const drawAvatar = (x, y, r) => {
      drawCircle(x, y, r + 24, "#14B8C5");
      drawCircle(x, y, r + 6, "#FFFEF9");

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.clip();

      ctx.fillStyle = "#F5C19B";
      ctx.fillRect(x - r, y - r, r * 2, r * 2);

      ctx.fillStyle = "#222";
      for (let i = 0; i < 16; i++) {
        const a = (Math.PI * 2 * i) / 16;
        drawCircle(
          x + Math.cos(a) * r * 0.55,
          y - r * 0.35 + Math.sin(a) * 9,
          7,
          "#222",
        );
      }

      ctx.fillStyle = "#F2B58C";
      ctx.beginPath();
      ctx.arc(x, y + 4, r * 0.58, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#111";
      drawCircle(x - 9, y, 2.5, "#111");
      drawCircle(x + 9, y, 2.5, "#111");

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y + 10, 9, 0.15, Math.PI - 0.15);
      ctx.stroke();

      ctx.restore();
    };

    const drawIcon = (type, x, y, scale = 1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (type === "star") {
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(5, -5);
        ctx.lineTo(16, -4);
        ctx.lineTo(8, 4);
        ctx.lineTo(10, 15);
        ctx.lineTo(0, 10);
        ctx.lineTo(-10, 15);
        ctx.lineTo(-8, 4);
        ctx.lineTo(-16, -4);
        ctx.lineTo(-5, -5);
        ctx.closePath();
        ctx.stroke();
      }

      if (type === "chat") {
        ctx.beginPath();
        ctx.roundRect(-14, -12, 28, 22, 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(2, 10);
        ctx.lineTo(8, 17);
        ctx.lineTo(7, 9);
        ctx.stroke();
      }

      if (type === "heart") {
        ctx.beginPath();
        ctx.moveTo(0, 12);
        ctx.bezierCurveTo(-18, 0, -13, -14, 0, -6);
        ctx.bezierCurveTo(13, -14, 18, 0, 0, 12);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawCard = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.012;

      const scale = Math.min(w / 560, h / 520, 1.15);
      const cx = w / 2;
      const cy = h / 2 + 10;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.translate(-280, -260);

      const progress = 0.72 + Math.sin(time * 1.4) * 0.22;
      const progress2 = 0.35 + Math.sin(time * 1.8 + 1) * 0.22;

      ctx.save();
      ctx.translate(420, 42);
      ctx.rotate(0.12);
      ctx.fillStyle = "#FFCC00";
      roundRect(0, 0, 170, 395, 16);
      ctx.fill();

      ctx.strokeStyle = "#FFE994";
      ctx.lineWidth = 8;
      for (let i = 35; i < 360; i += 82) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(170, i + 18);
        ctx.stroke();
      }
      ctx.restore();

      ctx.fillStyle = "#FFFEF9";
      roundRect(42, 20, 430, 450, 12);
      ctx.fill();

      ctx.fillStyle = "#B9EEF0";
      ctx.beginPath();
      ctx.moveTo(42, 340);
      ctx.bezierCurveTo(140, 275, 285, 290, 472, 350);
      ctx.lineTo(472, 470);
      ctx.lineTo(42, 470);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#A8E6EA";
      ctx.save();
      ctx.translate(185, 410);
      ctx.rotate(-0.08);
      roundRect(-95, -40, 220, 88, 0);
      ctx.fill();
      ctx.restore();

      const dots = [
        { x: 140, y: 140, label: ["SELECT", "TEAM"] },
        { x: 280, y: 65, label: ["LAUNCH"] },
        { x: 390, y: 140, label: ["ITERATE"] },
      ];

      drawDashedCurve(
        dots[0].x + 30,
        dots[0].y - 30,
        195,
        55,
        dots[1].x - 28,
        dots[1].y + 4,
        progress,
      );
      drawDashedCurve(
        dots[1].x + 32,
        dots[1].y + 4,
        335,
        55,
        dots[2].x - 28,
        dots[2].y - 30,
        progress,
      );

      dots.forEach((dot, i) => {
        const pulse = 1 + Math.sin(time * 2 + i) * 0.04;
        drawCircle(dot.x, dot.y, 38 * pulse, "#FFCC00");

        ctx.fillStyle = "#111";
        ctx.font = "700 12px Arimo";
        ctx.textAlign = "center";
        dot.label.forEach((line, idx) => {
          ctx.fillText(
            line,
            dot.x,
            dot.y + idx * 13 - (dot.label.length > 1 ? 5 : -3),
          );
        });
      });

      ctx.fillStyle = "#FFE682";
      ctx.font = "900 92px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("2", 280, 190);

      ctx.fillStyle = "#111";
      ctx.font = "500 25px Arimo";
      ctx.fillText("- 2 WEEKS -", 280, 170);

      drawAvatar(140, 265, 43);

      drawIcon("star", 80, 242, 0.75);
      drawIcon("chat", 205, 245, 0.8);
      drawIcon("heart", 205, 325, 0.85);

      drawProgressCard(
        250,
        260,
        210,
        "Accuracy Score",
        "+10%",
        progress,
        false,
      );
      drawProgressCard(
        80,
        358,
        390,
        "Ticket Response Time",
        "-31%",
        progress2,
        true,
      );

      ctx.restore();

      frame = requestAnimationFrame(drawCard);
    };

    resize();
    drawCard();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div
        className="absolute inset-x-0 top-0 h-full bg-[#FFE994]"
        style={{
          clipPath: "ellipse(82% 45% at 50% 48%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 text-center">
          <h2 className="overflow-hidden text-4xl font-normal leading-tight tracking-[-0.04em] text-black sm:text-5xl lg:text-6xl">
            <span className="goal-word inline-block">Your</span>{" "}
            <span className="goal-word inline-block">success</span>{" "}
            <span className="goal-word inline-block">is</span>{" "}
            <span className="goal-word inline-block">our</span>{" "}
            <span className="goal-word inline-block italic">mission</span>
          </h2>

          <svg
            className="curve-line mx-auto mt-1 h-5 w-[420px] max-w-full"
            viewBox="0 0 420 24"
            fill="none"
          >
            <path
              d="M14 12C85 4 150 6 210 10C275 15 337 18 406 9"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="goal-reveal max-w-lg">
            <h3 className="text-3xl font-semibold tracking-[-0.03em] text-black">
              You deserve better.
            </h3>

            <p className="mt-4 text-sm leading-6 text-black/75">
              You deserve better outcomes, stronger teams, and a trusted
              workforce process that helps your company grow without delay.
            </p>

            <p className="mt-4 text-sm leading-6 text-black/75">
              Whether you’re selecting your team, launching operations, or
              improving performance, we make the process smooth from start to
              finish.
            </p>

            <a
              href="/contact"
              className="group relative mt-6 inline-flex overflow-hidden rounded-full bg-black px-6 py-3 text-xs font-bold text-white"
            >
              <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-700 ease-out group-hover:w-full"></span>
              <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                Take Mega for a spin
              </span>
            </a>
          </div>

          <div className="goal-reveal relative h-[440px] w-full sm:h-[520px] lg:h-[620px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-20 w-full bg-[var(--color-primary-bg)] [clip-path:polygon(0_70%,100%_100%,100%_100%,0_100%)]" />
    </section>
  );
};

export default OurGole;
