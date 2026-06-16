import React, { useState } from "react";
import logo from "/logooutline.png";

const Header = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const [openSub, setOpenSub] = useState(null);

  const navItem = [
    {
      label: "Solutions",
      path: "/solutions",
      subNav: [
        { label: "Workforce Sourcing", path: "/solutions/workforce-sourcing" },
        {
          label: "Overseas Recruitment",
          path: "/solutions/overseas-recruitment",
        },
        { label: "Executive Search", path: "/solutions/executive-search" },
        { label: "Bulk Hiring", path: "/solutions/bulk-hiring" },
        {
          label: "Candidate Screening",
          path: "/solutions/candidate-screening",
        },
        {
          label: "Trade Testing & Assessment",
          path: "/solutions/trade-testing",
        },
        {
          label: "Visa & Documentation Support",
          path: "/solutions/visa-documentation",
        },
        {
          label: "Pre-Departure Training",
          path: "/solutions/pre-departure-training",
        },
        {
          label: "Relocation & Onboarding",
          path: "/solutions/relocation-onboarding",
        },
      ],
    },
    {
      label: "Industries",
      path: "/industries",
      subNav: [
        { label: "Construction", path: "/industries/construction" },
        { label: "Manufacturing", path: "/industries/manufacturing" },
        { label: "Hospitality", path: "/industries/hospitality" },
        { label: "Healthcare", path: "/industries/healthcare" },
        {
          label: "Agriculture & Farming",
          path: "/industries/agriculture-farming",
        },
        {
          label: "Transportation & Logistics",
          path: "/industries/transportation-logistics",
        },
        {
          label: "Cleaning & Facility Management",
          path: "/industries/cleaning-facility-management",
        },
        { label: "Oil, Gas & Energy", path: "/industries/oil-gas-energy" },
        {
          label: "Retail & Supermarkets",
          path: "/industries/retail-supermarkets",
        },
        { label: "Food Processing", path: "/industries/food-processing" },
        {
          label: "Shipbuilding & Marine",
          path: "/industries/shipbuilding-marine",
        },
        { label: "Security Services", path: "/industries/security-services" },
        { label: "Skilled Trades", path: "/industries/skilled-trades" },
      ],
    },
    { label: "Our Agents", path: "/agents" },
    {
      label: "Company",
      path: "/company",
      subNav: [
        { label: "About Us", path: "/about-us" },
        { label: "Live Jobs", path: "/live-jobs" },
      ],
    },
    {
      label: "Resources",
      path: "/resources",
      subNav: [
        { label: "Resources", path: "/resources" },
        { label: "Case Studies", path: "/case-studies" },
        { label: "News", path: "/news" },
        { label: "FAQs", path: "/faqs" },
      ],
    },
  ];

  return (
    <header className="font-arimo fixed left-0 top-0 z-50 w-full border-b border-black/5 bg-[var(--color-primary-bg)]/95 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItem.map((item, index) => (
            <div key={index} className="group relative">
              <a
                href={item.path}
                className="relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-medium text-[var(--color-text)] transition-all duration-300 hover:bg-[#FFF8DD]"
              >
                {item.label}

                {item.subNav && (
                  <span className="text-[10px] transition-transform duration-300 group-hover:rotate-180">
                    ▼
                  </span>
                )}

                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-black transition-all duration-500 ease-out group-hover:w-[70%]"></span>
              </a>

              {item.subNav && (
                <div className="invisible absolute left-1/2 top-full mt-6 w-76 -translate-x-1/2 translate-y-4 rounded-[28px] bg-[var(--color-primary-bg)] p-3 opacity-0 shadow-[var(--shadow-dropdown)] ring-1 ring-black/5 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-black/5 bg-[var(--color-primary-bg)]"></div>

                  <div className="relative z-10 grid gap-1">
                    {item.subNav.map((sub, subIndex) => (
                      <a
                        key={subIndex}
                        href={sub.path}
                        className="group/item flex items-center justify-between rounded-2xl px-4 py-2 text-sm font-medium text-[var(--color-text-light)] transition-all duration-300 hover:bg-[#FFF8DD] hover:text-[var(--color-text)]"
                      >
                        <span>{sub.label}</span>
                        <span className="-translate-x-2 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100">
                          →
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <a
            href="/contact"
            className="group relative overflow-hidden rounded-full border border-black px-7 py-3 text-sm font-semibold text-black transition-all duration-500 hover:-translate-y-1 hover:text-white"
          >
            <span className="absolute inset-0 w-0 rounded-full bg-black transition-all duration-700 ease-out group-hover:w-full"></span>
            <span className="absolute inset-0 translate-x-[-120%] bg-white/20 blur-md transition-all duration-700 ease-out group-hover:translate-x-[120%]"></span>
            <span className="relative z-10">Contact Us</span>
          </a>
        </div>

        <button
          onClick={() => setOpenMobile(!openMobile)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white lg:hidden"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${openMobile ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${openMobile ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${openMobile ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-black/5 bg-[var(--color-primary-bg)] transition-all duration-500 lg:hidden ${
          openMobile ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 px-4 py-5">
          {navItem.map((item, index) => (
            <div key={index}>
              {item.subNav ? (
                <>
                  <button
                    onClick={() => setOpenSub(openSub === index ? null : index)}
                    className="relative flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-[15px] font-semibold text-[var(--color-text)] transition-all duration-300 hover:bg-[#FFF8DD]"
                  >
                    {item.label}
                    <span
                      className={`text-xs transition-transform duration-300 ${openSub === index ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${openSub === index ? "max-h-[650px]" : "max-h-0"}`}
                  >
                    <div className="mt-2 space-y-1 rounded-3xl bg-white p-2 shadow-sm">
                      {item.subNav.map((sub, subIndex) => (
                        <a
                          key={subIndex}
                          href={sub.path}
                          className="block rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-text-light)] transition-all duration-300 hover:bg-[#FFF8DD] hover:text-[var(--color-text)]"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href={item.path}
                  className="block rounded-2xl px-4 py-3 text-[15px] font-semibold text-[var(--color-text)] transition-all duration-300 hover:bg-[#FFF8DD]"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}

          <a
            href="/contact"
            className="group relative mt-4 block overflow-hidden rounded-full border border-black px-7 py-3 text-center text-sm font-semibold text-black transition-all duration-500 hover:text-white"
          >
            <span className="absolute inset-0 w-0 rounded-full bg-black transition-all duration-700 ease-out group-hover:w-full"></span>
            <span className="relative z-10">Contact Us</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
