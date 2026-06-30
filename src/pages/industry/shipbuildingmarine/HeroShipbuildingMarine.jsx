import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Globe2,
  ShieldCheck,
  Ship,
  UsersRound,
} from "lucide-react";

const stats = [
  { value: "2200+", label: "Marine Workers" },
  { value: "120+", label: "Shipyard Projects" },
  { value: "30+", label: "Countries Supported" },
];

/**
 * SCENE CONCEPT — Shipyard build-and-launch cycle:
 *
 * The ship sits in dry dock on a slipway. Over a ~14s cycle:
 *   0–65%  BUILD PHASE  — scaffolding visible, hull plates highlight one
 *           by one, crane lowers a container/section onto the deck, sparks
 *           fly from the welder.
 *   65–80% LAUNCH PHASE — scaffolding fades, the ship slides down the
 *           slipway into the water, a splash bursts, gulls scatter.
 *   80–100% FLOATING    — ship bobs in open water, horn blast rings (text
 *           "DEPLOYED ✓"), then resets to the build phase.
 *
 * Five workers, each with a distinct, clearly different animated task:
 *   1. WELDER     — torch arcs against the hull, shower of sparks
 *   2. RIGGER     — operates the crane controls, guides the swinging load
 *   3. PAINTER    — roller sweeps up/down the hull in long strokes
 *   4. PIPEFITTER — wrench turns on a pipe joint, steam puffs occasionally
 *   5. INSPECTOR  — walks a short patrol path holding a clipboard, pauses
 *      to tick items
 */

