import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import batch1 from "../../assets/batch1.webp";
import batch2 from "../../assets/batch2.png";

const reviews = [
  {
    title: "Reliable workforce partner for our projects",
    text: "OutsourceZen helped us source skilled workers faster with proper screening, documentation support and smooth deployment coordination.",
    size: "Company Size: 500+",
    role: "Operations Director",
    industry: "Construction",
    color: "#CFF7FB",
    iconColor: "#18B8C7",
  },
  {
    title: "Excellent candidate quality and fast delivery",
    text: "Their team understood our manpower requirement quickly and provided shortlisted candidates who matched our skill and timeline needs.",
    size: "Company Size: 200–500",
    role: "HR & Recruitment Manager",
    industry: "Manufacturing",
    color: "#D7FAFF",
    iconColor: "#FFCC00",
  },
  {
    title: "A trusted agency for overseas recruitment",
    text: "From trade testing to visa documentation, the whole process was organized, transparent and easy for our company to manage.",
    size: "Company Size: 1000+",
    role: "Project Hiring Lead",
    industry: "Hospitality & Facility Management",
    color: "#CFF7FB",
    iconColor: "#8FCE96",
  },
];

const CustomerReviews = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".review-title", {
        y: 55,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".review-curve-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center",
        duration: 1.1,
        delay: 0.55,
        ease: "power3.out",
      });

      gsap.from(".review-card", {
        y: 50,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".review-badge-img", {
        y: -25,
        opacity: 0,
        scale: 0.9,
        duration: 0.9,
        stagger: 0.15,
        delay: 0.4,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex items-center justify-between gap-6">
          <img
            src={batch1}
            alt="Agency Badge"
            className="review-badge-img hidden h-24 w-24 object-contain sm:block"
          />

          <div className="text-center">
            <h2 className="max-w-4xl text-center text-4xl font-normal leading-tight tracking-[-0.045em] text-black sm:text-5xl">
              {[
                "Validated",
                "by",
                "employers,",
                "trusted",
                "by",
                "150+",
                "workforce",
                "partners",
              ].map((word, index) => (
                <span key={index} className="inline-block overflow-hidden px-1">
                  <span className="review-title inline-block">{word}</span>
                </span>
              ))}
            </h2>

            <svg
              className="review-curve-line mx-auto mt-3 h-6 w-[420px] max-w-full"
              viewBox="0 0 420 28"
              fill="none"
            >
              <path
                d="M12 17C75 5 140 9 205 14C285 21 340 12 408 8"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <img
            src={batch2}
            alt="Client Badge"
            className="review-badge-img hidden h-24 w-24 object-contain sm:block"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="/reviews"
            className="group relative overflow-hidden rounded-full bg-black px-7 py-3 text-sm font-bold text-white"
          >
            <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-700 ease-out group-hover:w-full" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
              Client Reviews
            </span>
          </a>

          <a
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-black px-7 py-3 text-sm font-bold text-white"
          >
            <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-700 ease-out group-hover:w-full" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
              Get in touch
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ review }) => {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame;
    let hover = 0;

    const w = 78;
    const h = 78;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const drawQuotePath = (color) => {
      ctx.save();
      ctx.translate(39, 38);

      ctx.strokeStyle = color;
      ctx.lineWidth = 7;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(-13, -18);
      ctx.bezierCurveTo(3, -3, 1, 18, -11, 28);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(12, -18);
      ctx.bezierCurveTo(28, -3, 26, 18, 13, 28);
      ctx.stroke();

      ctx.restore();
    };

    const drawColorFillInsideQuote = (color, progress) => {
      ctx.save();

      ctx.beginPath();
      ctx.arc(39, 38, 42 * progress, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.globalCompositeOperation = "destination-in";

      ctx.translate(39, 38);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(-13, -18);
      ctx.bezierCurveTo(3, -3, 1, 18, -11, 28);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(12, -18);
      ctx.bezierCurveTo(28, -3, 26, 18, 13, 28);
      ctx.stroke();

      ctx.restore();
      ctx.globalCompositeOperation = "source-over";
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      hover += ((hoverRef.current ? 1 : 0) - hover) * 0.08;

      // gray icon background
      ctx.save();
      ctx.translate(39, 38);
      ctx.strokeStyle = "#6B7280";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(-15, -18);
      ctx.bezierCurveTo(0, -5, 0, 18, -13, 28);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(13, -18);
      ctx.bezierCurveTo(28, -5, 28, 18, 15, 28);
      ctx.stroke();
      ctx.restore();

      // colored hover fill
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, h - h * hover, w, h * hover);
      ctx.clip();

      ctx.translate(39, 38);
      ctx.strokeStyle = review.iconColor;
      ctx.lineWidth = 8;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(-15, -18);
      ctx.bezierCurveTo(0, -5, 0, 18, -13, 28);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(13, -18);
      ctx.bezierCurveTo(28, -5, 28, 18, 15, 28);
      ctx.stroke();
      ctx.restore();

      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(frame);
  }, [review.iconColor]);

  const handleEnter = () => {
    hoverRef.current = true;

    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.015,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
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
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="review-card relative min-h-[430px] overflow-hidden rounded-2xl p-9 shadow-sm transition-colors duration-500"
      style={{ backgroundColor: review.color }}
    >
      <div className="absolute right-5 top-5 h-[78px] w-[78px]">
        <canvas ref={canvasRef} />
      </div>

      <div className="mb-7 flex gap-1 pr-20 text-lg text-black">★★★★★</div>

      <h3 className="pr-12 text-xl font-medium leading-7 tracking-[-0.02em] text-black">
        {review.title}
      </h3>

      <p className="mt-6 text-sm leading-6 text-black/80">{review.text}</p>

      <p className="mt-7 text-sm text-black/80">{review.size}</p>

      <div className="mt-6 h-px w-full bg-black/70" />

      <div className="mt-5">
        <h4 className="text-sm font-bold text-black">{review.role}</h4>
        <p className="mt-2 text-sm text-black/80">
          Industry: {review.industry}
        </p>
      </div>
    </article>
  );
};

export default CustomerReviews;
