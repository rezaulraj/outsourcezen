import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// ---------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------
const items = [
  {
    key: "industry",
    title: "Industry expertise",
    text: "Our agents know the certifications, role hierarchies and hiring rhythms specific to each sector, so every shortlist actually fits how that industry works.",
  },
  {
    key: "local",
    title: "Local market knowledge",
    text: "Deep familiarity with regional salary bands, talent pools and labour trends means recommendations are grounded in what's realistic on the ground.",
  },
  {
    key: "global",
    title: "International hiring experience",
    text: "We've placed candidates across borders, so cross-country logistics, time zones and cultural fit are handled smoothly from day one.",
  },
  {
    key: "compliance",
    title: "Compliance knowledge",
    text: "Every hire is checked against current labour law, documentation and workplace standards, keeping employers protected at every step.",
  },
  {
    key: "screening",
    title: "Candidate screening",
    text: "A structured, multi-pass review of credentials, experience and references means only genuinely qualified candidates reach your desk.",
  },
  {
    key: "visa",
    title: "Visa guidance",
    text: "From documentation to submission, our agents walk every candidate through the exact visa pathway their role and country require.",
  },
  {
    key: "consult",
    title: "Employer consultation",
    text: "We sit with employers first to understand the role deeply, so sourcing is targeted instead of generic from the very first conversation.",
  },
];

// ---------------------------------------------------------------------
// Small shared helpers used across the per-card canvas illustrations
// ---------------------------------------------------------------------
const rr = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  // Note: roundRect is widely supported in modern browsers.
  // If you need to support very old browsers, you'd use a custom path here.
  ctx.roundRect(x, y, width, height, radius);
};

const shade = (hex, percent) => {
  const c = hex.replace("#", "");
  const num = parseInt(c, 16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00ff) + percent;
  let b = (num & 0x0000ff) + percent;

  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);

  return `rgb(${r},${g},${b})`;
};

const GREEN = "#4eb956";
const CREAM = "#FFE994";
const NAVY = "#1e2558";

// ---------------------------------------------------------------------
// Per-card draw functions — every one receives (ctx, w, h, time)
// ---------------------------------------------------------------------

const drawIndustry = (ctx, w, h, time) => {
  const cx = w / 2;
  const baseY = h * 0.82;
  const bw = 92;
  const bh = 96;

  // ground shadow
  ctx.beginPath();
  ctx.ellipse(cx, baseY + 6, bw * 0.62, 8, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fill();

  // building body
  const grad = ctx.createLinearGradient(
    cx - bw / 2,
    baseY - bh,
    cx + bw / 2,
    baseY,
  );
  grad.addColorStop(0, shade(CREAM, 10));
  grad.addColorStop(1, shade(CREAM, -30));
  rr(ctx, cx - bw / 2, baseY - bh, bw, bh, 8);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 1.4;
  ctx.stroke();

  // roof ledge + small antenna
  rr(ctx, cx - bw / 2 - 5, baseY - bh - 6, bw + 10, 8, 3);
  ctx.fillStyle = shade(CREAM, -40);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx, baseY - bh - 6);
  ctx.lineTo(cx, baseY - bh - 22);
  ctx.strokeStyle = shade(CREAM, -40);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, baseY - bh - 24, 2.4, 0, Math.PI * 2);
  ctx.fillStyle = GREEN;
  ctx.fill();

  // windows lighting up in a running sequence
  const cols = 4;
  const rows = 5;
  const padX = 12;
  const padY = 10;
  const gw = (bw - padX * 2) / cols - 4;
  const gh = (bh - padY * 2) / rows - 5;

  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = cx - bw / 2 + padX + c * (gw + 4);
      const wy = baseY - bh + padY + r * (gh + 5);
      const lit = (Math.sin(time * 1.4 - idx * 0.35) + 1) / 2;
      const litColor = lit > 0.55;

      rr(ctx, wx, wy, gw, gh, 1.5);
      ctx.fillStyle = litColor
        ? `rgba(255,233,148,${0.55 + lit * 0.4})`
        : "rgba(20,20,30,0.45)";
      ctx.fill();
      idx++;
    }
  }

  // a small briefcase resting at the base
  const bx = cx + bw / 2 + 26;
  const by = baseY - 18;
  ctx.save();
  ctx.translate(bx, by + Math.sin(time * 1.6) * 3);
  rr(ctx, -16, -10, 32, 22, 5);
  const caseGrad = ctx.createLinearGradient(-16, -10, 16, 12);
  caseGrad.addColorStop(0, GREEN);
  caseGrad.addColorStop(1, shade(GREEN, -30));
  ctx.fillStyle = caseGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-7, -10);
  ctx.lineTo(-7, -16);
  ctx.lineTo(7, -16);
  ctx.lineTo(7, -10);
  ctx.strokeStyle = shade(GREEN, -30);
  ctx.lineWidth = 2.4;
  ctx.stroke();
  ctx.restore();
};