const HeroShipbuildingMarine = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".marine-word", {
        y: 70,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });
      gsap.from(".marine-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });
      gsap.from(".marine-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
        duration: 1,
        delay: 0.75,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w,
      h,
      frame,
      time = 0;

    // splash particles, created on launch
    let splashParticles = [];
    let lastPhaseWasLaunch = false;
    let gulls = Array.from({ length: 4 }, (_, i) => ({
      x: Math.random(),
      y: 0.1 + Math.random() * 0.15,
      speed: 0.0003 + Math.random() * 0.0003,
      ph: i,
    }));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.parentElement.offsetWidth;
      h = canvas.parentElement.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rr = (x, y, W, H, r) => {
      ctx.beginPath();
      ctx.roundRect(x, y, W, H, r);
    };

    // ── background ───────────────────────────────────────────────────
    const drawBackground = () => {
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#FFF9E6");
      sky.addColorStop(0.48, "#F2E5C8");
      sky.addColorStop(0.76, "#D8C4A1");
      sky.addColorStop(1, "#A9B7BA");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.globalAlpha = 0.07;
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

      for (let i = 0; i < 28; i++) {
        const x = ((i * 91) % w) + Math.sin(time + i) * 9;
        const y = ((i * 41) % (h * 0.55)) + Math.cos(time * 1.1 + i) * 7;
        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.25)";
        ctx.fill();
      }

      // gulls
      gulls.forEach((g) => {
        g.x += g.speed;
        if (g.x > 1.1) g.x = -0.1;
        const gx = g.x * w,
          gy = g.y * h + Math.sin(time * 1.5 + g.ph) * 8;
        ctx.save();
        ctx.translate(gx, gy);
        ctx.strokeStyle = "rgba(0,0,0,0.35)";
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        const flap = Math.sin(time * 6 + g.ph) * 4;
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.quadraticCurveTo(-3, -3 - flap, 0, 0);
        ctx.quadraticCurveTo(3, -3 - flap, 6, 0);
        ctx.stroke();
        ctx.restore();
      });
    };

    const drawWater = (floorY) => {
      ctx.fillStyle = "#8EA5AA";
      ctx.fillRect(0, floorY, w, h - floorY);
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        const yy = floorY + 18 + i * 24;
        for (let x = -40; x <= w + 40; x += 30) {
          const waveY = yy + Math.sin(x * 0.02 + time * 2 + i) * 4;
          if (x === -40) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.strokeStyle = "rgba(255,255,255,0.28)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const drawDock = (floorY) => {
      ctx.fillStyle = "#2D2720";
      ctx.fillRect(0, floorY - 22, w, 28);
      for (let i = 0; i < 10; i++) {
        const x = i * (w / 9);
        ctx.beginPath();
        ctx.moveTo(x, floorY - 22);
        ctx.lineTo(x - 40, h);
        ctx.strokeStyle = "rgba(0,0,0,0.35)";
        ctx.lineWidth = 5;
        ctx.stroke();
      }
    };

    // slipway rails leading into the water (visible during build phase)
    const drawSlipway = (cx, floorY, alpha) => {
      if (alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      [-46, 46].forEach((off) => {
        ctx.beginPath();
        ctx.moveTo(cx + off - 30, floorY - 24);
        ctx.lineTo(cx + off + 60, floorY + 40);
        ctx.strokeStyle = "rgba(0,0,0,0.5)";
        ctx.lineWidth = 4;
        ctx.stroke();
      });
      ctx.restore();
    };

    const drawShip = (x, y, s, launchT, hullProgress) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(-230, -40);
      ctx.lineTo(210, -40);
      ctx.quadraticCurveTo(170, 65, -150, 58);
      ctx.quadraticCurveTo(-230, 35, -230, -40);
      ctx.closePath();

      const hull = ctx.createLinearGradient(0, -45, 0, 70);
      hull.addColorStop(0, "#1A242E");
      hull.addColorStop(0.58, "#243849");
      hull.addColorStop(0.59, "#8B3E2F");
      hull.addColorStop(1, "#5B2B25");
      ctx.fillStyle = hull;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      // hull plate highlight sweep during build phase — shows construction
      // progress moving across the hull
      if (hullProgress < 1) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(-230, -40);
        ctx.lineTo(210, -40);
        ctx.quadraticCurveTo(170, 65, -150, 58);
        ctx.quadraticCurveTo(-230, 35, -230, -40);
        ctx.closePath();
        ctx.clip();
        const sweepX = -230 + 440 * hullProgress;
        ctx.fillStyle = "rgba(244,197,66,0.35)";
        ctx.fillRect(sweepX - 14, -50, 28, 130);
        ctx.restore();
      }

      for (let i = 0; i < 9; i++) {
        ctx.beginPath();
        ctx.arc(-155 + i * 40, -15, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rr(-90, -110, 170, 68, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i < 6; i++) {
        rr(-70 + i * 25, -92, 12, 12, 3);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(-40, -110);
      ctx.lineTo(-40, -170);
      ctx.lineTo(-18, -160);
      ctx.lineTo(-40, -150);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      // horn blast rings during the "deployed" celebration moment
      if (launchT > 0.82 && launchT < 1) {
        const hp = (launchT - 0.82) / 0.18;
        ctx.save();
        ctx.globalAlpha = (1 - hp) * 0.7;
        ctx.beginPath();
        ctx.arc(-29, -163, 10 + hp * 30, -0.6, 0.6);
        ctx.strokeStyle = "#F4C542";
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    };

    const drawScaffold = (x, y, s, alpha) => {
      if (alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.scale(s, s);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      for (let i = 0; i < 5; i++) {
        const xx = i * 28;
        ctx.beginPath();
        ctx.moveTo(xx, 0);
        ctx.lineTo(xx, -150);
        ctx.stroke();
      }
      for (let j = 0; j < 6; j++) {
        const yy = -j * 30;
        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.lineTo(112, yy);
        ctx.stroke();
      }
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 28, 0);
        ctx.lineTo((i + 1) * 28, -30);
        ctx.strokeStyle = "rgba(0,0,0,0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawCrane = (x, y, s, flip, swingPhase, deliverProgress) => {
      ctx.save();
      ctx.translate(x, y);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -260);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -235);
      ctx.lineTo(210, -300);
      ctx.moveTo(0, -235);
      ctx.lineTo(170, -220);
      ctx.moveTo(40, -247);
      ctx.lineTo(55, -230);
      ctx.moveTo(80, -260);
      ctx.lineTo(98, -236);
      ctx.moveTo(120, -272);
      ctx.lineTo(140, -228);
      ctx.stroke();

      // hook swings during build, lowers a load when delivering
      const hookX = 170 + Math.sin(swingPhase) * 16;
      const dropY = -145 + deliverProgress * 60;

      ctx.beginPath();
      ctx.moveTo(hookX, -285);
      ctx.lineTo(hookX, dropY);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(hookX - 30, dropY + 15 + Math.sin(time * 1.4) * 5, 60, 48, 4);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-38, -20, 76, 28, 6);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    // ── 5 distinct worker roles ──────────────────────────────────────
    const drawWorker = (x, y, s, color, action, flip, phase) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.3 + phase) * 2);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(s, s);
      const t = time + phase;

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // legs (action-specific stance)
      if (action === "patrol") {
        const stride = Math.sin(t * 4) * 10;
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.lineTo(-10 + stride, 28);
        ctx.moveTo(8, 0);
        ctx.lineTo(10 - stride, 28);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.lineTo(-13, 28);
        ctx.moveTo(8, 0);
        ctx.lineTo(13, 28);
        ctx.stroke();
      }

      // torso
      rr(-18, -45, 36, 48, 8);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      let rightX = 40,
        rightY = -26 + Math.sin(t * 3.5) * 4;
      let leftX = -34,
        leftY = -18 + Math.sin(t * 3) * 3;

      if (action === "weld") {
        rightX = 45;
        rightY = -20;
      }
      if (action === "rig") {
        rightX = 42;
        rightY = -52;
      }
      if (action === "paint") {
        rightX = 44;
        rightY = -28 + Math.sin(t * 2.6) * 22;
      }
      if (action === "pipe") {
        rightX = 38;
        rightY = -14;
        leftX = -28;
        leftY = -12;
      }
      if (action === "patrol") {
        rightX = 30;
        rightY = -38;
      }

      ctx.beginPath();
      ctx.moveTo(-15, -34);
      ctx.lineTo(leftX, leftY);
      ctx.moveTo(15, -34);
      ctx.lineTo(rightX, rightY);
      ctx.strokeStyle = color;
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(leftX, leftY, 5, 0, Math.PI * 2);
      ctx.arc(rightX, rightY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── WELDER: torch + spark shower ──────────────────────────────
      if (action === "weld") {
        ctx.save();
        ctx.translate(rightX + 10, rightY);
        ctx.rotate(-0.2);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(28, 8);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.stroke();
        for (let i = 0; i < 8; i++) {
          const a = (Math.PI * 2 * i) / 8 + time * 5;
          const r = 8 + Math.sin(time * 8 + i) * 5;
          ctx.beginPath();
          ctx.moveTo(30, 8);
          ctx.lineTo(30 + Math.cos(a) * r, 8 + Math.sin(a) * r);
          ctx.strokeStyle = "#FFD36B";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── RIGGER: holds a control box, gestures upward to guide crane ──
      if (action === "rig") {
        ctx.save();
        ctx.translate(rightX, rightY);
        rr(-7, -6, 14, 12, 2);
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.4;
        ctx.stroke();
        // antenna blinking
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.lineTo(0, -11);
        ctx.stroke();
        if (Math.sin(time * 5) > 0) {
          ctx.beginPath();
          ctx.arc(0, -12, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#67D946";
          ctx.fill();
        }
        ctx.restore();
        // free hand pointing up signalling the crane
        ctx.beginPath();
        ctx.moveTo(leftX, leftY);
        ctx.lineTo(leftX - 4, leftY - 16);
        ctx.strokeStyle = color;
        ctx.lineWidth = 6;
        ctx.stroke();
      }

      // ── PAINTER: roller sweeping with paint trail ─────────────────
      if (action === "paint") {
        ctx.save();
        ctx.translate(rightX, rightY);
        rr(-9, -4, 18, 8, 4);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.restore();
        // faint paint streak trail
        ctx.save();
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.moveTo(rightX, -50);
        ctx.lineTo(rightX, rightY);
        ctx.strokeStyle = "#A6E6EC";
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.restore();
      }

      // ── PIPEFITTER: wrench turning + steam puffs ───────────────────
      if (action === "pipe") {
        // pipe joint
        rr(rightX + 2, rightY - 5, 22, 10, 4);
        ctx.fillStyle = "#999";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // wrench rotating back and forth on the joint
        ctx.save();
        ctx.translate(rightX + 12, rightY);
        ctx.rotate(Math.sin(t * 3.2) * 0.5);
        ctx.beginPath();
        ctx.moveTo(-12, 0);
        ctx.lineTo(12, 0);
        ctx.strokeStyle = "#444";
        ctx.lineWidth = 3.4;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.restore();
        // occasional steam puff
        const puffT = (t * 0.6) % 3;
        if (puffT < 1) {
          ctx.save();
          ctx.globalAlpha = (1 - puffT) * 0.5;
          ctx.beginPath();
          ctx.arc(
            rightX + 12,
            rightY - 8 - puffT * 14,
            4 + puffT * 8,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = "#fff";
          ctx.fill();
          ctx.restore();
        }
      }

      // ── INSPECTOR: clipboard, occasional checkmark tick ─────────────
      if (action === "patrol") {
        ctx.save();
        ctx.translate(rightX + 8, rightY - 6);
        ctx.rotate(-0.15);
        rr(-9, -14, 18, 24, 3);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.4;
        ctx.stroke();
        for (let l = 0; l < 3; l++) {
          ctx.beginPath();
          ctx.moveTo(-5, -7 + l * 6);
          ctx.lineTo(5, -7 + l * 6);
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        // tick mark flashes periodically
        const tickT = (t * 0.8) % 4;
        if (tickT < 0.5) {
          ctx.save();
          ctx.globalAlpha = 1 - tickT * 2;
          ctx.strokeStyle = "#67D946";
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(-3, -1);
          ctx.lineTo(0, 2);
          ctx.lineTo(5, -5);
          ctx.stroke();
          ctx.restore();
        }
        ctx.restore();
      }

      // neck + head
      ctx.beginPath();
      ctx.moveTo(0, -45);
      ctx.lineTo(0, -52);
      ctx.strokeStyle = "#E7B58B";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -66, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rr(-17, -82, 34, 12, 5);
      ctx.fillStyle = "#F4C542";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -74);
      ctx.quadraticCurveTo(0, -95, 18, -74);
      ctx.fillStyle = "#F4C542";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-5, -65, 2, 0, Math.PI * 2);
      ctx.arc(5, -65, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -58, 4, 0.1, Math.PI - 0.1);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawContainers = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);
      const colors = ["#A6E6EC", "#CFF7BC", "#FFE994"];
      for (let i = 0; i < 5; i++) {
        const xx = (i % 3) * 62,
          yy = -Math.floor(i / 3) * 34;
        rr(xx, yy, 58, 30, 4);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
        for (let k = 1; k < 4; k++) {
          ctx.beginPath();
          ctx.moveTo(xx + k * 13, yy + 3);
          ctx.lineTo(xx + k * 13, yy + 27);
          ctx.strokeStyle = "rgba(0,0,0,0.18)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    const drawHiringPanel = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.35) * 5);
      rr(-132, -64, 264, 128, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("MARINE HIRING FLOW", 0, -36);
      const steps = ["Source", "Certify", "Deploy", "Onboard"];
      steps.forEach((step, i) => {
        const px = -78 + i * 52;
        const active = i <= Math.floor((time * 0.7) % steps.length);
        ctx.beginPath();
        ctx.arc(px, 8, 17, 0, Math.PI * 2);
        ctx.fillStyle = active ? "#67D946" : "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
        if (active) {
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(px - 7, 8);
          ctx.lineTo(px - 2, 14);
          ctx.lineTo(px + 9, -1);
          ctx.stroke();
        }
        ctx.fillStyle = "#111";
        ctx.font = "800 9px Arimo";
        ctx.fillText(step, px, 40);
        if (i < steps.length - 1) {
          ctx.beginPath();
          ctx.moveTo(px + 22, 8);
          ctx.lineTo(px + 32, 8);
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
      ctx.restore();
    };

    const drawFloatingCard = (x, y, title, value, color, phase) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.45 + phase) * 6);
      rr(-92, -32, 184, 64, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-60, 0, 17, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#111";
      ctx.font = "800 11px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(title, 20, -6);
      ctx.font = "900 15px Arimo";
      ctx.fillText(value, 20, 14);
      ctx.restore();
    };

    const drawSplash = () => {
      splashParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25;
        p.life -= 0.018;
      });
      splashParticles = splashParticles.filter((p) => p.life > 0);
      splashParticles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#E8F2F4";
        ctx.fill();
        ctx.restore();
      });
    };

    const spawnSplash = (cx, cy) => {
      for (let i = 0; i < 36; i++) {
        const a = Math.random() * Math.PI - Math.PI;
        const speed = 2 + Math.random() * 5;
        splashParticles.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * speed,
          vy: -Math.abs(Math.sin(a) * speed) - 2,
          r: 2 + Math.random() * 3,
          life: 1,
        });
      }
    };

    // ── main draw ─────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawBackground();
      const floorY = h * 0.78;
      drawWater(floorY);
      drawDock(floorY);

      const s = Math.min(w, h) / 800;

      // ── cycle timing: 0..1 over ~16s ──────────────────────────────
      const CYCLE = 16;
      const cyclePos = (time % CYCLE) / CYCLE;

      let phase, localT;
      if (cyclePos < 0.62) {
        phase = "build";
        localT = cyclePos / 0.62;
      } else if (cyclePos < 0.78) {
        phase = "launch";
        localT = (cyclePos - 0.62) / 0.16;
      } else {
        phase = "float";
        localT = (cyclePos - 0.78) / 0.22;
      }

      const isLaunch = phase === "launch";
      if (isLaunch && !lastPhaseWasLaunch) {
        // spawn splash once when entering launch phase end
      }
      lastPhaseWasLaunch = isLaunch;

      // ship base position + launch slide
      const shipBaseX = w * 0.52,
        shipBaseY = h * 0.68;
      let shipX = shipBaseX,
        shipY = shipBaseY,
        shipScale = s * 0.95;

      const scaffoldAlpha =
        phase === "build" ? 1 - Math.max(0, (localT - 0.7) / 0.3) : 0;
      const slipwayAlpha =
        phase === "build" ? 1 : phase === "launch" ? 1 - localT : 0;

      if (phase === "launch") {
        const ease = localT * localT * (3 - 2 * localT); // smoothstep
        shipX = shipBaseX + ease * w * 0.06;
        shipY = shipBaseY + ease * h * 0.13;
        shipScale = s * (0.95 - ease * 0.08);
        if (localT > 0.55 && localT < 0.6)
          spawnSplash(shipX - 120 * shipScale, shipY + 30 * shipScale);
      } else if (phase === "float") {
        shipX = shipBaseX + w * 0.06 + Math.sin(time * 0.8) * 4;
        shipY = shipBaseY + h * 0.13 + Math.sin(time * 1.1) * 5;
        shipScale = s * 0.87;
      }

      const hullProgress = phase === "build" ? localT : 1;
      const launchCelebT = phase === "float" ? localT : 0;

      drawSlipway(shipBaseX, floorY, slipwayAlpha * 0.5);

      drawCrane(
        w * 0.15,
        floorY,
        s * 0.85,
        false,
        time * 0.9,
        phase === "build" ? Math.max(0, Math.sin(cyclePos * Math.PI * 6)) : 0,
      );
      drawCrane(w * 0.88, floorY, s * 0.78, true, time * 0.9 + 1, 0);

      drawShip(shipX, shipY, shipScale, launchCelebT, hullProgress);
      drawScaffold(shipX + 7 * s, shipY - 4 * s, s * 0.75, scaffoldAlpha);

      drawContainers(w * 0.08, h * 0.75, s * 0.72);
      drawContainers(w * 0.72, h * 0.77, s * 0.65);

      // 5 distinct working roles, only shown during build phase (they'd be
      // standing in the dry dock — once launched, the dock is empty)
      if (phase === "build" || phase === "launch") {
        const fade = phase === "launch" ? Math.max(0, 1 - localT * 2.5) : 1;
        ctx.save();
        ctx.globalAlpha = fade;
        drawWorker(w * 0.3, h * 0.85, s * 0.78, "#FFE994", "weld", false, 0);
        drawWorker(w * 0.18, h * 0.83, s * 0.7, "#F4C542", "rig", false, 0.6);
        drawWorker(w * 0.62, h * 0.84, s * 0.74, "#A6E6EC", "paint", true, 1.3);
        drawWorker(w * 0.7, h * 0.86, s * 0.7, "#CFF7BC", "pipe", false, 2.0);
        drawWorker(
          w * 0.8,
          h * 0.85,
          s * 0.72,
          "#FFD1A6",
          "patrol",
          false,
          2.7,
        );
        ctx.restore();
      }

      drawSplash();

      drawHiringPanel(w * 0.5, h * 0.17);

      drawFloatingCard(
        w * 0.23,
        h * 0.31,
        "Shipyard Crew",
        "Welders",
        "#FFE994",
        0,
      );
      drawFloatingCard(w * 0.78, h * 0.31, "Safety", "HSE ready", "#CFF7BC", 2);

      const deployLabel =
        phase === "float"
          ? "Marine team ready ✓"
          : phase === "launch"
            ? "Launching... 🚢"
            : "Building hull...";
      drawFloatingCard(
        w * 0.5,
        h * 0.94,
        "Deployment",
        deployLabel,
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
      className="font-arimo overflow-hidden bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="marine-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#FFF9E6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <Ship size={14} strokeWidth={2.2} />
              Shipbuilding & Marine Recruitment
            </span>

            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.04em] text-black sm:text-[3.7rem] lg:text-[4.35rem]">
              {["Building", "marine"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2"
                >
                  <span className="marine-word inline-block">{word}</span>
                </span>
              ))}
              <br />
              {["workforces"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2"
                >
                  <span className="marine-word inline-block">{word}</span>
                </span>
              ))}
              <br />
              <span className="relative inline-block overflow-visible">
                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="marine-word inline-block text-[#1f7a2e]">
                    for shipyards.
                  </span>
                </span>
                <svg
                  className="marine-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="marine-reveal mt-7 max-w-xl text-base leading-7 text-black/75">
              We connect shipyards, marine contractors and offshore operators
              with skilled welders, pipe fitters, marine electricians, riggers,
              QA/QC inspectors and safety-focused technical teams.
            </p>

            <div className="marine-reveal mt-7 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                [UsersRound, "Skilled marine crew"],
                [ShieldCheck, "Safety compliant"],
                [Globe2, "Global deployment"],
              ].map(([Icon, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-black/10 bg-[#FFF9E6] px-4 py-3 text-sm font-bold text-black"
                >
                  <Icon size={18} className="mb-2" />
                  {label}
                </div>
              ))}
            </div>

            <div className="marine-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Request Marine Staff
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>
              <a
                href="/industries/shipbuilding-marine"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                Explore Roles
              </a>
            </div>

            {/* <div className="marine-reveal mt-9 grid max-w-xl gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-black/10 bg-[#FFF9E6] p-4"
                >
                  <p className="text-2xl font-normal tracking-[-0.05em] text-black">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-black/45">
                    {item.label}
                  </p>
                </div>
              ))}
            </div> */}
          </div>

          <div className="marine-reveal relative h-[500px] w-full overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[620px] lg:h-[720px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroShipbuildingMarine;
