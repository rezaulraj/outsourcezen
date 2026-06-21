import React from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  FileCheck,
  Home,
  MapPinCheck,
  PlaneLanding,
  ShieldCheck,
} from "lucide-react";

const checklist = [
  {
    title: "Arrival Contact Confirmed",
    text: "Worker knows who to call and where to meet after landing.",
    icon: PlaneLanding,
    color: "#FFE994",
  },
  {
    title: "Documents In Hand",
    text: "Passport, visa papers, contract and required travel documents are ready.",
    icon: FileCheck,
    color: "#CFF7BC",
  },
  {
    title: "Accommodation Address",
    text: "Housing address, room details and shared-living rules are explained.",
    icon: Home,
    color: "#A6E6EC",
  },
  {
    title: "Local Guidance Shared",
    text: "Basic transport, timing, location and daily-life guidance are provided.",
    icon: MapPinCheck,
    color: "#FFF6C8",
  },
  {
    title: "Workplace Reporting Plan",
    text: "Worker understands first-day reporting time, location and supervisor contact.",
    icon: Building2,
    color: "#FFE994",
  },
  {
    title: "Job Role Reminder",
    text: "Key duties, attendance rules and employer expectations are reviewed again.",
    icon: BriefcaseBusiness,
    color: "#CFF7BC",
  },
  {
    title: "Safety & Conduct Briefing",
    text: "Worker receives basic safety, behavior and workplace conduct reminders.",
    icon: ShieldCheck,
    color: "#A6E6EC",
  },
  {
    title: "Ready For First Workday",
    text: "Final follow-up confirms the worker is settled and ready to begin.",
    icon: BadgeCheck,
    color: "#FFF6C8",
  },
];

const WorkerArrivalChecklist = () => {
  return (
    <section className="font-arimo relative bg-[var(--color-primary-bg)] py-20 lg:py-28">
      <div className="absolute inset-0 bg-[#FFE994]" />

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
          fill="#FFE994"
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Worker Arrival Checklist
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            Every arrival step clearly checked
          </h2>

          <svg
            className="mx-auto mt-3 h-5 w-[360px] max-w-full"
            viewBox="0 0 360 24"
            fill="none"
          >
            <path
              d="M12 15C80 5 145 8 180 13C245 21 300 10 348 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            A practical checklist helps workers move from landing to housing,
            local guidance and first workday without confusion.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {checklist.map(({ icon: Icon, ...item }, index) => (
            <article
              key={item.title}
              className="min-h-[260px] rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6"
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: item.color }}
              >
                <Icon size={24} strokeWidth={2.4} />
              </div>

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-black/45">
                Check {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className="text-lg font-bold tracking-[-0.03em] text-black">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-black/70">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkerArrivalChecklist;
