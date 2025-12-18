import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';
import {
  Hexagon, Smartphone, Globe, ChevronRight, Layout, Cpu,
  ArrowUpRight, Mail, MapPin, Flame, Trophy, Zap, Users, Store, ShieldCheck,
  MousePointer2, ExternalLink, Sparkles, Utensils, Scissors, ShoppingBag,
  Menu, X
} from 'lucide-react';

import logo from './assets/logo.png';
import badmintonLogo from './assets/badminton-logo.png';
import granuloLogo from './assets/granulo-logo.png';

/**
 * --- HOOK: CUSTOM CURSOR ---
 */
const useCustomCursor = () => {
  // Use motion values for instant updates without React re-renders
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      // Direct update for zero latency
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
    };
    const handleOver = (e) => {
      if (e.target.closest('a, button, .interactive')) setIsHovering(true);
      else setIsHovering(false);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, []);

  return { x, y, isHovering };
};

/**
 * --- COMPONENT: NAV ---
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${scrolled ? 'py-4' : 'py-10'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
          <div className="flex items-center gap-3 group pointer-events-auto cursor-smart">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <img
                src={logo}
                alt="KauBry Logo"
                className="w-full h-full object-contain transition-transform duration-1000 group-hover:rotate-[120deg]"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black italic tracking-tighter uppercase text-white">KauBry</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-blue-500 uppercase">App's</span>
            </div>
          </div>

          <div className="flex items-center gap-10">
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 text-white/40">
              <a href="#projets" className="hover:text-blue-400 transition-colors">Réalisations</a>
              <a href="#expertise" className="hover:text-purple-400 transition-colors">Expertise</a>
            </div>
            <a href="#contact" className="hidden md:block relative group px-6 py-2 overflow-hidden rounded-full border border-white/10 backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="relative text-white group-hover:text-white transition-colors">Contact</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="md:hidden text-white interactive"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-auto cursor-smart"
          >
            <button
              className="absolute top-10 right-6 text-white/50 hover:text-white transition-colors interactive"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center gap-12 text-2xl font-black uppercase tracking-widest">
              <a href="#projets" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-blue-500 transition-colors interactive">Réalisations</a>
              <a href="#expertise" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-purple-500 transition-colors interactive">Expertise</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-blue-500 hover:text-white transition-colors interactive">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const App = () => {
  const { x, y, isHovering } = useCustomCursor();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Progression de défilement fluide
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const [activeLegal, setActiveLegal] = useState(null); // 'mentions' or 'cgu' or null

  return (
    <div ref={targetRef} className="relative min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden cursor-smart">

      {/* --- BARRE DE PROGRESSION --- */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[110] origin-left" style={{ scaleX }} />

      {/* --- TEXTURE DE GRAIN (Noise Overlay) --- */}
      <div className="fixed inset-0 pointer-events-none z-[90] opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* --- CURSEUR PERSONNALISÉ --- */}
      <motion.div
        className="custom-cursor-element fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white/20 z-[999] pointer-events-none mix-blend-difference items-center justify-center hidden"
        style={{ x, y }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)"
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      >
        {isHovering && <MousePointer2 size={10} className="text-black fill-black" />}
      </motion.div>

      {/* --- GRADIENTS DE FOND MESH --- */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[150px] rounded-full animate-pulse transition-all duration-1000 delay-500"></div>
      </motion.div>

      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-12 group interactive">
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <Hexagon className="w-24 h-24 text-white/10 group-hover:text-blue-500 transition-colors duration-700" strokeWidth={1} />
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400 animate-pulse" />
            </div>

            <h1 className="text-[11vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter uppercase text-center italic">
              <motion.span
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="block"
              >
                Propulsez votre
              </motion.span>
              <motion.span
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              >
                commerce.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-10 max-w-2xl text-center text-white/40 text-sm md:text-lg font-medium tracking-widest uppercase leading-relaxed"
            >
              Restaurants, salons, boutiques : je conçois des outils <br />numériques qui travaillent pour votre croissance.
            </motion.p>

            <motion.div className="mt-12 flex flex-col items-center gap-4">
              <div className="w-[1px] h-20 bg-gradient-to-b from-blue-500 to-transparent"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Découvrez mon savoir-faire</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- RÉALISATIONS --- */}
      <section id="projets" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="mb-24">
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white/10 mb-[-0.5em]">Signature</h2>
            <h2 className="text-3xl md:text-5xl font-black uppercase relative z-10 pl-4">Réalisations <span className="text-blue-500">.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* PROJET 1: GRANULO (FLUTTER) */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              viewport={{ once: true, margin: "200px" }}
              className="md:col-span-8 group interactive relative min-h-[550px] md:h-[650px] overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 flex flex-col will-change-transform"
            >
              {/* Background Gradient/Image Placeholder - A dark modern gradient suited for a tech app */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-blue-900/40 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Subtle Fire Effect */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                  animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1], x: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-0 left-[-20%] w-[80%] h-[60%] bg-orange-600/20 blur-[80px] rounded-full mix-blend-screen"
                />
                <motion.div
                  animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] bg-red-600/20 blur-[60px] rounded-full mix-blend-screen"
                />
              </div>

              <div className="relative p-8 md:p-16 h-full flex flex-col justify-start z-10">
                <div className="flex flex-col md:flex-row justify-between items-start w-full gap-6 md:gap-4 mb-8 md:mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 backdrop-blur-xl border border-orange-500/20 flex items-center justify-center overflow-hidden p-2">
                      <img src={granuloLogo} alt="Granulo Icon" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Application Mobile</span>
                      <span className="text-2xl font-black uppercase italic">Granulo</span>
                    </div>
                  </div>

                  <div className="flex gap-2 self-start md:self-auto">
                    <button
                      onClick={() => setVideoModalOpen(true)}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center justify-center gap-2 hover:bg-red-600 hover:border-red-600 transition-colors text-[10px] uppercase font-bold tracking-widest"
                      title="Voir la démo vidéo"
                    >
                      <Zap size={14} className="fill-current" /> Voir vidéo DEMO
                    </button>
                  </div>
                </div>

                <div className="max-w-xl mt-auto">
                  <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 leading-none">
                    Gérez votre poêle <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">intelligemment.</span>
                  </h3>
                  <p className="text-lg text-white/60 mb-8 font-medium leading-relaxed">
                    Suivez votre stock de granulés, analysez votre consommation et optimisez vos achats. Une solution complète disponible sur Android.
                  </p>

                  <div className="flex flex-wrap gap-4 items-center">
                    <a href="https://play.google.com/store/apps/details?id=com.kaubry.granulo.granulo" target="_blank" rel="noreferrer" className="px-6 py-3 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2">
                      <Smartphone size={16} /> Play Store
                    </a>
                    <a href="https://granulo.app" target="_blank" rel="noreferrer" className="px-6 py-3 bg-white/5 border border-white/10 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                      Site web
                    </a>
                  </div>
                </div>
              </div>

              {/* Abstract Visual Elements - Optimized */}
              <div className="absolute right-[-15%] bottom-[-20%] w-[70%] h-[90%] bg-gradient-to-t from-orange-600/30 to-purple-900/20 rounded-full blur-[60px] md:blur-[100px] pointer-events-none"></div>
            </motion.div>

            {/* PROJET 2: BADMINTON (SITE WEB) */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              viewport={{ once: true, margin: "200px" }}
              className="md:col-span-4 group interactive relative min-h-[500px] md:h-[650px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#7f1d1d] to-[#1a0505] text-white p-8 md:p-10 flex flex-col justify-between border border-white/10 will-change-transform"
            >
              {/* Background Glow/Noise - Disabled on mobile for perf */}
              <div className="hidden md:block absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-black/20 overflow-hidden p-2">
                    <img src={badmintonLogo} alt="Badminton Logo" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="flex flex-col leading-none mb-6">
                  <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-transparent [-webkit-text-stroke:1px_white] opacity-90 mb-1 break-words">AS Badminton</h3>
                  <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white break-words">Longuyon</h3>
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md">Site Vitrine</span>
              </div>

              <div className="relative z-10 mt-auto">
                <p className="text-lg font-bold leading-tight mb-8 text-white/90">
                  "Un club convivial et passionné."
                </p>

                <div className="flex flex-col gap-4">
                  <div className="w-full h-[1px] bg-white/20"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Objectif</span>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-bold text-white/80">Visibilité</span>
                      <span className="text-[10px] font-bold text-white/80">•</span>
                      <span className="text-[10px] font-bold text-white/80">Image</span>
                    </div>
                  </div>
                  <a href="https://badminton-longuyon.fr/" target="_blank" rel="noreferrer" className="w-full py-4 mt-2 bg-white text-[#DC2626] rounded-2xl flex items-center justify-center font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                    Découvrir le site
                  </a>
                </div>
              </div>
            </motion.div>

            {/* APPEL À PROJET (Large) */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              viewport={{ once: true }}
              className="md:col-span-12 relative h-[300px] md:h-[400px] rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-purple-700 p-10 md:p-20 overflow-hidden flex items-center justify-between group interactive"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="relative z-10 max-w-2xl">
                <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-white">Et si votre commerce était le prochain ?</h3>
                <p className="text-white/80 font-medium md:text-xl">
                  Artisans, restaurateurs, indépendants : je traduis votre savoir-faire en une expérience numérique unique.
                </p>
              </div>
              <div className="hidden lg:flex relative z-10 w-24 h-24 rounded-full border border-white/20 items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all duration-500 group-hover:scale-110">
                <ArrowUpRight size={40} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- LE FONDATEUR --- */}
      <section id="fondateur" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            viewport={{ once: true, margin: "100px" }}
            className="md:col-span-12 relative bg-gradient-to-br from-[#111] to-[#050505] rounded-[2.5rem] border border-white/5 p-8 md:p-16 overflow-hidden shadow-2xl"
          >
             <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* Left Part: Text */}
                <div className="md:col-span-7 flex flex-col gap-8">
                   <div className="inline-flex self-start px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Le Fondateur</span>
                   </div>
                   
                   <div>
                      <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-2">Pierre Aubry.</h2>
                      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                   </div>

                   <blockquote className="text-xl md:text-2xl font-medium text-white/90 italic border-l-4 border-blue-500 pl-6 py-2">
                      "Mon parcours dans le support informatique m'a appris une chose : la technologie n'a de valeur que si elle résout un problème réel."
                   </blockquote>

                   <p className="text-white/50 leading-relaxed text-lg font-medium max-w-2xl">
                      Architecte de solutions, je m'appuie sur une solide expérience en support IT pour concevoir des outils numériques robustes et performants. Mon objectif ? Transformer la complexité technique en simplicité opérationnelle, à l'image de l'application mobile Granulo.
                   </p>
                </div>

                {/* Right Part: Expertise Cards */}
                <div className="md:col-span-5 flex flex-col gap-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/10 transition-colors group interactive">
                         <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={20} />
                         </div>
                         <div>
                            <h4 className="font-bold text-white uppercase tracking-wider text-sm">Fiabilité</h4>
                            <span className="text-xs text-white/40 font-medium uppercase tracking-widest">Expert Support IT</span>
                         </div>
                      </div>
                      
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/10 transition-colors group interactive">
                         <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                            <Zap size={20} />
                         </div>
                         <div>
                            <h4 className="font-bold text-white uppercase tracking-wider text-sm">Vision</h4>
                            <span className="text-xs text-white/40 font-medium uppercase tracking-widest">Architecte Solutions</span>
                         </div>
                      </div>
                   </div>

                   <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/20 rounded-2xl p-6 flex items-center gap-6 hover:border-orange-500/40 transition-colors group interactive">
                      <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 group-hover:rotate-12 transition-transform">
                         <Flame size={24} />
                      </div>
                      <div className="flex flex-col">
                         <h4 className="font-black text-white uppercase italic tracking-tight text-lg">Créateur de Granulo</h4>
                         <span className="text-xs text-white/50 font-medium uppercase tracking-widest">Passionné de performance</span>
                      </div>
                   </div>
                </div>

             </div>
             
             {/* Background Effects */}
             <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-purple-900/10 blur-[100px] pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      {/* --- EXPERTISE SECTION --- */}
      <section id="expertise" className="py-32 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <span className="text-blue-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Solutions</span>
              <h2 className="text-[8vw] md:text-[4vw] font-black uppercase italic tracking-tighter mb-10 text-white leading-none">L'art de la <br /> <span className="whitespace-nowrap">transformation.</span></h2>
              <p className="text-white/40 text-lg md:text-xl font-medium leading-relaxed max-w-md italic">
                Chaque détail est pensé pour rassurer vos clients et automatiser vos processus.
              </p>
              <div className="mt-12 flex gap-4">
                <ShoppingBag className="text-blue-500" />
                <Scissors className="text-purple-500" />
                <Utensils className="text-pink-500" />
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Site Vitrine & Boutique", desc: "Clair, rapide, efficace.", icon: <Store /> },
                { label: "Visibilité & SEO Local", desc: "Dominez votre zone de chalandise.", icon: <Globe /> },
                { label: "Outils de Réservation", desc: "Simplifiez votre gestion quotidienne.", icon: <Smartphone /> }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 20 }}
                  className="interactive group flex items-start gap-6 md:gap-8 p-6 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                >
                  <div className="text-blue-500 group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
                  <div>
                    <h4 className="text-xl font-black uppercase italic mb-2 tracking-tight">{item.label}</h4>
                    <p className="text-white/40 text-sm font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA / CONTACT --- */}
      <section id="contact" className="py-40 relative">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-[15vw] md:text-[10vw] font-black uppercase italic tracking-[ -0.05em] leading-none mb-20 opacity-10 select-none">CONTACT</h2>

            <div className="relative mt-[-10vw] z-10">
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-12 italic text-white">Faites briller votre <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">savoir-faire.</span></h3>

              <div className="flex flex-col md:flex-row justify-center gap-6">
                <a href="mailto:contact@kaubry.fr?subject=Demande%20de%20projet%20-%20KauBry%20Apps" className="interactive px-8 py-5 md:px-12 md:py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-transform shadow-xl shadow-white/5 flex items-center justify-center">
                  Lancer mon projet
                </a>
                <a href="mailto:contact@kaubry.fr" className="interactive px-8 py-5 md:px-12 md:py-6 bg-white/5 border border-white/10 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-colors flex items-center justify-center gap-4">
                  <Mail size={14} /> contact@kaubry.fr
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-12 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/30">
          <div className="flex flex-col">
            <span className="text-xl font-black uppercase italic leading-none text-white">KauBry <span className="text-blue-500">App's</span></span>
            <span className="mt-2 text-white/20 italic tracking-[0.4em]">Artisan Numérique & Digital Architect</span>
          </div>

          <div className="flex flex-wrap gap-8 md:gap-12 justify-center">
            <button onClick={() => setActiveLegal('mentions')} className="interactive hover:text-white transition-colors italic">Mentions Légales</button>
            <button onClick={() => setActiveLegal('cgu')} className="interactive hover:text-white transition-colors italic">CGU</button>
            <a
              href="https://www.linkedin.com/in/pierreaubryit"
              target="_blank"
              rel="noreferrer"
              className="interactive hover:text-blue-500 transition-colors italic pointer-events-auto"
            >
              LinkedIn
            </a>
            <span className="text-white/10 select-none hidden md:inline">|</span>
            <span className="italic">© {new Date().getFullYear()} Pierre Aubry</span>
          </div>
        </div>
      </footer>

      {/* --- LEGAL MODALS --- */}
      <AnimatePresence>
        {activeLegal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-2xl p-6 md:p-20 overflow-y-auto pointer-events-auto cursor-smart"
          >
            <button
              onClick={() => setActiveLegal(null)}
              className="fixed top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white interactive z-50 p-2"
            >
              <X size={40} />
            </button>

            <div className="max-w-3xl mx-auto py-20 pb-40">
              {activeLegal === 'mentions' ? (
                <div className="space-y-12">
                  <h2 className="text-5xl font-black uppercase italic tracking-tighter">Mentions <span className="text-blue-500">Légales</span></h2>
                  <div className="space-y-8 text-white/70 leading-relaxed font-medium">
                    <section>
                      <h3 className="text-white font-black uppercase text-xs tracking-widest mb-4">Éditeur du site</h3>
                      <p>Pierre Aubry (KauBry App's)<br />Auto-entrepreneur<br />Longuyon, France<br />SIRET : 993 202 639<br />Email : contact@kaubry.fr</p>
                    </section>
                    <section>
                      <h3 className="text-white font-black uppercase text-xs tracking-widest mb-4">Hébergement</h3>
                      <p>GitHub Inc.<br />88 Colin P. Kelly Jr. Street<br />San Francisco, CA 94107 - USA</p>
                    </section>
                    <section>
                      <h3 className="text-white font-black uppercase text-xs tracking-widest mb-4">Propriété Intellectuelle</h3>
                      <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>
                    </section>
                  </div>
                </div>
              ) : (
                <div className="space-y-12">
                  <h2 className="text-5xl font-black uppercase italic tracking-tighter">Conditions <span className="text-purple-500">Générales</span></h2>
                  <div className="space-y-8 text-white/70 leading-relaxed font-medium">
                    <section>
                      <h3 className="text-white font-black uppercase text-xs tracking-widest mb-4">Objet</h3>
                      <p>Les présentes CGU ont pour objet de définir les modalités de mise à disposition des services du site KauBry App's.</p>
                    </section>
                    <section>
                      <h3 className="text-white font-black uppercase text-xs tracking-widest mb-4">Responsabilité</h3>
                      <p>Pierre Aubry s'efforce d'assurer au mieux de ses possibilités, l'exactitude et la mise à jour des informations diffusées sur ce site.</p>
                    </section>
                    <section>
                      <h3 className="text-white font-black uppercase text-xs tracking-widest mb-4">Données personnelles</h3>
                      <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et d'opposition aux données vous concernant en contactant : contact@kaubry.fr</p>
                    </section>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- VIDEO MODAL --- */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-2xl p-6 md:p-20 flex items-center justify-center pointer-events-auto cursor-smart"
            onClick={() => setVideoModalOpen(false)}
          >
            <button
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white interactive z-50 p-2"
              onClick={() => setVideoModalOpen(false)}
            >
              <X size={40} />
            </button>
            <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/zHUee01phNM?autoplay=1&rel=0"
                title="Granulo Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
