import React, { useEffect, useRef } from "react";
import gsap from "gsap";

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

    const faces = [
      { x: 0.17, y: 0.28, s: 1.15, type: "big-smile" },
      { x: 0.44, y: 0.16, s: 1.05, type: "long-face" },
      { x: 0.77, y: 0.28, s: 1.1, type: "side-smile" },
      { x: 0.88, y: 0.5, s: 0.92, type: "surprise" },
      { x: 0.16, y: 0.62, s: 0.9, type: "sleepy" },
      { x: 0.76, y: 0.64, s: 0.95, type: "happy" },
    ];

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

    const drawEye = (x, y, r, lookX, lookY, sleepy = false) => {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#000";
      ctx.lineCap = "round";

      if (sleepy) {
        ctx.beginPath();
        ctx.arc(x, y, r, Math.PI * 0.15, Math.PI * 0.85);
        ctx.stroke();
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

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(face.s, face.s);
      ctx.rotate(Math.sin(time * 0.7 + index) * 0.08);

      if (face.type === "big-smile") {
        drawEye(-15, -12, 9, lookX, lookY);
        drawEye(15, -12, 9, lookX, lookY);

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.arc(0, 0, 28, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 6, 18, 0.15 * Math.PI, 0.85 * Math.PI);
        ctx.stroke();
      }

      if (face.type === "long-face") {
        drawEye(-12, -16, 8, lookX, lookY);
        drawEye(12, -16, 8, lookX, lookY);

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.arc(0, 6, 13, 0.15 * Math.PI, 0.85 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -2, 30, 0.25 * Math.PI, 0.75 * Math.PI);
        ctx.stroke();
      }

      if (face.type === "side-smile") {
        drawEye(-12, -10, 9, lookX, lookY);
        drawEye(12, -10, 9, lookX, lookY);

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3.5;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.arc(0, 6, 16, 0.15 * Math.PI, 0.75 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-8, 2, 25, Math.PI * 1.1, Math.PI * 1.55);
        ctx.stroke();
      }

      if (face.type === "surprise") {
        drawEye(-13, -13, 8, lookX, lookY);
        drawEye(13, -13, 8, lookX, lookY);

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 11, 8 + Math.sin(time * 2.2 + index) * 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (face.type === "sleepy") {
        drawEye(-13, -11, 10, lookX, lookY, true);
        drawEye(13, -11, 10, lookX, lookY, true);

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.arc(0, 8, 14, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();
      }

      if (face.type === "happy") {
        drawEye(-14, -12, 8, lookX, lookY);
        drawEye(14, -12, 8, lookX, lookY);

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.arc(0, 3, 22, 0.14 * Math.PI, 0.86 * Math.PI);
        ctx.stroke();
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

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.015;

      drawMarks();

      faces.forEach((face, index) => {
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

  return (
    <footer
      ref={footerRef}
      className="font-arimo relative overflow-hidden -mt-28 pb-10"
    >
      {/* proper large curve top */}
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
              Get started
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

            <div className="grid gap-8 sm:grid-cols-4">
              <FooterColumn
                title="Solutions"
                links={[
                  "Workforce Sourcing",
                  "Overseas Recruitment",
                  "Bulk Hiring",
                  "Trade Testing",
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

              <div>
                <h4 className="text-sm font-bold text-black">Headquarters</h4>
                <p className="mt-4 text-sm leading-6 text-black/75">
                  401 Workforce Avenue <br />
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-reveal mt-14 flex flex-col items-center justify-between gap-6 border-t border-black/10 pt-8 text-xs text-black/70 sm:flex-row">
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
