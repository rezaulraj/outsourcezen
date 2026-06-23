import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Globe2,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
  UsersRound,
} from "lucide-react";

const industries = [
  "Construction",
  "Manufacturing",
  "Hospitality",
  "Healthcare",
  "Agriculture & Farming",
  "Transportation & Logistics",
  "Cleaning & Facility Management",
  "Oil, Gas & Energy",
  "Retail & Supermarkets",
  "Food Processing",
];

const GetInTouchForm = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".touch-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".touch-word", {
        y: 45,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        delay: 0.2,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact-form"
      ref={sectionRef}
      className="font-arimo bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="touch-reveal rounded-[36px] border border-black/10 bg-[#FFF9E6] p-7 sm:p-9 lg:sticky lg:top-24 lg:self-start">
            <p className="mb-4 inline-block border-b border-black text-sm font-medium text-black">
              Get In Touch
            </p>

            <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl">
              {[
                "Tell",
                "us",
                "what",
                "kind",
                "of",
                "workers",
                "you",
                "need",
              ].map((word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="touch-word inline-block">{word}</span>
                </span>
              ))}
            </h2>

            <p className="mt-5 text-sm leading-6 text-black/70">
              Share your hiring requirements and our recruitment specialists
              will review your inquiry and guide you with the right workforce
              solution.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  text: "talk@outsourcezen.com",
                },
                {
                  icon: UsersRound,
                  title: "Hiring Support",
                  text: "Bulk hiring, skilled workers and workforce planning.",
                },
                {
                  icon: Globe2,
                  title: "Global Offices",
                  text: "Scotland, Bangladesh, Romania and Portugal.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-[24px] border border-black/10 bg-white/50 p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#CFF7BC]">
                    <Icon size={20} strokeWidth={2.4} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-black">{title}</h3>
                    <p className="mt-1 text-sm leading-5 text-black/65">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="touch-reveal rounded-[36px] border border-black/10 bg-[#FFF9E6] p-5 sm:p-7 lg:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                icon={UserRound}
                label="Full Name"
                type="text"
                placeholder="Your name"
              />

              <Field
                icon={Building2}
                label="Company Name"
                type="text"
                placeholder="Company name"
              />

              <Field
                icon={Mail}
                label="Email Address"
                type="email"
                placeholder="you@company.com"
              />

              <Field
                icon={Phone}
                label="Phone Number"
                type="tel"
                placeholder="+44..."
              />

              <Field
                icon={Globe2}
                label="Country"
                type="text"
                placeholder="Your country"
              />

              <Field
                icon={UsersRound}
                label="Workers Needed"
                type="text"
                placeholder="Example: 20 workers"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-black">
                Industry
              </label>

              <div className="relative">
                <BriefcaseBusiness
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black/45"
                />

                <select className="h-14 w-full appearance-none rounded-2xl border border-black/10 bg-white/60 pl-12 pr-4 text-sm font-medium text-black outline-none transition-all duration-300 focus:border-black">
                  <option value="">Select industry</option>
                  {industries.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-black">
                Message
              </label>

              <div className="relative">
                <MessageSquareText
                  size={18}
                  className="absolute left-4 top-5 text-black/45"
                />

                <textarea
                  rows="6"
                  placeholder="Tell us about your hiring requirement, timeline, country, job roles and number of workers needed..."
                  className="w-full resize-none rounded-2xl border border-black/10 bg-white/60 px-4 py-4 pl-12 text-sm font-medium text-black outline-none transition-all duration-300 placeholder:text-black/35 focus:border-black"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group mt-7 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.01] sm:w-auto"
            >
              <span>Send Inquiry</span>
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Field = ({ icon: Icon, label, type, placeholder }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-black">{label}</label>

      <div className="relative">
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-black/45"
        />

        <input
          type={type}
          placeholder={placeholder}
          className="h-14 w-full rounded-2xl border border-black/10 bg-white/60 pl-12 pr-4 text-sm font-medium text-black outline-none transition-all duration-300 placeholder:text-black/35 focus:border-black"
        />
      </div>
    </div>
  );
};

export default GetInTouchForm;
