import React, { useEffect, useRef, useState } from "react";

const TEAM = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Managing Director",
    years: "18+",
    specialization: "International Recruitment",
    languages: ["English", "French", "German"],
    skills: [
      "Executive Hiring",
      "Board Advisory",
      "Global Mobility",
      "Talent Strategy",
    ],
    skin: "#F4C5A0",
    hair: "#3B1F0A",
    suit: "#1A2340",
    accent: "#C9A84C",
    initials: "SJ",
    badge: "★ Director",
  },
  {
    id: 2,
    name: "Marcus Adeyemi",
    position: "Head of Operations",
    years: "14+",
    specialization: "Strategic Partnerships",
    languages: ["English", "Yoruba", "Spanish"],
    skills: [
      "Process Optimisation",
      "Partnership Dev",
      "Risk Management",
      "Scale-up",
    ],
    skin: "#8D5524",
    hair: "#1C0A00",
    suit: "#2E4057",
    accent: "#D4A853",
    initials: "MA",
    badge: "◆ Operations",
  },
  {
    id: 3,
    name: "Priya Nair",
    position: "Senior Consultant",
    years: "11+",
    specialization: "Executive Search",
    languages: ["English", "Hindi", "Malayalam"],
    skills: [
      "C-Suite Search",
      "Assessment",
      "Succession Planning",
      "Headhunting",
    ],
    skin: "#C68642",
    hair: "#0D0204",
    suit: "#4A1942",
    accent: "#C9A84C",
    initials: "PN",
    badge: "✦ Consultant",
  },
  {
    id: 4,
    name: "Leon Müller",
    position: "Client Relations Lead",
    years: "9+",
    specialization: "C-Suite Placement",
    languages: ["English", "German", "Dutch"],
    skills: [
      "Client Retention",
      "Account Growth",
      "Negotiation",
      "CRM Strategy",
    ],
    skin: "#FDDBB4",
    hair: "#2C1810",
    suit: "#263238",
    accent: "#BFA04A",
    initials: "LM",
    badge: "▲ Relations",
  },
  {
    id: 5,
    name: "Amara Diallo",
    position: "Talent Acquisition VP",
    years: "16+",
    specialization: "Diversity & Inclusion",
    languages: ["English", "French", "Wolof"],
    skills: [
      "D&I Strategy",
      "Employer Branding",
      "Pipeline Building",
      "Culture Fit",
    ],
    skin: "#6B3A2A",
    hair: "#150700",
    suit: "#1B3A4B",
    accent: "#D4AF37",
    initials: "AD",
    badge: "❖ VP Talent",
  },
  {
    id: 6,
    name: "Yuki Tanaka",
    position: "Research Director",
    years: "12+",
    specialization: "Market Intelligence",
    languages: ["English", "Japanese", "Mandarin"],
    skills: [
      "Market Mapping",
      "Competitor Intel",
      "Data Analysis",
      "Sector Reports",
    ],
    skin: "#F0C080",
    hair: "#0A0A0A",
    suit: "#2C2C54",
    accent: "#C9A84C",
    initials: "YT",
    badge: "◉ Research",
  },
];

// ── colour helpers ────────────────────────────────────────────────────────────
function shiftLuminance(hex, pct) {
  let n = parseInt(hex.replace("#", ""), 16);
  let r = Math.min(255, Math.max(0, (n >> 16) + pct));
  let g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + pct));
  let b = Math.min(255, Math.max(0, (n & 0xff) + pct));
  return `rgb(${r},${g},${b})`;
}
const lighten = (h, p) => shiftLuminance(h, p);
const darken = (h, p) => shiftLuminance(h, -p);