const drawLocal = (ctx, w, h, time) => {
  const cx = w / 2;
  const cy = h * 0.42;

  // faint map grid
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + i * 24, cy - 60);
    ctx.lineTo(cx + i * 24, cy + 60);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 70, cy + i * 20);
    ctx.lineTo(cx + 70, cy + i * 20);
    ctx.stroke();
  }

  // expanding radar rings from the pin tip
  for (let i = 0; i < 3; i++) {
    const p = (time * 0.6 + i * 0.33) % 1;
    ctx.beginPath();
    ctx.arc(cx, cy + 36, 6 + p * 46, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(78,185,86,${0.5 * (1 - p)})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // teardrop pin
  ctx.beginPath();
  ctx.moveTo(cx, cy + 36);
  ctx.bezierCurveTo(cx - 26, cy - 4, cx - 18, cy - 40, cx, cy - 40);
  ctx.bezierCurveTo(cx + 18, cy - 40, cx + 26, cy - 4, cx, cy + 36);
  ctx.closePath();
  const pinGrad = ctx.createLinearGradient(cx, cy - 40, cx, cy + 36);
  pinGrad.addColorStop(0, shade(GREEN, 20));
  pinGrad.addColorStop(1, shade(GREEN, -25));
  ctx.fillStyle = pinGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy - 18, 9, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy - 18, 4, 0, Math.PI * 2);
  ctx.fillStyle = shade(GREEN, -25);
  ctx.fill();
};

