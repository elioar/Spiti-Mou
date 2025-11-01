"use client";

import Image from "next/image";
import { Home as HomeIcon, Phone, Menu, Mail, X, Moon, Sun, ArrowRight, Building2, TrendingUp, Award, Users, Heart, Sparkles, Target, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import enTranslations from "@/translations/en.json";
import esTranslations from "@/translations/es.json";
import frTranslations from "@/translations/fr.json";
import elTranslations from "@/translations/el.json";
import { useTheme } from "@/components/ThemeProvider";

export default function About() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es' | 'fr' | 'el'>('en');
  const [mounted, setMounted] = useState(false);

  const translations = {
    en: enTranslations,
    es: esTranslations,
    fr: frTranslations,
    el: elTranslations,
  };

  const t = translations[language];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    const scrollbarContainer = document.createElement('div');
    scrollbarContainer.id = 'custom-scrollbar';
    scrollbarContainer.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      width: 4px;
      height: 100vh;
      z-index: 999999;
      pointer-events: none;
    `;

    const scrollbarTrack = document.createElement('div');
    scrollbarTrack.style.cssText = `
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.05);
    `;

    const scrollbarThumb = document.createElement('div');
    scrollbarThumb.style.cssText = `
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      background: linear-gradient(to bottom, #10b981, #059669);
      border-radius: 2px;
      transition: opacity 0.3s ease;
      opacity: 0;
      min-height: 80px;
    `;

    scrollbarContainer.appendChild(scrollbarTrack);
    scrollbarContainer.appendChild(scrollbarThumb);
    document.body.appendChild(scrollbarContainer);

    let scrollbarTimeout: NodeJS.Timeout;
    const showScrollbar = () => {
      scrollbarThumb.style.opacity = '1';
      clearTimeout(scrollbarTimeout);
      scrollbarTimeout = setTimeout(() => {
        scrollbarThumb.style.opacity = '0';
      }, 1000);
    };

    lenis.on('scroll', ({ scroll, limit }: any) => {
      showScrollbar();
      const progress = scroll / limit;
      const thumbHeight = Math.max(80, window.innerHeight * 0.1);
      const maxTop = window.innerHeight - thumbHeight;
      scrollbarThumb.style.height = `${thumbHeight}px`;
      scrollbarThumb.style.transform = `translateY(${progress * maxTop}px)`;
      
      setIsScrolled(scroll > 50);
      setIsLangDropdownOpen(false);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      scrollbarContainer.remove();
      if (scrollbarTimeout) clearTimeout(scrollbarTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen smooth-scroll font-bricolage">

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-[9999] flex h-16 items-center justify-center py-2 sm:h-20 sm:py-2 md:h-22 md:py-3 lg:h-24"
      >
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%]">
          <div className={`flex items-center justify-between max-w-none mx-auto w-full transition-all duration-300 ${
            isScrolled ? 'bg-white dark:bg-gray-900 shadow-lg rounded-2xl px-6 py-4' : ''
          }`}>
          {/* Left side - Logo */}
          <motion.a
            href="/"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 sm:gap-3 md:gap-4 cursor-pointer"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 border-2 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                isScrolled ? 'border-black dark:border-white' : 'border-white'
              }`}
            >
              <HomeIcon className={`w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                isScrolled ? 'text-black dark:text-white' : 'text-white'
              }`} />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`text-base font-semibold tracking-tight transition-colors duration-300 sm:text-lg md:text-xl ${
                isScrolled ? 'text-black dark:text-white' : 'text-white'
              }`}
            >
              Homely
            </motion.span>
          </motion.a>
          
          {/* Right side */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8"
          >
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 ${
                isScrolled 
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600' 
                  : 'bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/40'
              }`}
              suppressHydrationWarning
            >
              {mounted && theme === 'dark' ? (
                <Sun className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                  isScrolled ? 'text-black dark:text-white' : 'text-white'
                }`} />
              ) : (
                <Moon className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                  isScrolled ? 'text-black dark:text-white' : 'text-white'
                }`} />
              )}
            </motion.button>

            {/* Language Selector */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className={`flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-full border-2 transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-200' 
                    : 'bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/40 text-white'
                }`}
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="text-[10px] sm:text-xs font-semibold uppercase hidden sm:inline">{language}</span>
                <svg 
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>

              {isLangDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setIsLangDropdownOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-40 transition-colors duration-300"
                  >
                    {[
                      { code: 'en', name: 'English', flag: '🇬🇧' },
                      { code: 'es', name: 'Español', flag: '🇪🇸' },
                      { code: 'fr', name: 'Français', flag: '🇫🇷' },
                      { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as 'en' | 'es' | 'fr' | 'el');
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors duration-200 ${
                          language === lang.code ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                        {language === lang.code && (
                          <svg className="w-5 h-5 ml-auto text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(true)}
              className={`btn-menu flex items-center gap-1.5 sm:gap-2 md:gap-3 rounded-full px-2.5 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5 h-9 sm:h-11 md:h-12 transition-colors duration-300 ${
                isScrolled ? 'bg-gray-200 dark:bg-gray-800' : 'bg-white'
              }`}
            >
              <Menu className={`w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                isScrolled ? 'text-black dark:text-white' : 'text-gray-800'
              }`} />
              <span
                className={`text-xs sm:text-sm font-semibold tracking-tight transition-colors duration-300 md:text-base ${
                  isScrolled ? 'text-black dark:text-white' : 'text-gray-800'
                }`}
              >
                {t.menu}
              </span>
            </motion.button>
          </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            <div className="text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 border-2 border-white rounded-lg flex items-center justify-center">
                    <HomeIcon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-white text-4xl font-semibold">Homely</span>
                </div>
              </motion.div>

              <div className="space-y-6">
                {[
                  { label: t.home, href: '/' },
                  { label: t.propertiesNav, href: '/#properties' },
                  { label: t.about, href: '/about', active: true },
                  { label: t.contact, href: '/contact' }
                ].map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className={`block text-white text-3xl sm:text-4xl font-bold hover:text-emerald-400 transition-colors duration-300 group ${
                      item.active ? 'text-emerald-400' : ''
                    }`}
                  >
                    <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">{item.label}</span>
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-16 space-y-4"
              >
                <div className="flex items-center justify-center gap-3 text-white/80">
                  <Phone className="w-5 h-5" />
                  <span className="text-lg">{t.phone}</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-white/80">
                  <Mail className="w-5 h-5" />
                  <span className="text-lg">{t.email}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center pt-24 sm:pt-28 md:pt-32">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero_background3.png"
            alt="About Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 dark:from-black/50 dark:via-black/30 dark:to-black/60"></div>
        </div>
        
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%] mx-auto relative z-10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>About Us</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Your Trusted Partner in Real Estate
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
              For over 15 years, we've been helping clients find their dream properties in Athens and across Greece. Our commitment to excellence and personalized service sets us apart.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Mission Section */}
      <section className="relative w-full bg-white dark:bg-gray-950 py-16 sm:py-20 md:py-24 transition-colors duration-300">
        <div className="px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="/house_01.avif"
                alt="Modern luxury property"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Our Mission</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight transition-colors duration-300">
                Transforming Dreams into Reality
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                We believe that finding the perfect home or investment property is about more than just location and price. It's about understanding your unique vision, lifestyle, and goals.
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                Our expert team combines deep market knowledge with personalized attention to ensure every client finds exactly what they're looking for.
              </p>
              <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-600 transition-colors duration-300 inline-flex items-center gap-2 mt-4">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative w-full bg-white dark:bg-gray-950 py-16 sm:py-20 md:py-24 transition-colors duration-300">
        <div className="px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Our Values</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              What Drives Us Every Day
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Integrity",
                description: "We conduct business with honesty, transparency, and ethical practices that build lasting trust with our clients.",
              },
              {
                icon: Target,
                title: "Excellence",
                description: "We strive for excellence in every interaction, ensuring the highest quality service and attention to detail.",
              },
              {
                icon: Users,
                title: "Client-First",
                description: "Our clients' success is our success. We listen, understand, and deliver solutions tailored to their needs.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors duration-300">
                  <value.icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative w-full bg-white dark:bg-gray-950 py-16 sm:py-20 md:py-24 transition-colors duration-300">
        <div className="px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Experience Excellence in Real Estate
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              We combine expertise, dedication, and personalized service to help you find your perfect property.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Expert Team",
                description: "Years of experience in the Athens real estate market with proven track record of success.",
              },
              {
                icon: Sparkles,
                title: "Luxury Properties",
                description: "Curated selection of premium properties in the most desirable neighborhoods.",
              },
              {
                icon: CheckCircle,
                title: "Proven Results",
                description: "98% client satisfaction rate with hundreds of successful property transactions.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full bg-gray-100 dark:bg-gray-900 py-16 sm:py-20 md:py-24 transition-colors duration-300">
        <div className="px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300">
              Let's start your journey today. Our team is ready to help you every step of the way.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white font-bold rounded-lg shadow-lg hover:bg-emerald-600 transition-all duration-300"
            >
              Get In Touch
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full bg-gray-900 pt-16 pb-8">
        <div className="relative px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-2 border-white rounded-lg flex items-center justify-center">
                  <HomeIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-2xl font-semibold">Homely</span>
              </div>

              <div className="space-y-2">
                <p className="text-white text-sm sm:text-base">{t.begin}</p>
                <p className="text-white text-sm sm:text-base">{t.contactUs}</p>
              </div>

              <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-600 transition-colors duration-300 text-sm sm:text-base">
                {t.getInTouchCta}
              </button>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">Navigation</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <a href="/" className="block text-white/80 hover:text-emerald-400 transition-colors duration-300">Home</a>
                    <a href="/about" className="block text-white/80 hover:text-emerald-400 transition-colors duration-300">About</a>
                  </div>
                  <div className="space-y-2">
                    <a href="/#properties" className="block text-white/80 hover:text-emerald-400 transition-colors duration-300">Properties</a>
                    <a href="/contact" className="block text-white/80 hover:text-emerald-400 transition-colors duration-300">Contact</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-white text-sm">
                {t.copyright} <span className="text-emerald-400">{t.developer}</span>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="text-white hover:text-emerald-400 transition-colors duration-300 text-sm">{t.terms}</a>
                <a href="#" className="text-white hover:text-emerald-400 transition-colors duration-300 text-sm">{t.privacy}</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

