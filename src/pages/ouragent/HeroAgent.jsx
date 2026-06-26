import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, PhoneCall, Users } from "lucide-react";

const HeroAgent = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".agent-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });
      gsap.from(".agent-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });
      gsap.from(".agent-line", {
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
    let w,
      h,
      frame,
      time = 0;

    const walker = { x: 0 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.parentElement.offsetWidth;
      h = canvas.parentElement.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      walker.x = w * 0.06;
    };

    const rr = (x, y, W, H, r) => {
      ctx.beginPath();
      ctx.roundRect(x, y, W, H, r);
    };

    const drawRoom = (floorY, ceilY) => {
      const wallG = ctx.createLinearGradient(0, ceilY, 0, floorY);
      wallG.addColorStop(0, "#fdf8ee");
      wallG.addColorStop(1, "#f5edd8");
      ctx.fillStyle = wallG;
      ctx.fillRect(0, ceilY, w, floorY - ceilY);

      const ceilG = ctx.createLinearGradient(0, ceilY, 0, ceilY + 38);
      ceilG.addColorStop(0, "#1c1810");
      ceilG.addColorStop(1, "#2e2618");
      ctx.fillStyle = ceilG;
      ctx.fillRect(0, ceilY, w, 38);
      ctx.beginPath();
      ctx.moveTo(0, ceilY + 38);
      ctx.lineTo(w, ceilY + 38);
      ctx.strokeStyle = "#e7b53a";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      for (let i = 0; i < 3; i++) {
        const lx = w * (0.2 + i * 0.3);
        rr(lx - 38, ceilY + 6, 76, 13, 5);
        const a = 0.55 + 0.15 * Math.sin(time * 0.8 + i);
        ctx.fillStyle = `rgba(255,250,220,${a})`;
        ctx.fill();
        ctx.save();
        ctx.globalAlpha = 0.09 + 0.03 * Math.sin(time * 0.8 + i);
        const lg = ctx.createRadialGradient(
          lx,
          ceilY + 12,
          4,
          lx,
          ceilY + 12,
          110,
        );
        lg.addColorStop(0, "#ffe994");
        lg.addColorStop(1, "transparent");
        ctx.fillStyle = lg;
        ctx.fillRect(lx - 110, ceilY + 12, 220, 220);
        ctx.restore();
      }

      [w * 0.07, w * 0.91].forEach((wx) => {
        const ww = 52,
          wh = (floorY - ceilY - 46) * 0.55,
          wy = ceilY + 50;
        rr(wx - ww / 2, wy, ww, wh, [ww / 2, ww / 2, 0, 0]);
        ctx.fillStyle = "#111";
        ctx.fill();
        rr(wx - ww / 2 + 4, wy + 4, ww - 8, wh - 4, [
          ww / 2 - 4,
          ww / 2 - 4,
          0,
          0,
        ]);
        const wg = ctx.createLinearGradient(wx, wy, wx, wy + wh);
        wg.addColorStop(
          0,
          `rgba(180,220,255,${0.45 + 0.1 * Math.sin(time * 0.4)})`,
        );
        wg.addColorStop(1, "rgba(255,235,140,0.3)");
        ctx.fillStyle = wg;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(wx, wy + 4);
        ctx.lineTo(wx, wy + wh);
        ctx.moveTo(wx - ww / 2 + 4, wy + wh * 0.52);
        ctx.lineTo(wx + ww / 2 - 4, wy + wh * 0.52);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.save();
        ctx.globalAlpha = 0.06 + 0.02 * Math.sin(time * 0.4);
        ctx.beginPath();
        ctx.moveTo(wx - ww / 2, wy + wh);
        ctx.lineTo(wx + ww / 2, wy + wh);
        ctx.lineTo(wx + ww * 1.4, floorY);
        ctx.lineTo(wx - ww * 1.4, floorY);
        ctx.closePath();
        ctx.fillStyle = "#ffe994";
        ctx.fill();
        ctx.restore();
      });

      rr(w / 2 - 100, ceilY + 48, 200, 30, 8);
      ctx.fillStyle = "#1c1810";
      ctx.fill();
      ctx.fillStyle = "#e7b53a";
      ctx.font = "800 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("★  OUTSOURCEZEN AGENTS  ★", w / 2, ceilY + 69);

      const pTop = ceilY + 44,
        pH = (floorY - pTop) * 0.32;
      for (let p = 0; p < 6; p++) {
        rr((p / 6) * w + 12, pTop, w / 6 - 24, pH, 4);
        ctx.strokeStyle = "rgba(180,150,80,0.16)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const flG = ctx.createLinearGradient(0, floorY, 0, h);
      flG.addColorStop(0, "#e8e0cc");
      flG.addColorStop(1, "#ddd4b8");
      ctx.fillStyle = flG;
      ctx.fillRect(0, floorY, w, h - floorY);
      ctx.strokeStyle = "rgba(0,0,0,0.08)";
      ctx.lineWidth = 1;
      const vp = { x: w / 2, y: floorY };
      for (let c = 0; c <= 10; c++) {
        const bx = (c / 10) * w;
        ctx.beginPath();
        ctx.moveTo(vp.x + (bx - vp.x) * 0.04, floorY);
        ctx.lineTo(bx, h);
        ctx.stroke();
      }
      for (let r = 1; r <= 7; r++) {
        const t = r / 7,
          ry = floorY + (h - floorY) * (t * t);
        ctx.beginPath();
        ctx.moveTo(0, ry);
        ctx.lineTo(w, ry);
        ctx.stroke();
      }
      ctx.save();
      ctx.globalAlpha = 0.05 + 0.02 * Math.sin(time * 0.6);
      const shimG = ctx.createLinearGradient(
        0,
        floorY,
        0,
        floorY + (h - floorY) * 0.3,
      );
      shimG.addColorStop(0, "#F4C542");
      shimG.addColorStop(1, "transparent");
      ctx.fillStyle = shimG;
      ctx.fillRect(0, floorY, w, (h - floorY) * 0.3);
      ctx.restore();
    };

    const drawPerson = (cx, groundY, sc, opts) => {
      const {
        skin = "#f5c89a",
        jacket = "#1c1810",
        hair = "#1c1810",
        action = "idle",
        phase = 0,
        flip = false,
      } = opts;

      ctx.save();
      ctx.translate(cx, groundY);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(sc, sc);

      const t = time + phase;
      let legL = 0,
        legR = 0,
        bodyBob = 0;

      if (action === "walk") {
        legL = Math.sin(t * 5) * 16;
        legR = -Math.sin(t * 5) * 16;
        bodyBob = Math.abs(Math.sin(t * 5)) * -1.5;
      } else if (action === "talk" || action === "idle") {
        legL = Math.sin(t * 1.2) * 1;
        legR = -legL;
        bodyBob = Math.sin(t * 1.2) * 1;
      } else if (action === "handshake") {
        legL = 4;
        legR = -4;
      }

      const bY = bodyBob;
      rr(-12, -6, 12, 6, 3);
      rr(2, -6, 12, 6, 3);
      ctx.fillStyle = "#111";
      ctx.fill();

      if (action === "seated") {
        ctx.beginPath();
        ctx.moveTo(-5, 0);
        ctx.lineTo(-5, -15);
        ctx.moveTo(5, 0);
        ctx.lineTo(5, -15);
        ctx.strokeStyle = "#222";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-5, -15);
        ctx.lineTo(-20, -11);
        ctx.moveTo(5, -15);
        ctx.lineTo(20, -11);
        ctx.lineWidth = 7;
        ctx.stroke();
        rr(-28, -13, 12, 6, 3);
        rr(18, -13, 12, 6, 3);
        ctx.fillStyle = "#111";
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(-4, 0);
        ctx.lineTo(-5 + legL * 0.3, -18);
        ctx.moveTo(4, 0);
        ctx.lineTo(5 + legR * 0.3, -18);
        ctx.strokeStyle = "#222";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(0, bY);

      rr(-12, -44, 24, 28, 5);
      ctx.fillStyle = jacket;
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-4, -44);
      ctx.lineTo(0, -18);
      ctx.lineTo(4, -44);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-2, -40);
      ctx.lineTo(0, -24);
      ctx.lineTo(2, -40);
      ctx.fillStyle = "#e7b53a";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-12, -44);
      ctx.lineTo(-5, -36);
      ctx.lineTo(-12, -26);
      ctx.moveTo(12, -44);
      ctx.lineTo(5, -36);
      ctx.lineTo(12, -26);
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();
      for (let b = 0; b < 2; b++) {
        ctx.beginPath();
        ctx.arc(0, -36 + b * 8, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#e7b53a";
        ctx.fill();
      }

      let aLx = -14,
        aLy = -32,
        hLx = -24,
        hLy = -18;
      let aRx = 14,
        aRy = -32,
        hRx = 24,
        hRy = -18;

      if (action === "walk") {
        const sw = Math.sin(t * 5) * 5;
        hLy -= Math.abs(sw) * 0.4;
        hLx -= sw;
        hRy -= Math.abs(sw) * 0.4;
        hRx += sw;
      } else if (action === "talk") {
        const g = Math.sin(t * 2.8) * 7;
        hRx = 24 + g;
        hRy = -28 - Math.abs(g) * 0.3;
      } else if (action === "handshake") {
        hRx = 34;
        hRy = -28;
        aRx = 22;
        aRy = -36;
      } else if (action === "phone") {
        aRx = 12;
        aRy = -46;
        hRx = 10;
        hRy = -52;
      } else if (action === "pass_doc") {
        hRx = 32;
        hRy = -32;
        aRx = 20;
        aRy = -38;
      } else if (action === "receive_doc") {
        hLx = -32;
        hLy = -32;
        aLx = -20;
        aLy = -38;
      } else if (action === "seated") {
        hLx = -26;
        hLy = -20 + Math.sin(t * 8) * 2;
        hRx = 26;
        hRy = -20 + Math.sin(t * 8 + 1) * 2;
      } else if (action === "brief") {
        hLx = -26;
        hLy = -2;
        aLx = -16;
        aLy = -20;
      }

      ctx.beginPath();
      ctx.moveTo(-10, -40);
      ctx.lineTo(aLx, aLy);
      ctx.lineTo(hLx, hLy);
      ctx.moveTo(10, -40);
      ctx.lineTo(aRx, aRy);
      ctx.lineTo(hRx, hRy);
      ctx.strokeStyle = jacket;
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(hLx, hLy, 4, 0, Math.PI * 2);
      ctx.arc(hRx, hRy, 4, 0, Math.PI * 2);
      ctx.fillStyle = skin;
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (action === "phone") {
        rr(hRx - 3, hRy - 9, 6, 14, 2);
        ctx.fillStyle = "#111";
        ctx.fill();
        for (let v = 0; v < 3; v++) {
          const vt = (time * 3.5 + v * 0.9) % 3;
          if (vt < 1) {
            ctx.save();
            ctx.globalAlpha = 1 - vt;
            ctx.beginPath();
            ctx.arc(hRx + 5, hRy, 5 + vt * 9, -0.6, 0.6);
            ctx.strokeStyle = "#67D946";
            ctx.lineWidth = 1.6;
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      if (action === "brief") {
        rr(hLx - 11, hLy - 9, 22, 17, 4);
        ctx.fillStyle = "#1c1810";
        ctx.fill();
        ctx.strokeStyle = "#e7b53a";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(hLx - 5, hLy - 9);
        ctx.quadraticCurveTo(hLx, hLy - 15, hLx + 5, hLy - 9);
        ctx.strokeStyle = "#e7b53a";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      if (action === "pass_doc") {
        ctx.save();
        ctx.translate(hRx, hRy);
        ctx.rotate(-0.3);
        rr(-10, -14, 20, 18, 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(2, -14);
        ctx.lineTo(10, -7);
        ctx.lineTo(2, -7);
        ctx.closePath();
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.stroke();
        for (let l = 0; l < 2; l++) {
          ctx.beginPath();
          ctx.moveTo(-7, -4 + l * 5);
          ctx.lineTo(7, -4 + l * 5);
          ctx.strokeStyle = "rgba(0,0,0,0.22)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      }

      const hy = -57 + bY;
      ctx.beginPath();
      ctx.moveTo(0, -44);
      ctx.lineTo(0, hy + 10);
      ctx.strokeStyle = skin;
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, hy, 11, 0, Math.PI * 2);
      ctx.fillStyle = skin;
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, hy - 3, 12, Math.PI * 0.85, Math.PI * 2.15);
      ctx.fillStyle = hair;
      ctx.fill();
      const blink = Math.sin(t * 0.28 + phase) > 0.96 ? 0 : 2;
      ctx.beginPath();
      ctx.ellipse(-3.5, hy - 1, 2, blink, 0, 0, Math.PI * 2);
      ctx.ellipse(3.5, hy - 1, 2, blink, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-5.5, hy - 5);
      ctx.lineTo(-1.5, hy - 5.5);
      ctx.moveTo(1.5, hy - 5.5);
      ctx.lineTo(5.5, hy - 5);
      ctx.strokeStyle = hair;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, hy + 4, 3.5, 0.15, Math.PI - 0.15);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
      ctx.restore();
    };

    const drawDesk = (cx, fy, sc) => {
      ctx.save();
      ctx.translate(cx, fy);
      ctx.scale(sc, sc);
      const dw = 110,
        dh = 16,
        dy = -48;
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(0,0,0,0.15)";
      ctx.shadowOffsetY = 5;
      rr(-dw / 2 - 4, dy - 8, dw + 8, 12, 5);
      ctx.fillStyle = "#2e2618";
      ctx.fill();
      ctx.restore();
      rr(-dw / 2, dy, dw, dh, 6);
      ctx.fillStyle = "#1c1810";
      ctx.fill();
      const mw = 56,
        mh = 36;
      rr(-mw / 2, dy - mh - 14, mw, mh, 5);
      ctx.fillStyle = "#0a0a14";
      ctx.fill();
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.stroke();
      rr(-mw / 2 + 3, dy - mh - 11, mw - 6, mh - 6, 3);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      for (let r = 0; r < 3; r++) {
        rr(
          -mw / 2 + 6,
          dy - mh - 8 + r * 8,
          10 + Math.sin(time * 1.5 + r) * 5,
          4,
          2,
        );
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fill();
      }
      ctx.beginPath();
      ctx.moveTo(0, dy - 14);
      ctx.lineTo(0, dy - 7);
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 4;
      ctx.stroke();
      rr(-14, dy - 8, 28, 4, 2);
      ctx.fillStyle = "#444";
      ctx.fill();
      rr(-28, dy - 9, 56, 13, 4);
      ctx.fillStyle = "#f0ece0";
      ctx.fill();
      ctx.strokeStyle = "#ccc";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    const drawBubble = (x, y, text, color) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.5 + x * 0.01) * 3);
      ctx.font = "700 10px Arimo";
      const tw = Math.max(80, ctx.measureText(text).width + 26);
      const bh = 26;
      rr(-tw / 2, -bh / 2, tw, bh, 12);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.55)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-6, bh / 2);
      ctx.lineTo(0, bh / 2 + 9);
      ctx.lineTo(6, bh / 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#16241c";
      ctx.textAlign = "center";
      ctx.fillText(text, 0, 4);
      ctx.restore();
    };

    const drawRole = (x, y, text) => {
      ctx.font = "700 9px Arimo";
      const tw = ctx.measureText(text).width + 18;
      rr(x - tw / 2, y - 11, tw, 19, 7);
      ctx.fillStyle = "rgba(28,24,16,0.82)";
      ctx.fill();
      ctx.fillStyle = "#e7b53a";
      ctx.textAlign = "center";
      ctx.fillText(text, x, y + 2);
    };

    const drawHandshakeGlow = (cx, cy) => {
      const pulse = 0.55 + 0.45 * Math.sin(time * 4.5);
      ctx.save();
      ctx.globalAlpha = 0.28 * pulse;
      ctx.beginPath();
      ctx.arc(cx, cy, 20 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.font = "700 10px Arimo";
      ctx.textAlign = "center";
      ctx.fillStyle = "#16241c";
      ctx.fillText("✓ DEAL CLOSED", cx, cy - 26 - Math.sin(time * 1.8) * 4);
      ctx.restore();
    };

    const drawFlyingDoc = (x1, y1, x2, y2) => {
      const p = (time * 0.28) % 1;
      const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const mx = (x1 + x2) / 2,
        my = Math.min(y1, y2) - 44;
      const dx =
        (1 - ease) * (1 - ease) * x1 +
        2 * (1 - ease) * ease * mx +
        ease * ease * x2;
      const dy =
        (1 - ease) * (1 - ease) * y1 +
        2 * (1 - ease) * ease * my +
        ease * ease * y2;
      const alpha = Math.sin(ease * Math.PI);
      ctx.save();
      ctx.translate(dx, dy);
      ctx.rotate(Math.sin(time * 3) * 0.14);
      ctx.globalAlpha = alpha;
      rr(-9, -13, 18, 17, 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(2, -13);
      ctx.lineTo(9, -6);
      ctx.lineTo(2, -6);
      ctx.closePath();
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();
      for (let l = 0; l < 2; l++) {
        ctx.beginPath();
        ctx.moveTo(-5, -2 + l * 5);
        ctx.lineTo(5, -2 + l * 5);
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawPlant = (x, fy) => {
      ctx.beginPath();
      ctx.moveTo(x - 9, fy);
      ctx.lineTo(x + 9, fy);
      ctx.lineTo(x + 6, fy - 16);
      ctx.lineTo(x - 6, fy - 16);
      ctx.closePath();
      ctx.fillStyle = "#8B3A3A";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, fy - 16);
      ctx.lineTo(x, fy - 40);
      ctx.strokeStyle = "#2e7d32";
      ctx.lineWidth = 3;
      ctx.stroke();
      const sway = Math.sin(time * 0.75) * 3;
      for (let l = 0; l < 4; l++) {
        const la = -0.55 + l * 0.38 + Math.sin(time * 0.75 + l) * 0.08;
        ctx.save();
        ctx.translate(x + Math.cos(la) * 6 + sway * 0.3, fy - 26 - l * 5);
        ctx.rotate(la + sway * 0.05);
        ctx.beginPath();
        ctx.ellipse(0, 0, 9, 4.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = l % 2 === 0 ? "#4caf50" : "#388e3c";
        ctx.fill();
        ctx.restore();
      }
    };

    const dust = Array.from({ length: 22 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + Math.random() * 1.4,
      sp: 0.0003 + Math.random() * 0.0003,
      ph: Math.random() * Math.PI * 2,
    }));
    const drawDust = () => {
      dust.forEach((d) => {
        d.y -= d.sp;
        if (d.y < 0) d.y = 1;
        ctx.save();
        ctx.globalAlpha = 0.1 + 0.08 * Math.sin(time * 1.4 + d.ph);
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "#e7b53a";
        ctx.fill();
        ctx.restore();
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.013;

      const ceilY = h * 0.04;
      const floorY = h * 0.8;
      const sc = Math.min(w, h) / 650;

      drawRoom(floorY, ceilY);

      const wRange = w * 0.16;
      const wCycle = (Math.sin(time * 0.32) + 1) / 2;
      walker.x = w * 0.07 + wRange * wCycle;
      const wFlip = Math.cos(time * 0.32) < 0;
      drawPerson(walker.x, floorY, sc, {
        skin: "#d4956a",
        jacket: "#2d3561",
        hair: "#1c1810",
        action: "brief",
        phase: 0,
        flip: wFlip,
      });
      drawRole(walker.x, floorY + 14, "FIELD AGENT");
      if (Math.sin(time * 0.32 * 0.5) > 0.3) {
        drawBubble(walker.x, floorY - 76 * sc, "New placement!", "#FFE994");
      }

      const hsX = w * 0.36;
      const hs2x = hsX - 30 * sc,
        hs3x = hsX + 30 * sc;
      drawPerson(hs2x, floorY, sc * 1.06, {
        skin: "#f5c89a",
        jacket: "#1c1810",
        hair: "#4a3526",
        action: "handshake",
        phase: 0,
      });
      drawPerson(hs3x, floorY, sc * 1.06, {
        skin: "#8B5E3C",
        jacket: "#2d6a3f",
        hair: "#1c1810",
        action: "handshake",
        phase: 1.1,
        flip: true,
      });
      drawHandshakeGlow(hsX, floorY - 32 * sc);
      ctx.save();
      ctx.translate(hsX, floorY - 30 * sc);
      ctx.rotate(Math.sin(time * 1.1) * 0.04);
      rr(-13, -9, 26, 20, 3);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#111";
      ctx.font = "600 6px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("CONTRACT", 0, 0);
      ctx.fillText("✓ SIGNED", 0, 8);
      ctx.restore();
      drawRole(hs2x, floorY + 14, "CONSULTANT");
      drawRole(hs3x, floorY + 14, "EMPLOYER");
      drawBubble(hsX, floorY - 108 * sc, "Placement confirmed!", "#CFF7BC");

      const deskX = w * 0.58;
      drawDesk(deskX, floorY, sc);
      drawPerson(deskX, floorY, sc * 0.88, {
        skin: "#c68642",
        jacket: "#3a2068",
        hair: "#111",
        action: "seated",
        phase: 2,
      });
      drawRole(deskX, floorY + 14, "SCREENING");
      if (Math.sin(time * 4) > 0.5) {
        drawBubble(
          deskX,
          floorY - 82 * sc * 0.88,
          "Reviewing CVs...",
          "#A6E6EC",
        );
      }

      const phX = w * 0.75;
      drawPerson(phX, floorY, sc, {
        skin: "#f0c090",
        jacket: "#5c2d09",
        hair: "#8B4513",
        action: "phone",
        phase: 3,
      });
      drawRole(phX, floorY + 14, "CLIENT CALL");
      drawBubble(phX, floorY - 90 * sc, "Worker is ready!", "#FFE994");

      const dpX = w * 0.875,
        drX = w * 0.96;
      drawPerson(dpX, floorY, sc * 0.8, {
        skin: "#6B3A2A",
        jacket: "#1c1810",
        hair: "#2c1810",
        action: "pass_doc",
        phase: 4,
      });
      drawPerson(drX, floorY, sc * 0.8, {
        skin: "#e8b89a",
        jacket: "#1a3a5c",
        hair: "#1c1810",
        action: "receive_doc",
        phase: 4.5,
        flip: true,
      });
      drawFlyingDoc(
        dpX + 22 * sc * 0.8,
        floorY - 26 * sc,
        drX - 22 * sc * 0.8,
        floorY - 26 * sc,
      );
      drawRole((dpX + drX) / 2, floorY + 14, "DOCS HANDOVER");

      drawPlant(w * 0.02, floorY);
      drawPlant(w * 0.98, floorY);
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
      className="font-arimo relative overflow-hidden bg-[#FFF9E6] pt-20"
    >
      <div className="relative z-10 container mx-auto px-4 pb-12 pt-14 sm:px-6 lg:px-8 lg:pb-16 lg:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="agent-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/65">
              <Users size={13} strokeWidth={2.2} />
              Our Recruitment Experts
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Meet", "our", "global"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2"
                >
                  <span className="agent-word inline-block">{word}</span>
                </span>
              ))}
              <br />
              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="agent-word inline-block">recruitment</span>
                </span>
                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="agent-word inline-block text-[#1f7a2e]">
                    experts.
                  </span>
                </span>
                <svg
                  className="agent-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="agent-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              Our experienced recruitment consultants and regional partners
              connect employers with exceptional talent across multiple
              industries and countries.
            </p>

            {/* quick stats */}
            <div className="agent-reveal mt-7 grid max-w-lg grid-cols-3 gap-3">
              {[
                ["20+", "Countries"],
                ["500+", "Placements"],
                ["48h", "Response"],
              ].map(([val, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-black/10 bg-white/60 px-4 py-3 text-center"
                >
                  <p className="text-2xl font-black tracking-[-0.05em] text-black">
                    {val}
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-black/45">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="agent-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/agents"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Meet the Team
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                <PhoneCall size={15} strokeWidth={2.2} />
                Contact an Agent
              </a>
            </div>
          </div>

          <div className="agent-reveal relative h-[440px] w-full overflow-hidden sm:h-[520px] lg:h-[620px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAgent;
