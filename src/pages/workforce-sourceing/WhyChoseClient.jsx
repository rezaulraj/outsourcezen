import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const cards = [
  {
    title: "Verified Workforce Sourcing",
    text: "We source job-ready candidates through trusted local channels, agent networks and pre-screened talent pools.",
    color: "#B88CFF",
    type: "search",
  },
  {
    title: "Fast Bulk Hiring Support",
    text: "From urgent project hiring to large manpower demand, we help clients move faster without losing quality.",
    color: "#67D96B",
    type: "bulk",
  },
  {
    title: "Trade Testing & Screening",
    text: "Candidates are checked by skill, experience, documents and role suitability before moving forward.",
    color: "#FF8A6A",
    type: "screen",
  },
  {
    title: "Visa & Documentation Help",
    text: "Our team supports employers with paperwork, coordination and deployment preparation.",
    color: "#71D6F6",
    type: "doc",
  },
  {
    title: "Local Recruitment Agents",
    text: "Native sourcing partners help verify candidates in their local market before selection.",
    color: "#FFE06B",
    type: "agent",
  },
  {
    title: "Client-Ready Deployment",
    text: "We prepare selected workers for onboarding, relocation and smooth workplace integration.",
    color: "#8FEA8A",
    type: "deploy",
  },
];

const WhyChoseClient = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-client-word", {
        y: 60,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".why-client-reveal", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".why-client-card", {
        y: 55,
        opacity: 0,
        rotateX: 18,
        duration: 0.9,
        stagger: 0.09,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".why-client-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center",
        duration: 1,
        delay: 0.6,
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

    const drawArrowBird = (x, y, rot, scale, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + i) * 8);
      ctx.rotate(rot + Math.sin(time + i) * 0.15);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-16, 0);
      ctx.quadraticCurveTo(-5, -8, 8, -3);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(8, -3);
      ctx.lineTo(1, -11);
      ctx.moveTo(8, -3);
      ctx.lineTo(0, 5);
      ctx.stroke();

      ctx.restore();
    };

    const drawDot = (x, y, r, i) => {
      ctx.beginPath();
      ctx.arc(x, y + Math.sin(time * 1.8 + i) * 5, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.75)";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.015;

      drawArrowBird(w * 0.2, h * 0.2, 0.2, 1, 1);
      drawArrowBird(w * 0.78, h * 0.18, -0.35, 0.9, 2);
      drawArrowBird(w * 0.32, h * 0.92, 0.4, 1.05, 3);
      drawArrowBird(w * 0.72, h * 0.88, -0.25, 0.9, 4);

      drawDot(w * 0.14, h * 0.52, 4, 5);
      drawDot(w * 0.86, h * 0.5, 4, 6);
      drawDot(w * 0.5, h * 0.1, 3.5, 7);

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
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[#CFF7BC]" />

      <svg
        className="absolute left-0 top-0 h-[120px] w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H1440V45C1180 95 900 20 720 55C470 100 230 70 0 25V0Z"
          fill="var(--color-primary-bg)"
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 h-[150px] w-full"
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
      >
        <path
          d="M0 150V95C210 35 470 75 720 52C980 28 1210 55 1440 105V150H0Z"
          fill="var(--color-primary-bg)"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 z-10">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="why-client-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
            The OutsourceZen Difference
          </p>

          <h2 className="text-4xl font-normal leading-tight tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Why", "Clients", "Choose", "Us"].map((word, index) => (
              <span key={index} className="inline-block overflow-hidden px-1">
                <span className="why-client-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="why-client-line mx-auto mt-2 h-5 w-[280px] max-w-full"
            viewBox="0 0 280 24"
            fill="none"
          >
            <path
              d="M12 15C60 5 112 8 142 13C190 21 230 10 268 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="why-client-reveal mx-auto mt-4 max-w-lg text-sm leading-6 text-black/70">
            A fully managed recruitment model built for speed, verified
            workforce quality and long-term client partnership.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <ClientCard key={index} card={card} />
          ))}
        </div>

        <div className="why-client-reveal mt-10 flex justify-center">
          <a
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-black px-7 py-3 text-sm font-bold text-white"
          >
            <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-700 ease-out group-hover:w-full" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
              Connect with us
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

const ClientCard = ({ card }) => {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame;
    let hover = 0;
    let time = 0;

    const w = 54;
    const h = 54;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const drawIcon = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.02;
      hover += ((hoverRef.current ? 1 : 0) - hover) * 0.09;

      const cx = w / 2;
      const cy = h / 2;
      const pulse = 1 + Math.sin(time * 2) * 0.04 + hover * 0.08;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(pulse, pulse);

      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fillStyle = card.color;
      ctx.fill();

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2.3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (card.type === "search") {
        ctx.beginPath();
        ctx.arc(-3, -3, 7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(3, 3);
        ctx.lineTo(10, 10);
        ctx.stroke();
      }

      if (card.type === "bulk") {
        [-7, 0, 7].forEach((x) => {
          ctx.beginPath();
          ctx.arc(x, -4, 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, 8, 6, Math.PI, 0);
          ctx.stroke();
        });
      }

      if (card.type === "screen") {
        ctx.strokeRect(-10, -10, 8, 8);
        ctx.strokeRect(2, -10, 8, 8);
        ctx.strokeRect(-10, 2, 8, 8);
        ctx.strokeRect(2, 2, 8, 8);
      }

      if (card.type === "doc") {
        ctx.beginPath();
        ctx.roundRect(-9, -11, 18, 22, 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-4, -4);
        ctx.lineTo(5, -4);
        ctx.moveTo(-4, 2);
        ctx.lineTo(5, 2);
        ctx.stroke();
      }

      if (card.type === "agent") {
        ctx.beginPath();
        ctx.arc(0, -5, 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 9, 10, Math.PI, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(9, -7, 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (card.type === "deploy") {
        ctx.beginPath();
        ctx.moveTo(-10, 8);
        ctx.lineTo(10, -8);
        ctx.moveTo(10, -8);
        ctx.lineTo(5, -9);
        ctx.moveTo(10, -8);
        ctx.lineTo(8, -3);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-8, 8, 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();

      frame = requestAnimationFrame(drawIcon);
    };

    drawIcon();

    return () => cancelAnimationFrame(frame);
  }, [card]);

  const onEnter = () => {
    hoverRef.current = true;
    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.02,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    hoverRef.current = false;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="why-client-card min-h-[230px] rounded-xl border border-black bg-[var(--color-primary-bg)] p-6 transition-colors duration-300 hover:bg-[#FFF8DD]"
    >
      <canvas ref={canvasRef} />

      <h3 className="mt-5 text-base font-bold text-black">{card.title}</h3>

      <p className="mt-3 text-sm leading-6 text-black/70">{card.text}</p>
    </article>
  );
};

export default WhyChoseClient;
