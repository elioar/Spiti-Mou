"use client";

import Image from "next/image";
import { Home as HomeIcon, Phone, Menu, Bed, Bath, Car, Dot, ArrowRight, Mail, X, Moon, Sun, MapPin, Square, Calendar, Star, TrendingUp, Check, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import enTranslations from "@/translations/en.json";
import esTranslations from "@/translations/es.json";
import frTranslations from "@/translations/fr.json";
import elTranslations from "@/translations/el.json";
import { useTheme } from "@/components/ThemeProvider";

declare global {
  interface Window {
    smoothScrollTo?: (target: number, duration?: number) => void;
  }
}

// Animated Number Component
function AnimatedNumber({ value, prefix = '', suffix = '', className = '' }: { value: number | string; prefix?: string; suffix?: string; className?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ y: 30, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -30, opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        scale: { duration: 0.4 }
      }}
      className={`inline-block ${className}`}
    >
      {prefix}{value}{suffix}
    </motion.span>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es' | 'fr' | 'el'>('en');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  // Prevent hydration mismatch for theme icon
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Hero background images - Desktop
  const heroImages = [
    '/hero_background3.png',
    '/hero_background5.png',
    '/hero_background4.png'
  ];

  // Hero background images - Mobile
  const heroImagesMobile = [
    '/hero_background_mobile2.png',
    '/hero_background_mobile.png',
    '/hero_background_mobile3.png'
  ];

  // Property data for each image
  const propertyData = [
    { beds: 4, baths: 4, parking: 2, price: '4.75M' },
    { beds: 5, baths: 3, parking: 3, price: '5.20M' },
    { beds: 6, baths: 5, parking: 4, price: '6.80M' }
  ];

  // Translations
  const translations = {
    en: enTranslations,
    es: esTranslations,
    fr: frTranslations,
    el: elTranslations,
  };

  const t = translations[language];


  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Create custom scrollbar
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

    // Show scrollbar on scroll
    let scrollbarTimeout: NodeJS.Timeout;
    const showScrollbar = () => {
      scrollbarThumb.style.opacity = '1';
      clearTimeout(scrollbarTimeout);
      scrollbarTimeout = setTimeout(() => {
        scrollbarThumb.style.opacity = '0';
      }, 1000);
    };

    // Update scrollbar position and track scroll
    lenis.on('scroll', ({ scroll, limit }: any) => {
      showScrollbar();
      const progress = scroll / limit;
      const thumbHeight = Math.max(80, window.innerHeight * 0.1);
      const maxTop = window.innerHeight - thumbHeight;
      scrollbarThumb.style.height = `${thumbHeight}px`;
      scrollbarThumb.style.transform = `translateY(${progress * maxTop}px)`;
      
      // Track scroll position for header state
      setIsScrolled(scroll > 50);
      setIsLangDropdownOpen(false);
    });

    // Animation function
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

  // Auto-scroll carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

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
          
          {/* Right side - Phone and Menu */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden sm:flex items-center gap-2 md:gap-3"
            >
              <Phone className={`w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                isScrolled ? 'text-black dark:text-white' : 'text-white'
              }`} />
              <span
                className={`text-sm font-medium tracking-tight transition-colors duration-300 sm:text-sm md:text-base ${
                  isScrolled ? 'text-black dark:text-white' : 'text-white'
                }`}
              >
                {t.phone}
              </span>
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`hidden sm:block w-px h-6 md:h-7 transition-colors duration-300 ${
                isScrolled ? 'bg-gray-400 dark:bg-gray-600' : 'bg-white'
              }`}
            ></motion.div>
            
            {/* Theme Toggle Button */}
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

            {/* Language Selector Dropdown */}
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

              {/* Dropdown Menu */}
              {isLangDropdownOpen && (
                <>
                  {/* Backdrop */}
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
            {/* Close Button */}
            <motion.button
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            {/* Menu Content */}
            <div className="text-center">
              {/* Logo */}
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

              {/* Menu Links */}
              <div className="space-y-6">
                {[
                  { label: t.home, href: '/' },
                  { label: t.propertiesNav, href: '/#properties' },
                  { label: t.about, href: '/about' },
                  { label: t.contact, href: '/contact' }
                ].map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className="block text-white text-3xl sm:text-4xl font-bold hover:text-emerald-400 transition-colors duration-300 group"
                  >
                    <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">{item.label}</span>
                  </motion.a>
                ))}
              </div>

              {/* Contact Info */}
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
      <main className="relative min-h-screen flex items-center pt-6 sm:pt-10 md:pt-14 lg:pt-18">
        {/* Background Images Carousel - Desktop */}
        <div className="absolute inset-0 h-full hidden sm:block -z-10 overflow-hidden">
          {heroImages.map((src, index) => (
            <motion.div
              key={`desktop-${index}`}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{
                scale: index === currentImageIndex ? 1 : 1.05,
                opacity: index === currentImageIndex ? 1 : 0,
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={`Background ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ))}
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 dark:from-black/50 dark:via-black/30 dark:to-black/60" />
        </div>

        {/* Background Images Carousel - Mobile */}
        <div className="absolute inset-0 min-h-screen block sm:hidden -z-10 overflow-hidden">
          {heroImagesMobile.map((src, index) => (
            <motion.div
              key={`mobile-${index}`}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{
                scale: index === currentImageIndex ? 1 : 1.05,
                opacity: index === currentImageIndex ? 1 : 0,
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={`Background ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ))}
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 dark:from-black/50 dark:via-black/30 dark:to-black/60" />
        </div>
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%] mx-auto relative z-10">
          {/* Content */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:max-w-3xl lg:space-y-6">
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white text-xs sm:text-sm font-medium tracking-tight" 
              
              >
              <motion.span
                key={language}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {t.location}
              </motion.span>
            </motion.div>
            
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-balance font-bold text-white tracking-tight text-2xl leading-tight sm:text-3xl md:text-4xl lg:text-5xl"
            >
              <motion.span 
                key={`title-${language}`}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="block"
              >
                {t.title}
              </motion.span>
              <motion.span 
                key={`titleAlt-${language}`}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="block text-white"
              >
                {t.titleAlt}
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg lg:max-w-2xl leading-relaxed"
            >
              <motion.span
                key={`desc-${language}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {t.heroDescription}
              </motion.span>
            </motion.p>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative group bg-gradient-to-br from-white to-gray-50 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-lg border border-white/20 overflow-hidden backdrop-blur-sm"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <motion.span
                  key={`getInTouch-${language}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex items-center gap-1.5 text-gray-800 text-xs sm:text-sm font-bold tracking-tight"
                >
                  {t.getInTouch}
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative group bg-white/10 backdrop-blur-md border-2 border-white/30 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-lg overflow-hidden hover:bg-white/20 transition-all duration-300"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                <motion.span
                  key={`viewDetails-${language}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex items-center gap-1.5 text-white text-xs sm:text-sm font-bold tracking-tight"
                >
                  {t.viewDetails}
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </motion.button>
            </motion.div>
            
          </div>
        </div>

        {/* Bottom Info Bar - Responsive */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
          className="absolute bottom-6 left-4 right-4 sm:bottom-8 sm:left-auto sm:right-8 md:right-16 lg:right-[10%] xl:right-[15%] z-10"
        >
          <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
              
              {/* Mobile Layout - 2 rows */}
              <div className="flex flex-col gap-2 sm:hidden">
                <div className="flex items-center justify-between gap-2">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2.0 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="relative flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-br from-emerald-50/50 to-white/50 backdrop-blur-sm border border-emerald-200/30 hover:border-emerald-300 transition-all flex-1 group"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                    <Bed className="relative h-5 w-5 text-emerald-600 flex-shrink-0 z-10" />
                    <div className="relative flex flex-col min-w-0 z-10">
                      <AnimatedNumber 
                        value={propertyData[currentImageIndex].beds} 
                        className="text-base font-extrabold text-gray-900 leading-none"
                      />
                      <span className="text-[11px] text-gray-600 font-medium mt-0.5">{t.beds}</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2.1 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="relative flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-br from-blue-50/50 to-white/50 backdrop-blur-sm border border-blue-200/30 hover:border-blue-300 transition-all flex-1 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                    <Bath className="relative h-5 w-5 text-blue-600 flex-shrink-0 z-10" />
                    <div className="relative flex flex-col min-w-0 z-10">
                      <AnimatedNumber 
                        value={propertyData[currentImageIndex].baths} 
                        className="text-base font-extrabold text-gray-900 leading-none"
                      />
                      <span className="text-[11px] text-gray-600 font-medium mt-0.5">{t.baths}</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2.2 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="relative flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-br from-purple-50/50 to-white/50 backdrop-blur-sm border border-purple-200/30 hover:border-purple-300 transition-all flex-1 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                    <Car className="relative h-5 w-5 text-purple-600 flex-shrink-0 z-10" />
                    <div className="relative flex flex-col min-w-0 z-10">
                      <AnimatedNumber 
                        value={propertyData[currentImageIndex].parking} 
                        className="text-base font-extrabold text-gray-900 leading-none"
                      />
                      <span className="text-[11px] text-gray-600 font-medium mt-0.5">{t.parking}</span>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.3 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="relative flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 shadow-lg hover:shadow-xl transition-all group overflow-hidden"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <div className="relative flex flex-col text-center z-10">
                    <AnimatedNumber 
                      value={propertyData[currentImageIndex].price} 
                      prefix="€"
                      className="text-lg font-extrabold text-white leading-none"
                    />
                    <span className="text-[11px] text-emerald-100 font-semibold mt-0.5">{t.forSale}</span>
                  </div>
                </motion.div>
              </div>

              {/* Tablet & Desktop Layout - Single Line */}
              <div className="hidden sm:flex items-center gap-3 md:gap-4 lg:gap-5">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.0 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="relative flex items-center gap-2.5 px-4 py-3 md:px-5 rounded-xl bg-gradient-to-br from-emerald-50/60 to-white/60 backdrop-blur-sm border border-emerald-200/30 hover:border-emerald-300 transition-all group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                  <Bed className="relative h-6 w-6 text-emerald-600 z-10" />
                  <div className="relative flex flex-col z-10">
                    <AnimatedNumber 
                      value={propertyData[currentImageIndex].beds} 
                      className="text-lg md:text-xl font-extrabold text-gray-900 leading-none"
                    />
                    <span className="text-xs text-gray-600 font-medium mt-0.5">{t.beds}</span>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="relative flex items-center gap-2.5 px-4 py-3 md:px-5 rounded-xl bg-gradient-to-br from-blue-50/60 to-white/60 backdrop-blur-sm border border-blue-200/30 hover:border-blue-300 transition-all group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                  <Bath className="relative h-6 w-6 text-blue-600 z-10" />
                  <div className="relative flex flex-col z-10">
                    <AnimatedNumber 
                      value={propertyData[currentImageIndex].baths} 
                      className="text-lg md:text-xl font-extrabold text-gray-900 leading-none"
                    />
                    <span className="text-xs text-gray-600 font-medium mt-0.5">{t.baths}</span>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.2 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="relative flex items-center gap-2.5 px-4 py-3 md:px-5 rounded-xl bg-gradient-to-br from-purple-50/60 to-white/60 backdrop-blur-sm border border-purple-200/30 hover:border-purple-300 transition-all group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                  <Car className="relative h-6 w-6 text-purple-600 z-10" />
                  <div className="relative flex flex-col z-10">
                    <AnimatedNumber 
                      value={propertyData[currentImageIndex].parking} 
                      className="text-lg md:text-xl font-extrabold text-gray-900 leading-none"
                    />
                    <span className="text-xs text-gray-600 font-medium mt-0.5">{t.parking}</span>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.3 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="relative flex items-center gap-3 px-5 py-3 md:px-6 md:py-4 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 shadow-lg hover:shadow-xl transition-all group overflow-hidden"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <div className="relative flex flex-col z-10">
                    <AnimatedNumber 
                      value={propertyData[currentImageIndex].price} 
                      prefix="€"
                      className="text-xl md:text-2xl font-extrabold text-white leading-none"
                    />
                    <span className="text-xs text-emerald-100 font-semibold mt-1">{t.forSale}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-2 left-1/2 sm:left-4 md:left-8 lg:left-[10%] xl:left-[15%] sm:bottom-16 transform -translate-x-1/2 sm:translate-x-0 z-10 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </main>

      {/* Properties Section */}
<section id="properties" className="relative w-full bg-white dark:bg-gray-950 pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20 overflow-hidden z-20 transition-colors duration-300">
  {/* Background Accent Line */}
  <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
    <svg
      viewBox="0 0 500 500"
      className="absolute left-0 top-0 w-full h-full opacity-10 text-emerald-500"
    >
      <line
        x1="0"
        y1="500"
        x2="500"
        y2="0"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  </div>

  <div className="relative px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%]">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Row 1 - Left Side - Text */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2 text-emerald-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{t.categories}</span>
        </div>

        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight transition-colors duration-300"
        >
          {t.exploreBest} <br className="hidden sm:block" /> {t.withExpert}
        </h2>

        <p
          className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md leading-relaxed transition-colors duration-300"
        >
          {t.discover}
        </p>

        <button className="px-5 py-2.5 bg-emerald-500 text-white font-semibold rounded-full shadow hover:bg-emerald-600 transition text-sm sm:text-base hover-glow">
          {t.viewProperties}
        </button>
      </motion.div>

      {/* Row 1 - Right Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "200px" }}
        transition={{ duration: 0.8 }}
        className="group relative cursor-pointer"
      >
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl sm:h-[350px] lg:h-[400px]">
          <Image
            src="/house_01.avif"
            alt="Modern Houses"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-between p-6" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)'
        }}>
          {/* Top Right Button */}
          <div className="flex justify-end">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-6 h-6 text-black dark:text-white transition-colors duration-300" />
            </div>
          </div>
          {/* Bottom Left Text */}
          <div className="text-white">
            <h3 className="text-xl font-bold mb-2">{t.luxuryVillas}</h3>
            <p className="text-xs opacity-90">{t.premiumPropertiesDesc}</p>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Row 2 - Three Images */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12"
    >
      {/* First Image - A Little Bigger */}
      <div className="sm:col-span-1 group relative cursor-pointer">
        <div className="relative h-[200px] w-full overflow-hidden rounded-2xl sm:h-[230px] lg:h-[250px]">
          <Image
            src="/house_02.png"
            alt="Modern Villa"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 30vw, 100vw"
          />
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-between p-6" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)'
        }}>
          {/* Top Right Button */}
          <div className="flex justify-end">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-6 h-6 text-black dark:text-white transition-colors duration-300" />
            </div>
          </div>
          {/* Bottom Left Text */}
          <div className="text-white">
            <h3 className="text-xl font-bold mb-2">{t.officeSpaces}</h3>
            <p className="text-xs opacity-90">{t.residentialHomesDesc}</p>
          </div>
        </div>
      </div>

      {/* Second Image */}
      <div className="sm:col-span-1 group relative cursor-pointer">
        <div className="relative h-[200px] w-full overflow-hidden rounded-2xl sm:h-[230px] lg:h-[250px]">
          <Image
            src="/house_03.png"
            alt="Apartment Building"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 30vw, 100vw"
          />
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-between p-6" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)'
        }}>
          {/* Top Right Button */}
          <div className="flex justify-end">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-6 h-6 text-black dark:text-white transition-colors duration-300" />
            </div>
          </div>
          {/* Bottom Left Text */}
          <div className="text-white">
            <h3 className="text-xl font-bold mb-2">{t.apartments}</h3>
            <p className="text-xs opacity-90">{t.modernApartmentsDesc}</p>
          </div>
        </div>
      </div>

      {/* Third Image */}
      <div className="sm:col-span-1 group relative cursor-pointer">
        <div className="relative h-[200px] w-full overflow-hidden rounded-2xl sm:h-[230px] lg:h-[250px]">
          <Image
            src="/house_04.png"
            alt="Interior Office"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 30vw, 100vw"
          />
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-between p-6" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)'
        }}>
          {/* Top Right Button */}
          <div className="flex justify-end">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-6 h-6 text-black dark:text-white transition-colors duration-300" />
            </div>
          </div>
          {/* Bottom Left Text */}
          <div className="text-white">
            <h3 className="text-xl font-bold mb-2">{t.residentialHomes}</h3>
            <p className="text-xs opacity-90">{t.luxuryResidencesDesc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>

      {/* Third Section - Property Cards */}
      <section className="relative w-full bg-white dark:bg-gray-950 pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20 transition-colors duration-300">
        <div className="relative px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%]">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{t.properties}</span>
            </div>
            
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight tracking-tight transition-colors duration-300"
            >
              {t.discoverHomes}
            </h2>
            
            <p
              className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-300"
            >
              {t.curated}
            </p>
          </motion.div>

          {/* Property Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* Card 1 - Serenity height villas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-900 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow duration-300 flex flex-col h-full sm:h-[520px] group cursor-pointer"
            >
              <motion.div 
                className="relative h-56 w-full overflow-hidden rounded-t-2xl sm:h-[320px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/house_01.avif"
                  alt="Serenity height villas"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                />
                {/* Badge overlay */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">For Sale</div>
                  <div className="bg-white/90 backdrop-blur-sm text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    4.8
                  </div>
                </div>
                {/* View Details button on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <motion.button
                    initial={{ y: 20 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{t.serenityHeightVillas}</h3>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{t.serenityAddress}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-4">€570,000</div>
                </div>
                <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center gap-1">
                    <Bed className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">4</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Bath className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">3</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Square className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">120</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">m²</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Car className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">2</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.parking}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Mountain Retreat Villa */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-900 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow duration-300 flex flex-col h-full sm:h-[520px] group cursor-pointer"
            >
              <motion.div 
                className="relative h-56 w-full overflow-hidden rounded-t-2xl sm:h-[320px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/house_02.png"
                  alt="Mountain Retreat Villa"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">For Sale</div>
                  <div className="bg-white/90 backdrop-blur-sm text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    4.9
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <motion.button
                    initial={{ y: 20 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{t.mountainRetreatVilla}</h3>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{t.mountainAddress}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-4">€575,000</div>
                </div>
                <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center gap-1">
                    <Bed className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">5</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Bath className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">2</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Square className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">150</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">m²</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Car className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">3</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.parking}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Vista Grand */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-900 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow duration-300 flex flex-col h-full sm:h-[520px] group cursor-pointer"
            >
              <motion.div 
                className="relative h-56 w-full overflow-hidden rounded-t-2xl sm:h-[320px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/house_03.png"
                  alt="Vista Grand"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">For Sale</div>
                  <div className="bg-white/90 backdrop-blur-sm text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    4.7
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <motion.button
                    initial={{ y: 20 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{t.vistaGrand}</h3>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{t.vistaAddress}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-4">€580,000</div>
                </div>
                <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center gap-1">
                    <Bed className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">3</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Bath className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">4</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Square className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">180</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">m²</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Car className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">2</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.parking}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4 - Maplewood Residence */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-900 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow duration-300 flex flex-col h-full sm:h-[520px] group cursor-pointer"
            >
              <motion.div 
                className="relative h-56 w-full overflow-hidden rounded-t-2xl sm:h-[320px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/house_04.png"
                  alt="Maplewood Residence"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">For Sale</div>
                  <div className="bg-white/90 backdrop-blur-sm text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    5.0
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <motion.button
                    initial={{ y: 20 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{t.maplewoodResidence}</h3>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{t.maplewoodAddress}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-4">€590,000</div>
                </div>
                <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center gap-1">
                    <Bed className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">6</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Bath className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">3</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Square className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">200</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">m²</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Car className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">4</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.parking}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 5 - Whispering Pines */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-900 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow duration-300 flex flex-col h-full sm:h-[520px] group cursor-pointer"
            >
              <motion.div 
                className="relative h-56 w-full overflow-hidden rounded-t-2xl sm:h-[320px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/house_06.png"
                  alt="Whispering Pines"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">For Sale</div>
                  <div className="bg-white/90 backdrop-blur-sm text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    4.6
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <motion.button
                    initial={{ y: 20 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{t.whisperingPines}</h3>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{t.whisperingAddress}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-4">€710,000</div>
                </div>
                <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center gap-1">
                    <Bed className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">2</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Bath className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">1</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Square className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">90</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">m²</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Car className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">1</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.parking}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 6 - The Catalyst Center */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-900 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow duration-300 flex flex-col h-full sm:h-[520px] group cursor-pointer"
            >
              <motion.div 
                className="relative h-56 w-full overflow-hidden rounded-t-2xl sm:h-[320px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/house_05.png"
                  alt="The Catalyst Center"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">For Sale</div>
                  <div className="bg-white/90 backdrop-blur-sm text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    4.5
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <motion.button
                    initial={{ y: 20 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{t.catalystCenter}</h3>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{t.catalystAddress}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-4">€630,000</div>
                </div>
                <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center gap-1">
                    <Bed className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">4</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Bath className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">2</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Square className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">130</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">m²</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Car className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">1</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{t.parking}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Property Section */}
      <section className="relative w-full bg-white dark:bg-gray-950 pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20 transition-colors duration-300">
        <div className="relative px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl lg:h-[600px]">
                <Image
                  src="/house_02.png"
                  alt="Modern Luxe Villa"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 45vw, 100vw"
                />
              </div>
              {/* Pagination Dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                <div className="w-2 h-2 bg-white dark:bg-gray-300 rounded-full transition-colors duration-300"></div>
                <div className="w-2 h-2 bg-white/50 dark:bg-gray-600 rounded-full transition-colors duration-300"></div>
                <div className="w-2 h-2 bg-white/50 dark:bg-gray-600 rounded-full transition-colors duration-300"></div>
                <div className="w-2 h-2 bg-white/50 dark:bg-gray-600 rounded-full transition-colors duration-300"></div>
                <div className="w-2 h-2 bg-white/50 dark:bg-gray-600 rounded-full transition-colors duration-300"></div>
              </div>
            </motion.div>

            {/* Right Column - Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{t.featured}</span>
              </div>

              {/* Title */}
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight transition-colors duration-300"
              >
                {t.modernVilla}
              </h2>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{t.address}</span>
              </div>

              {/* Description */}
              <p
                className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300"
              >
                {t.description}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Bed className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">4 {t.bedrooms}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bath className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">3 {t.bathrooms}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">{t.parkingSpace}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">2 {t.barAreas}</span>
                </div>
              </div>

              {/* Call to Action and Price */}
              <div className="flex items-center justify-between pt-4">
                <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-full shadow-lg hover:bg-emerald-600 transition-colors duration-300 text-sm sm:text-base">
                  {t.getInTouchCta}
                </button>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">$1,650,500</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">{t.discountedPrice}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative w-full bg-gray-900 pt-16 pb-8">
        <div className="relative px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Brand & CTA */}
            <div className="space-y-8">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-2 border-white rounded-lg flex items-center justify-center">
                  <HomeIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-2xl font-semibold">Homely</span>
              </div>

              {/* Tagline */}
              <div className="space-y-2">
                <p className="text-white text-sm sm:text-base">{t.begin}</p>
                <p className="text-white text-sm sm:text-base">{t.contactUs}</p>
              </div>

              {/* CTA Button */}
              <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-600 transition-colors duration-300 text-sm sm:text-base">
                {t.getInTouchCta}
              </button>

              {/* Social Media Icons */}
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

            {/* Right Column - Newsletter & Navigation */}
            <div className="space-y-8">
              {/* Newsletter Subscription */}
              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <motion.input
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.subscribe}
                    disabled={isSubscribed}
                    className={`flex-1 px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm transition-all duration-300 ${
                      isSubscribed ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    onClick={() => {
                      if (email && !isSubscribed) {
                        setIsSubscribed(true);
                        setTimeout(() => {
                          setIsSubscribed(false);
                          setEmail('');
                        }, 3000);
                      }
                    }}
                    disabled={isSubscribed}
                    className={`relative w-full px-5 py-3 text-white font-semibold rounded-lg sm:w-auto text-sm sm:text-base overflow-hidden transition-all duration-300 ${
                      isSubscribed 
                        ? 'bg-emerald-600 cursor-not-allowed' 
                        : 'bg-emerald-500 hover:bg-emerald-600'
                    }`}
                    whileHover={!isSubscribed ? { scale: 1.05 } : {}}
                    whileTap={!isSubscribed ? { scale: 0.95 } : {}}
                  >
                    {isSubscribed ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <Check className="w-5 h-5" />
                        </motion.div>
                        <span>Subscribed!</span>
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                          className="absolute inset-0 pointer-events-none"
                        >
                          <Sparkles className="w-full h-full text-white opacity-20" />
                        </motion.div>
                      </motion.span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        {t.subscribeButton}
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-3">
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300">{t.luxuryVillas}</a>
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300">{t.residentialHomes}</a>
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300">{t.apartments}</a>
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300">{t.contact}</a>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300">{t.testimonials}</a>
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300">{t.blog}</a>
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300">{t.faqs}</a>
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300">{t.page404}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-white text-sm">
                {t.copyright} <span className="text-emerald-400">{t.developer}</span>
              </div>

              {/* Legal Links */}
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
