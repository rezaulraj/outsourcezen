import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, FileCheck, Plane, ShieldCheck, Stamp } from "lucide-react";

const HeroVisaDocumentation = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".visa-word", {
        y: 55,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".visa-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".visa-line", {
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

    let w, h, frame;
    let time = 0;

    const docs = Array.from({ length: 8 }, (_, i) => ({
      x: 0.1 + Math.random() * 0.3,
      y: 0.18 + Math.random() * 0.64,
      speed: 0.0014 + Math.random() * 0.0014,
      phase: Math.random() * Math.PI * 2,
      approved: i % 3 !== 0,
    }));

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

    const withShadow = (blur, color, alpha, fn) => {
      ctx.save();
      ctx.shadowBlur = blur;
      ctx.shadowColor = color;
      ctx.shadowOffsetY = blur * 0.35;
      fn();
      ctx.restore();
      void alpha;
    };

    const drawCheck = (x, y, s, color = "#16241c") => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.lineTo(-3, 6);
      ctx.lineTo(10, -9);
      ctx.stroke();
      ctx.restore();
    };

    const drawDoc = (x, y, scale, approved, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + i) * 5);
      ctx.rotate(Math.sin(time * 0.9 + i) * 0.045);
      ctx.scale(scale, scale);

      withShadow(14, "rgba(20,20,10,0.22)", 1, () => {
        rr(-38, -50, 76, 100, 12);
        const g = ctx.createLinearGradient(-38, -50, 38, 50);
        g.addColorStop(0, "#ffffff");
        g.addColorStop(1, "#fbf3da");
        ctx.fillStyle = g;
        ctx.fill();
      });

      rr(-38, -50, 76, 100, 12);
      ctx.strokeStyle = approved
        ? "rgba(22,36,28,0.85)"
        : "rgba(22,36,28,0.22)";
      ctx.lineWidth = approved ? 2 : 1.4;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(16, -50);
      ctx.lineTo(38, -28);
      ctx.lineTo(16, -28);
      ctx.closePath();
      const foldG = ctx.createLinearGradient(16, -50, 38, -28);
      foldG.addColorStop(0, "#ffe994");
      foldG.addColorStop(1, "#f4c542");
      ctx.fillStyle = foldG;
      ctx.fill();
      ctx.strokeStyle = "rgba(22,36,28,0.7)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      for (let n = 0; n < 4; n++) {
        rr(-22, -22 + n * 16, 44 - n * 5, 6, 4);
        ctx.fillStyle = "rgba(22,36,28,0.12)";
        ctx.fill();
      }

      rr(-22, 35, 44, 8, 5);
      const pillG = ctx.createLinearGradient(-22, 35, 22, 43);
      if (approved) {
        pillG.addColorStop(0, "#7fe05b");
        pillG.addColorStop(1, "#4fb52f");
      } else {
        pillG.addColorStop(0, "#ffe994");
        pillG.addColorStop(1, "#f4c542");
      }
      ctx.fillStyle = pillG;
      ctx.fill();

      if (approved) drawCheck(20, 20, 0.6, "#16241c");

      ctx.restore();
    };

    const drawPassport = (x, y) => {
      ctx.save();
      ctx.translate(x, y);

      withShadow(34, "rgba(20,30,15,0.32)", 1, () => {
        rr(-76, -108, 152, 216, 22);
        const cover = ctx.createLinearGradient(-76, -108, 76, 108);
        cover.addColorStop(0, "#1c2b21");
        cover.addColorStop(1, "#0c140e");
        ctx.fillStyle = cover;
        ctx.fill();
      });

      rr(-58, -86, 116, 172, 16);
      const page = ctx.createLinearGradient(-58, -86, 58, 86);
      page.addColorStop(0, "#fffdf5");
      page.addColorStop(1, "#fbf0d2");
      ctx.fillStyle = page;
      ctx.fill();
      ctx.strokeStyle = "rgba(22,36,28,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -18, 33, 0, Math.PI * 2);
      const ring = ctx.createLinearGradient(-33, -51, 33, 15);
      ring.addColorStop(0, "#ffe994");
      ring.addColorStop(1, "#e0a92c");
      ctx.strokeStyle = ring;
      ctx.lineWidth = 5;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, -18, 12, 33, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(22,36,28,0.55)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-31, -18);
      ctx.lineTo(31, -18);
      ctx.strokeStyle = "rgba(22,36,28,0.55)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#16241c";
      ctx.font = "700 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("VISA FILE", 0, 54);

      rr(-38, 68, 76, 10, 6);
      const bar = ctx.createLinearGradient(-38, 68, 38, 78);
      bar.addColorStop(0, "#7fe05b");
      bar.addColorStop(1, "#4fb52f");
      ctx.fillStyle = bar;
      ctx.fill();

      ctx.restore();
    };

    const drawStamp = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.1) * 6);
      ctx.rotate(-0.16 + Math.sin(time * 0.8) * 0.03);

      withShadow(16, "rgba(20,20,10,0.2)", 1, () => {
        rr(-44, -25, 88, 50, 13);
        ctx.fillStyle = "rgba(255,249,230,0.96)";
        ctx.fill();
      });

      ctx.strokeStyle = "#16241c";
      ctx.lineWidth = 2.5;
      rr(-44, -25, 88, 50, 13);
      ctx.stroke();

      ctx.fillStyle = "#e0a92c";
      ctx.font = "800 14px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("APPROVED", 0, 5);

      ctx.restore();
    };

    const drawPlane = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.22 + Math.sin(time * 0.85) * 0.07);
      ctx.scale(s, s);

      ctx.strokeStyle = "#16241c";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(20, -8);
      ctx.lineTo(8, 3);
      ctx.lineTo(20, 12);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,255,255,0.94)";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-3, 3);
      ctx.lineTo(-13, 14);
      ctx.moveTo(-4, -1);
      ctx.lineTo(-13, -13);
      ctx.stroke();

      ctx.restore();
    };

    const drawHub = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 62, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(22,36,28,0.1)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        62,
        -Math.PI / 2 + time * 0.4,
        -Math.PI / 2 +
          time * 0.4 +
          Math.PI * 2 * (0.56 + Math.sin(time * 0.7) * 0.18),
      );
      const arcG = ctx.createLinearGradient(x - 62, y - 62, x + 62, y + 62);
      arcG.addColorStop(0, "#ffe994");
      arcG.addColorStop(1, "#4fb52f");
      ctx.strokeStyle = arcG;
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();

      withShadow(20, "rgba(20,20,10,0.22)", 1, () => {
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fillStyle = "#fffdf5";
        ctx.fill();
      });

      ctx.strokeStyle = "rgba(22,36,28,0.85)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.stroke();

      drawCheck(x, y + 2, 1.15, "#16241c");
    };

    const drawWorker = (x, y) => {
      ctx.save();
      ctx.translate(x, y);

      // desk
      withShadow(18, "rgba(20,20,10,0.18)", 1, () => {
        rr(-72, 38, 144, 14, 7);
        ctx.fillStyle = "#1c2b21";
        ctx.fill();
      });

      // chair / body shadow puddle
      ctx.beginPath();
      ctx.ellipse(-2, 44, 58, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(22,36,28,0.08)";
      ctx.fill();

      // torso
      const bob = Math.sin(time * 1.3) * 2;
      ctx.save();
      ctx.translate(0, bob);

      rr(-30, -38, 60, 64, 18);
      const shirt = ctx.createLinearGradient(-30, -38, 30, 26);
      shirt.addColorStop(0, "#4fb52f");
      shirt.addColorStop(1, "#3a8d22");
      ctx.fillStyle = shirt;
      ctx.fill();

      // head
      ctx.beginPath();
      ctx.arc(0, -56, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#f4c79a";
      ctx.fill();
      ctx.strokeStyle = "rgba(22,36,28,0.5)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // hair
      ctx.beginPath();
      ctx.arc(0, -60, 21, Math.PI, Math.PI * 2);
      ctx.fillStyle = "#16241c";
      ctx.fill();

      // simple downward gaze (focused on the document)
      ctx.beginPath();
      ctx.arc(-6, -52, 1.6, 0, Math.PI * 2);
      ctx.arc(6, -52, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = "#16241c";
      ctx.fill();

      // far arm, fixed, resting on desk
      ctx.beginPath();
      ctx.moveTo(22, -10);
      ctx.quadraticCurveTo(40, 6, 34, 30);
      ctx.strokeStyle = "#3a8d22";
      ctx.lineWidth = 11;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.restore(); // end torso bob

      // document on desk, gently shifting as if being read
      const docShift = Math.sin(time * 1.1) * 3;
      ctx.save();
      ctx.translate(docShift, 36);
      rr(-30, -8, 60, 40, 6);
      ctx.fillStyle = "#fffdf5";
      ctx.fill();
      ctx.strokeStyle = "rgba(22,36,28,0.5)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      for (let n = 0; n < 3; n++) {
        rr(-22, 0 + n * 9, 44 - n * 8, 4, 2);
        ctx.fillStyle = "rgba(22,36,28,0.16)";
        ctx.fill();
      }
      ctx.restore();

      // near arm + magnifier sweeping back and forth across the document,
      // as if actively checking each line
      const sweep = Math.sin(time * 1.8) * 24;
      const handX = docShift + sweep;
      const handY = 30 + Math.sin(time * 1.8) * 1.5;

      ctx.beginPath();
      ctx.moveTo(-20, -6 + bob);
      ctx.quadraticCurveTo(-30 + sweep * 0.3, 14, handX, handY);
      ctx.strokeStyle = "#4fb52f";
      ctx.lineWidth = 11;
      ctx.lineCap = "round";
      ctx.stroke();

      // magnifying glass
      ctx.save();
      ctx.translate(handX, handY);
      ctx.rotate(0.5);
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fill();
      ctx.strokeStyle = "#16241c";
      ctx.lineWidth = 2.4;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(8, 8);
      ctx.lineTo(17, 17);
      ctx.strokeStyle = "#16241c";
      ctx.lineWidth = 3.4;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();

      // a check mark blips in briefly each sweep cycle, as if confirming
      // a line just got reviewed
      const cycle = (time * 1.8) % (Math.PI * 2);
      const blip = cycle > Math.PI * 1.55 && cycle < Math.PI * 1.85;
      if (blip) {
        const blipT = (cycle - Math.PI * 1.55) / (Math.PI * 0.3);
        ctx.save();
        ctx.globalAlpha = Math.sin(blipT * Math.PI);
        drawCheck(handX + 16, handY - 14, 0.7, "#3a8d22");
        ctx.restore();
      }

      ctx.restore();
    };

    const drawFlow = (x1, y1, x2, y2, color) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 55, x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([7, 11]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.013;

      const hubX = w * 0.5;
      const hubY = h * 0.5;
      const passX = w * 0.78;
      const passY = h * 0.5;

      docs.forEach((d, i) => {
        d.x += d.speed;
        if (d.x > 0.4) d.x = 0.06;

        drawDoc(d.x * w, d.y * h, Math.min(w, h) / 800, d.approved, i);
      });

      drawFlow(w * 0.34, h * 0.24, hubX - 70, hubY - 18, "rgba(22,36,28,0.1)");
      drawFlow(w * 0.34, h * 0.5, hubX - 70, hubY, "rgba(22,36,28,0.1)");
      drawFlow(w * 0.34, h * 0.76, hubX - 70, hubY + 18, "rgba(22,36,28,0.1)");
      drawFlow(hubX + 70, hubY, passX - 85, passY, "#e0a92c");

      for (let i = 0; i < 12; i++) {
        const t = (time * 0.16 + i / 12) % 1;
        const x = hubX + 78 + (passX - hubX - 165) * t;
        const y = hubY + Math.sin(t * Math.PI) * -35;
        ctx.beginPath();
        ctx.arc(x, y, 3.6, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 ? "#4fb52f" : "#e0a92c";
        ctx.fill();
      }

      drawWorker(w * 0.2, hubY + 30);
      drawHub(hubX, hubY);
      drawPassport(passX, passY);
      drawStamp(passX, passY - 150);
      drawPlane(passX + Math.sin(time * 0.85) * 34, passY + 170, 1.05);

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
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] pt-26"
    >
      <div className="relative z-10 container mx-auto rounded-xl px-4 ">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="visa-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <FileCheck size={14} strokeWidth={2.2} />
              Visa & Documentation Support
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Visa", "files", "prepared"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="visa-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="visa-word inline-block">clearly.</span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="visa-word inline-block text-[#1f7a2e]">
                    Deploy smoothly.
                  </span>
                </span>

                <svg
                  className="visa-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="visa-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              We support employers and selected workers with organized visa
              files, contracts, document checks and deployment paperwork.
            </p>

            <div className="visa-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [ShieldCheck, "Document checks"],
                [Stamp, "Visa file support"],
                [Plane, "Travel ready"],
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

            <div className="visa-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Start Documentation
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
                View process
              </a>
            </div>
          </div>

          <div className="visa-reveal relative h-[420px] w-full sm:h-[500px] lg:h-[590px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVisaDocumentation;
