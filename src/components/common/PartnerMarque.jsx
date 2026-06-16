import React from "react";

const PartnerMarque = () => {
  const partners = [
    "aurora",
    "FAIRE",
    "Google",
    "Meta",
    "OUTSCHOOL",
    "TOPICALS",
    "upwork",
  ];

  return (
    <section className="font-arimo bg-[var(--color-primary-bg)] py-10 overflow-hidden">
      <div className="space-y-6">
        <div className="relative flex overflow-hidden">
          <div className="flex min-w-full shrink-0 animate-[marqueeForward_28s_linear_infinite] items-center justify-around gap-16 pr-16">
            {[...partners, ...partners].map((item, index) => (
              <LogoText key={index} name={item} />
            ))}
          </div>

          <div className="flex min-w-full shrink-0 animate-[marqueeForward_28s_linear_infinite] items-center justify-around gap-16 pr-16">
            {[...partners, ...partners].map((item, index) => (
              <LogoText key={index} name={item} />
            ))}
          </div>
        </div>

        <div className="relative flex overflow-hidden">
          <div className="flex min-w-full shrink-0 animate-[marqueeBackward_32s_linear_infinite] items-center justify-around gap-16 pr-16">
            {[...partners]
              .reverse()
              .concat(partners)
              .map((item, index) => (
                <LogoText key={index} name={item} small />
              ))}
          </div>

          <div className="flex min-w-full shrink-0 animate-[marqueeBackward_32s_linear_infinite] items-center justify-around gap-16 pr-16">
            {[...partners]
              .reverse()
              .concat(partners)
              .map((item, index) => (
                <LogoText key={index} name={item} small />
              ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marqueeForward {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }

        @keyframes marqueeBackward {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

const LogoText = ({ name, small }) => {
  return (
    <div
      className={`flex shrink-0 items-center justify-center whitespace-nowrap text-black transition-all duration-300 hover:scale-105 ${
        small ? "text-xl opacity-60" : "text-2xl opacity-90"
      }`}
    >
      <span className="font-bold tracking-tight">{name}</span>
    </div>
  );
};

export default PartnerMarque;
