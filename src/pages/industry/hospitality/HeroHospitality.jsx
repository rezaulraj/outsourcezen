import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  ChefHat,
  ConciergeBell,
  Hotel,
  ShieldCheck,
} from "lucide-react";

const HeroHospitality = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hospitality-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });
      gsap.from(".hospitality-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });
      gsap.from(".hospitality-line", {
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

    // floating gold dust particles
    const dust = Array.from({ length: 38 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.2 + Math.random() * 2,
      speed: 0.0003 + Math.random() * 0.0004,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.2 + Math.random() * 0.5,
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

    const rr = (x, y, W, H, r) => {
      ctx.beginPath();
      ctx.roundRect(x, y, W, H, r);
    };

    // ── perspective marble floor ─────────────────────────────────────────
    const drawFloor = (floorY) => {
      const horizon = floorY;
      const vp = { x: w * 0.5, y: horizon };

      // base floor fill
      const floorGrad = ctx.createLinearGradient(0, horizon, 0, h);
      floorGrad.addColorStop(0, "#f0ece0");
      floorGrad.addColorStop(1, "#e8e0cc");
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, horizon, w, h - horizon);

      // perspective tile grid
      const cols = 10;
      const tileW = w / cols;
      ctx.strokeStyle = "rgba(180,160,120,0.35)";
      ctx.lineWidth = 1;

      for (let c = 0; c <= cols; c++) {
        const bx = c * tileW;
        ctx.beginPath();
        ctx.moveTo(vp.x + (bx - vp.x) * 0.01, horizon + 1);
        ctx.lineTo(bx, h);
        ctx.stroke();
      }

      const rows = 8;
      for (let r = 1; r <= rows; r++) {
        const t = r / rows;
        const ease = t * t;
        const ry = horizon + (h - horizon) * ease;
        ctx.beginPath();
        ctx.moveTo(0, ry);
        ctx.lineTo(w, ry);
        ctx.stroke();
      }

      // subtle reflection shimmer
      ctx.save();
      ctx.globalAlpha = 0.08 + 0.04 * Math.sin(time * 0.8);
      const shimG = ctx.createLinearGradient(
        0,
        horizon,
        0,
        horizon + (h - horizon) * 0.4,
      );
      shimG.addColorStop(0, "#F4C542");
      shimG.addColorStop(1, "transparent");
      ctx.fillStyle = shimG;
      ctx.fillRect(0, horizon, w, (h - horizon) * 0.4);
      ctx.restore();
    };

    // ── ceiling & walls ──────────────────────────────────────────────────
    const drawRoom = (floorY, ceilY) => {
      // ceiling
      const ceilGrad = ctx.createLinearGradient(0, ceilY, 0, ceilY + 60);
      ceilGrad.addColorStop(0, "#1c1810");
      ceilGrad.addColorStop(1, "#2e2618");
      ctx.fillStyle = ceilGrad;
      ctx.fillRect(0, ceilY, w, 58);

      // ceiling crown moulding
      ctx.beginPath();
      ctx.moveTo(0, ceilY + 58);
      ctx.lineTo(w, ceilY + 58);
      ctx.strokeStyle = "#e7b53a";
      ctx.lineWidth = 3;
      ctx.stroke();

      // back wall
      const wallGrad = ctx.createLinearGradient(0, ceilY + 58, 0, floorY);
      wallGrad.addColorStop(0, "#fdf8ee");
      wallGrad.addColorStop(1, "#f5edd8");
      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, ceilY + 58, w, floorY - ceilY - 58);

      // wall wainscoting panels
      const panelTop = ceilY + 80;
      const panelH = (floorY - panelTop) * 0.38;
      const panels = 5;
      for (let p = 0; p < panels; p++) {
        const px = (p / panels) * w + 18;
        const pw = w / panels - 36;
        rr(px, panelTop, pw, panelH, 6);
        ctx.strokeStyle = "rgba(180,150,80,0.28)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // skirting board at floor
      ctx.fillStyle = "#e0d4b4";
      ctx.fillRect(0, floorY - 12, w, 12);
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, floorY - 12, w, 12);
    };

    // ── chandelier ───────────────────────────────────────────────────────
    const drawChandelier = (cx, ceilY) => {
      const stemH = 38;
      const stemY = ceilY + 58;

      // stem
      ctx.beginPath();
      ctx.moveTo(cx, stemY);
      ctx.lineTo(cx, stemY + stemH);
      ctx.strokeStyle = "#b8960a";
      ctx.lineWidth = 4;
      ctx.stroke();

      // body
      ctx.beginPath();
      ctx.ellipse(cx, stemY + stemH + 14, 32, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#e7b53a";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      // arms + bulbs
      const arms = 8;
      for (let a = 0; a < arms; a++) {
        const angle = (a / arms) * Math.PI * 2;
        const armLen = 30;
        const ax = cx + Math.cos(angle) * armLen;
        const ay = stemY + stemH + 14 + Math.sin(angle) * 6;

        ctx.beginPath();
        ctx.moveTo(
          cx + Math.cos(angle) * 8,
          stemY + stemH + 14 + Math.sin(angle) * 3,
        );
        ctx.lineTo(ax, ay + 16);
        ctx.strokeStyle = "#b8960a";
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // glow halo
        const gAlpha = 0.18 + 0.12 * Math.sin(time * 2.2 + a);
        ctx.save();
        ctx.globalAlpha = gAlpha;
        ctx.beginPath();
        ctx.arc(ax, ay + 22, 12, 0, Math.PI * 2);
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.restore();

        // bulb
        ctx.beginPath();
        ctx.arc(ax, ay + 22, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,235,100,${0.7 + 0.3 * Math.sin(time * 2.2 + a)})`;
        ctx.fill();
        ctx.strokeStyle = "#b8960a";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // cast glow on floor below
      ctx.save();
      const glow = ctx.createRadialGradient(
        cx,
        stemY + stemH + 14,
        10,
        cx,
        stemY + stemH + 14,
        180,
      );
      glow.addColorStop(0, "rgba(244,197,66,0.12)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(cx - 180, stemY, 360, 300);
      ctx.restore();
    };

    // ── arched windows ───────────────────────────────────────────────────
    const drawWindows = (floorY, ceilY) => {
      const winY = ceilY + 72;
      const winH = (floorY - ceilY - 72) * 0.55;
      const winW = 52;
      const positions = [w * 0.1, w * 0.88];

      positions.forEach((wx) => {
        // frame
        rr(wx - winW / 2, winY, winW, winH, [winW / 2, winW / 2, 0, 0]);
        ctx.fillStyle = "#111";
        ctx.fill();

        // glass pane – warm outdoor light
        rr(wx - winW / 2 + 5, winY + 5, winW - 10, winH - 5, [
          winW / 2 - 5,
          winW / 2 - 5,
          0,
          0,
        ]);
        const winGrad = ctx.createLinearGradient(wx, winY, wx, winY + winH);
        winGrad.addColorStop(
          0,
          `rgba(255,235,140,${0.45 + 0.15 * Math.sin(time * 0.5)})`,
        );
        winGrad.addColorStop(1, `rgba(180,220,255,0.3)`);
        ctx.fillStyle = winGrad;
        ctx.fill();

        // cross divider
        ctx.beginPath();
        ctx.moveTo(wx, winY + 5);
        ctx.lineTo(wx, winY + winH - 2);
        ctx.moveTo(wx - winW / 2 + 5, winY + winH * 0.52);
        ctx.lineTo(wx + winW / 2 - 5, winY + winH * 0.52);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        // light shaft on floor
        ctx.save();
        ctx.globalAlpha = 0.07 + 0.03 * Math.sin(time * 0.5);
        ctx.beginPath();
        ctx.moveTo(wx - winW / 2, winY + winH);
        ctx.lineTo(wx + winW / 2, winY + winH);
        ctx.lineTo(wx + winW * 1.2, floorY);
        ctx.lineTo(wx - winW * 1.2, floorY);
        ctx.closePath();
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.restore();
      });
    };

    // ── reception desk ───────────────────────────────────────────────────
    const drawDesk = (cx, floorY) => {
      const deskW = Math.min(w * 0.38, 220);
      const deskH = 56;
      const deskX = cx - deskW / 2;
      const deskY = floorY - deskH;

      // fascia
      rr(deskX, deskY, deskW, deskH, [10, 10, 0, 0]);
      const deskGrad = ctx.createLinearGradient(
        deskX,
        deskY,
        deskX,
        deskY + deskH,
      );
      deskGrad.addColorStop(0, "#1c1810");
      deskGrad.addColorStop(1, "#0e0e08");
      ctx.fillStyle = deskGrad;
      ctx.fill();

      // marble top
      rr(deskX - 6, deskY - 10, deskW + 12, 14, 6);
      ctx.fillStyle = "#f5f0e8";
      ctx.fill();
      ctx.strokeStyle = "#ccc4a8";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // gold lettering
      ctx.fillStyle = "#e7b53a";
      ctx.font = "800 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("★  GRAND RECEPTION  ★", cx, deskY + 24);

      // gold trim lines
      ctx.beginPath();
      ctx.moveTo(deskX + 10, deskY + 34);
      ctx.lineTo(deskX + deskW - 10, deskY + 34);
      ctx.strokeStyle = "rgba(231,181,58,0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // computer screen on desk
      rr(cx + 26, deskY - 38, 28, 22, 4);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      // screen stand
      ctx.beginPath();
      ctx.moveTo(cx + 40, deskY - 16);
      ctx.lineTo(cx + 40, deskY - 10);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      // service bell
      const bellY = deskY - 20 + Math.sin(time * 3.5) * 1.5;
      ctx.beginPath();
      ctx.arc(cx - 30, bellY, 10, Math.PI, Math.PI * 2);
      ctx.moveTo(cx - 40, bellY);
      ctx.lineTo(cx - 20, bellY);
      ctx.strokeStyle = "#e7b53a";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 30, bellY + 2);
      ctx.lineTo(cx - 30, bellY + 6);
      ctx.stroke();

      // bell ring waves
      if (Math.sin(time * 1.4) > 0.85) {
        for (let r = 1; r <= 2; r++) {
          const rt = ((time * 1.4) % (Math.PI * 2)) / (Math.PI * 2);
          ctx.beginPath();
          ctx.arc(cx - 30, bellY - 4, 10 + r * 8 * rt, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(231,181,58,${0.5 - r * 0.2})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      return { deskY, deskW };
    };

    // ── person (fully detailed, role-specific) ───────────────────────────
    const drawStaff = (x, y, sc, bodyColor, role) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(sc, sc);

      const bob = Math.sin(time * 1.6 + x * 0.01) * 3;
      ctx.translate(0, bob);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // torso shirt
      rr(-10, -10, 20, 28, 5);
      ctx.fillStyle = bodyColor;
      ctx.fill();
      ctx.stroke();

      // legs
      const legS = Math.sin(time * 2.4 + x * 0.02) * 3;
      ctx.beginPath();
      ctx.moveTo(-4, 18);
      ctx.lineTo(-6 + legS, 34);
      ctx.moveTo(4, 18);
      ctx.lineTo(6 - legS, 34);
      ctx.lineWidth = 4;
      ctx.stroke();
      // shoes
      rr(-10 + legS, 34, 10, 5, 3);
      rr(2 - legS, 34, 10, 5, 3);
      ctx.fillStyle = "#111";
      ctx.fill();

      // neck
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(0, -14);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#f5c89a";
      ctx.stroke();

      // head with skin
      ctx.beginPath();
      ctx.arc(0, -22, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#f5c89a";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      // eyes
      ctx.beginPath();
      ctx.arc(-3, -23, 1.5, 0, Math.PI * 2);
      ctx.arc(3, -23, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      // smile
      ctx.beginPath();
      ctx.arc(0, -18, 4, 0.2, Math.PI - 0.2);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (role === "concierge") {
        // formal black jacket with gold buttons
        rr(-10, -10, 20, 28, 5);
        ctx.fillStyle = "#1c1810";
        ctx.fill();
        ctx.stroke();
        for (let b = 0; b < 3; b++) {
          ctx.beginPath();
          ctx.arc(0, -4 + b * 8, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = "#e7b53a";
          ctx.fill();
        }
        // bow-tie
        ctx.save();
        ctx.translate(0, -9);
        ctx.beginPath();
        ctx.moveTo(-5, 0);
        ctx.lineTo(0, -3);
        ctx.lineTo(5, 0);
        ctx.lineTo(0, 3);
        ctx.closePath();
        ctx.fillStyle = "#e7b53a";
        ctx.fill();
        ctx.restore();
        // pill-box hat
        rr(-12, -36, 24, 14, [4, 4, 0, 0]);
        ctx.fillStyle = "#1c1810";
        ctx.fill();
        ctx.stroke();
        rr(-15, -24, 30, 5, 2);
        ctx.fillStyle = "#1c1810";
        ctx.fill();
        // gold hat band
        ctx.beginPath();
        ctx.moveTo(-12, -25);
        ctx.lineTo(12, -25);
        ctx.strokeStyle = "#e7b53a";
        ctx.lineWidth = 2;
        ctx.stroke();

        // wave / greeting arm
        const wave = Math.sin(time * 2.2) * 0.5;
        ctx.beginPath();
        ctx.moveTo(8, -4);
        ctx.lineTo(16, -14 + wave * 6);
        ctx.strokeStyle = "#1c1810";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-8, -4);
        ctx.lineTo(-14, 8);
        ctx.stroke();
      } else if (role === "waiter") {
        // white jacket
        rr(-10, -10, 20, 28, 5);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
        // black bow tie
        ctx.save();
        ctx.translate(0, -9);
        ctx.beginPath();
        ctx.moveTo(-4, 0);
        ctx.lineTo(0, -2.5);
        ctx.lineTo(4, 0);
        ctx.lineTo(0, 2.5);
        ctx.closePath();
        ctx.fillStyle = "#111";
        ctx.fill();
        ctx.restore();
        // cap
        rr(-12, -35, 24, 12, [4, 4, 0, 0]);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
        rr(-15, -25, 30, 4, 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.stroke();

        // raised arm with tray
        ctx.beginPath();
        ctx.moveTo(8, -4);
        ctx.lineTo(18, -18);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.stroke();

        // tray
        ctx.beginPath();
        ctx.ellipse(22, -22, 20, 6, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#e7b53a";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // dish with dome on tray
        rr(14, -34, 16, 12, [8, 8, 0, 0]);
        ctx.fillStyle = "#f0f0f0";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-8, -4);
        ctx.lineTo(-14, 8);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.stroke();
      } else if (role === "chef") {
        // white chef coat
        rr(-11, -10, 22, 28, 5);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
        // double buttons
        ctx.beginPath();
        ctx.arc(-3, -4, 1.5, 0, Math.PI * 2);
        ctx.arc(-3, 4, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#111";
        ctx.fill();
        // chef hat
        rr(-10, -42, 20, 24, [5, 5, 0, 0]);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.stroke();
        rr(-13, -22, 26, 6, 3);
        ctx.fillStyle = "#eee";
        ctx.fill();
        ctx.stroke();

        // stirring arm motion
        const stir = Math.sin(time * 3) * 12;
        ctx.beginPath();
        ctx.moveTo(8, -4);
        ctx.lineTo(14 + stir * 0.3, 10 - Math.abs(stir) * 0.2);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.stroke();
        // ladle/spoon
        ctx.beginPath();
        ctx.moveTo(14 + stir * 0.3, 10 - Math.abs(stir) * 0.2);
        ctx.lineTo(22 + stir * 0.3, 18);
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(22 + stir * 0.3, 20, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#e7b53a";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-8, -4);
        ctx.lineTo(-14, 8);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.stroke();
      } else if (role === "bellboy") {
        // red uniform
        rr(-10, -10, 20, 28, 5);
        ctx.fillStyle = "#c0392b";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
        // gold buttons
        for (let b = 0; b < 3; b++) {
          ctx.beginPath();
          ctx.arc(0, -4 + b * 8, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = "#e7b53a";
          ctx.fill();
        }
        // flat-top cap
        rr(-12, -38, 24, 16, [4, 4, 0, 0]);
        ctx.fillStyle = "#c0392b";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
        rr(-16, -23, 32, 5, 2);
        ctx.fillStyle = "#a93226";
        ctx.fill();
        ctx.stroke();
        // gold cap band
        ctx.beginPath();
        ctx.moveTo(-12, -23);
        ctx.lineTo(12, -23);
        ctx.strokeStyle = "#e7b53a";
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // arms pushing cart
        ctx.beginPath();
        ctx.moveTo(8, -2);
        ctx.lineTo(18, 6);
        ctx.moveTo(-8, -2);
        ctx.lineTo(-18, 6);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      ctx.restore();
    };

    // ── luggage cart ─────────────────────────────────────────────────────
    const drawCart = (x, y, sc) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(sc, sc);

      // frame
      ctx.beginPath();
      ctx.moveTo(-18, -48);
      ctx.lineTo(-18, 14);
      ctx.moveTo(18, -48);
      ctx.lineTo(18, 14);
      ctx.moveTo(-18, -48);
      ctx.lineTo(18, -48);
      ctx.strokeStyle = "#b8960a";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.stroke();

      // shelves with luggage
      const luggageColors = ["#A6E6EC", "#CFF7BC", "#FFE994"];
      for (let s = 0; s < 3; s++) {
        const sy = -40 + s * 18;
        rr(-16, sy, 32, 16, 4);
        ctx.fillStyle = luggageColors[s];
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.4;
        ctx.stroke();
        // handle
        ctx.beginPath();
        ctx.moveTo(-10, sy);
        ctx.quadraticCurveTo(-5, sy - 6, 0, sy);
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // wheels
      ctx.beginPath();
      ctx.arc(-14, 16, 5, 0, Math.PI * 2);
      ctx.arc(14, 16, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#333";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // wheel spokes spinning
      ctx.save();
      ctx.translate(-14, 16);
      ctx.rotate(time * 3);
      ctx.beginPath();
      ctx.moveTo(-4, 0);
      ctx.lineTo(4, 0);
      ctx.moveTo(0, -4);
      ctx.lineTo(0, 4);
      ctx.strokeStyle = "#e7b53a";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(14, 16);
      ctx.rotate(-time * 3);
      ctx.beginPath();
      ctx.moveTo(-4, 0);
      ctx.lineTo(4, 0);
      ctx.moveTo(0, -4);
      ctx.lineTo(0, 4);
      ctx.strokeStyle = "#e7b53a";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    };

    // ── guest with suitcase ───────────────────────────────────────────────
    const drawGuest = (floorY, deskCX) => {
      const gp = (time * 0.09) % 1;
      const gx = w * 0.06 + (deskCX - 70 - w * 0.06) * gp;
      const gy = floorY - 36;
      const sc = Math.min(w, h) / 720;

      // rolling suitcase
      ctx.save();
      ctx.translate(gx + 22 * sc, gy + 8 * sc);
      ctx.scale(sc, sc);
      rr(-10, -18, 20, 28, 5);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-4, -18);
      ctx.quadraticCurveTo(0, -28, 4, -18);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-7, 12, 3, 0, Math.PI * 2);
      ctx.arc(7, 12, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();
      ctx.restore();

      // guest person (smart casual)
      drawStaff(gx, gy, sc, "#CFF7BC", "guest_special");

      // "5 star" speech bubble fades in near desk
      const nearDesk = Math.max(0, (gp - 0.75) / 0.25);
      if (nearDesk > 0) {
        ctx.save();
        ctx.globalAlpha = nearDesk;
        const bx = gx - 10;
        const by = gy - 60 * sc - nearDesk * 14;
        // bubble
        rr(bx - 44, by - 16, 88, 26, 10);
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // tail
        ctx.beginPath();
        ctx.moveTo(bx - 6, by + 10);
        ctx.lineTo(bx - 14, by + 24);
        ctx.lineTo(bx + 4, by + 10);
        ctx.closePath();
        ctx.fillStyle = "#FFF9E6";
        ctx.fill();
        ctx.stroke();
        // 5 stars
        ctx.fillStyle = "#e7b53a";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText("★ ★ ★ ★ ★", bx, by + 2);
        ctx.restore();
      }
    };

    // ── gold dust particles ───────────────────────────────────────────────
    const drawDust = () => {
      dust.forEach((d) => {
        d.y -= d.speed;
        if (d.y < -0.02) d.y = 1.02;
        const pulse = 0.5 + 0.5 * Math.sin(time * 1.8 + d.phase);
        ctx.save();
        ctx.globalAlpha = d.alpha * pulse * 0.7;
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "#e7b53a";
        ctx.fill();
        ctx.restore();
      });
    };

    // ── pot plant ─────────────────────────────────────────────────────────
    const drawPlant = (x, floorY) => {
      const py = floorY;
      // pot
      ctx.beginPath();
      ctx.moveTo(x - 14, py);
      ctx.lineTo(x + 14, py);
      ctx.lineTo(x + 10, py - 22);
      ctx.lineTo(x - 10, py - 22);
      ctx.closePath();
      ctx.fillStyle = "#c0392b";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // rim
      rr(x - 12, py - 24, 24, 5, 3);
      ctx.fillStyle = "#a93226";
      ctx.fill();
      ctx.stroke();
      // stem
      ctx.beginPath();
      ctx.moveTo(x, py - 22);
      ctx.lineTo(x, py - 55);
      ctx.strokeStyle = "#2e7d32";
      ctx.lineWidth = 3;
      ctx.stroke();
      // leaves
      const leafSway = Math.sin(time * 0.8) * 4;
      for (let l = 0; l < 3; l++) {
        const la = -0.5 + l * 0.5 + Math.sin(time * 0.8 + l) * 0.1;
        ctx.save();
        ctx.translate(x + Math.cos(la) * 8, py - 38 - l * 6);
        ctx.rotate(la + leafSway * 0.04);
        ctx.beginPath();
        ctx.ellipse(0, 0, 12, 6, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#4caf50";
        ctx.fill();
        ctx.restore();
      }
    };

    // ── wall clock ────────────────────────────────────────────────────────
    const drawClock = (x, y, r) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // gold ring
      ctx.beginPath();
      ctx.arc(x, y, r - 3, 0, Math.PI * 2);
      ctx.strokeStyle = "#e7b53a";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // hour/minute hands
      const sec = time * 0.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        x + Math.cos(sec - Math.PI / 2) * (r - 10),
        y + Math.sin(sec - Math.PI / 2) * (r - 10),
      );
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        x + Math.cos(sec * 12 - Math.PI / 2) * (r - 14),
        y + Math.sin(sec * 12 - Math.PI / 2) * (r - 14),
      );
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#e7b53a";
      ctx.fill();
    };

    // ── main draw ─────────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.013;

      const floorY = h * 0.82;
      const ceilY = h * 0.04;
      const sc = Math.min(w, h) / 720;

      drawRoom(floorY, ceilY);
      drawWindows(floorY, ceilY);
      drawFloor(floorY);

      drawClock(w * 0.5, ceilY + 90, 24);
      drawChandelier(w * 0.5, ceilY);

      drawPlant(w * 0.08, floorY);
      drawPlant(w * 0.92, floorY);

      const { deskY } = drawDesk(w * 0.5, floorY);

      // concierge behind desk (waving)
      drawStaff(w * 0.47, deskY - 6, sc * 1.05, "#1c1810", "concierge");

      // waiter walking right → left with tray
      const waiterP = (time * 0.13) % 1;
      const waiterX = w * 0.86 - w * 0.36 * waiterP;
      drawStaff(waiterX, floorY - 36, sc, "#fff", "waiter");

      // chef visible through a kitchen pass-through on the right
      rr(w * 0.78, floorY - 100, 60, 66, 8);
      ctx.fillStyle = "#f0ece0";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#111";
      ctx.font = "700 8px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("KITCHEN", w * 0.808, floorY - 106);
      drawStaff(w * 0.808, floorY - 46, sc * 0.88, "#fff", "chef");

      // bellboy + cart entering from left
      const bellP = (time * 0.08 + 0.4) % 1;
      const bellX = w * 0.06 + w * 0.28 * bellP;
      drawCart(bellX + 28 * sc, floorY - 24, sc * 0.9);
      drawStaff(bellX - 8, floorY - 36, sc, "#c0392b", "bellboy");

      // arriving guest
      drawGuest(floorY, w * 0.5);

      drawDust();

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
      className="font-arimo relative overflow-hidden pt-26"
    >
      <div className="relative z-10 container mx-auto bg-[#FFF9E6] rounded-xl px-4 pb-12 pt-14 sm:px-6 lg:px-8 lg:pb-16 lg:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="hospitality-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <Hotel size={14} strokeWidth={2.2} />
              Hospitality Recruitment
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Exceptional", "hospitality"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="hospitality-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="hospitality-word inline-block">talent</span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="hospitality-word inline-block text-[#1f7a2e]">
                    for service.
                  </span>
                </span>

                <svg
                  className="hospitality-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="hospitality-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              From hotels and resorts to restaurants and guest-facing
              operations, we provide reliable hospitality professionals ready to
              deliver outstanding guest experiences.
            </p>

            <div className="hospitality-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [ConciergeBell, "Guest focused"],
                [ChefHat, "Service ready"],
                [ShieldCheck, "Trusted staff"],
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

            <div className="hospitality-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Request Staff
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="/industries/hospitality"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                View roles
              </a>
            </div>
          </div>

          <div className="hospitality-reveal relative h-[440px] w-full overflow-hidden rounded-[32px] border border-black/10 shadow-lg sm:h-[520px] lg:h-[620px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHospitality;
