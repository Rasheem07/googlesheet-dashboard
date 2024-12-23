import MaxWidthWrapper from "@/components/wrappers/maxWidthWrapper";
import React from "react";
import {
  Activity,
  BarChart,
  Bell,
  CloudUpload,
  LineChart,
  MailWarning,
  Monitor,
  PieChart,
} from "lucide-react";
import GetStartedButton from "@/components/buttons/getSarted";
import { TextEffect } from "@/components/ui/text-effect";
import InfoIcon from "@/components/InfoIcon";

export default function Page() {
  return (
    <>
      <div
        className="fixed inset-0 min-h-screen min-w-screen bg-[radial-gradient(#ccc_1px,transparent_1.5px)] [background-size:24px_24px] isolate opacity-20"
        aria-hidden
      ></div>
      <MaxWidthWrapper className="p-5 mt-[113px] z-10 h-full">
        <div className="flex flex-col lg:flex-row items-center gap-y-6 gap-x-20 p-5 w-full z-10">
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold font-mono text-primary dark:text-primary">
              <TextEffect
                per="char"
                preset="scale"
                className="md:leading-[50px]"
              >
                Turn your google sheets into interactive dashboards
              </TextEffect>
            </h1>
            <p className="text-secondary dark:text-zinc-300 font-medium">
              Effortlessly transform your data into actionable insights. Set
              alerts for certain data points. Collaborate and work efficiently
            </p>
            <GetStartedButton />
          </div>
          <div className="flex-1 flex flex-col gap-y-4 max-w-sm">
            <div className="flex flex-wrap justify-evenly gap-8 px-4 mt-8">
              {/* Real-Time Monitoring Icon */}
              <InfoIcon icon={Monitor} title="Real-Time Monitoring" size={75} />
              <InfoIcon icon={Bell} title="Alerts & Notifications" size={80} />
              <InfoIcon icon={BarChart} title="Data stream" size={90} />
              <InfoIcon icon={Activity} title="Activity Feed" size={85} />
              <InfoIcon icon={LineChart} title="Real-Time Charts" size={70} />
              <InfoIcon icon={PieChart} title="Analytics" size={95} />
              <InfoIcon icon={MailWarning} title="System Alerts" size={60} />
              <InfoIcon icon={CloudUpload} title="Cloud sync" size={75} />
            </div>
          </div>
        </div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-350px]"
          >
            <div
              style={{
                clipPath:
                  "polygon(75% 40%, 100% 60%, 100% 20%, 85% 0%, 70% 25%, 55% 55%, 40% 65%, 25% 50%, 10% 80%, 0% 70%, 20% 90%, 40% 70%, 60% 90%, 80% 70%, 75% 40%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-500 to-green-500 dark:from-emerald-400 dark:to-green-400 dark:opacity-20 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
