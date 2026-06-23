import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Headphones,
  Mail,
  MessageCircle,
  PhoneCall,
  UsersRound,
} from "lucide-react";

const HeroContact = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".contact-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".contact-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
        duration: 1,
        delay: 0.7,
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

    const rr = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
    };

    const drawPerson = (x, y, s, color, headset = true) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.5 + x) * 3);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(0, -22, 9, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      if (headset) {
        ctx.beginPath();
        ctx.arc(0, -22, 15, Math.PI * 1.05, Math.PI * 1.95);
        ctx.stroke();

        rr(-18, -25, 7, 13, 3);
        ctx.fillStyle = "#111";
        ctx.fill();

        rr(11, -25, 7, 13, 3);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(13, -13);
        ctx.lineTo(26, -6);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(0, -13);
      ctx.lineTo(0, 22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(-16, 10 + Math.sin(time * 4 + x) * 3);
      ctx.moveTo(0, -3);
      ctx.lineTo(17, 10 + Math.cos(time * 4 + x) * 3);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 22);
      ctx.lineTo(-11, 42);
      ctx.moveTo(0, 22);
      ctx.lineTo(11, 42);
      ctx.stroke();

      ctx.restore();
    };

    const drawDesk = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-76, -18, 152, 42, 13);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-45, -48, 90, 38, 9);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 3);
      ctx.moveTo(-18, 4);
      ctx.lineTo(18, 4);
      ctx.stroke();

      ctx.restore();
    };

    const drawPhone = (x, y, s, active = true) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 2) * 2);
      ctx.scale(s, s);

      rr(-18, -34, 36, 68, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 23, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      if (active) {
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(0, -4, 38 + i * 15 + Math.sin(time * 4 + i) * 4, -0.65, 0.65);
          ctx.strokeStyle = `rgba(103,217,70,${0.35 - i * 0.08})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const drawSpeechBubble = (x, y, text, color) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.8 + x) * 4);

      rr(-68, -28, 136, 56, 18);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-20, 27);
      ctx.lineTo(-2, 45);
      ctx.lineTo(8, 27);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(text, 0, 4);

      ctx.restore();
    };

    const drawOffice = () => {
      const floorY = h * 0.77;

      ctx.beginPath();
      ctx.moveTo(w * 0.08, floorY);
      ctx.lineTo(w * 0.92, floorY);
      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i < 8; i++) {
        const x = w * 0.12 + i * (w * 0.1);
        ctx.beginPath();
        ctx.moveTo(x, floorY);
        ctx.lineTo(x - 25, h * 0.94);
        ctx.strokeStyle = "rgba(0,0,0,0.08)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const drawConnectionLine = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo((x1 + x2) / 2, y1 - 80, (x1 + x2) / 2, y2 + 80, x2, y2);
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      const p = (time * 0.16) % 1;
      const cx =
        Math.pow(1 - p, 3) * x1 +
        3 * Math.pow(1 - p, 2) * p * ((x1 + x2) / 2) +
        3 * (1 - p) * Math.pow(p, 2) * ((x1 + x2) / 2) +
        Math.pow(p, 3) * x2;

      const cy =
        Math.pow(1 - p, 3) * y1 +
        3 * Math.pow(1 - p, 2) * p * (y1 - 80) +
        3 * (1 - p) * Math.pow(p, 2) * (y2 + 80) +
        Math.pow(p, 3) * y2;

      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawSupportBadge = (x, y) => {
      rr(x - 100, y - 46, 200, 92, 28);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x - 66, y, 22, 0, Math.PI * 2);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x - 66, y - 3, 10, Math.PI * 1.05, Math.PI * 1.95);
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("LIVE SUPPORT", x + 24, y - 8);

      ctx.font = "900 18px Arimo";
      ctx.fillText("CALL PICKED", x + 24, y + 16);

      ctx.beginPath();
      ctx.arc(x + 88, y - 34, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();
    };

    const drawFloatingIcons = () => {
      const icons = [
        [w * 0.12, h * 0.2, "☎"],
        [w * 0.28, h * 0.13, "✉"],
        [w * 0.72, h * 0.15, "●"],
        [w * 0.88, h * 0.28, "↗"],
      ];

      icons.forEach(([x, y, text], i) => {
        ctx.beginPath();
        ctx.arc(
          x + Math.sin(time + i) * 8,
          y + Math.cos(time * 1.1 + i) * 8,
          22,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = i % 2 ? "#FFE994" : "#CFF7BC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#111";
        ctx.font = "900 18px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(
          text,
          x + Math.sin(time + i) * 8,
          y + Math.cos(time * 1.1 + i) * 8 + 6,
        );
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawFloatingIcons();
      drawOffice();

      drawConnectionLine(w * 0.18, h * 0.32, w * 0.48, h * 0.48);
      drawConnectionLine(w * 0.82, h * 0.32, w * 0.55, h * 0.48);

      drawPhone(w * 0.17, h * 0.33, Math.min(w, h) / 760, true);
      drawPhone(w * 0.84, h * 0.34, Math.min(w, h) / 790, true);

      drawSpeechBubble(w * 0.22, h * 0.19, "Need workers?", "#FFE994");
      drawSpeechBubble(w * 0.78, h * 0.21, "We can help", "#CFF7BC");

      drawDesk(w * 0.32, h * 0.69, Math.min(w, h) / 760);
      drawDesk(w * 0.52, h * 0.67, Math.min(w, h) / 760);
      drawDesk(w * 0.72, h * 0.69, Math.min(w, h) / 760);

      drawPerson(w * 0.32, h * 0.62, Math.min(w, h) / 760, "#F4C542", true);
      drawPerson(w * 0.52, h * 0.6, Math.min(w, h) / 760, "#67D946", true);
      drawPerson(w * 0.72, h * 0.62, Math.min(w, h) / 760, "#A6E6EC", true);

      drawSupportBadge(w * 0.5, h * 0.42);

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
      className="font-arimo overflow-hidden bg-[var(--color-primary-bg)] py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="contact-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#FFF9E6] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <Headphones size={14} strokeWidth={2.2} />
              Contact Our Team
            </span>

            <h1 className="mt-5 text-[2.7rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.5rem] lg:text-[4rem]">
              {["Let's", "build"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="contact-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="contact-word inline-block">your</span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="contact-word inline-block text-[#1f7a2e]">
                    workforce.
                  </span>
                </span>

                <svg
                  className="contact-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="contact-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              Need skilled workers, recruitment support, or workforce solutions?
              Our support team is ready to answer your call, understand your
              hiring needs and guide you quickly.
            </p>

            <div className="contact-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [PhoneCall, "Quick call"],
                [MessageCircle, "Live support"],
                [UsersRound, "Hiring help"],
              ].map(([Icon, label]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-[#FFF9E6] px-4 py-3 text-sm font-bold text-black"
                >
                  <Icon size={18} className="mb-2" />
                  {label}
                </div>
              ))}
            </div>

            <div className="contact-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact-form"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Send Inquiry
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="mailto:talk@outsourcezen.com"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                <Mail size={16} />
                Email Us
              </a>
            </div>
          </div>

          <div className="contact-reveal relative h-[440px] w-full sm:h-[520px] lg:h-[620px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroContact;
