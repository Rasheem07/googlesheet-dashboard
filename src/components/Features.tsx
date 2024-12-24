import React from "react";
import { Monitor, Bell, BarChart } from "lucide-react"; // Import Lucide icons
import GetStartedButton from "./buttons/getSarted";

export default function Features() {
  // Define the features data
  const features = [
    {
      title: "Real-Time Monitoring",
      description:
        "Monitor your data in real-time and make informed decisions on the fly.",
      icon: Monitor, // Use Lucide icon
    },
    {
      title: "Alerts & Notifications",
      description:
        "Set up alerts to notify you when specific data thresholds are met.",
      icon: Bell, // Use Lucide icon
    },
    {
      title: "Data Stream",
      description:
        "Stream your data effortlessly and make real-time analytics possible.",
      icon: BarChart, // Use Lucide icon
    },
  ];

  return (
    <div className="mt-24">
      <div className="flex flex-col items-start md:items-center gap-y-1">
        <h2 className="text-4xl font-bold font-mono text-primary dark:text-primary">
          Key features of <span className="text-emerald-500">Dashify</span>
        </h2>
        <p className="text-lg font-sans text-secondary dark:text-zinc-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius voluptas
          minus sint.
        </p>
      </div>
      <div className="flex flex-col gap-y-8 mt-8">
        {/* Loop through features data and render FeatureCard for each */}
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ElementType; // React component type for icon
};

function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="flex md:flex-row flex-col gap-y-6 md:gap-y-0 items-center w-full gap-x-16 dark:bg-zinc-900/80 justify-between bg-background border border-gray-800 shadow-inner rounded-lg p-8 group">
      <div className="flex flex-col md:max-w-[50%] md:group-even:order-1 order-2">
        <span className="text-base font-semibold text-emerald-500 mb-2">
          <Icon className="w-12 h-12" /> {/* Use icon component here */}
        </span>
        <h4 className="text-[32px] leading-[42px] font-bold text-primary dark:text-primary mb-3">
          {title}
        </h4>
        <p className="text-zinc-500 tracking-wide font-medium my-2">
          {description}
        </p>
        <GetStartedButton className="mt-4" />
      </div>
      <div className="bg-zinc-300 rounded-md flex-1 md:group-even:order-2 order-1 min-h-[300px] w-full  min-w-[300px] max-w-[500px]"></div>
    </div>
  );
}
