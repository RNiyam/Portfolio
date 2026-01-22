'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Code, Palette, Rocket, Star, ArrowRight, Zap, Github, Linkedin, Mail, Twitter, Download, ExternalLink, Sparkles } from 'lucide-react';

export function EnhancedInteractivePortfolio() {
  const [showLanding, setShowLanding] = useState(true);
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(() => {
      setShowLanding(false);
    }, 1000);
  };

  return (
    <AnimatePresence mode="wait">
      {showLanding ? (
        <LandingSplash key="landing" onEnter={handleEnter} isEntering={isEntering} />
      ) : (
        <MainPortfolio key="portfolio" />
      )}
    </AnimatePresence>
  );
}

function LandingSplash({ onEnter, isEntering }: { onEnter: () => void; isEntering: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl"
        style={{ bottom: '10%', right: '10%' }}
      />

      {/* Particle system */}
      {mounted && [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Floating cursor effect */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Animated logo/name */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, type: 'spring', stiffness: 100 }}
          className="mb-12"
        >
          <div className="relative inline-block">
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 -m-8"
            >
              <div className="w-full h-full border-2 border-dashed border-cyan-400/30 rounded-full" />
            </motion.div>

            {/* Logo/Initial */}
            <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center relative">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(6, 182, 212, 0.5)',
                    '0 0 60px rgba(168, 85, 247, 0.8)',
                    '0 0 20px rgba(6, 182, 212, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
              />
              <span className="text-5xl font-black text-white relative z-10">P</span>
            </div>
          </div>
        </motion.div>

        {/* Title reveal */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-7xl md:text-9xl font-black text-white mb-2"
          >
            Portfolio
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-xl md:text-2xl text-white/60 mb-12 font-light"
        >
          Creative Developer & Designer
        </motion.div>

        {/* Enter button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="group relative px-12 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-3">
              {isEntering ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                  Entering...
                </>
              ) : (
                <>
                  Enter Portfolio
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </span>
          </motion.button>
        </motion.div>

        {/* Animated hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/40 text-sm"
          >
            Click to explore
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function MainPortfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
  }, [mousePosition, mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden"
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: cursorVariant === 'hover' ? 2.5 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-6 backdrop-blur-xl bg-black/20 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          >
            YourName
          </motion.div>

          <div className="hidden md:flex gap-8 text-sm font-medium">
            {['Work', 'About', 'Skills', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.1, color: '#06b6d4' }}
                className="text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-sm font-semibold flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Resume
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <HeroSection mouseX={mouseX} mouseY={mouseY} setCursorVariant={setCursorVariant} />

      {/* About Section */}
      <AboutSection setCursorVariant={setCursorVariant} />

      {/* Skills Section */}
      <SkillsSection setCursorVariant={setCursorVariant} />

      {/* Projects Section */}
      <ProjectsSection setCursorVariant={setCursorVariant} />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection setCursorVariant={setCursorVariant} />
    </motion.div>
  );
}

function HeroSection({ mouseX, mouseY, setCursorVariant }: any) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Floating elements that follow mouse */}
      <FloatingElement mouseX={mouseX} mouseY={mouseY} delay={0} range={30}>
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl rotate-12 opacity-20" />
      </FloatingElement>
      <FloatingElement mouseX={mouseX} mouseY={mouseY} delay={0.1} range={-40}>
        <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-10" />
      </FloatingElement>
      <FloatingElement mouseX={mouseX} mouseY={mouseY} delay={0.2} range={50}>
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg rotate-45 opacity-15" />
      </FloatingElement>

      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Animated greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
          >
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                👋
              </motion.div>
              <span>Hey, I'm Alex Chen</span>
            </span>
          </motion.div>

          {/* Main title with character animation */}
          <div className="mb-8">
            {['I craft digital', 'experiences that', 'inspire & engage'].map((line, lineIndex) => (
              <div key={lineIndex} className="overflow-hidden">
                <motion.h1
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + lineIndex * 0.1, duration: 0.8 }}
                  className="text-5xl md:text-8xl font-black leading-tight"
                >
                  {line.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      whileHover={{
                        scale: 1.2,
                        color: '#06b6d4',
                        transition: { duration: 0.2 },
                      }}
                      className="inline-block cursor-pointer"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Full-stack developer & creative designer specializing in building beautiful,
            high-performance web applications with React, Next.js, and TypeScript
          </motion.p>

          {/* Interactive specialty cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
          >
            <InteractiveCard
              icon={Code}
              label="Development"
              color="from-cyan-500 to-blue-500"
              onHoverStart={() => setCursorVariant('hover')}
              onHoverEnd={() => setCursorVariant('default')}
            />
            <InteractiveCard
              icon={Palette}
              label="Design"
              color="from-pink-500 to-rose-500"
              onHoverStart={() => setCursorVariant('hover')}
              onHoverEnd={() => setCursorVariant('default')}
            />
            <InteractiveCard
              icon={Rocket}
              label="Strategy"
              color="from-purple-500 to-indigo-500"
              onHoverStart={() => setCursorVariant('hover')}
              onHoverEnd={() => setCursorVariant('default')}
            />
            <InteractiveCard
              icon={Zap}
              label="Performance"
              color="from-yellow-500 to-orange-500"
              onHoverStart={() => setCursorVariant('hover')}
              onHoverEnd={() => setCursorVariant('default')}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <MagneticButton>
              <span className="flex items-center gap-2">
                View my work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </MagneticButton>
            <MagneticButton variant="outline">
              <span className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Get in touch
              </span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

function AboutSection({ setCursorVariant }: any) {
  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full h-full flex items-center justify-center"
              >
                <span className="text-8xl">👨💻</span>
              </motion.div>
            </div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4"
            >
              <div className="text-3xl font-black text-cyan-400">5+</div>
              <div className="text-xs text-white/60">Years Exp</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4"
            >
              <div className="text-3xl font-black text-purple-400">100+</div>
              <div className="text-xs text-white/60">Projects</div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              About <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="space-y-4 text-lg text-white/70 leading-relaxed">
              <p>
                Hey! I'm a passionate <span className="text-cyan-400 font-semibold">full-stack developer</span> and{' '}
                <span className="text-purple-400 font-semibold">creative designer</span> based in San Francisco.
              </p>
              <p>
                I love building products that not only look great but also solve real problems. With over{' '}
                <span className="text-white font-semibold">5 years of experience</span>, I've worked with startups
                and enterprises to bring their visions to life.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new design trends, contributing to open-source,
                or experimenting with the latest web technologies.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Figma'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillsSection({ setCursorVariant }: any) {
  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'], color: 'from-cyan-500 to-blue-500' },
    { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'], color: 'from-green-500 to-emerald-500' },
    { category: 'Design', items: ['Figma', 'Adobe XD', 'Framer', 'Principle'], color: 'from-pink-500 to-rose-500' },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vercel'], color: 'from-purple-500 to-indigo-500' },
  ];

  return (
    <section id="skills" className="py-32 px-6 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-center mb-16"
        >
          Skills & <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Expertise</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
              <div className="space-y-2">
                {skill.items.map((item) => (
                  <div key={item} className="text-sm text-white/60 flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${skill.color}`} />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ setCursorVariant }: any) {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with real-time inventory and payment processing',
      image: '🛍️',
      tech: ['Next.js', 'Stripe', 'PostgreSQL'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'AI Dashboard',
      description: 'Analytics dashboard with AI-powered insights and data visualization',
      image: '📊',
      tech: ['React', 'Python', 'TensorFlow'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Social Media App',
      description: 'Real-time social networking platform with chat and notifications',
      image: '💬',
      tech: ['React Native', 'Firebase', 'Node.js'],
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-center mb-16"
        >
          Featured <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Work</span>
        </motion.h2>

        <div className="space-y-12">
          {projects.map((project, i) => (
            <TiltCard key={i} project={project} index={i} setCursorVariant={setCursorVariant} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'Working with Alex was an absolute pleasure. The attention to detail and creative solutions exceeded our expectations.',
      avatar: '👩',
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager, InnovateCo',
      content: 'Exceptional developer with great design sense. Delivered our project on time and beyond what we imagined.',
      avatar: '👨',
    },
    {
      name: 'Emma Wilson',
      role: 'Founder, DesignHub',
      content: 'One of the best developers I\'ve worked with. Creative, professional, and highly skilled.',
      avatar: '👱♀️',
    },
  ];

  return (
    <section className="py-32 px-6 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-center mb-16"
        >
          Kind <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Words</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-white/60">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-white/70 italic">"{testimonial.content}"</p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ setCursorVariant }: any) {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 overflow-hidden"
        >
          {/* Animated background */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"
          />

          <div className="relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Let's create something <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">amazing</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Have a project in mind? Let's collaborate and bring your ideas to life.
            </p>

            <div className="flex justify-center gap-4 mb-12">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>

            <MagneticButton>
              <span className="flex items-center gap-2 text-lg">
                <Mail className="w-5 h-5" />
                Get in touch
                <ExternalLink className="w-5 h-5" />
              </span>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 text-white/40 text-sm"
        >
          <p>© 2026 Alex Chen. Designed & Built with ❤️</p>
        </motion.div>
      </div>
    </section>
  );
}

// Reusable Components
function FloatingElement({ children, mouseX, mouseY, delay, range }: any) {
  const x = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-range, range]);
  const y = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-range, range]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ x, y }}
      transition={{ type: 'spring', damping: 50, stiffness: 100, delay }}
    >
      {children}
    </motion.div>
  );
}

