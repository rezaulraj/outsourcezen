import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, BadgeCheck } from "lucide-react";

const points = [
  "Guest-first mindset",
  "Service excellence",
  "Professional grooming",
  "Communication skills",
];

const stats = [
  { value: "95%", label: "Guest Satisfaction Focus" },
  { value: "48 Hours", label: "Initial Shortlisting" },
  { value: "20+", label: "Hospitality Sectors" },
  { value: "100%", label: "Service-Oriented Approach" },
];

/**
 * CANVAS CONCEPT — Hotel cross-section scene:
 *
 * A three-storey hotel building slice sits in the canvas. Each floor
 * shows a different department staffed by animated figures doing their
 * specific job:
 *
 *   Floor 0 (ground) – RECEPTION: a concierge waves/gestures at an
 *     arriving guest who walks in from the left carrying a suitcase.
 *     A star-rating badge floats up from the interaction.
 *
 *   Floor 1 (middle) – RESTAURANT: a waiter walks a tray from a
 *     kitchen hatch on the right to a table on the left. A small
 *     speech-bubble "Thank you!" drifts up from the table.
 *
 *   Floor 2 (top) – HOUSEKEEPING: a housekeeper pushes a linen
 *     trolley across the corridor. A sparkle effect trails behind
 *     the freshly made bed.
 *
 * An elevator cage slides up and down the right-hand lift shaft.
 * Floating ★ star reviews drift upward continuously from the building.
 * A doorman stands at the hotel entrance on the left, holding the door.
 */

