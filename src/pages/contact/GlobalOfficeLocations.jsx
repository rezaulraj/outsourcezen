import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import WorldMap from "react-svg-worldmap";
import {
  ArrowRight,
  Building2,
  ExternalLink,
  Mail,
  MapPin,
} from "lucide-react";

const offices = [
  {
    country: "Scotland · UK",
    city: "Glasgow",
    code: "gb",
    value: 100,
    address:
      "Hillington Business Centre, 15–17 Nasmyth Rd S, Hillington, Glasgow G52 4RE",
    email: "talk@outsourcezen.com",
    color: "#FFE994",
    map: "https://www.google.com/maps?q=Hillington+Business+Centre,+15-17+Nasmyth+Rd+S,+Hillington,+Glasgow+G52+4RE&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=Hillington+Business+Centre,+15-17+Nasmyth+Rd+S,+Hillington,+Glasgow+G52+4RE",
  },
  {
    country: "Dhaka · Bangladesh",
    city: "Dhaka",
    code: "bd",
    value: 100,
    address: "Sector 10, Dhaka 1230, Bangladesh",
    email: "talk@outsourcezen.com",
    color: "#CFF7BC",
    map: "https://www.google.com/maps?q=Sector+10,+Dhaka+1230,+Bangladesh&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=Sector+10,+Dhaka+1230,+Bangladesh",
  },
  {
    country: "Romania",
    city: "Bucharest",
    code: "ro",
    value: 100,
    address: "201 Barbu Văcărescu, 020276 Bucharest, Romania",
    email: "talk@outsourcezen.com",
    color: "#A6E6EC",
    map: "https://www.google.com/maps?q=201+Barbu+Vacarescu,+020276+Bucharest,+Romania&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=201+Barbu+Vacarescu,+020276+Bucharest,+Romania",
  },
  {
    country: "Portugal",
    city: "Lisbon",
    code: "pt",
    value: 100,
    address: "Avenida da República 8, 3º Esq., 1050-195 Lisbon, Portugal",
    email: "talk@outsourcezen.com",
    color: "#FFF6C8",
    map: "https://www.google.com/maps?q=Avenida+da+Republica+8,+1050-195+Lisbon,+Portugal&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=Avenida+da+Republica+8,+1050-195+Lisbon,+Portugal",
  },
];

const GlobalOfficeLocations = () => {
  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);
  const [active, setActive] = useState(0);

  const currentOffice = offices[active];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".office-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".office-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".office-location-card", {
        y: 35,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.35,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      infoRef.current,
      { opacity: 0, y: 22, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
    );

    gsap.fromTo(
      mapRef.current,
      { opacity: 0, y: 22, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" },
    );
  }, [active]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % offices.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const mapData = offices.map((office) => ({
    country: office.code,
    value: office.value,
  }));

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative bg-[var(--color-primary-bg)] py-20 lg:py-28"
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
        <div className="office-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Global Office Locations
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Connected", "teams", "across", "global", "offices"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="office-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Select an office to view its address and live Google Map location.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="office-reveal rounded-[36px] border border-black/10 bg-[#FFF9E6] p-5 sm:p-7 lg:p-9">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/45">
                  Interactive map
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-black">
                  Our office network
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#CFF7BC]">
                <MapPin size={22} strokeWidth={2.4} />
              </div>
            </div>

            <div className="rounded-[30px] border border-black/10 bg-white/40 p-4">
              <WorldMap
                color="#67D946"
                valueSuffix=" offices"
                size="responsive"
                data={mapData}
                backgroundColor="transparent"
                strokeOpacity={0.28}
                richInteraction
                tooltipTextFunction={(context) =>
                  `${context.countryName} office`
                }
                onClickFunction={(context) => {
                  const index = offices.findIndex(
                    (office) =>
                      office.code.toLowerCase() ===
                      context.countryCode.toLowerCase(),
                  );

                  if (index !== -1) setActive(index);
                }}
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {offices.map((office, index) => {
                const isActive = active === index;

                return (
                  <button
                    key={office.code}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`office-location-card rounded-[22px] border p-4 text-left transition-all duration-500 ${
                      isActive
                        ? "scale-[1.02] border-black bg-white"
                        : "border-black/10 bg-white/45 hover:border-black/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-xs font-black uppercase text-black"
                        style={{ backgroundColor: office.color }}
                      >
                        {office.code}
                      </span>

                      <div>
                        <p className="text-sm font-bold text-black">
                          {office.city}
                        </p>
                        <p className="text-xs font-medium text-black/55">
                          {office.country}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div
              ref={infoRef}
              key={`info-${active}`}
              className="rounded-[36px] border border-black/10 bg-[#FFF9E6] p-7 sm:p-8"
            >
              <div className="mb-6 flex items-start justify-between gap-5">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: currentOffice.color }}
                >
                  <Building2 size={28} strokeWidth={2.4} />
                </div>

                <span className="rounded-full bg-black px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
                  Active Office
                </span>
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/45">
                {currentOffice.country}
              </p>

              <h3 className="mt-2 text-4xl font-normal tracking-[-0.055em] text-black">
                {currentOffice.city}
              </h3>

              <p className="mt-5 text-sm leading-6 text-black/70">
                {currentOffice.address}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${currentOffice.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-black/[0.05] px-4 py-2 text-xs font-bold text-black/70"
                >
                  <Mail size={14} />
                  {currentOffice.email}
                </a>

                <a
                  href={currentOffice.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-bold text-white"
                >
                  View Location
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div
              ref={mapRef}
              key={`map-${active}`}
              className="overflow-hidden rounded-[36px] border border-black/10 bg-[#FFF9E6] p-3"
            >
              <iframe
                title={`${currentOffice.city} office map`}
                src={currentOffice.map}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full rounded-[28px] border-0 sm:h-[420px]"
              />
            </div>

            <a
              href="#contact-form"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Contact this office
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalOfficeLocations;
