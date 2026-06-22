import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MapPin } from "lucide-react";

const Footer = () => {
  const footerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".footer-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.3,
        ease: "power3.out",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w;
    let h;
    let frame;
    let time = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;

    const expressionLibrary = {
      bigSmile: {
        mouthStart: 0.1,
        mouthEnd: 0.9,
        mouthRadius: 28,
        mouthOffsetY: 0,
        mouthWidth: 4,
        eyeSleepy: 0,
        eyeRadius: 9,
        secondaryMouth: 1,
      },
      longFace: {
        mouthStart: 0.25,
        mouthEnd: 0.75,
        mouthRadius: 30,
        mouthOffsetY: -2,
        mouthWidth: 3,
        eyeSleepy: 0,
        eyeRadius: 8,
        secondaryMouth: 0.4,
      },
      sideSmile: {
        mouthStart: 0.15,
        mouthEnd: 0.75,
        mouthRadius: 16,
        mouthOffsetY: 6,
        mouthWidth: 3.5,
        eyeSleepy: 0,
        eyeRadius: 9,
        secondaryMouth: 0,
      },
      surprise: {
        mouthStart: 0,
        mouthEnd: 2,
        mouthRadius: 9,
        mouthOffsetY: 11,
        mouthWidth: 3,
        eyeSleepy: 0,
        eyeRadius: 8.5,
        secondaryMouth: 0,
        roundMouth: true,
      },
      sleepy: {
        mouthStart: 0.2,
        mouthEnd: 0.8,
        mouthRadius: 14,
        mouthOffsetY: 8,
        mouthWidth: 3,
        eyeSleepy: 1,
        eyeRadius: 10,
        secondaryMouth: 0,
      },
      happy: {
        mouthStart: 0.14,
        mouthEnd: 0.86,
        mouthRadius: 22,
        mouthOffsetY: 3,
        mouthWidth: 4,
        eyeSleepy: 0,
        eyeRadius: 8,
        secondaryMouth: 0,
      },
      wink: {
        mouthStart: 0.15,
        mouthEnd: 0.85,
        mouthRadius: 24,
        mouthOffsetY: 2,
        mouthWidth: 4,
        eyeSleepy: 0.5,
        eyeRadius: 9,
        secondaryMouth: 0,
      },
    };

    const expressionNames = Object.keys(expressionLibrary);

    const lerp = (a, b, t) => a + (b - a) * t;
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const lerpExpression = (a, b, t) => {
      const e = easeInOutCubic(Math.max(0, Math.min(1, t)));
      const out = {};
      for (const key of Object.keys(a)) {
        if (typeof a[key] === "number") {
          out[key] = lerp(a[key], b[key] ?? a[key], e);
        }
      }
      out.roundMouth = e > 0.5 ? b.roundMouth : a.roundMouth;
      return out;
    };

    const pickNextExpression = (currentName) => {
      const candidates = expressionNames.filter((n) => n !== currentName);
      return candidates[Math.floor(Math.random() * candidates.length)];
    };

    const faces = [
      { x: 0.17, y: 0.28, s: 1.15, startName: "bigSmile" },
      { x: 0.44, y: 0.16, s: 1.05, startName: "longFace" },
      { x: 0.77, y: 0.28, s: 1.1, startName: "sideSmile" },
      { x: 0.88, y: 0.5, s: 0.92, startName: "surprise" },
      { x: 0.16, y: 0.62, s: 0.9, startName: "sleepy" },
      { x: 0.76, y: 0.64, s: 0.95, startName: "happy" },
    ].map((face, i) => ({
      ...face,
      fromName: face.startName,
      toName: face.startName,
      morph: 1, // 1 = fully settled on toName
      nextSwitchAt: 3 + Math.random() * 4 + i * 0.6,
      holdTime: 0,
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

    const drawEye = (x, y, r, lookX, lookY, sleepyAmount = 0) => {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#000";
      ctx.lineCap = "round";

      if (sleepyAmount > 0.05) {
        const openR = r * (1 - sleepyAmount * 0.55);

        ctx.beginPath();
        ctx.ellipse(
          x,
          y,
          r * 0.85,
          Math.max(2, openR),
          0,
          Math.PI * 0.15 * sleepyAmount,
          Math.PI * (1 - 0.15 * sleepyAmount),
        );
        ctx.stroke();

        if (sleepyAmount < 0.92) {
          ctx.beginPath();
          ctx.arc(
            x + lookX * r * 0.38,
            y + lookY * r * 0.35,
            Math.max(1, r * 0.3 * (1 - sleepyAmount)),
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = "#000";
          ctx.fill();
        }
        return;
      }

      ctx.beginPath();
      ctx.ellipse(x, y, r * 0.85, r, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x + lookX * r * 0.38,
        y + lookY * r * 0.35,
        r * 0.3,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = "#000";
      ctx.fill();
    };

    const drawFace = (face, index) => {
      const x = face.x * w;
      const y = face.y * h + Math.sin(time * 1.1 + index) * 8;
      const lookX = (mouseX - 0.5) * 1.4 + Math.sin(time + index) * 0.12;
      const lookY = (mouseY - 0.5) * 1.2 + Math.cos(time + index) * 0.08;

      const from = expressionLibrary[face.fromName];
      const to = expressionLibrary[face.toName];
      const params = lerpExpression(from, to, face.morph);

      const winkBlend =
        (face.fromName === "wink" ? 1 - face.morph : 0) +
        (face.toName === "wink" ? face.morph : 0);

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(face.s, face.s);
      ctx.rotate(Math.sin(time * 0.7 + index) * 0.08);

      drawEye(-15, -12, params.eyeRadius, lookX, lookY, params.eyeSleepy);
      drawEye(
        15,
        -12,
        params.eyeRadius,
        lookX,
        lookY,
        Math.min(1, params.eyeSleepy + winkBlend),
      );

      ctx.strokeStyle = "#000";
      ctx.lineWidth = params.mouthWidth;
      ctx.lineCap = "round";

      if (params.roundMouth) {
        ctx.beginPath();
        ctx.arc(
          0,
          params.mouthOffsetY,
          params.mouthRadius + Math.sin(time * 2.2 + index) * 2,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(
          0,
          params.mouthOffsetY,
          params.mouthRadius,
          params.mouthStart * Math.PI,
          params.mouthEnd * Math.PI,
        );
        ctx.stroke();

        if (params.secondaryMouth > 0.05) {
          ctx.save();
          ctx.globalAlpha = params.secondaryMouth;
          ctx.beginPath();
          ctx.arc(
            0,
            params.mouthOffsetY + 6,
            params.mouthRadius * 0.64,
            (params.mouthStart + 0.05) * Math.PI,
            (params.mouthEnd - 0.05) * Math.PI,
          );
          ctx.stroke();
          ctx.restore();
        }
      }

      ctx.restore();
    };

    const drawMarks = () => {
      const marks = [
        [0.08, 0.43, 0.6],
        [0.28, 0.2, 1.2],
        [0.58, 0.2, -0.2],
        [0.82, 0.23, 0.7],
        [0.34, 0.62, 0.9],
        [0.66, 0.6, -0.5],
        [0.5, 0.09, 0.4],
      ];

      marks.forEach(([mx, my, rot], i) => {
        ctx.save();
        ctx.translate(mx * w, my * h + Math.sin(time * 1.5 + i) * 5);
        ctx.rotate(rot + Math.sin(time + i) * 0.22);

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.arc(0, 0, 16, 0.2, 1.15);
        ctx.stroke();

        ctx.restore();
      });
    };

    const MORPH_DURATION = 0.7;

    const updateFaceExpression = (face) => {
      if (face.morph < 1) {
        face.morph += 0.022 / MORPH_DURATION;
        if (face.morph >= 1) {
          face.morph = 1;
          face.fromName = face.toName;
        }
        return;
      }

      face.holdTime += 0.015;
      if (face.holdTime >= face.nextSwitchAt) {
        face.fromName = face.toName;
        face.toName = pickNextExpression(face.fromName);
        face.morph = 0;
        face.holdTime = 0;
        face.nextSwitchAt = 3 + Math.random() * 4;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.015;

      drawMarks();

      faces.forEach((face, index) => {
        updateFaceExpression(face);
        drawFace(face, index);
      });

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const offices = [
    {
      country: "Scotland · UK",
      address:
        "Hillington Business Centre, 15–17 Nasmyth Rd S, Hillington, Glasgow G52 4RE",
    },
    {
      country: "Dhaka · Bangladesh",
      address: "Sector 10, Dhaka 1230, Bangladesh",
    },
    {
      country: "Romania",
      address: "201 Barbu Văcărescu, 020276 Bucharest, Romania",
    },
    {
      country: "Portugal",
      address: "Avenida da República 8, 3º Esq., 1050-195 Lisbon, Portugal",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="font-arimo relative overflow-hidden -mt-28 pb-10"
    >
      <div
        className="absolute inset-0 bg-[#FFF9E6]"
        style={{
          borderRadius: "55% 55% 0 0 / 100% 100% 0 0",
          transform: "scaleX(1.5)",
          top: 0,
          left: "-25%",
          right: "-25%",
          width: "150%",
          height: "100%",
        }}
      />

      {/* face canvas */}
      <div className="pointer-events-auto absolute inset-x-0 top-0 pt-6 z-10 h-[360px]">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="mx-auto max-w-4xl pt-16 text-center">
          <h2 className="text-4xl font-normal leading-tight tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "OutsourceZen",
              "+",
              "built",
              "to",
              "make",
              "hiring",
              "better.",
            ].map((word, index) => (
              <span key={index} className="inline-block overflow-hidden px-1">
                <span className="footer-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <a
            href="/contact"
            className="footer-reveal group relative mt-7 inline-flex overflow-hidden rounded-full bg-black px-7 py-3 text-sm font-bold text-white"
          >
            <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-700 ease-out group-hover:w-full" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
              Connect with us
            </span>
          </a>
        </div>

        <div className="footer-reveal mt-24 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <a
              href="/"
              className="text-3xl font-bold tracking-[-0.05em] text-black"
            >
              OutsourceZen
            </a>

            <div className="mt-8 flex gap-3">
              {["X", "f", "in"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-4">
              <a
                href="@mailto:talk@outreachzen.com"
                className="hover:underline"
              >
                talk@outreachzen.com
              </a>
            </div>
          </div>

          <div>
            <div className="mb-10 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <p className="text-sm text-black">
                Sign up for workforce insights, hiring tips and recruitment
                updates.
              </p>

              <form className="flex overflow-hidden rounded-full border border-black/10 bg-white p-1">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full min-w-0 bg-transparent px-4 text-sm outline-none sm:w-64"
                />
                <button className="rounded-full bg-[#A6E6EC] px-5 py-2 text-xs font-bold text-black transition-all duration-300 hover:bg-yellow-400">
                  Sign Up
                </button>
              </form>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <FooterColumn
                title="Solutions"
                links={[
                  "Workforce Sourcing",
                  "Overseas Recruitment",
                  "Bulk Hiring",
                  "Candidate Screening",
                ]}
              />

              <FooterColumn
                title="Company"
                links={["About", "Careers", "Contact", "Live Jobs"]}
              />

              <FooterColumn
                title="Resources"
                links={["Resources", "FAQs", "Case Studies", "News"]}
              />

              {/* <div>
                <h4 className="text-sm font-bold text-black">Address</h4>
                <p className="mt-4 text-sm leading-6 text-black/75">
                  <span className="font-bold">Scotland | UK</span> <br />{" "}
                  Hillington Business Centre, 15, 17 Nasmyth Rd S, Hillington,
                  Glasgow G52 4RE
                </p>
                <p className="mt-4 text-sm leading-6 text-black/75">
                  <span className="font-bold">Dhaka | Bangladesh</span> <br />{" "}
                  Sector 10, Dhaka 1230, Bangladesh
                </p>
                <p className="mt-4 text-sm leading-6 text-black/75">
                  <span className="font-bold">Romania</span> <br /> 201 Barbu
                  Văcărescu, 020276 Bucharest, Romania.
                </p>
                <p className="mt-4 text-sm leading-6 text-black/75">
                  <span className="font-bold">Portugal</span> <br />
                  Avenida da República 8, 3º Esq., 1050-195 Lisbon, Portugal.
                </p>
              </div> */}
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-black/10 pt-8">
          <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.18em]  text-black/80">
            Our Offices
          </h4>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {offices.map(({ country, address }) => (
              <div
                key={country}
                className="rounded-[20px] border border-black/10 bg-white/60 p-5"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFE994]">
                    <MapPin size={13} strokeWidth={2.5} />
                  </span>
                  <p className="text-sm font-bold text-black">{country}</p>
                </div>
                <p className="text-xs leading-5 text-black/60">{address}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-reveal mt-8 flex flex-col items-center justify-between gap-6 border-t border-black/10 pt-8 text-xs text-black/70 sm:flex-row">
          <p>© 2026 OutsourceZen. All rights reserved.</p>

          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-black">
              Privacy
            </a>
            <a href="/terms" className="hover:text-black">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => {
  return (
    <div>
      <h4 className="text-sm font-bold text-black">{title}</h4>

      <ul className="mt-4 space-y-2">
        {links.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-sm text-black/75 transition-colors duration-300 hover:text-black"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