function InteractiveCard({ icon: Icon, label, color, onHoverStart, onHoverEnd }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5, y: -10 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={`bg-gradient-to-br ${color} rounded-2xl p-6 cursor-pointer group relative overflow-hidden`}
    >
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />
      <Icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform relative z-10" />
      <div className="font-semibold relative z-10">{label}</div>
    </motion.div>
  );
}

function MagneticButton({ children, variant = 'solid' }: any) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className={`px-8 py-4 rounded-full font-semibold group ${variant === 'solid'
        ? 'bg-white text-black hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 hover:text-white'
        : 'border-2 border-white text-white hover:bg-white hover:text-black'
        } transition-all duration-300`}
    >
      {children}
    </motion.button>
  );
}

function TiltCard({ project, index, setCursorVariant }: any) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 10);
    setRotateY((centerX - x) / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setCursorVariant('hover')}
      animate={{ rotateX, rotateY }}
      style={{ transformStyle: 'preserve-3d' }}
      className="cursor-pointer"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-8xl mb-6">{project.image}</div>
            <h3 className="text-4xl font-black mb-4">{project.title}</h3>
            <p className="text-white/60 mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-cyan-400 font-semibold"
            >
              View project
              <ExternalLink className="w-5 h-5" />
            </motion.div>
          </div>
          <div className="aspect-video bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
            <span className="text-white/20 text-lg">Project Preview</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
