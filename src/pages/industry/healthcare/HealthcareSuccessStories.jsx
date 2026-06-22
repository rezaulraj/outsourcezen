import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const stories = [
  {
    company: "Private Hospital Network",
    name: "Dr. Sarah M.",
    role: "Hospital Operations Director",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop&crop=face",
    projectImage:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000&h=700&fit=crop",
    title: "Qualified nurses and support staff for hospital operations",
    quote:
      "The candidates were professional, compassionate and well-prepared. The process helped us maintain patient care quality while filling urgent workforce gaps.",
  },
  {
    company: "Elderly Care Facility",
    name: "Michael R.",
    role: "Care Home Manager",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop&crop=face",
    projectImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&h=700&fit=crop",
    title: "Caregivers deployed for elderly support services",
    quote:
      "We needed reliable caregivers with patience and empathy. The shortlisted professionals matched our care standards and helped our residents feel supported.",
  },
  {
    company: "Rehabilitation Center",
    name: "Emma K.",
    role: "Clinical Services Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop&crop=face",
    projectImage:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&h=700&fit=crop",
    title: "Allied health professionals for rehabilitation care",
    quote:
      "The recruitment flow was organized and careful. We received healthcare professionals who understood patient communication, discipline and clinical support.",
  },
];

const HealthcareSuccessStories = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const progressRefs = useRef([]);

  const next = () => setActive((prev) => (prev + 1) % stories.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + stories.length) % stories.length);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".health-story-head", {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    progressRefs.current.forEach((bar) => {
      if (!bar) return;
      gsap.killTweensOf(bar);
      gsap.set(bar, { width: "0%" });
    });

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 35, scale: 0.96, rotate: -1.2 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.75,
        ease: "power3.out",
      },
    );

    const current = progressRefs.current[active];

    if (current) {
      gsap.to(current, {
        width: "100%",
        duration: 5,
        ease: "none",
        onComplete: next,
      });
    }
  }, [active]);

  const item = stories[active];

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-20 lg:py-28"
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
          fill="#CFF7BC"
        />
      </svg>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="health-story-head mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Success Stories
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            Client words from healthcare projects
          </h2>
        </div>

        <div
          ref={cardRef}
          className="mx-auto grid max-w-6xl overflow-hidden rounded-[38px] border border-black bg-[#FFF9E6] lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="relative min-h-[340px] overflow-hidden lg:min-h-[520px]">
            <img
              src={item.projectImage}
              alt={item.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute bottom-6 left-6 right-6 rounded-[28px] border border-white/25 bg-white/80 p-5 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/50">
                Project Result
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-black">
                {item.title}
              </h3>
            </div>
          </div>

          <div className="relative flex flex-col justify-between p-7 sm:p-10 lg:p-12">
            <Quote
              size={54}
              className="absolute right-8 top-8 text-black/10"
              fill="currentColor"
            />

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-black/45">
                {item.company}
              </p>

              <p className="mt-8 max-w-xl text-xl leading-9 tracking-[-0.02em] text-black sm:text-2xl sm:leading-10">
                “{item.quote}”
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-full border-4 border-[#CFF7BC] object-cover"
              />

              <div>
                <h4 className="text-lg font-bold text-black">{item.name}</h4>
                <p className="mt-1 text-sm text-black/65">{item.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="health-story-head mx-auto mt-8 flex max-w-2xl items-center gap-4">
          <button
            onClick={prev}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#CFF7BC] text-black"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-black/10">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className="relative flex-1"
              >
                <span
                  ref={(el) => (progressRefs.current[index] = el)}
                  className="absolute left-0 top-0 h-full w-0 bg-black"
                />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#CFF7BC] text-black"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HealthcareSuccessStories;
