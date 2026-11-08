/**
 * TimelineItem Component
 * Displays timeline entries with alternating left-right layout
 * Kinetic Engineering design: geometric accent dots, connecting lines, smooth transitions
 */

import { motion } from 'framer-motion';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  isLeft?: boolean;
  index?: number;
}

export function TimelineItem({
  year,
  title,
  description,
  isLeft = false,
  index = 0,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`flex gap-8 mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Content */}
      <div className="flex-1">
        <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors duration-300">
          <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full mb-2">
            {year}
          </span>
          <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Center dot and line */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-accent border-4 border-card relative z-10 mt-2" />
        {index < 3 && <div className="w-1 h-24 bg-accent/20 mt-2" />}
      </div>

      {/* Spacer for alignment */}
      <div className="flex-1" />
    </motion.div>
  );
}
