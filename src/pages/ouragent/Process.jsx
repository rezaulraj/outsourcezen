import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  FileText,
  UserCheck,
  Search,
  Users,
  Briefcase,
  FolderSync,
  Globe,
  PlaneTakeoff,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

const STAGES = [
  {
    id: 1,
    title: "Employer Request",
    icon: FileText,
    desc: "System intakes core personnel operational metrics.",
    action: "Briefing Requirements",
  },
  {
    id: 2,
    title: "Agent Assigned",
    icon: UserCheck,
    desc: "Dedicated domain experts assume direct process ownership.",
    action: "Handing Off Case",
  },
  {
    id: 3,
    title: "Candidate Search",
    icon: Search,
    desc: "Global network search parameters dynamically execute.",
    action: "Scanning Profiles",
  },
  {
    id: 4,
    title: "Screening Processes",
    icon: Users,
    desc: "Rigorous verification metrics and skill checkpoints run.",
    action: "Verifying Background",
  },
  {
    id: 5,
    title: "Structured Interview",
    icon: Briefcase,
    desc: "Synchronized panel live virtual evaluations setup.",
    action: "Live Conversation",
  },
  {
    id: 6,
    title: "Documentation Sync",
    icon: FolderSync,
    desc: "Secure distributed payload verification and sync.",
    action: "Transferring Files",
  },
  {
    id: 7,
    title: "Visa Processing",
    icon: Globe,
    desc: "International legal compliance routing checks.",
    action: "Stamping Approval",
  },
  {
    id: 8,
    title: "Strategic Deployment",
    icon: PlaneTakeoff,
    desc: "Logistical transit coordinates activated.",
    action: "Deploying Talent",
  },
  {
    id: 9,
    title: "Post-Placement Support",
    icon: HeartHandshake,
    desc: "Continuous hyper-care workflow optimization loop.",
    action: "Active Monitoring",
  },
];

/* ---------------------------------------------------------------- */
/* Small drawing helpers                                            */
/* ---------------------------------------------------------------- */

const lerp = (a, b, t) => a + (b - a) * t;

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const roundRectPath = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const drawSpeechBubble = (ctx, x, y, w, h, color) => {
  roundRectPath(ctx, x, y, w, h, 6);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + w / 2 - 5, y + h);
  ctx.lineTo(x + w / 2, y + h + 7);
  ctx.lineTo(x + w / 2 + 5, y + h);
  ctx.closePath();
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.stroke();
};

const drawPerson = (ctx, x, y, scale, color, headFill) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.arc(0, -20, 7, 0, Math.PI * 2);
  ctx.fillStyle = headFill;
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -13);
  ctx.lineTo(0, 8);
  ctx.moveTo(0, -2);
  ctx.lineTo(-9, 4);
  ctx.moveTo(0, -2);
  ctx.lineTo(9, 4);
  ctx.moveTo(0, 8);
  ctx.lineTo(-6, 20);
  ctx.moveTo(0, 8);
  ctx.lineTo(6, 20);
  ctx.stroke();
  ctx.restore();
};

/* ---------------------------------------------------------------- */
/* Per-stage animated scenes. Each receives (ctx, cx, cy, isActive, time) */
/* ---------------------------------------------------------------- */

const sceneEmployerRequest = (ctx, cx, cy, isActive, time) => {
  const color = isActive ? "#1f7a2e" : "#a0a0a0";
  const scale = isActive ? 1.15 : 0.85;
  drawPerson(ctx, cx, cy + 16, scale, color, isActive ? "#FFF9E6" : "#FFFFFF");

  const bw = 80;
  const bh = 42;
  const bx = cx - bw / 2;
  const by = cy - 58;
  drawSpeechBubble(ctx, bx, by, bw, bh, color);

  const phase = (time * 0.7) % 3.2;
  for (let i = 0; i < 3; i++) {
    if (phase <= i * 0.7) continue;
    const lw = 16 + i * 16;
    const ly = by + 10 + i * 11;
    ctx.beginPath();
    ctx.moveTo(bx + 10, ly);
    ctx.lineTo(bx + 10 + lw, ly);
    ctx.strokeStyle = isActive ? "#1f7a2e" : "rgba(0,0,0,0.3)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();
  }
};

