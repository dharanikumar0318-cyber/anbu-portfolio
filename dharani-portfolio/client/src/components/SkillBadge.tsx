/**
 * SkillBadge Component
 * Interactive skill badges with hover states and teal accent
 * Kinetic Engineering design: geometric, responsive, micro-interactions
 */

import { motion } from 'framer-motion';

interface SkillBadgeProps {
  label: string;
  index?: number;
}

export function SkillBadge({ label, index = 0 }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(0, 212, 212, 0.4)' }}
      className="px-4 py-2 rounded-full border-2 border-accent/50 text-accent font-medium text-sm transition-all duration-300 hover:border-accent hover:bg-accent/10 cursor-default"
    >
      {label}
    </motion.div>
  );
}
