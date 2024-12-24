'use client';
// components/TestimonialCard.tsx
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';

interface TestimonialProps {
  testimonial: {
    id: number;
    name: string;
    title: string;
    text: string;
    image: string;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialProps) => (
  <motion.div
    drag
    dragConstraints={{top: 0, bottom: 0, left: 0, right: 0}}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    className="min-h-full cursor-grab"
  >
    <Card className="bg-white dark:bg-zinc-900/80 min-h-full rounded-xl shadow-lg relative overflow-hidden p-6 space-y-6">
      <CardContent className="p-0">
        <div className="flex flex-col items-center space-y-4">
          <Image
            className="w-16 h-16 rounded-full shadow-md object-contain bg-zinc-200"
            src={testimonial.image}
            alt=''
            height={60}
            width={60}
            quality={100}
          />
          <h5 className="text-2xl font-semibold text-primary dark:text-primary">
            {testimonial.name}
          </h5>
          <span className="text-sm text-emerald-500 dark:text-emerald-400">
            {testimonial.title}
          </span>
          <p className="text-center text-base text-zinc-600 dark:text-zinc-300">
            {testimonial.text}
          </p>
        </div>
      </CardContent>
   
    </Card>
  </motion.div>
);

export default TestimonialCard;