const WhatHospitalityRecruitment = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hospitality-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".hospitality-what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".hospitality-check", {
        y: 25,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.45,
        ease: "power3.out",
      });

      gsap.from(".hospitality-stat", {
        y: 30,
        opacity: 0,
        scale: 0.94,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.6,
        ease: "back.out(1.5)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h, frame;
    let time = 0;

    // floating stars array
    const stars = Array.from({ length: 14 }, (_, i) => ({
      x: 0.2 + Math.random() * 0.6,
      y: 0.5 + Math.random() * 0.4,
      speed: 0.0006 + Math.random() * 0.0008,
      alpha: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      size: 8 + Math.random() * 6,
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

    // ── helpers ──────────────────────────────────────────────────────────

    const drawStar = (cx, cy, r, fill, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = fill;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const ai = a + Math.PI / 5;
        if (i === 0) ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        else ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        ctx.lineTo(cx + r * 0.42 * Math.cos(ai), cy + r * 0.42 * Math.sin(ai));
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawSpeechBubble = (x, y, text, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      const tw = ctx.measureText(text).width + 20;
      rr(x - tw / 2, y - 16, tw, 24, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.fillStyle = "#111";
      ctx.font = "700 10px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(text, x, y - 0);
      ctx.restore();
    };

    // generic humanoid – hairStyle: 0=bun, 1=cap, 2=chef-hat, 3=bell-cap
    const drawPerson = (x, y, sc, bodyColor, headAcc, armL, armR) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(sc, sc);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // body
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 16);
      ctx.strokeStyle = "#111";
      ctx.stroke();
      // shirt fill
      rr(-9, -10, 18, 26, 4);
      ctx.fillStyle = bodyColor;
      ctx.fill();
      ctx.stroke();

      // arms
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(armL.x, armL.y);
      ctx.moveTo(0, -4);
      ctx.lineTo(armR.x, armR.y);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.6;
      ctx.stroke();

      // legs
      ctx.beginPath();
      ctx.moveTo(0, 16);
      ctx.lineTo(-7, 30);
      ctx.moveTo(0, 16);
      ctx.lineTo(7, 30);
      ctx.lineWidth = 3;
      ctx.stroke();

      // head
      ctx.beginPath();
      ctx.arc(0, -18, 9, 0, Math.PI * 2);
      ctx.fillStyle = "#f5c89a";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      // hair accessory
      if (headAcc === 1) {
        // cap
        rr(-11, -27, 22, 10, 5);
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.stroke();
        rr(-14, -29, 28, 5, 3);
        ctx.fillStyle = "#e7b53a";
        ctx.fill();
        ctx.stroke();
      } else if (headAcc === 2) {
        // chef hat
        rr(-8, -36, 16, 18, 4);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.stroke();
        rr(-11, -28, 22, 7, 3);
        ctx.fillStyle = "#ddd";
        ctx.fill();
        ctx.stroke();
      } else if (headAcc === 3) {
        // bell-boy / concierge cap – flat top
        rr(-11, -30, 22, 12, 3);
        ctx.fillStyle = "#111";
        ctx.fill();
        rr(-14, -21, 28, 5, 2);
        ctx.fillStyle = "#111";
        ctx.fill();
      } else {
        // simple bun / maid headband
        ctx.beginPath();
        ctx.arc(0, -25, 5, Math.PI, Math.PI * 2);
        ctx.fillStyle = "#c8a87a";
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    };

    // ── hotel building ────────────────────────────────────────────────────

    const drawBuilding = () => {
      const bLeft = w * 0.06;
      const bRight = w * 0.9;
      const bTop = h * 0.06;
      const bBottom = h * 0.94;
      const bw = bRight - bLeft;
      const bh = bBottom - bTop;
      const floorH = bh / 3;
      const wallThick = 3;

      // outer shell
      rr(bLeft, bTop, bw, bh, 18);
      ctx.fillStyle = "#fffdf5";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = wallThick;
      ctx.stroke();

      // floor dividers
      for (let f = 1; f < 3; f++) {
        const fy = bTop + floorH * f;
        ctx.beginPath();
        ctx.moveTo(bLeft, fy);
        ctx.lineTo(bRight, fy);
        ctx.strokeStyle = "rgba(0,0,0,0.18)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // floor labels (left gutter inside)
      const labels = ["RECEPTION", "RESTAURANT", "HOUSEKEEPING"];
      labels.forEach((label, i) => {
        ctx.save();
        ctx.translate(bLeft + 18, bTop + floorH * i + floorH * 0.5 + 4);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = "rgba(0,0,0,0.22)";
        ctx.font = "600 9px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(label, 0, 0);
        ctx.restore();
      });

      // lift shaft on the far right
      const liftX = bRight - 38;
      rr(liftX, bTop, 32, bh, 6);
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.22)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // lift cable
      ctx.beginPath();
      ctx.moveTo(liftX + 16, bTop + 6);
      ctx.lineTo(liftX + 16, bBottom - 6);
      ctx.strokeStyle = "rgba(0,0,0,0.2)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // elevator cage – slides between floors
      const liftCycle = (Math.sin(time * 0.45) + 1) / 2;
      const liftY = bTop + 8 + (bh - 60) * liftCycle;
      rr(liftX + 4, liftY, 24, 44, 5);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();
      // elevator doors line
      ctx.beginPath();
      ctx.moveTo(liftX + 16, liftY + 4);
      ctx.lineTo(liftX + 16, liftY + 40);
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // windows on each floor (decorative)
      for (let f = 0; f < 3; f++) {
        for (let wi = 0; wi < 4; wi++) {
          const wx = bLeft + 55 + wi * ((bw - 100) / 4);
          const wy = bTop + f * floorH + floorH * 0.3;
          rr(wx, wy, 30, 22, 5);
          ctx.fillStyle = `rgba(244,197,66,${0.18 + 0.12 * Math.sin(time * 1.2 + f + wi)})`;
          ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.2)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      return { bLeft, bRight, bTop, floorH, bh };
    };

    // ── Floor 0: RECEPTION ────────────────────────────────────────────────

    const drawReception = (bLeft, bRight, floorTop, floorH) => {
      const deskLeft = bLeft + (bRight - bLeft) * 0.34;
      const deskY = floorTop + floorH * 0.55;
      const deskW = 90;

      // reception desk
      rr(deskLeft, deskY, deskW, 18, 6);
      ctx.fillStyle = "#1c2b21";
      ctx.fill();
      rr(deskLeft - 4, deskY - 6, deskW + 8, 10, 5);
      ctx.fillStyle = "#2e4a38";
      ctx.fill();

      // computer screen on desk
      rr(deskLeft + 14, deskY - 24, 22, 18, 3);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // concierge behind desk (stationary, gentle wave)
      const waveA = Math.sin(time * 1.8) * 8;
      drawPerson(
        deskLeft + 52,
        deskY - 12,
        0.72,
        "#FFE994",
        3,
        { x: -12, y: 10 },
        { x: 14 + waveA * 0.5, y: -2 - Math.abs(waveA) * 0.3 },
      );

      // arriving guest with suitcase, walks in from the left
      const guestP = (time * 0.14) % 1;
      const guestX = bLeft + 36 + (deskLeft - bLeft - 60) * guestP;
      const guestY = deskY - 10;
      // suitcase
      rr(guestX + 14, guestY + 10, 10, 14, 3);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      // handle
      ctx.beginPath();
      ctx.moveTo(guestX + 17, guestY + 10);
      ctx.lineTo(guestX + 17, guestY + 6);
      ctx.lineTo(guestX + 21, guestY + 6);
      ctx.lineTo(guestX + 21, guestY + 10);
      ctx.stroke();

      drawPerson(
        guestX,
        guestY,
        0.68,
        "#CFF7BC",
        0,
        { x: -12, y: 8 },
        { x: 14, y: 8 },
      );

      // star rating bubble that fades in when guest arrives near desk
      const nearDesk = Math.max(0, guestP - 0.7) / 0.3;
      if (nearDesk > 0) {
        ctx.save();
        ctx.globalAlpha = nearDesk * Math.min(1, (1 - guestP) * 10);
        const bx = deskLeft + 20;
        const by = deskY - 50 - nearDesk * 20;
        for (let s = 0; s < 5; s++) {
          drawStar(bx + s * 14 - 28, by, 6, "#F4C542", 1);
        }
        ctx.restore();
      }
    };

    // ── Floor 1: RESTAURANT ───────────────────────────────────────────────

    const drawRestaurant = (bLeft, bRight, floorTop, floorH) => {
      const tableX = bLeft + (bRight - bLeft) * 0.22;
      const tableY = floorTop + floorH * 0.58;

      // table + two chairs outline
      rr(tableX - 26, tableY, 52, 12, 5);
      ctx.fillStyle = "#1c2b21";
      ctx.fill();
      rr(tableX - 22, tableY - 22, 16, 22, 4);
      ctx.fillStyle = "#2e4a38";
      ctx.fill();
      rr(tableX + 6, tableY - 22, 16, 22, 4);
      ctx.fillStyle = "#2e4a38";
      ctx.fill();

      // guest seated at table (simple seated figure)
      ctx.beginPath();
      ctx.arc(tableX - 14, tableY - 32, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#f5c89a";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      // speech bubble over guest
      const bubbleAlpha = (Math.sin(time * 1.1) + 1) / 2;
      drawSpeechBubble(
        tableX - 12,
        tableY - 52,
        "Thank you!",
        bubbleAlpha * 0.85,
      );

      // kitchen hatch on right
      const hatchX = bRight - 90;
      const hatchY = floorTop + floorH * 0.35;
      rr(hatchX, hatchY, 46, 32, 6);
      ctx.fillStyle = "#f0efe8";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();
      // chef visible in hatch
      drawPerson(
        hatchX + 23,
        hatchY + 18,
        0.55,
        "#fff",
        2,
        { x: -10, y: 6 },
        { x: 10, y: 6 },
      );

      // waiter walking from kitchen to table with tray
      const waiterP = (time * 0.16) % 1;
      const waiterX = hatchX - (hatchX - tableX - 40) * waiterP;
      const waiterY = floorTop + floorH * 0.55;

      // tray (dish on top)
      ctx.beginPath();
      ctx.ellipse(waiterX + 14, waiterY - 18, 18, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      rr(waiterX + 8, waiterY - 26, 12, 9, 4);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.stroke();

      drawPerson(
        waiterX,
        waiterY,
        0.7,
        "#A6E6EC",
        1,
        { x: -12, y: 8 },
        { x: 14, y: -18 },
      );
    };

    // ── Floor 2: HOUSEKEEPING ─────────────────────────────────────────────

    const drawHousekeeping = (bLeft, bRight, floorTop, floorH) => {
      // bed
      const bedX = bLeft + (bRight - bLeft) * 0.52;
      const bedY = floorTop + floorH * 0.48;
      rr(bedX - 44, bedY - 10, 88, 38, 8);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();
      // pillow
      rr(bedX - 36, bedY - 4, 28, 18, 6);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.stroke();
      rr(bedX + 8, bedY - 4, 28, 18, 6);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.stroke();
      // sparkle on freshly made bed
      const sparkleAlpha = (Math.sin(time * 2.4) + 1) / 2;
      ctx.save();
      ctx.globalAlpha = sparkleAlpha * 0.7;
      ctx.fillStyle = "#F4C542";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.fillText("✦", bedX - 16, bedY + 10);
      ctx.fillText("✦", bedX + 16, bedY + 6);
      ctx.restore();

      // trolley – moves back and forth
      const trolleyP = (Math.sin(time * 0.55) + 1) / 2;
      const trolleyX = bLeft + 48 + (bedX - bLeft - 100) * trolleyP;
      const trolleyY = floorTop + floorH * 0.62;

      // cart body
      rr(trolleyX - 16, trolleyY - 24, 32, 32, 6);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();
      // shelves
      ctx.beginPath();
      ctx.moveTo(trolleyX - 14, trolleyY - 12);
      ctx.lineTo(trolleyX + 14, trolleyY - 12);
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // wheels
      ctx.beginPath();
      ctx.arc(trolleyX - 10, trolleyY + 8, 5, 0, Math.PI * 2);
      ctx.arc(trolleyX + 10, trolleyY + 8, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      // housekeeper pushing trolley
      drawPerson(
        trolleyX - 22,
        trolleyY - 8,
        0.68,
        "#CFF7BC",
        0,
        { x: 12, y: 6 },
        { x: 18, y: 2 },
      );
    };

    // ── floating ★ reviews ────────────────────────────────────────────────

    const drawFloatingStars = () => {
      stars.forEach((s) => {
        s.y -= s.speed;
        if (s.y < -0.05) s.y = 0.95 + Math.random() * 0.05;
        const alpha = s.alpha * (0.5 + 0.5 * Math.sin(time * 1.4 + s.phase));
        drawStar(s.x * w, s.y * h, s.size, "#F4C542", alpha * 0.65);
      });
    };

    // ── hotel name sign ───────────────────────────────────────────────────

    const drawHotelSign = (bLeft, bRight, bTop) => {
      const signW = 160;
      const signX = bLeft + (bRight - bLeft) / 2 - signW / 2;
      const signY = bTop - 36;
      rr(signX, signY, signW, 30, 10);
      ctx.fillStyle = "#1c2b21";
      ctx.fill();
      ctx.fillStyle = "#FFE994";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(
        "★  GRAND HOTEL  ★",
        bLeft + (bRight - bLeft) / 2,
        signY + 20,
      );
    };

    // ── main draw loop ────────────────────────────────────────────────────

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.013;

      drawFloatingStars();

      const { bLeft, bRight, bTop, floorH } = drawBuilding();

      drawReception(bLeft, bRight, bTop + floorH * 2, floorH);
      drawRestaurant(bLeft, bRight, bTop + floorH * 1, floorH);
      drawHousekeeping(bLeft, bRight, bTop, floorH);

      drawHotelSign(bLeft, bRight, bTop);

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
      className="font-arimo relative bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="hospitality-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
              What Is Hospitality Recruitment?
            </p>

            <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
              {[
                "Connecting",
                "service",
                "professionals",
                "with",
                "guest",
                "experiences",
              ].map((word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="hospitality-what-word inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            <p className="hospitality-what-reveal mt-6 max-w-xl text-base leading-7 text-black/75">
              Hospitality recruitment focuses on identifying, screening and
              deploying service-oriented professionals for hotels, resorts,
              restaurants, cruise operations and guest-facing businesses. The
              goal is to make every guest interaction feel professional, warm
              and memorable.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((item) => (
                <div
                  key={item}
                  className="hospitality-check flex items-center gap-3 rounded-2xl border border-black/10 bg-[#FFF9E6] p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFE994]">
                    <BadgeCheck size={20} strokeWidth={2.4} />
                  </div>
                  <p className="text-sm font-bold text-black">{item}</p>
                </div>
              ))}
            </div>

            <div className="hospitality-what-reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
              >
                Request Hospitality Staff
                <ArrowRight size={16} />
              </a>

              <a
                href="/industries/hospitality"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black"
              >
                View hospitality roles
              </a>
            </div>
          </div>

          <div className="hospitality-what-reveal relative h-[460px] overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] sm:h-[560px] lg:h-[640px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="hospitality-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <p className="text-4xl font-normal tracking-[-0.06em] text-black">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatHospitalityRecruitment;