// ── Canvas portrait ───────────────────────────────────────────────────────────
function drawPortrait(canvas, person) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width,
    H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // background
  const bg = ctx.createRadialGradient(
    W / 2,
    H * 0.4,
    10,
    W / 2,
    H / 2,
    W * 0.8,
  );
  bg.addColorStop(0, "#FFF6D9");
  bg.addColorStop(1, "#F2E4C0");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // subtle grid
  ctx.strokeStyle = "rgba(201,168,76,0.07)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 18) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 18) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  const cx = W / 2,
    shoulderY = H * 0.82,
    neckY = H * 0.56,
    headY = H * 0.36,
    headR = W * 0.22;

  // suit body
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx - W * 0.38, H);
  ctx.quadraticCurveTo(cx - W * 0.3, shoulderY - 10, cx - W * 0.18, neckY + 10);
  ctx.lineTo(cx, neckY + 20);
  ctx.lineTo(cx + W * 0.18, neckY + 10);
  ctx.quadraticCurveTo(cx + W * 0.3, shoulderY - 10, cx + W * 0.38, H);
  ctx.closePath();
  ctx.fillStyle = person.suit;
  ctx.fill();

  // lapels
  [[-1], [1]].forEach(([s]) => {
    ctx.beginPath();
    ctx.moveTo(cx, neckY + 20);
    ctx.lineTo(cx + s * W * 0.1, neckY + 50);
    ctx.lineTo(cx + s * W * 0.02, neckY + 80);
    ctx.closePath();
    const lg = ctx.createLinearGradient(cx - W * 0.1, neckY, cx, neckY + 80);
    lg.addColorStop(0, "rgba(255,255,255,0.18)");
    lg.addColorStop(1, "rgba(255,255,255,0.04)");
    ctx.fillStyle = lg;
    ctx.fill();
  });

  // pocket square
  ctx.save();
  ctx.translate(cx - W * 0.12, neckY + 68);
  ctx.fillStyle = person.accent;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(12, -4);
  ctx.lineTo(14, 6);
  ctx.lineTo(2, 8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.restore();

  // neck
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx, neckY + 2, W * 0.065, H * 0.065, 0, 0, Math.PI * 2);
  ctx.fillStyle = person.skin;
  ctx.fill();
  ctx.restore();

  // head
  ctx.save();
  const hg = ctx.createRadialGradient(
    cx - headR * 0.2,
    headY - headR * 0.15,
    headR * 0.1,
    cx,
    headY,
    headR,
  );
  hg.addColorStop(0, lighten(person.skin, 30));
  hg.addColorStop(0.6, person.skin);
  hg.addColorStop(1, darken(person.skin, 25));
  ctx.beginPath();
  ctx.ellipse(cx, headY, headR, headR * 1.15, 0, 0, Math.PI * 2);
  ctx.fillStyle = hg;
  ctx.fill();
  ctx.restore();

  // hair
  ctx.save();
  ctx.fillStyle = person.hair;
  ctx.beginPath();
  ctx.ellipse(
    cx,
    headY - headR * 0.55,
    headR * 1.05,
    headR * 0.72,
    0,
    Math.PI,
    Math.PI * 2,
  );
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(
    cx - headR * 0.85,
    headY - headR * 0.1,
    headR * 0.22,
    headR * 0.5,
    -0.3,
    0,
    Math.PI * 2,
  );
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(
    cx + headR * 0.85,
    headY - headR * 0.1,
    headR * 0.22,
    headR * 0.5,
    0.3,
    0,
    Math.PI * 2,
  );
  ctx.fill();
  ctx.restore();

  // eyes
  const eyeY = headY - headR * 0.05,
    eyeOff = headR * 0.34;
  [-eyeOff, eyeOff].forEach((dx) => {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx + dx, eyeY, headR * 0.14, headR * 0.09, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#F8F5F0";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + dx, eyeY, headR * 0.07, 0, Math.PI * 2);
    ctx.fillStyle = darken(person.hair, 10);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + dx, eyeY, headR * 0.035, 0, Math.PI * 2);
    ctx.fillStyle = "#0A0A0A";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      cx + dx - headR * 0.02,
      eyeY - headR * 0.02,
      headR * 0.015,
      0,
      Math.PI * 2,
    );
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx + dx - headR * 0.14, eyeY - headR * 0.15);
    ctx.quadraticCurveTo(
      cx + dx,
      eyeY - headR * 0.19,
      cx + dx + headR * 0.14,
      eyeY - headR * 0.15,
    );
    ctx.strokeStyle = person.hair;
    ctx.lineWidth = Math.max(1.5, headR * 0.055);
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();
  });

  // nose
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx, eyeY + headR * 0.12);
  ctx.quadraticCurveTo(
    cx + headR * 0.08,
    eyeY + headR * 0.32,
    cx,
    eyeY + headR * 0.38,
  );
  ctx.strokeStyle = darken(person.skin, 20);
  ctx.lineWidth = headR * 0.04;
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.restore();

  // smile
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx - headR * 0.18, eyeY + headR * 0.52);
  ctx.quadraticCurveTo(
    cx,
    eyeY + headR * 0.65,
    cx + headR * 0.18,
    eyeY + headR * 0.52,
  );
  ctx.strokeStyle = darken(person.skin, 35);
  ctx.lineWidth = headR * 0.05;
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.restore();

  // gold arc
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, headY, headR + 6, Math.PI * 1.15, Math.PI * 1.85);
  ctx.strokeStyle = person.accent;
  ctx.lineWidth = 2.5;
  ctx.globalAlpha = 0.6;
  ctx.stroke();
  ctx.restore();

  // initials badge
  ctx.save();
  ctx.beginPath();
  ctx.arc(
    cx + headR * 0.75,
    headY + headR * 0.75,
    headR * 0.26,
    0,
    Math.PI * 2,
  );
  ctx.fillStyle = person.accent;
  ctx.fill();
  ctx.fillStyle = "#FFF9E6";
  ctx.font = `bold ${Math.round(headR * 0.22)}px Georgia,serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(person.initials, cx + headR * 0.75, headY + headR * 0.76);
  ctx.restore();
}

// ── Animated SVG background ───────────────────────────────────────────────────
function AnimatedBg() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* wave 1 */}
      <svg
        className="absolute w-full"
        style={{ top: "-2%", animation: "waveFloat 14s ease-in-out infinite" }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(201,168,76,0.07)"
          d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,0L0,0Z"
        />
      </svg>
      {/* wave 2 */}
      <svg
        className="absolute w-full"
        style={{
          top: "8%",
          animation: "waveFloat 18s ease-in-out infinite reverse",
        }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(201,168,76,0.05)"
          d="M0,64L60,80C120,96,240,128,360,128C480,128,600,96,720,85.3C840,75,960,85,1080,96C1200,107,1320,117,1380,122.7L1440,128L1440,0L0,0Z"
        />
      </svg>

      {/* clip-path morphing blobs */}
      <div
        className="absolute"
        style={{
          top: "-20%",
          left: "-10%",
          width: "55%",
          height: "70%",
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.09) 0%, transparent 70%)",
          animation: "blobMorph1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "-25%",
          right: "-8%",
          width: "50%",
          height: "65%",
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)",
          animation: "blobMorph2 25s ease-in-out infinite",
        }}
      />

      {/* floating gold orbs */}
      {[
        { w: 180, h: 180, top: "12%", left: "3%", dur: "16s" },
        { w: 120, h: 120, top: "55%", left: "88%", dur: "22s" },
        { w: 90, h: 90, top: "78%", left: "20%", dur: "19s" },
        { w: 60, h: 60, top: "30%", left: "72%", dur: "13s" },
      ].map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: o.w,
            height: o.h,
            top: o.top,
            left: o.left,
            background:
              "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
            animation: `orbFloat ${o.dur} ease-in-out infinite`,
            animationDelay: `${i * 2.5}s`,
          }}
        />
      ))}

      {/* hairline grid overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ mixBlendMode: "multiply" }}
      >
        <defs>
          <pattern
            id="ltgrid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M60 0 L0 0 0 60"
              fill="none"
              stroke="rgba(201,168,76,0.18)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ltgrid)" />
      </svg>

      <style>{`
        @keyframes waveFloat {
          0%,100%{ transform: translateY(0) scaleX(1); }
          50%    { transform: translateY(-18px) scaleX(1.03); }
        }
        @keyframes blobMorph1 {
          0%,100%{ clip-path: ellipse(55% 50% at 40% 45%); }
          33%    { clip-path: ellipse(60% 44% at 50% 40%); }
          66%    { clip-path: ellipse(50% 55% at 35% 55%); }
        }
        @keyframes blobMorph2 {
          0%,100%{ clip-path: ellipse(52% 48% at 60% 55%); }
          40%    { clip-path: ellipse(58% 52% at 65% 50%); }
          70%    { clip-path: ellipse(48% 58% at 55% 60%); }
        }
        @keyframes orbFloat {
          0%,100%{ transform: translateY(0) scale(1);     opacity:0.7; }
          50%    { transform: translateY(-24px) scale(1.08); opacity:1; }
        }
        @keyframes cardIn {
          from{ opacity:0; transform:translateY(40px) scale(0.94); }
          to  { opacity:1; transform:translateY(0)    scale(1); }
        }
        @keyframes shimmer {
          0%  { background-position: -200% center; }
          100%{ background-position:  200% center; }
        }
        @keyframes skillPop {
          from{ opacity:0; transform:scale(0.8) translateY(4px); }
          to  { opacity:1; transform:scale(1)   translateY(0); }
        }
        @keyframes glowPulse {
          0%,100%{ box-shadow: 0 0 0 0 rgba(201,168,76,0); }
          50%    { box-shadow: 0 0 22px 6px rgba(201,168,76,0.18); }
        }
      `}</style>
    </div>
  );
}

function LeaderCard({ person, index }) {
  const canvasRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (canvasRef.current) drawPortrait(canvasRef.current, person);
  }, [person]);

  const delay = `${index * 0.1}s`;

  return (
    <div
      className="relative font-arimo"
      style={{
        perspective: "1100px",
        animation: "cardIn 0.72s cubic-bezier(0.22,1,0.36,1) both",
        animationDelay: delay,
      }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 420,
          transformStyle: "preserve-3d",
          transition:
            "transform 0.75s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s",
          borderRadius: 22,
          cursor: "pointer",
          transform: flipped
            ? "rotateY(180deg)"
            : hovered
              ? "translateY(-10px) rotateY(5deg) rotateX(2deg)"
              : "rotateY(0deg)",
          boxShadow:
            hovered && !flipped
              ? "0 36px 72px rgba(26,35,64,0.16), 0 0 0 1.5px rgba(201,168,76,0.22)"
              : "0 8px 28px rgba(26,35,64,0.09)",
        }}
      >
        {/* ══ FRONT ══ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            background: "#FFF9E6",
            border: "1px solid rgba(201,168,76,0.22)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 0 18px",
          }}
        >
          {/* shimmer bar top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${person.accent}, transparent)`,
              backgroundSize: "200% 100%",
              animation: "shimmer 3s linear infinite",
            }}
          />

          {/* corner SVG filigree */}
          {[
            ["tl", "top:10px;left:10px", "M2 38 L2 2 L38 2", "2 2"],
            [
              "br",
              "bottom:10px;right:10px;transform:rotate(180deg)",
              "M38 2 L38 38 L2 38",
              "38 38",
            ],
          ].map(([k, st, d, cp]) => (
            <svg
              key={k}
              viewBox="0 0 40 40"
              fill="none"
              style={{
                position: "absolute",
                width: 34,
                height: 34,
                ...Object.fromEntries(
                  st.split(";").map((s) => {
                    const [kk, ...vv] = s.split(":");
                    return [kk.trim(), vv.join(":").trim()];
                  }),
                ),
              }}
            >
              <path
                d={d}
                stroke={person.accent}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle
                cx={cp.split(" ")[0]}
                cy={cp.split(" ")[1]}
                r="2.5"
                fill={person.accent}
              />
            </svg>
          ))}

          {/* badge ribbon */}
          <div
            style={{
              position: "absolute",
              top: 18,
              right: -2,
              background: `linear-gradient(135deg,${person.accent},#F0D890)`,
              padding: "4px 14px 4px 10px",
              borderRadius: "4px 0 0 4px",
              boxShadow: `-2px 2px 10px ${person.accent}55`,
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#1A2340",
              }}
            >
              {person.badge}
            </span>
          </div>

          {/* portrait */}
          <div
            style={{
              position: "relative",
              marginTop: 30,
              width: 168,
              height: 184,
              flexShrink: 0,
              animation:
                hovered && !flipped
                  ? "glowPulse 2s ease-in-out infinite"
                  : "none",
              borderRadius: 14,
            }}
          >
            <canvas
              ref={canvasRef}
              width={200}
              height={220}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 14,
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -3,
                borderRadius: 17,
                boxShadow: `0 0 0 1.5px ${person.accent}55, 0 8px 22px ${person.accent}22`,
                pointerEvents: "none",
              }}
            />
          </div>

          {/* name + position + years */}
          <div
            style={{
              textAlign: "center",
              padding: "14px 20px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <h3
              style={{
                fontSize: "1.08rem",
                fontWeight: 700,
                color: "#1A2340",
                lineHeight: 1.2,
              }}
            >
              {person.name}
            </h3>
            <p
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.09em",
                color: person.accent,
                textTransform: "uppercase",
                marginTop: 1,
              }}
            >
              {person.position}
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 3,
                background: "rgba(201,168,76,0.09)",
                border: "1px solid rgba(201,168,76,0.18)",
                borderRadius: 100,
                padding: "3px 13px",
                marginTop: 6,
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#1A2340",
                }}
              >
                {person.years}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: "#6B5C3E",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                Yrs Exp
              </span>
            </div>
          </div>

          {/* flip hint */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 9.5,
              color: "rgba(107,92,62,0.45)",
              marginTop: "auto",
              paddingTop: 10,
              letterSpacing: "0.05em",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.89" />
            </svg>
            Click to reveal profile
          </div>
        </div>

        {/* ══ BACK ══ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            background: "#FFF9E6",
            border: "1px solid rgba(201,168,76,0.22)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "26px 22px 20px",
          }}
        >
          {/* shimmer bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${person.accent}, transparent)`,
              backgroundSize: "200% 100%",
              animation: "shimmer 3s linear infinite",
            }}
          />

          {/* corner filigrees */}
          {[
            ["tl", "top:10px;left:10px", "M2 38 L2 2 L38 2", "2 2"],
            [
              "br",
              "bottom:10px;right:10px;transform:rotate(180deg)",
              "M38 2 L38 38 L2 38",
              "38 38",
            ],
          ].map(([k, st, d, cp]) => (
            <svg
              key={k}
              viewBox="0 0 40 40"
              fill="none"
              style={{
                position: "absolute",
                width: 30,
                height: 30,
                ...Object.fromEntries(
                  st.split(";").map((s) => {
                    const [kk, ...vv] = s.split(":");
                    return [kk.trim(), vv.join(":").trim()];
                  }),
                ),
              }}
            >
              <path
                d={d}
                stroke={person.accent}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle
                cx={cp.split(" ")[0]}
                cy={cp.split(" ")[1]}
                r="2.5"
                fill={person.accent}
              />
            </svg>
          ))}

          {/* monogram watermark */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 16,
              fontSize: "3.2rem",
              fontWeight: 700,
              color: person.accent,
              opacity: 0.09,
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {person.initials}
          </div>

          {/* divider + name */}
          <div
            style={{
              width: 38,
              height: 2.5,
              background: person.accent,
              borderRadius: 2,
              marginBottom: 10,
              opacity: 0.75,
            }}
          />
          <h3
            style={{
              fontSize: "1.08rem",
              fontWeight: 700,
              color: "#1A2340",
              marginBottom: 2,
            }}
          >
            {person.name}
          </h3>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.11em",
              textTransform: "uppercase",
              color: person.accent,
              marginBottom: 14,
            }}
          >
            {person.position}
          </p>

          {/* info rows */}
          <ul
            style={{
              listStyle: "none",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 9,
              marginBottom: 16,
            }}
          >
            {[
              [
                "⏱",
                <>
                  <strong style={{ color: "#1A2340" }}>
                    {person.years} Years
                  </strong>{" "}
                  Experience
                </>,
              ],
              ["🎯", person.specialization],
              ["🌐", person.languages.join(" · ")],
            ].map(([icon, content], i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 9,
                  fontSize: 12,
                  color: "#2D2416",
                  lineHeight: 1.45,
                }}
              >
                <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>
                  {icon}
                </span>
                <span>{content}</span>
              </li>
            ))}
          </ul>

          {/* skills section */}
          <div style={{ width: "100%" }}>
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: person.accent,
                marginBottom: 8,
              }}
            >
              Core Skills
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {person.skills.map((sk, i) => (
                <span
                  key={sk}
                  style={{
                    fontSize: 9.5,
                    fontWeight: 600,
                    color: "#1A2340",
                    background: "rgba(201,168,76,0.1)",
                    border: `1px solid ${person.accent}44`,
                    borderRadius: 100,
                    padding: "3px 9px",
                    letterSpacing: "0.04em",
                    animation:
                      "skillPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
                    animationDelay: `${i * 0.06}s`,
                  }}
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* back flip hint */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 9.5,
              color: "rgba(107,92,62,0.4)",
              marginTop: "auto",
              paddingTop: 10,
              letterSpacing: "0.04em",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-.49-3.89" />
            </svg>
            Click to flip back
          </div>
        </div>
      </div>
    </div>
  );
}

const LeaderShipTeam = () => (
  <div
    className="relative min-h-screen overflow-hidden"
    // style={{ background: "#FFF9E6" }}
  >
    <AnimatedBg />

    <div className="relative" style={{ zIndex: 1, padding: "64px 24px 80px" }}>
      <header className="text-center mb-16">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#C9A84C",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              width: 36,
              height: 1,
              background: "currentColor",
              opacity: 0.55,
              display: "block",
            }}
          />
          Premium Leadership
          <span
            style={{
              width: 36,
              height: 1,
              background: "currentColor",
              opacity: 0.55,
              display: "block",
            }}
          />
        </div>

        <h1
          style={{
            fontSize: "clamp(2.1rem,5vw,3.5rem)",
            fontWeight: 700,
            color: "#1A2340",
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            marginBottom: 16,
          }}
        >
          Meet Our{" "}
          <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Leadership</em>
          <br />
          Team
        </h1>

        <p
          style={{
            maxWidth: 460,
            margin: "0 auto",
            fontSize: 14.5,
            lineHeight: 1.75,
            color: "#6B5C3E",
            fontWeight: 300,
          }}
        >
          Decades of collective expertise guiding organisations toward their
          most ambitious goals.
        </p>

        <div
          style={{
            width: 56,
            height: 2,
            margin: "26px auto 0",
            background:
              "linear-gradient(90deg, transparent, #C9A84C, transparent)",
          }}
        />
      </header>

      {/* card grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(265px, 1fr))",
          gap: 34,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {TEAM.map((p, i) => (
          <LeaderCard key={p.id} person={p} index={i} />
        ))}
      </div>

      {/* footer hint */}
      <footer style={{ textAlign: "center", marginTop: 60 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(107,92,62,0.38)",
          }}
        >
          <span
            style={{
              width: 36,
              height: 1,
              background: "currentColor",
              display: "block",
            }}
          />
          Click any card to reveal full profile
          <span
            style={{
              width: 36,
              height: 1,
              background: "currentColor",
              display: "block",
            }}
          />
        </span>
      </footer>
    </div>
  </div>
);

export default LeaderShipTeam;
