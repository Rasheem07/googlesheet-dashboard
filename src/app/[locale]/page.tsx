"use client";
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
import InfoIcon from "@/components/InfoIcon";
import Image from "next/image";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: 0, y: -200 },
  enter: { opacity: 1, x: 0, y: 0 },
};

export default function Page() {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: "ease" }}
      className="relative"
    >
      <MaxWidthWrapper className="p-5 mt-[113px] h-full">
        <div
          className="fixed inset-0 -z-10 min-h-screen min-w-screen bg-[radial-gradient(#ccc_1px,transparent_1.5px)] [background-size:24px_24px] opacity-20"
          aria-hidden
        ></div>
        <div className="flex flex-col lg:flex-row items-center gap-y-6 gap-x-20 p-2 md:p-5 w-full">
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold font-mono text-primary dark:text-primary">
              Turn your <HeiglightText>google sheets</HeiglightText> into
              interactive dashboards
            </h1>
            <p className="text-secondary dark:text-zinc-300 font-medium">
              Effortlessly transform your data into actionable insights. Set
              alerts for certain data points. Collaborate and work efficiently
            </p>
            <GetStartedButton />
          </div>
          <div className="flex-1 hidden md:flex flex-col gap-y-4 max-w-sm">
            <div className="flex flex-wrap justify-evenly gap-6 px-4 pt-8 md:pt-0">
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
        <div className="relative">
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
        <div className="dark:bg-zinc-500/80 shadow-inner z-50 rounded-lg p-2 border mt-24">
          <Image
            src="/dashify-demo.png"
            alt="Dashify Demo"
            height={607}
            width={1349}
            className="rounded-md w-full z-[999px]"
          />
        </div>

        <Features />
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-[200px]"
          >
            <div
              style={{
                clipPath: "polygon(75% 40%,0% 100%,85% 0%, 70% 25%, 55% 55%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-500 to-green-500 dark:from-emerald-400 dark:to-green-400 dark:opacity-30 opacity-30 sm:left-[calc(50%)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-24">
          <h1 className="text-4xl md:text-4xl font-bold font-mono text-primary dark:text-primary">
            Simple <HeiglightText>Steps</HeiglightText> to setup your dashboard
          </h1>
          <p className="text-secondary dark:text-zinc-300 font-medium mt-4">
            Effortlessly transform your data into actionable insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 mt-8">
            <StepCard
              step={1}
              heading="Start by logging with google"
              description="By doing this, your google sheets are being synced to our platform"
            />
            <StepCard
              step={2}
              heading="Select a spreadsheet book"
              description="You will be redirected to a form, to customize your dashboard and analytics tools"
            />
            <StepCard
              step={3}
              heading="Fill in the form and submit it"
              description="After filling the form , your dashboard is being generated, that's it!"
            />
          </div>
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-24"
          >
            <div
              style={{
                clipPath: "polygon(70% 25%, 55% 55%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-500 to-green-500 dark:from-emerald-400 dark:to-green-400 dark:opacity-20 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-24"
          >
            <div
              style={{
                clipPath: "polygon(70% 25%, 55% 55%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-500 to-green-500 dark:from-emerald-400 dark:to-green-400 dark:opacity-20 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
        <TestimonialsComponent />
        <div className="flex gap-y-12 md:gap-y-0 md:flex-row flex-col justify-between md:items-center mt-16">
          <div className="flex flex-col gap-y-5">
            <h1 className="text-2xl md:text-4xl font-mono font-bold text-primary dark:text-primary">
              Frequently asked questions
            </h1>
            <FAQ />
          </div>
          <NewsletterCard />
        </div>
      </MaxWidthWrapper>
      <Footer />
    </motion.main>
  );
}

function StepCard({
  step,
  heading,
  description,
}: {
  step: number;
  heading: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900/80 border-l-4 md:border-l-0 md:border-t-4 border-emerald-500 dark:border-emerald-600 rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <span className="text-emerald-500 text-lg font-semibold">
          Step {step}
        </span>
        {/* Add a divider for better visual separation */}
        <div className="w-1 h-6 bg-emerald-500 dark:bg-emerald-600" />
      </div>

      <h3 className="text-2xl font-semibold text-primary dark:text-primary">
        {heading}
      </h3>

      <p className="text-base text-zinc-600 dark:text-zinc-300">
        {description}
      </p>
    </div>
  );
}

// pages/index.js
import Testimonial from "@/components/testimonial";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import NewsletterCard from "@/components/cards/newLetter";
import HeiglightText from "@/components/ui/highlighter";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    title: "CEO at Company",
    text: "This is an amazing product! Highly recommended.",
    image: "/dp.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "CTO at Business",
    text: "Excellent service and fantastic results!",
    image: "/dp.jpg",
  },
  {
    id: 3,
    name: "Jane Smith",
    title: "CTO at Business",
    text: "Excellent service and fantastic results!",
    image: "/dp.jpg",
  },
  // Add more testimonials here
];

function TestimonialsComponent() {
  return (
    <div className="container mx-auto py-12 w-full mt-16">
      <h2 className="text-4xl font-mono font-bold text-center mb-8">
        What our <HeiglightText>clients</HeiglightText> say:
      </h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Testimonial key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
