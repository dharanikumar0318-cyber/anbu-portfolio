/**
 * ProjectCard Component
 * Displays engineering projects with tags and hover elevation effect
 * Kinetic Engineering design: layered depth, smooth transitions, technical tags
 */

import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  index?: number;
}

export function ProjectCard({ title, description, tags, image, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 212, 212, 0.15)' }}
      className="group relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300"
    >
      {/* Image placeholder with overlay */}
      {image ? (
        <div className="relative w-full h-48 overflow-hidden bg-secondary">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
          <div className="text-accent/40 text-4xl">⚙️</div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent border border-accent/30 rounded-full transition-all duration-300 group-hover:bg-accent/20 group-hover:border-accent/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Accent line on hover */}
      <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}
