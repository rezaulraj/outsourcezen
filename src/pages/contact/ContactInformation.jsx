import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail, MapPin, MessageCircle } from "lucide-react";

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

const ContactInformation = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-info-reveal",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "opacity,transform",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative bg-[var(--color-primary-bg)] py-20 overflow-hidden"
    >
      <div
        className="absolute inset-x-0 top-0 h-full bg-[#FFE994]"
        style={{
          clipPath: "ellipse(82% 45% at 50% 48%)",
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="contact-info-reveal mx-auto mb-12 max-w-3xl text-center raw-invisible">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Contact Information
          </p>
          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            Reach our global team
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Connect with our recruitment support team or visit one of our office
            locations across Europe and Bangladesh.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] items-stretch">
          <div className="contact-info-reveal flex h-full flex-col justify-between rounded-[34px] border border-black/10 bg-[#FFF9E6] p-7 sm:p-8">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <Mail size={28} strokeWidth={2.4} />
              </div>

              <h3 className="mt-7 text-2xl font-bold tracking-[-0.04em] text-black">
                Email us directly
              </h3>

              <a
                href="mailto:talk@outsourcezen.com"
                className="mt-3 block break-all text-2xl font-normal tracking-[-0.04em] text-black hover:underline sm:text-3xl"
              >
                talk@outsourcezen.com
              </a>

              <p className="mt-4 text-sm leading-6 text-black/65">
                Send your hiring requirements, partnership inquiry or general
                message. Our team will get back to you as soon as possible.
              </p>
            </div>

            <div className="mt-8 border-t border-black/10 pt-6">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-black/45">
                Follow us
              </p>
              <div className="flex flex-wrap gap-3">
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
          </div>

          <div className="grid gap-5 sm:grid-cols-2 content-stretch">
            {offices.map((office, index) => (
              <article
                key={office.country}
                className="contact-info-reveal group flex flex-col justify-between rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-black/25"
              >
                <div>
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#FFE994] p-3">
                      <MapPin size={23} strokeWidth={2.4} />
                    </div>
                    <span className="text-5xl font-black leading-none text-black/[0.06]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
                    {office.country}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-black/70">
                    {office.address}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="contact-info-reveal mt-6 w-fit mx-auto rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#A6E6EC]">
            <MessageCircle size={24} strokeWidth={2.4} />
          </div>
          <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
            Have a workforce question?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-black/70">
            Share your requirements and our recruitment specialists will guide
            you with the right hiring support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;