const drawGlobal = (ctx, w, h, time) => {
  const cx = w / 2;
  const cy = h * 0.46;
  const r = 46;

  // glow
  const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, r + 26);
  glow.addColorStop(0, "rgba(78,185,86,0.28)");
  glow.addColorStop(1, "rgba(78,185,86,0)");
  ctx.beginPath();
  ctx.arc(cx, cy, r + 26, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();

  // sphere body
  const sphereGrad = ctx.createRadialGradient(
    cx - r * 0.35,
    cy - r * 0.35,
    4,
    cx,
    cy,
    r,
  );
  sphereGrad.addColorStop(0, shade(CREAM, 12));
  sphereGrad.addColorStop(1, shade(NAVY, 40));
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = sphereGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 1.4;
  ctx.stroke();

  // rotating latitude lines
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  for (let i = -2; i <= 2; i++) {
    const squash = Math.abs(Math.cos(time * 0.5 + i));
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.32 * squash + 2, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.ellipse(cx, cy + (i - 1) * 18, r * 0.85, r * 0.18, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();

  // pin markers on the globe surface
  const pins = [
    { a: -0.6, d: -0.2 },
    { a: 0.9, d: 0.1 },
    { a: 2.4, d: -0.3 },
  ];
  const px = pins.map((p) => ({
    x: cx + Math.cos(p.a + time * 0.3) * r * 0.7,
    y: cy + Math.sin(p.a + time * 0.3) * r * 0.4 + p.d * 10,
  }));

  // flight arcs between pins
  for (let i = 0; i < px.length; i++) {
    const a = px[i];
    const b = px[(i + 1) % px.length];
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2 - 16;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(midX, midY, b.x, b.y);
    ctx.strokeStyle = "rgba(255,233,148,0.45)";
    ctx.lineWidth = 1.4;
    ctx.setLineDash([3, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  px.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = i === 0 ? GREEN : CREAM;
    ctx.fill();
    ctx.strokeStyle = "rgba(17,17,17,0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();
  });
};

const drawCompliance = (ctx, w, h, time) => {
  const cx = w / 2;
  const cy = h * 0.46;
  const sw = 54;
  const sh = 64;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx, cy - sh / 2);
  ctx.bezierCurveTo(
    cx + sw / 2,
    cy - sh / 2,
    cx + sw / 2,
    cy - sh / 2,
    cx + sw / 2,
    cy - sh / 4,
  );
  ctx.lineTo(cx + sw / 2, cy + sh / 6);
  ctx.quadraticCurveTo(cx + sw / 2, cy + sh / 2, cx, cy + sh / 2 + 6);
  ctx.quadraticCurveTo(cx - sw / 2, cy + sh / 2, cx - sw / 2, cy + sh / 6);
  ctx.lineTo(cx - sw / 2, cy - sh / 4);
  ctx.closePath();

  const shieldGrad = ctx.createLinearGradient(cx, cy - sh / 2, cx, cy + sh / 2);
  shieldGrad.addColorStop(0, shade(GREEN, 25));
  shieldGrad.addColorStop(1, shade(GREEN, -25));
  ctx.fillStyle = shieldGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1.6;
  ctx.stroke();

  // clip a scanning glow sweep inside the shield
  ctx.clip();
  const sweepY = cy - sh / 2 + ((time * 40) % (sh + 20));
  const sweepGrad = ctx.createLinearGradient(cx, sweepY - 14, cx, sweepY + 14);
  sweepGrad.addColorStop(0, "rgba(255,255,255,0)");
  sweepGrad.addColorStop(0.5, "rgba(255,255,255,0.35)");
  sweepGrad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sweepGrad;
  ctx.fillRect(cx - sw, sweepY - 14, sw * 2, 28);
  ctx.restore();

  // pulsing checkmark
  const pulse = 1 + Math.sin(time * 2.4) * 0.06;
  ctx.save();
  ctx.translate(cx, cy + 2);
  ctx.scale(pulse, pulse);
  ctx.beginPath();
  ctx.moveTo(-12, 0);
  ctx.lineTo(-3, 9);
  ctx.lineTo(14, -12);
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 4.4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
  ctx.restore();

  // small checklist lines beside the shield
  for (let i = 0; i < 3; i++) {
    const lineW = 16 + (i % 2) * 6;
    const lit = Math.sin(time * 1.6 - i * 0.6) > 0;
    ctx.beginPath();
    ctx.moveTo(cx + sw / 2 + 16, cy - 16 + i * 12);
    ctx.lineTo(cx + sw / 2 + 16 + lineW, cy - 16 + i * 12);
    ctx.strokeStyle = lit ? "rgba(255,233,148,0.85)" : "rgba(255,255,255,0.25)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();
  }
};

const drawScreening = (ctx, w, h, time) => {
  const cx = w / 2 - 6;
  const docX = cx - 18;
  const docY = h * 0.22;
  const docW = 64;
  const docH = 86;

  // document
  rr(ctx, docX, docY, docW, docH, 6);
  const docGrad = ctx.createLinearGradient(docX, docY, docX, docY + docH);
  docGrad.addColorStop(0, "#FFFFFF");
  docGrad.addColorStop(1, "#F1EFE6");
  ctx.fillStyle = docGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1.3;
  ctx.stroke();

  // avatar circle at top of resume
  ctx.beginPath();
  ctx.arc(docX + 16, docY + 16, 7, 0, Math.PI * 2);
  ctx.fillStyle = shade(NAVY, 60);
  ctx.fill();

  const lineCount = 7;
  const activeLine = Math.floor((time * 1.4) % lineCount);

  for (let i = 0; i < lineCount; i++) {
    const ly = docY + 32 + i * 8;
    const lw = i % 3 === 0 ? docW - 34 : docW - 18;
    const isActive = i === activeLine;
    ctx.beginPath();
    ctx.moveTo(docX + 10, ly);
    ctx.lineTo(docX + 10 + lw, ly);
    ctx.strokeStyle = isActive ? GREEN : "rgba(30,37,88,0.18)";
    ctx.lineWidth = isActive ? 3.2 : 2.4;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  // magnifying glass sweeping over the lines
  const lensY = docY + 32 + activeLine * 8;
  const lensX = docX + 10 + 40 + Math.sin(time * 2) * 8;

  ctx.save();
  ctx.translate(lensX, lensY);

  // handle
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(20, 20);
  ctx.strokeStyle = shade(NAVY, -10);
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.stroke();

  // glass
  const lensGrad = ctx.createRadialGradient(-4, -4, 1, 0, 0, 15);
  lensGrad.addColorStop(0, "rgba(255,255,255,0.65)");
  lensGrad.addColorStop(1, "rgba(166,230,236,0.35)");
  ctx.beginPath();
  ctx.arc(0, 0, 15, 0, Math.PI * 2);
  ctx.fillStyle = lensGrad;
  ctx.fill();
  ctx.strokeStyle = shade(NAVY, -10);
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.restore();

  // checkmark badge popping when the lens lands on a line
  const popT = (time * 1.4) % 1;
  if (popT < 0.3) {
    const scale = 1 + popT * 2;
    const alpha = 1 - popT / 0.3;
    ctx.save();
    ctx.translate(lensX + 22, lensY - 6);
    ctx.scale(scale, scale);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
    ctx.fillStyle = GREEN;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-3, 0);
    ctx.lineTo(-1, 3);
    ctx.lineTo(4, -3);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1.6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.restore();
    ctx.globalAlpha = 1;
  }
};

const drawVisa = (ctx, w, h, time) => {
  const cx = w / 2;
  const cy = h * 0.5;

  // open passport — two pages
  rr(ctx, cx - 58, cy - 36, 54, 72, 4);
  rr(ctx, cx + 4, cy - 36, 54, 72, 4);
  const pageGrad = ctx.createLinearGradient(cx - 58, cy - 36, cx + 58, cy + 36);
  pageGrad.addColorStop(0, "#FCF8EC");
  pageGrad.addColorStop(1, "#F4EBCB");
  ctx.fillStyle = pageGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // spine shadow
  ctx.beginPath();
  ctx.moveTo(cx, cy - 36);
  ctx.lineTo(cx, cy + 36);
  ctx.strokeStyle = "rgba(0,0,0,0.18)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // photo box + lines on left page
  rr(ctx, cx - 48, cy - 26, 20, 24, 2);
  ctx.fillStyle = shade(NAVY, 50);
  ctx.fill();
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(cx - 24, cy - 20 + i * 7);
    ctx.lineTo(cx - 10, cy - 20 + i * 7);
    ctx.strokeStyle = "rgba(30,37,88,0.3)";
    ctx.lineWidth = 1.6;
    ctx.stroke();
  }

  // stamp dropping with periodic impact
  const cycle = (time * 0.9) % 2.4;
  const dropT = Math.min(cycle / 1.0, 1);
  const stampY = cy - 70 + dropT * dropT * 90;
  const impacted = cycle > 1.0 && cycle < 1.6;

  ctx.save();
  ctx.translate(cx + 30, Math.min(stampY, cy));
  ctx.rotate(-0.25 + dropT * 0.25);
  ctx.beginPath();
  ctx.arc(0, 0, 15, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(78,185,86,${0.85})`;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.font = "700 7px Arimo, sans-serif";
  ctx.fillStyle = GREEN;
  ctx.textAlign = "center";
  ctx.fillText("VISA", 0, -1);
  ctx.fillText("OK", 0, 7);
  ctx.restore();

  if (impacted) {
    const ringP = (cycle - 1.0) / 0.6;
    ctx.beginPath();
    ctx.arc(cx + 30, cy, 15 + ringP * 18, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(78,185,86,${0.4 * (1 - ringP)})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // small plane crossing above
  const planeX = ((time * 30) % (w + 40)) - 20;
  ctx.save();
  ctx.translate(planeX, cy - 56);
  ctx.rotate(0.15);
  ctx.beginPath();
  ctx.moveTo(-12, 0);
  ctx.lineTo(10, 0);
  ctx.lineTo(14, -2);
  ctx.lineTo(2, -3);
  ctx.lineTo(-4, -7);
  ctx.lineTo(-7, -7);
  ctx.lineTo(-5, -3);
  ctx.lineTo(-12, -2);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fill();
  ctx.restore();
};

const drawConsult = (ctx, w, h, time) => {
  const cy = h * 0.46;
  const leftX = w * 0.32;
  const rightX = w * 0.68;

  const bubble = (x, flip, color, idx) => {
    const bob = Math.sin(time * 1.6 + idx * 1.5) * 3;
    ctx.save();
    ctx.translate(x, cy + bob);

    rr(ctx, -26, -18, 52, 34, 14);
    const grad = ctx.createLinearGradient(-26, -18, 26, 16);
    grad.addColorStop(0, shade(color, 15));
    grad.addColorStop(1, shade(color, -20));
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // tail
    ctx.beginPath();
    if (flip) {
      ctx.moveTo(18, 14);
      ctx.lineTo(28, 22);
      ctx.lineTo(12, 17);
    } else {
      ctx.moveTo(-18, 14);
      ctx.lineTo(-28, 22);
      ctx.lineTo(-12, 17);
    }
    ctx.closePath();
    ctx.fillStyle = shade(color, -20);
    ctx.fill();

    // typing dots
    for (let i = -1; i <= 1; i++) {
      const d = (Math.sin(time * 5 + i + idx * 2) + 1) / 2;
      ctx.beginPath();
      ctx.arc(i * 9, 0, 2.4 + d * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.6 + d * 0.4})`;
      ctx.fill();
    }

    ctx.restore();
  };

  // connecting pulse between the two bubbles
  const pulseP = (time * 0.6) % 1;
  const px = leftX + (rightX - leftX) * pulseP;
  ctx.beginPath();
  ctx.moveTo(leftX + 30, cy);
  ctx.lineTo(rightX - 30, cy);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1.4;
  ctx.setLineDash([2, 6]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.beginPath();
  ctx.arc(px, cy, 4, 0, Math.PI * 2);
  ctx.fillStyle = CREAM;
  ctx.fill();

  bubble(leftX, false, GREEN, 0);
  bubble(rightX, true, CREAM, 1);
};

const DRAWERS = {
  industry: drawIndustry,
  local: drawLocal,
  global: drawGlobal,
  compliance: drawCompliance,
  screening: drawScreening,
  visa: drawVisa,
  consult: drawConsult,
};

// ---------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------
const WhyOurAgentMatter = () => {
  const sectionRef = useRef(null);
  const canvasRefs = useRef([]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".agent-word", {
        y: 50,
        opacity: 0,
        rotateX: 60,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".agent-sub", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".agent-card", {
        y: 36,
        opacity: 1,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Canvas Setup and Animation Loop
  useEffect(() => {
    const canvases = canvasRefs.current.filter(Boolean);
    const states = canvases.map((canvas) => ({
      canvas,
      ctx: canvas.getContext("2d"),
      key: canvas.dataset.key,
      w: 0,
      h: 0,
    }));

    let frame;
    let time = 0;

    const resizeAll = () => {
      states.forEach((s) => {
        const parent = s.canvas.parentElement;
        const dpr = window.devicePixelRatio || 1;
        s.w = parent.offsetWidth;
        s.h = parent.offsetHeight;
        s.canvas.width = s.w * dpr;
        s.canvas.height = s.h * dpr;
        s.canvas.style.width = `${s.w}px`;
        s.canvas.style.height = `${s.h}px`;
        s.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      });
    };

    const draw = () => {
      time += 0.014;
      states.forEach((s) => {
        s.ctx.clearRect(0, 0, s.w, s.h);
        const fn = DRAWERS[s.key];
        if (fn) fn(s.ctx, s.w, s.h, time);
      });
      frame = requestAnimationFrame(draw);
    };

    resizeAll();
    draw();

    window.addEventListener("resize", resizeAll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resizeAll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-14"
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="agent-sub inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/65">
            Why Our Agents Matter
          </span>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-black sm:text-5xl">
            {["Recruiters", "who", "actually", "know", "the", "work"].map(
              (word) => (
                <span
                  key={word}
                  className="mr-2 inline-block overflow-hidden pb-1 last:mr-0"
                >
                  <span className="agent-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="agent-sub mt-5 text-base leading-7 text-black/65">
            Every placement is backed by hands-on industry knowledge, local
            market insight and a genuine understanding of what employers and
            candidates each need to move forward with confidence.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <article
              key={item.key}
              className={`agent-card group relative overflow-hidden rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#4eb956]/40 hover:bg-[#FFF9E6]/[0.8] hover:shadow-lg ${
                i === items.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                <canvas
                  ref={(el) => (canvasRefs.current[i] = el)}
                  data-key={item.key}
                  className="h-full w-full"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold tracking-[-0.02em] text-black/80">
                {item.title}
              </h3>

              {/* FIX APPLIED HERE: Changed text-white/60 to text-black/60 for readability */}
              <p className="mt-2 text-sm leading-6 text-black/60">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOurAgentMatter;