const sceneAgentAssigned = (ctx, cx, cy, isActive, time) => {
  const c1 = isActive ? "#9a9a9a" : "#bbbbbb";
  const c2 = isActive ? "#1f7a2e" : "#9a9a9a";
  drawPerson(ctx, cx - 22, cy + 14, 0.85, c1, "#FFFFFF");
  drawPerson(
    ctx,
    cx + 22,
    cy + 14,
    isActive ? 1.1 : 0.85,
    c2,
    isActive ? "#FFF9E6" : "#FFFFFF",
  );

  const t = (Math.sin(time * 1.2) + 1) / 2;
  const bx = lerp(cx - 16, cx + 16, t);
  const by = cy - 22 - Math.sin(t * Math.PI) * 10;

  ctx.beginPath();
  ctx.arc(bx, by, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#67D946";
  ctx.fill();
  ctx.strokeStyle = "#1f7a2e";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(bx - 3, by);
  ctx.lineTo(bx - 1, by + 3);
  ctx.lineTo(bx + 4, by - 4);
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 1.6;
  ctx.stroke();
};

const sceneCandidateSearch = (ctx, cx, cy, isActive, time) => {
  const positions = [
    [-26, -16],
    [-8, -24],
    [14, -16],
    [26, -2],
    [4, 8],
    [-18, 10],
  ];
  positions.forEach(([dx, dy], i) => {
    const matched = i === 2;
    ctx.beginPath();
    ctx.arc(cx + dx, cy + dy, matched && isActive ? 6 : 4.5, 0, Math.PI * 2);
    ctx.fillStyle =
      matched && isActive
        ? "#67D946"
        : isActive
          ? "rgba(31,122,46,0.25)"
          : "rgba(0,0,0,0.15)";
    ctx.fill();
    ctx.strokeStyle = matched && isActive ? "#1f7a2e" : "rgba(0,0,0,0.25)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
  });

  const angle = time * 1.4;
  const orbitR = 30;
  const gx = cx + Math.cos(angle) * orbitR;
  const gy = cy + Math.sin(angle) * orbitR * 0.6;

  ctx.beginPath();
  ctx.arc(gx, gy, 8, 0, Math.PI * 2);
  ctx.strokeStyle = isActive ? "#1f7a2e" : "rgba(0,0,0,0.4)";
  ctx.lineWidth = 2.2;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(gx + 5.6, gy + 5.6);
  ctx.lineTo(gx + 12, gy + 12);
  ctx.stroke();
};

const sceneScreening = (ctx, cx, cy, isActive, time) => {
  const w = 56;
  const h = 64;
  const x = cx - w / 2;
  const y = cy - h / 2 - 6;
  const color = isActive ? "#1f7a2e" : "rgba(0,0,0,0.35)";

  roundRectPath(ctx, x, y, w, h, 6);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.stroke();

  roundRectPath(ctx, cx - 10, y - 6, 20, 8, 2);
  ctx.fillStyle = color;
  ctx.fill();

  const phase = (time * 0.6) % 3.6;
  for (let i = 0; i < 3; i++) {
    const ly = y + 18 + i * 16;
    ctx.beginPath();
    ctx.moveTo(x + 10, ly);
    ctx.lineTo(x + 32, ly);
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    ctx.lineWidth = 2.4;
    ctx.stroke();

    if (phase > i * 1) {
      ctx.beginPath();
      ctx.moveTo(x + w - 18, ly - 3);
      ctx.lineTo(x + w - 14, ly + 2);
      ctx.lineTo(x + w - 8, ly - 6);
      ctx.strokeStyle = "#67D946";
      ctx.lineWidth = 2.4;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  }
};

const sceneInterview = (ctx, cx, cy, isActive, time) => {
  ctx.save();
  ctx.setLineDash([3, 4]);
  ctx.strokeStyle = "rgba(0,0,0,0.15)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 38);
  ctx.lineTo(cx, cy + 30);
  ctx.stroke();
  ctx.restore();

  const color = isActive ? "#1f7a2e" : "#9a9a9a";
  drawPerson(
    ctx,
    cx - 24,
    cy + 16,
    isActive ? 1.0 : 0.8,
    color,
    isActive ? "#FFF9E6" : "#FFFFFF",
  );
  drawPerson(
    ctx,
    cx + 24,
    cy + 16,
    isActive ? 1.0 : 0.8,
    color,
    isActive ? "#FFF9E6" : "#FFFFFF",
  );

  const cyclePos = time % 3.2;
  const leftTalking = cyclePos < 1.3;
  const rightTalking = cyclePos >= 1.5 && cyclePos < 2.8;

  const drawDots = (bx, by, tone) => {
    const bw = 32;
    const bh = 20;
    drawSpeechBubble(ctx, bx - bw / 2, by - bh - 8, bw, bh, tone);
    for (let i = 0; i < 3; i++) {
      const bounce = Math.sin(time * 6 + i * 1.3) * 2;
      ctx.beginPath();
      ctx.arc(bx - 8 + i * 8, by - bh / 2 - 8 + bounce, 2, 0, Math.PI * 2);
      ctx.fillStyle = tone;
      ctx.fill();
    }
  };

  if (leftTalking) drawDots(cx - 24, cy - 20, color);
  if (rightTalking) drawDots(cx + 24, cy - 20, color);
};

const sceneDocSync = (ctx, cx, cy, isActive, time) => {
  const color = isActive ? "#1f7a2e" : "rgba(0,0,0,0.35)";

  const drawFolder = (fx, fy) => {
    ctx.beginPath();
    ctx.moveTo(fx - 14, fy - 6);
    ctx.lineTo(fx - 6, fy - 6);
    ctx.lineTo(fx - 3, fy - 10);
    ctx.lineTo(fx + 14, fy - 10);
    ctx.lineTo(fx + 14, fy + 10);
    ctx.lineTo(fx - 14, fy + 10);
    ctx.closePath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.8;
    ctx.stroke();
  };
  drawFolder(cx - 26, cy + 6);
  drawFolder(cx + 26, cy + 6);

  ctx.beginPath();
  ctx.arc(cx, cy + 6, 22, 0.5, Math.PI - 0.5);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy + 6, 22, Math.PI + 0.5, -0.5);
  ctx.stroke();

  const angle = (time * 2) % (Math.PI * 2);
  const fx = cx + Math.cos(angle) * 22;
  const fy = cy + 6 + Math.sin(angle) * 22 * 0.55;
  ctx.beginPath();
  ctx.rect(fx - 4, fy - 4, 8, 8);
  ctx.fillStyle = "#67D946";
  ctx.fill();
};

const sceneVisa = (ctx, cx, cy, isActive, time) => {
  const color = isActive ? "#1f7a2e" : "rgba(0,0,0,0.35)";

  ctx.beginPath();
  ctx.arc(cx - 14, cy, 22, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx - 14, cy, 9, 22, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 36, cy);
  ctx.lineTo(cx + 8, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy - 11);
  ctx.quadraticCurveTo(cx - 14, cy - 4, cx + 2, cy - 11);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy + 11);
  ctx.quadraticCurveTo(cx - 14, cy + 4, cx + 2, cy + 11);
  ctx.stroke();

  const px = cx + 22;
  const py = cy + 6;
  roundRectPath(ctx, px - 10, py - 14, 20, 26, 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.6;
  ctx.stroke();

  const stampPhase = time % 2;
  const drop =
    stampPhase < 0.3 ? Math.abs(Math.sin(stampPhase * Math.PI * 3.3)) : 0;
  ctx.save();
  ctx.translate(px, py - 22 - drop * 14);
  ctx.beginPath();
  ctx.arc(0, 0, 7, 0, Math.PI * 2);
  ctx.strokeStyle = "#67D946";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  if (stampPhase >= 0.3) {
    ctx.beginPath();
    ctx.arc(px, py - 2, 5, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(31,122,46,0.5)";
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }
};

const sceneDeployment = (ctx, cx, cy, isActive, time) => {
  const color = isActive ? "#1f7a2e" : "rgba(0,0,0,0.3)";

  ctx.save();
  ctx.setLineDash([4, 5]);
  ctx.strokeStyle = "rgba(0,0,0,0.15)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 34, cy + 28);
  ctx.lineTo(cx + 34, cy - 24);
  ctx.stroke();
  ctx.restore();

  const t = (time * 0.4) % 1;
  const px = lerp(cx - 34, cx + 34, t);
  const py = lerp(cy + 28, cy - 24, t);

  for (let i = 1; i <= 5; i++) {
    const tt = Math.max(0, t - i * 0.03);
    const tx = lerp(cx - 34, cx + 34, tt);
    const ty = lerp(cy + 28, cy - 24, tt);
    ctx.beginPath();
    ctx.arc(tx, ty, Math.max(0.4, 2.4 - i * 0.3), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(31,122,46,${Math.max(0, 0.3 - i * 0.05)})`;
    ctx.fill();
  }

  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(-Math.PI / 4);
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(10, 0);
  ctx.lineTo(4, -5);
  ctx.lineTo(-4, -5);
  ctx.closePath();
  ctx.moveTo(-2, 0);
  ctx.lineTo(-2, 7);
  ctx.lineTo(4, 0);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
};

const sceneSupport = (ctx, cx, cy, isActive, time) => {
  const color = isActive ? "#1f7a2e" : "rgba(0,0,0,0.3)";

  ctx.save();
  ctx.translate(cx, cy + 6);
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.bezierCurveTo(-22, -8, -10, -26, 0, -10);
  ctx.bezierCurveTo(10, -26, 22, -8, 0, 10);
  ctx.closePath();
  ctx.fillStyle = isActive ? "rgba(31,122,46,0.12)" : "rgba(0,0,0,0.04)";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.restore();

  const ekgY = cy + 6;
  ctx.beginPath();
  ctx.moveTo(cx - 36, ekgY);
  for (let x = -36; x <= 36; x += 2) {
    const phase = (x + time * 30) % 24;
    let dy = 0;
    if (phase > 8 && phase < 11) dy = -10;
    else if (phase >= 11 && phase < 13) dy = 8;
    ctx.lineTo(cx + x, ekgY + dy);
  }
  ctx.strokeStyle = "#67D946";
  ctx.lineWidth = 1.6;
  ctx.stroke();

  const pulse = time % 2.4;
  if (pulse < 0.5) {
    const fade = 1 - pulse / 0.5;
    ctx.save();
    ctx.globalAlpha = fade;
    const bx = cx + 18;
    const by = cy - 30 - (0.5 - pulse) * 10;
    drawSpeechBubble(ctx, bx - 14, by - 12, 28, 16, color);
    ctx.beginPath();
    ctx.moveTo(bx - 5, by - 2);
    ctx.lineTo(bx - 1, by + 2);
    ctx.lineTo(bx + 6, by - 5);
    ctx.strokeStyle = "#1f7a2e";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();
  }
};

const SCENE_DRAWERS = [
  sceneEmployerRequest,
  sceneAgentAssigned,
  sceneCandidateSearch,
  sceneScreening,
  sceneInterview,
  sceneDocSync,
  sceneVisa,
  sceneDeployment,
  sceneSupport,
];

/* ---------------------------------------------------------------- */

const Process = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const activeStepRef = useRef(0);
  const transitionRef = useRef({ from: 0, to: 0, start: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-title-word", {
        y: 60,
        opacity: 0,
        rotateX: 45,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".process-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Track active-step transitions so the canvas can ease smoothly
  // between stages instead of snapping.
  useEffect(() => {
    transitionRef.current = {
      from: activeStepRef.current,
      to: activeStep,
      start: performance.now(),
    };
    activeStepRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frameId;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.parentElement.offsetWidth;
      const height = canvas.parentElement.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener("resize", resize);
    resize();

    const getPathPoints = (w, h) => {
      const points = [];
      const paddingX = w * 0.1;
      const rowHeight = h / 3;

      points.push({ x: paddingX, y: rowHeight * 0.5 });
      points.push({ x: w * 0.5, y: rowHeight * 0.5 });
      points.push({ x: w - paddingX, y: rowHeight * 0.5 });

      points.push({ x: w - paddingX, y: rowHeight * 1.5 });
      points.push({ x: w * 0.5, y: rowHeight * 1.5 });
      points.push({ x: paddingX, y: rowHeight * 1.5 });

      points.push({ x: paddingX, y: rowHeight * 2.5 });
      points.push({ x: w * 0.5, y: rowHeight * 2.5 });
      points.push({ x: w - paddingX, y: rowHeight * 2.5 });

      return points;
    };

    const tracePath = (points, fromIdx, toIdx) => {
      if (toIdx <= fromIdx) return;
      ctx.beginPath();
      ctx.moveTo(points[fromIdx].x, points[fromIdx].y);
      for (let j = fromIdx + 1; j <= toIdx; j++) {
        const p1 = points[j - 1];
        const p2 = points[j];
        if (p1.y === p2.y) {
          ctx.lineTo(p2.x, p2.y);
        } else {
          const cpX = (p1.x + p2.x) / 2;
          ctx.bezierCurveTo(p1.x, p2.y, cpX, p2.y, p2.x, p2.y);
        }
      }
    };

    const renderLoop = () => {
      time += 0.016;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);

      const points = getPathPoints(w, h);
      const activeIdx = activeStepRef.current;
      const { from: fromIdx, to: toIdx, start } = transitionRef.current;

      const moveDuration = 900;
      const elapsed = performance.now() - start;
      const tNorm = Math.min(elapsed / moveDuration, 1);
      const eased = easeInOutCubic(tNorm);
      const forwardMove = toIdx > fromIdx;

      // Base dashed path
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        if (p1.y === p2.y) {
          ctx.lineTo(p2.x, p2.y);
        } else {
          const cpX = (p1.x + p2.x) / 2;
          ctx.bezierCurveTo(p1.x, p2.y, cpX, p2.y, p2.x, p2.y);
        }
      }
      ctx.strokeStyle = "rgba(17, 17, 17, 0.12)";
      ctx.lineWidth = 4;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Solid highlight up to the settled node
      const settledIdx = forwardMove ? fromIdx : toIdx;
      tracePath(points, 0, settledIdx);
      ctx.strokeStyle = "#67D946";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.stroke();

      // Growing segment toward the node currently being walked to
      let markerX = points[toIdx] ? points[toIdx].x : points[0].x;
      let markerY = points[toIdx] ? points[toIdx].y : points[0].y;
      const bump = Math.sin(eased * Math.PI) * 10;

      if (forwardMove) {
        const fromPt = points[fromIdx];
        const toPt = points[toIdx];
        markerX = lerp(fromPt.x, toPt.x, eased);
        markerY = lerp(fromPt.y, toPt.y, eased);

        ctx.beginPath();
        ctx.moveTo(fromPt.x, fromPt.y);
        ctx.lineTo(markerX, markerY);
        ctx.strokeStyle = "#67D946";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.stroke();
      } else if (toIdx < fromIdx) {
        const fromPt = points[fromIdx];
        const toPt = points[toIdx];
        markerX = lerp(fromPt.x, toPt.x, eased);
        markerY = lerp(fromPt.y, toPt.y, eased);
      }

      // Stage nodes + scenes
      points.forEach((pt, idx) => {
        const isCurrent = idx === activeIdx;
        const pulse = isCurrent ? 1 + Math.sin(time * 3) * 0.03 : 1;
        const radius = (isCurrent ? 26 : 14) * pulse;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isCurrent ? "rgba(31,122,46,0.08)" : "#FFFFFF";
        ctx.fill();
        ctx.strokeStyle = isCurrent ? "#1f7a2e" : "rgba(0,0,0,0.3)";
        ctx.lineWidth = isCurrent ? 3 : 1.5;
        ctx.stroke();

        const drawer = SCENE_DRAWERS[idx];
        if (drawer) drawer(ctx, pt.x, pt.y - 4, isCurrent, time);

        ctx.font = isCurrent ? "bold 11px sans-serif" : "500 10px sans-serif";
        ctx.fillStyle = isCurrent ? "#1f7a2e" : "rgba(0,0,0,0.65)";
        ctx.textAlign = "center";
        ctx.fillText(STAGES[idx].title, pt.x, pt.y - 42);
      });

      // Traveling marker while moving between two nodes
      if (tNorm < 0.98 && fromIdx !== toIdx) {
        ctx.beginPath();
        ctx.arc(markerX, markerY - bump, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#1f7a2e";
        ctx.shadowColor = "rgba(31,122,46,0.5)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      frameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STAGES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden font-arimo px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-black/10 pb-10 lg:flex-row lg:items-end">
          <div>
            <span className="process-reveal text-xs font-bold uppercase tracking-[0.2em] text-black">
              Operational Lifecycle
            </span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              {["Recruitment", "Process", "Ownership"].map((word, i) => (
                <span
                  key={i}
                  className="mr-3 inline-block overflow-hidden pb-1"
                >
                  <span className="process-title-word inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <p className="process-reveal max-w-md text-base leading-relaxed text-black/70">
            A comprehensive overview tracking workflow requests through
            dedicated agent routing assignment, legal clearance pipelines, and
            deployment synchronization maps.
          </p>
        </div>

        {/* Dynamic Split Layout Panel */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Left Block: Stage Controller Menu Layout */}
          <div className="process-reveal lg:col-span-4 flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2">
            {STAGES.map((stage, index) => {
              const IconComponent = stage.icon;
              const isSelected = index === activeStep;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStep(index)}
                  className={`group relative flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-[#1f7a2e] bg-gradient-to-r from-[#1f7a2e]/5 to-transparent shadow-sm"
                      : "border-black/10 hover:border-black/20 hover:bg-black/[0.01]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isSelected
                        ? "bg-[#1f7a2e] text-white"
                        : "bg-black/5 text-black/60"
                    }`}
                  >
                    <IconComponent size={20} strokeWidth={2.2} />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold tracking-tight transition-colors ${
                          isSelected ? "text-[#1f7a2e]" : "text-black"
                        }`}
                      >
                        {stage.title}
                      </h4>
                      {isSelected && (
                        <span className="inline-flex items-center rounded-full bg-[#67D946]/20 px-2 py-0.5 text-[10px] font-bold text-[#1f7a2e] animate-pulse">
                          {stage.action}
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed text-black/60">
                      {stage.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Block: Live Path Vector Canvas Workspace */}
          <div className="process-reveal relative flex flex-col justify-between rounded-3xl border border-black/10 p-6 lg:col-span-8 min-h-[500px] lg:min-h-auto">
            {/* Control Panel Breadcrumb Top HUD */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-black/40">
                <span>
                  STAGE {activeStep + 1} OF {STAGES.length}
                </span>
                <ChevronRightIndicator />
                <span className="text-[#1f7a2e] uppercase">
                  {STAGES[activeStep].title}
                </span>
              </div>
              <div className="flex gap-1.5">
                {STAGES.map((_, dotIdx) => (
                  <div
                    key={dotIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === activeStep
                        ? "w-6 bg-[#1f7a2e]"
                        : "w-1.5 bg-black/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Interactive Vector Graphics Node Canvas Element */}
            <div className="relative w-full flex-1 min-h-[400px]">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
              />
            </div>

            {/* Micro Interaction Footer Controls */}
            <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
              <span className="text-xs font-medium text-black/50">
                Continuous live tracking architecture enabled.
              </span>
              <button
                onClick={() =>
                  setActiveStep((prev) => (prev + 1) % STAGES.length)
                }
                className="inline-flex items-center gap-2 text-xs font-bold text-black hover:text-[#1f7a2e] transition-colors"
              >
                Skip Stage Step
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ChevronRightIndicator = () => (
  <svg
    className="h-3 w-3 opacity-50"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default Process;
