/**
 * Home Page - Dharani Kumar Subban's Mechanical Engineer Portfolio
 * Kinetic Engineering Design System
 * Sections: Hero, About, Projects, Timeline, Skills, Contact, Footer
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProjectCard } from '@/components/ProjectCard';
import { SkillBadge } from '@/components/SkillBadge';
import { TimelineItem } from '@/components/TimelineItem';
import { SectionDivider } from '@/components/SectionDivider';
import { Mail, Linkedin, Github, ArrowDown, Send } from 'lucide-react';

const projects = [
  {
    title: 'Compressed Air Leak Detection and Reduction',
    description: 'Comprehensive industrial audit identifying pneumatic system inefficiencies. Designed and implemented detection protocols reducing energy waste by 23%.',
    tags: ['Fluid Mechanics', 'Pneumatics', 'Industrial Audit'],
  },
  {
    title: 'Energy Efficiency Improvements in Small-Scale Industries',
    description: 'Optimization study for HVAC and thermal systems in manufacturing facilities. Delivered sustainable engineering solutions improving operational efficiency.',
    tags: ['Sustainable Engineering', 'HVAC', 'Optimization'],
  },
  {
    title: 'Impact of TiO2 & ZrO2 Blends with Biodiesel',
    description: 'Research on alternative fuel formulations and material science applications. Analyzed combustion characteristics and emission profiles for IC engines.',
    tags: ['IC Engines', 'Material Science', 'Alternative Fuels'],
  },
  {
    title: 'Go-kart Manufacturing - BFKCT',
    description: 'End-to-end automotive design and fabrication project. Designed chassis, integrated mechanical systems, and led cross-functional team execution.',
    tags: ['Automotive Design', 'Chassis Fabrication', 'Teamwork'],
  },
];

const timeline = [
  {
    year: 'Expected Jan 2026',
    title: 'M.S. in Mechanical Engineering',
    description: 'University of East London. Advanced coursework in thermodynamics, energy systems, and research methodology.',
  },
  {
    year: '2022',
    title: 'B.E. in Mechanical Engineering',
    description: 'Sathyabama University. First Class honors. Strong foundation in design, manufacturing, and engineering principles.',
  },
  {
    year: '2023-2024',
    title: 'Industrial Training & Exposure',
    description: 'Hands-on experience at Bajaj Services and Murugan Ice Factory. Practical exposure to real-world operational challenges.',
  },
  {
    year: '2024-Present',
    title: 'Professional Operations Experience',
    description: 'Executive Administrative Assistant at Santosh University. Logistics coordination at Sainsbury\'s. Safety management at Wembley Stadium.',
  },
];

const technicalSkills = [
  'Data Analysis',
  'Energy Auditing',
  'Fluid Systems',
  'Research & Design',
  'CAD Modeling',
  'Thermodynamics',
];

const professionalSkills = [
  'Problem Solving',
  'Decision Making',
  'Financial Acumen',
  'Resource Organization',
  'Project Management',
  'Strategic Planning',
];

const leadershipSkills = [
  'Adaptability',
  'Team Collaboration',
  'High-Pressure Operations',
  'Resilience',
  'Leadership',
  'Cross-functional Coordination',
];

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <img src="/manus-storage/logo-mark_33adde09.png" alt="Logo" className="w-8 h-8" />
            <span className="font-bold text-lg hidden sm:inline">Dharani Kumar</span>
          </motion.div>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
            <a href="#skills" className="hover:text-accent transition-colors">Skills</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/manus-storage/hero-background_6bf371ef.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>

        {/* Content */}
        <div className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              Mechanical Engineer &<br />
              <span className="text-accent">Operations Specialist</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Bridging rigorous analytical engineering expertise with fast-paced operational excellence. Delivering precision-engineered solutions across thermodynamics, energy efficiency, and industrial optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-primary font-semibold"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Download CV / Contact
              </Button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ArrowDown className="w-6 h-6 text-accent" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-card/30">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  I am an adaptable, self-motivated mechanical engineer with a unique blend of rigorous analytical training and real-world operational resilience. My career bridges advanced engineering concepts with practical execution in fast-paced environments.
                </p>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  With an M.S. candidate status at University of East London and a First Class B.E. from Sathyabama University, I combine theoretical depth with hands-on problem-solving across thermodynamics, energy efficiency, and industrial systems.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Beyond engineering, I bring proven leadership in high-stakes operations, logistics coordination, and cross-functional team management—ready to deliver precision-engineered solutions in any dynamic environment.
                </p>
              </div>
              <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg p-8 border border-accent/30">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-accent mb-2">Education</h3>
                    <p className="text-sm text-muted-foreground">M.S. Mechanical Engineering, University of East London (Expected Jan 2026)</p>
                    <p className="text-sm text-muted-foreground">B.E. Mechanical Engineering, Sathyabama University (First Class)</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-accent mb-2">Core Expertise</h3>
                    <p className="text-sm text-muted-foreground">Energy Systems, Thermodynamics, Fluid Mechanics, CAD Design, Industrial Optimization</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-accent mb-2">Industrial Exposure</h3>
                    <p className="text-sm text-muted-foreground">Bajaj Services, Murugan Ice Factory, Santosh University, Sainsbury&apos;s, Wembley Stadium</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center">Engineering Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, idx) => (
                <ProjectCard key={idx} {...project} index={idx} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-card/30">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center">Professional Journey</h2>
            <div>
              {timeline.map((item, idx) => (
                <TimelineItem key={idx} {...item} isLeft={idx % 2 === 0} index={idx} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center">Skills & Competencies</h2>

            {/* Technical Skills */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-accent mb-6">Technical & Analytical</h3>
              <div className="flex flex-wrap gap-3">
                {technicalSkills.map((skill, idx) => (
                  <SkillBadge key={idx} label={skill} index={idx} />
                ))}
              </div>
            </div>

            {/* Professional Skills */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-accent mb-6">Core Professional Competencies</h3>
              <div className="flex flex-wrap gap-3">
                {professionalSkills.map((skill, idx) => (
                  <SkillBadge key={idx} label={skill} index={idx + 6} />
                ))}
              </div>
            </div>

            {/* Leadership Skills */}
            <div>
              <h3 className="text-xl font-bold text-accent mb-6">Leadership & Execution</h3>
              <div className="flex flex-wrap gap-3">
                {leadershipSkills.map((skill, idx) => (
                  <SkillBadge key={idx} label={skill} index={idx + 12} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card/30">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">Get In Touch</h2>
            <p className="text-center text-muted-foreground mb-12">
              Have a project or opportunity? Let us connect and explore how I can contribute to your team.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="your@email.com"
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Your message here..."
                  required
                  className="bg-background border-border min-h-32"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold"
              >
                <Send className="w-4 h-4 mr-2" />
                {submitted ? 'Message Sent!' : 'Send Message'}
              </Button>
            </form>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-center text-sm text-muted-foreground mb-6">
                References available upon request
              </p>
              <div className="flex justify-center gap-6">
                <a
                  href="mailto:dharanikumar0318@gmail.com"
                  className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="hidden sm:inline">Email</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-primary/5">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 Dharani Kumar Subban. All rights reserved.</p>
          <p className="mt-2">Mechanical Engineer | Operations Specialist | Problem Solver</p>
        </div>
      </footer>
    </div>
  );
}
