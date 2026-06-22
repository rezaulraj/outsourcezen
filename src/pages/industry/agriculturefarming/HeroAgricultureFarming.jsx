import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Leaf,
  Sprout,
  Tractor,
  UsersRound,
  Wheat,
} from "lucide-react";

const HeroAgricultureFarming = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".agri-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".agri-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".agri-line", {
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

    const drawSky = () => {
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#FFF8E2");
      sky.addColorStop(0.55, "#FFF1C9");
      sky.addColorStop(1, "#FDE9AE");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);
    };

    const drawSun = () => {
      const x = w * 0.82;
      const y = h * 0.16;
      const r = 34 + Math.sin(time * 1.5) * 3;

      const halo = ctx.createRadialGradient(x, y, r * 0.4, x, y, r + 46);
      halo.addColorStop(0, "rgba(255,225,140,0.55)");
      halo.addColorStop(1, "rgba(255,225,140,0)");
      ctx.beginPath();
      ctx.arc(x, y, r + 46, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      const sunGrad = ctx.createRadialGradient(
        x - r * 0.3,
        y - r * 0.3,
        2,
        x,
        y,
        r,
      );
      sunGrad.addColorStop(0, "#FFF6D2");
      sunGrad.addColorStop(1, "#FBCB3C");
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.55)";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawCloud = (x, y, s, drift) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 0.8 + drift) * 2);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.ellipse(0, 26, 46, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(20,20,20,0.06)";
      ctx.fill();

      const cloudGrad = ctx.createLinearGradient(0, -28, 0, 22);
      cloudGrad.addColorStop(0, "#FFFFFF");
      cloudGrad.addColorStop(1, "#FFF0CE");

      ctx.beginPath();
      ctx.arc(-28, 8, 18, Math.PI, 0);
      ctx.arc(-5, -4, 24, Math.PI, 0);
      ctx.arc(25, 8, 18, Math.PI, 0);
      ctx.lineTo(42, 22);
      ctx.lineTo(-45, 22);
      ctx.closePath();
      ctx.fillStyle = cloudGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-12, -8, 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fill();

      ctx.restore();
    };

    const drawField = () => {
      const groundY = h * 0.72;

      const fieldGrad = ctx.createLinearGradient(0, groundY - 40, 0, h);
      fieldGrad.addColorStop(0, "#DFF6C8");
      fieldGrad.addColorStop(0.4, "#BFEDA0");
      fieldGrad.addColorStop(1, "#8FD971");

      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.quadraticCurveTo(w * 0.5, groundY - 45, w, groundY);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = fieldGrad;
      ctx.fill();

      for (let i = 0; i < 12; i++) {
        const y = groundY + i * 22;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.quadraticCurveTo(w * 0.5, y - 35, w, y);
        ctx.strokeStyle = `rgba(40,70,20,${0.06 + i * 0.006})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      for (let i = 0; i < 90; i++) {
        const x = (i * 53 + Math.sin(time * 0.7 + i) * 8) % w;
        const y = groundY + 20 + ((i * 37) % (h * 0.22));
        const bladeH = 16 + (i % 5) * 4;
        const sway = Math.sin(time * 1.6 + i) * 4;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(
          x - 3 + sway * 0.4,
          y - bladeH * 0.6,
          x - 5 + sway,
          y - bladeH,
        );
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(
          x + 3 + sway * 0.4,
          y - bladeH * 0.5,
          x + 5 + sway,
          y - bladeH * 0.9,
        );
        ctx.strokeStyle = "rgba(35,80,20,0.4)";
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    };

    const drawGreenhouse = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.ellipse(0, 48, 78, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(20,20,20,0.12)";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-70, 45);
      ctx.lineTo(-70, 0);
      ctx.quadraticCurveTo(0, -70, 70, 0);
      ctx.lineTo(70, 45);
      ctx.closePath();

      const glassGrad = ctx.createLinearGradient(-70, -70, 70, 45);
      glassGrad.addColorStop(0, "rgba(190,240,245,0.55)");
      glassGrad.addColorStop(1, "rgba(150,225,232,0.4)");
      ctx.fillStyle = glassGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.55)";
      ctx.lineWidth = 2.6;
      ctx.stroke();

      for (let i = -40; i <= 40; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 45);
        ctx.lineTo(i, -35);
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      for (let i = -45; i <= 45; i += 30) {
        const plantGrad = ctx.createRadialGradient(i - 2, 22, 1, i, 25, 10);
        plantGrad.addColorStop(0, "#9BEB7C");
        plantGrad.addColorStop(1, "#4FAE39");
        ctx.beginPath();
        ctx.arc(i, 25, 9, 0, Math.PI * 2);
        ctx.fillStyle = plantGrad;
        ctx.fill();
        ctx.strokeStyle = "rgba(17,17,17,0.4)";
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawFarmer = (
      x,
      y,
      s,
      skin,
      outfit,
      build = 0,
      carrying = "none",
    ) => {
      const sway = Math.sin(time * 1.5 + x * 0.01) * 3;
      const bob = Math.sin(time * 2 + x * 0.02) * 1.6;

      ctx.save();
      ctx.translate(x + sway * 0.15, y + bob);
      ctx.scale(s, s);

      ctx.save();
      ctx.translate(0, 50);
      ctx.scale(1, 0.26);
      const shGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 24);
      shGrad.addColorStop(0, "rgba(20,30,10,0.28)");
      shGrad.addColorStop(1, "rgba(20,30,10,0)");
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = shGrad;
      ctx.fill();
      ctx.restore();

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const widths = { 0: 11, 1: 15, 2: 13 };
      const tw = widths[build];

      ctx.beginPath();
      ctx.moveTo(-tw, 12);
      ctx.bezierCurveTo(-tw - 4, -2, -tw - 1, -16, 0, -16);
      ctx.bezierCurveTo(tw + 1, -16, tw + 4, -2, tw, 12);
      ctx.bezierCurveTo(tw + 2, 22, tw - 2, 32, 0, 34);
      ctx.bezierCurveTo(-(tw - 2), 32, -(tw + 2), 22, -tw, 12);
      ctx.closePath();

      const outfitGrad = ctx.createLinearGradient(0, -16, 0, 34);
      outfitGrad.addColorStop(0, outfit);
      outfitGrad.addColorStop(1, shade(outfit, -22));
      ctx.fillStyle = outfitGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.55)";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      if (build === 1) {
        ctx.beginPath();
        ctx.moveTo(-7, -14);
        ctx.lineTo(-5, 12);
        ctx.moveTo(7, -14);
        ctx.lineTo(5, 12);
        ctx.strokeStyle = "rgba(17,17,17,0.4)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      const armSwing1 = Math.sin(time * 4 + x * 0.01) * 4;
      const armSwing2 = Math.cos(time * 4 + x * 0.01) * 4;

      ctx.beginPath();
      ctx.moveTo(-tw + 2, -4);
      ctx.quadraticCurveTo(-tw - 12, 4 + armSwing1, -tw - 8, 20);
      ctx.lineWidth = 7;
      ctx.strokeStyle = outfitGrad;
      ctx.stroke();
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = "rgba(17,17,17,0.4)";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(tw - 2, -4);
      ctx.quadraticCurveTo(
        tw + 12,
        4 + armSwing2,
        tw + (carrying === "tool" ? 18 : 8),
        18,
      );
      ctx.lineWidth = 7;
      ctx.strokeStyle = outfitGrad;
      ctx.stroke();
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = "rgba(17,17,17,0.4)";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-7, 32);
      ctx.quadraticCurveTo(-10, 42, -9, 50);
      ctx.lineWidth = 7;
      ctx.strokeStyle = "#5A4632";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(7, 32);
      ctx.quadraticCurveTo(10, 42, 9, 50);
      ctx.lineWidth = 7;
      ctx.strokeStyle = "#5A4632";
      ctx.stroke();

      const headGrad = ctx.createRadialGradient(-3, -34, 1, 0, -32, 12);
      headGrad.addColorStop(0, shade(skin, 18));
      headGrad.addColorStop(1, skin);
      ctx.beginPath();
      ctx.arc(0, -32, 10, 0, Math.PI * 2);
      ctx.fillStyle = headGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.55)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-19, -38);
      ctx.lineTo(19, -38);
      ctx.moveTo(-11, -38);
      ctx.quadraticCurveTo(0, -52, 11, -38);
      ctx.closePath();
      const hatGrad = ctx.createLinearGradient(0, -52, 0, -38);
      hatGrad.addColorStop(0, "#FFE994");
      hatGrad.addColorStop(1, "#F2C95C");
      ctx.fillStyle = hatGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.55)";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      if (carrying === "basket") {
        rr(tw + 4, 4, 26, 19, 6);
        const basketGrad = ctx.createLinearGradient(0, 4, 0, 23);
        basketGrad.addColorStop(0, "#DDEFC0");
        basketGrad.addColorStop(1, "#B9DE8E");
        ctx.fillStyle = basketGrad;
        ctx.fill();
        ctx.strokeStyle = "rgba(17,17,17,0.45)";
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ["#67D946", "#F4C542", "#67D946"].forEach((c, i) => {
          ctx.beginPath();
          ctx.arc(tw + 11 + i * 7, 4, 5, 0, Math.PI * 2);
          ctx.fillStyle = c;
          ctx.fill();
        });
      }

      if (carrying === "tool") {
        ctx.beginPath();
        ctx.moveTo(tw + 10, -6);
        ctx.lineTo(tw + 32, -34);
        ctx.strokeStyle = "#6B4A2D";
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(-3, -35, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fill();

      ctx.restore();
    };

    function shade(hex, percent) {
      const c = hex.replace("#", "");
      const num = parseInt(c, 16);
      let r = (num >> 16) + percent;
      let g = ((num >> 8) & 0x00ff) + percent;
      let b = (num & 0x0000ff) + percent;
      r = Math.max(Math.min(255, r), 0);
      g = Math.max(Math.min(255, g), 0);
      b = Math.max(Math.min(255, b), 0);
      return `rgb(${r},${g},${b})`;
    }

    const drawTractor = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.ellipse(0, 36, 70, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(20,20,20,0.16)";
      ctx.fill();

      const bodyGrad = ctx.createLinearGradient(-55, -24, -55, 16);
      bodyGrad.addColorStop(0, "#FFEFAE");
      bodyGrad.addColorStop(1, "#F2C443");
      rr(-55, -24, 80, 40, 10);
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.6)";
      ctx.lineWidth = 2.6;
      ctx.stroke();

      const cabGrad = ctx.createLinearGradient(5, -55, 5, -20);
      cabGrad.addColorStop(0, "#D7F3F5");
      cabGrad.addColorStop(1, "#9BDDE3");
      rr(5, -55, 45, 35, 8);
      ctx.fillStyle = cabGrad;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(10, -50);
      ctx.lineTo(24, -50);
      ctx.lineTo(16, -34);
      ctx.lineTo(10, -34);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(50, -20);
      ctx.lineTo(72, -5);
      ctx.lineTo(70, 16);
      ctx.strokeStyle = "rgba(17,17,17,0.6)";
      ctx.lineWidth = 2.4;
      ctx.stroke();

      const wheelGrad1 = ctx.createRadialGradient(-36, 18, 3, -32, 22, 18);
      wheelGrad1.addColorStop(0, "#3a3a3a");
      wheelGrad1.addColorStop(1, "#0d0d0d");
      ctx.beginPath();
      ctx.arc(-32, 22, 18, 0, Math.PI * 2);
      ctx.fillStyle = wheelGrad1;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-32, 22, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      const wheelGrad2 = ctx.createRadialGradient(32, 16, 2, 35, 20, 12);
      wheelGrad2.addColorStop(0, "#3a3a3a");
      wheelGrad2.addColorStop(1, "#0d0d0d");
      ctx.beginPath();
      ctx.arc(35, 20, 12, 0, Math.PI * 2);
      ctx.fillStyle = wheelGrad2;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(35, 20, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      for (let i = 0; i < 3; i++) {
        const p = (time * 1.2 + i * 0.4) % 1;
        ctx.beginPath();
        ctx.arc(20 - p * 6, -58 - p * 18, 4 + p * 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,120,120,${0.22 * (1 - p)})`;
        ctx.fill();
      }

      ctx.restore();
    };

    const drawBasket = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.6) * 1.5);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.ellipse(0, 22, 30, 6, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(20,20,20,0.12)";
      ctx.fill();

      const basketGrad = ctx.createLinearGradient(0, -10, 0, 20);
      basketGrad.addColorStop(0, "#FFF6C8");
      basketGrad.addColorStop(1, "#F0DD8E");
      rr(-28, -10, 56, 30, 8);
      ctx.fillStyle = basketGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.5)";
      ctx.lineWidth = 2.2;
      ctx.stroke();

      for (let i = -20; i <= 20; i += 10) {
        ctx.beginPath();
        ctx.moveTo(i, -10);
        ctx.lineTo(i, 20);
        ctx.strokeStyle = "rgba(17,17,17,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      [
        ["#FFE994", -14, -16],
        ["#67D946", 5, -18],
        ["#F4C542", 18, -13],
      ].forEach(([c, px, py]) => {
        const pg = ctx.createRadialGradient(px - 2, py - 2, 1, px, py, 8);
        pg.addColorStop(0, shade(c, 25));
        pg.addColorStop(1, c);
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();
        ctx.strokeStyle = "rgba(17,17,17,0.35)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      ctx.restore();
    };

    const drawCow = (x, y, s, facing = 1) => {
      const grazeCycle = (Math.sin(time * 0.9 + x * 0.01) + 1) / 2;
      const headDip = grazeCycle * 10;
      const chew = Math.sin(time * 8) * 1.4;
      const tailSwish = Math.sin(time * 2.4) * 14;
      const legStep = Math.sin(time * 1.3 + x * 0.02) * 2;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s * facing, s);

      ctx.beginPath();
      ctx.ellipse(0, 30, 46, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(20,20,20,0.16)";
      ctx.fill();

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.strokeStyle = "#F4EFE4";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(-22, 12);
      ctx.lineTo(-24 + legStep, 28);
      ctx.moveTo(18, 12);
      ctx.lineTo(20 - legStep, 28);
      ctx.stroke();
      ctx.strokeStyle = "rgba(17,17,17,0.45)";
      ctx.lineWidth = 1.3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-34, 8);
      ctx.bezierCurveTo(-38, -16, -10, -22, 8, -18);
      ctx.bezierCurveTo(26, -15, 32, 0, 30, 10);
      ctx.bezierCurveTo(32, 18, 26, 22, 10, 22);
      ctx.bezierCurveTo(-12, 24, -32, 20, -34, 8);
      ctx.closePath();

      const bodyGrad = ctx.createLinearGradient(-34, -22, 30, 22);
      bodyGrad.addColorStop(0, "#FFFFFF");
      bodyGrad.addColorStop(1, "#F2EEE2");
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.6)";
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.fillStyle = "rgba(35,32,30,0.92)";
      ctx.beginPath();
      ctx.ellipse(-18, -6, 11, 8, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(10, -8, 9, 7, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(2, 12, 7, 5, 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#F4EFE4";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(-26, 16);
      ctx.lineTo(-27 - legStep, 32);
      ctx.moveTo(22, 14);
      ctx.lineTo(23 + legStep, 32);
      ctx.stroke();
      ctx.strokeStyle = "rgba(17,17,17,0.45)";
      ctx.lineWidth = 1.3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-33, 0);
      ctx.quadraticCurveTo(-46, 6, -42 + tailSwish * 0.2, 22 + tailSwish * 0.3);
      ctx.strokeStyle = "#E7E1D2";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-42 + tailSwish * 0.2, 23 + tailSwish * 0.3, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#3a352f";
      ctx.fill();

      ctx.save();
      ctx.translate(30, -10 + headDip * 0.6);
      ctx.rotate(headDip * 0.018);

      ctx.beginPath();
      ctx.moveTo(-4, 4);
      ctx.quadraticCurveTo(8, 4 + headDip * 0.3, 14, 10 + headDip);
      ctx.lineWidth = 13;
      ctx.strokeStyle = bodyGrad;
      ctx.stroke();
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = "rgba(17,17,17,0.5)";
      ctx.stroke();

      ctx.save();
      ctx.translate(16, 12 + headDip);
      ctx.beginPath();
      ctx.ellipse(0, 0, 12, 9, 0, 0, Math.PI * 2);
      const headGrad = ctx.createRadialGradient(-3, -3, 1, 0, 0, 12);
      headGrad.addColorStop(0, "#FFFFFF");
      headGrad.addColorStop(1, "#EDE8DA");
      ctx.fillStyle = headGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.6)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(9, 3, 6, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#F6C9C0";
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.55)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      ctx.fillStyle = "rgba(17,17,17,0.6)";
      ctx.beginPath();
      ctx.ellipse(11, 1, 1, 1.4, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(11, 5, 1, 1.4, -0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(8, 7 + chew, 4.5, 2.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#F6C9C0";
      ctx.fill();

      ctx.strokeStyle = "#8FD971";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(14, 8 + chew);
      ctx.lineTo(20, 5 + chew * 0.5);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(-7, -7, 5, 3, -0.6, 0, Math.PI * 2);
      ctx.fillStyle = headGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(17,17,17,0.5)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.strokeStyle = "#D8CDB0";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(-5, -10);
      ctx.lineTo(-8, -16);
      ctx.moveTo(2, -11);
      ctx.lineTo(3, -17);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-1, -2, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = "#2a2620";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(-5, -5, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fill();

      ctx.restore();
      ctx.restore();

      ctx.restore();
    };

    const drawCropTuft = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      const sway = Math.sin(time * 1.8 + x) * 2;

      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 4, 0);
        ctx.quadraticCurveTo(
          i * 4 + sway,
          -10,
          i * 5 + sway * 1.4,
          -18 - Math.abs(i),
        );
        ctx.strokeStyle = "#5FAE3C";
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(
          i * 5 + sway * 1.4,
          -19 - Math.abs(i),
          2.6,
          4,
          0.2,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = "#E9C25A";
        ctx.fill();
        ctx.strokeStyle = "rgba(17,17,17,0.4)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawIrrigation = () => {
      const y = h * 0.84;

      ctx.beginPath();
      ctx.moveTo(w * 0.08, y);
      ctx.lineTo(w * 0.92, y);
      ctx.strokeStyle = "rgba(20,20,20,0.32)";
      ctx.lineWidth = 3.4;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(w * 0.08, y - 1.5);
      ctx.lineTo(w * 0.92, y - 1.5);
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < 16; i++) {
        const x = w * 0.1 + i * ((w * 0.8) / 15);
        const dropY = y + 12 + ((time * 50 + i * 17) % 35);
        const alpha = 1 - (dropY - (y + 12)) / 35;

        const dropGrad = ctx.createRadialGradient(
          x - 1,
          dropY - 1,
          0.5,
          x,
          dropY,
          4,
        );
        dropGrad.addColorStop(0, "#E9FBFC");
        dropGrad.addColorStop(1, "#7FD4DE");
        ctx.beginPath();
        ctx.arc(x, dropY, 3, 0, Math.PI * 2);
        ctx.fillStyle = dropGrad;
        ctx.globalAlpha = Math.max(alpha, 0.25);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const draw = () => {
      time += 0.014;

      drawSky();
      drawSun();
      drawCloud(w * 0.2 + Math.sin(time * 0.4) * 20, h * 0.16, 0.85, 0);
      drawCloud(w * 0.48 + Math.cos(time * 0.35) * 18, h * 0.22, 0.7, 2);

      drawGreenhouse(w * 0.24, h * 0.52, Math.min(w, h) / 760);
      drawField();

      const tractorX = w * 0.1 + ((time * 70) % (w * 0.78));
      drawTractor(tractorX, h * 0.7, Math.min(w, h) / 760);

      drawFarmer(
        w * 0.38,
        h * 0.68,
        Math.min(w, h) / 760,
        "#E8B27E",
        "#F4C542",
        0,
        "tool",
      );
      drawFarmer(
        w * 0.62,
        h * 0.68,
        Math.min(w, h) / 760,
        "#C98A55",
        "#67D946",
        1,
        "basket",
      );

      drawBasket(w * 0.78, h * 0.74, Math.min(w, h) / 760);

      const cowScale = Math.min(w, h) / 740;
      const cowX = w * 0.16;
      const cowY = h * 0.785;
      drawCropTuft(cowX + 36 * cowScale, cowY - 4, cowScale * 0.9);
      drawCropTuft(cowX + 44 * cowScale, cowY + 4, cowScale * 0.7);

      drawCow(cowX, cowY, cowScale, 1);

      drawIrrigation();

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
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="agri-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#FFF9E6] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <Sprout size={14} strokeWidth={2.2} />
              Agriculture & Farming Recruitment
            </span>

            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3.4rem] lg:text-[3.8rem]">
              {["Reliable", "agricultural"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="agri-word inline-block">{word}</span>
                </span>
              ))}

              <br />

              <span className="relative mt-1 inline-block overflow-visible">
                <span className="mr-3 inline-block overflow-hidden pb-2">
                  <span className="agri-word inline-block">workforce</span>
                </span>

                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="agri-word inline-block text-[#1f7a2e]">
                    for farms.
                  </span>
                </span>

                <svg
                  className="agri-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
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

            <p className="agri-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              From seasonal harvest teams to greenhouse workers, livestock
              handlers and farm operators, we help farms secure dependable
              workers for productive operations.
            </p>

            <div className="agri-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
              {[
                [Wheat, "Harvest ready"],
                [Tractor, "Farm support"],
                [UsersRound, "Seasonal teams"],
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

            <div className="agri-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Hire Farm Workers
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black"
                />
              </a>

              <a
                href="/industries/agriculture-farming"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-colors duration-300 hover:border-black/35 hover:bg-black/[0.03]"
              >
                Explore roles
              </a>
            </div>
          </div>

          <div className="agri-reveal relative h-[440px] w-full sm:h-[520px] lg:h-[620px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAgricultureFarming;
