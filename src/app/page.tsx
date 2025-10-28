"use client";

import Image from "next/image";
import { Home as HomeIcon, Phone, Menu, Bed, Bath, Car, Dot, ArrowRight, Mail, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import enTranslations from "@/translations/en.json";
import esTranslations from "@/translations/es.json";
import frTranslations from "@/translations/fr.json";
import elTranslations from "@/translations/el.json";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es' | 'fr' | 'el'>('en');

  // Translations
  const translations = {
    en: enTranslations,
    es: esTranslations,
    fr: frTranslations,
    el: elTranslations,
  };

  const t = translations[language];

  useEffect(() => {
    // Enhanced smooth scrolling with custom easing
    const smoothScrollTo = (target: number, duration: number = 1000) => {
      const start = window.pageYOffset;
      const distance = target - start;
      let startTime: number;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animation = (currentTime: number) => {
        if (startTime === undefined) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, start + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    // Add smooth scroll to window
    (window as any).smoothScrollTo = smoothScrollTo;

    // Enhanced scroll event with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen font-inter smooth-scroll">
      <div className="relative px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%]">


      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-[9999] h-20 sm:h-24 md:h-28 lg:h-32 flex items-center justify-center py-2 sm:py-3 md:py-4"
      >
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%]">
          <div className={`flex items-center justify-between max-w-none mx-auto w-full transition-all duration-300 ${
            isScrolled ? 'bg-white shadow-lg rounded-2xl px-6 py-4' : ''
          }`}>
          {/* Left side - Logo */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 sm:gap-3 md:gap-4"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                isScrolled ? 'border-black' : 'border-white'
              }`}
            >
              <HomeIcon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              }`} />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              style={{
                fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                letterSpacing: '0px',
                lineHeight: '22px',
                fontFeatureSettings: 'normal',
                fontStyle: 'normal'
              }}
            >
              Homely
            </motion.span>
          </motion.div>
          
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
              <Phone className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              }`} />
              <span className={`text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              }`} style={{
                fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                letterSpacing: '0px',
                lineHeight: '22px',
                fontFeatureSettings: 'normal',
                fontStyle: 'normal'
              }}>+1-212-456-7890</span>
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`hidden sm:block w-px h-6 md:h-8 transition-colors duration-300 ${
                isScrolled ? 'bg-gray-400' : 'bg-white'
              }`}
            ></motion.div>
            
            {/* Language Selector */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative mr-3 sm:mr-4"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const languages: ('en' | 'es' | 'fr' | 'el')[] = ['en', 'es', 'fr', 'el'];
                  const currentIndex = languages.indexOf(language);
                  setLanguage(languages[(currentIndex + 1) % languages.length]);
                }}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                  isScrolled ? 'border-gray-800 hover:border-black' : 'border-white/20 hover:border-white/40'
                }`}
              >
                <span className="text-2xl">
                  {language === 'en' ? '🇺🇸' : language === 'es' ? '🇪🇸' : language === 'fr' ? '🇫🇷' : '🇬🇷'}
                </span>
              </motion.button>
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(true)}
              className={`btn-menu flex items-center gap-2 sm:gap-3 md:gap-4 rounded-full px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 h-10 sm:h-12 md:h-14 lg:h-16 transition-colors duration-300 ${
                isScrolled ? 'bg-gray-200' : 'bg-white'
              }`}
            >
              <Menu className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-gray-800'
              }`} />
              <span className={`text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-gray-800'
              }`} style={{
                fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                fontWeight: 700,
                fontSize: '16px',
                letterSpacing: '0px',
                lineHeight: '22px',
                fontFeatureSettings: 'normal',
                fontStyle: 'normal'
              }}>Menu</span>
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
                  <span className="text-white text-4xl font-semibold" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 400
                  }}>Homely</span>
                </div>
              </motion.div>

              {/* Menu Links */}
              <div className="space-y-6">
                {t.menuItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className="block text-white text-5xl font-bold hover:text-emerald-400 transition-colors duration-300 group"
                    style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                      fontWeight: 700
                    }}
                  >
                    <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">{item}</span>
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
                  <span className="text-lg" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 400
                  }}>+1-212-456-7890</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-white/80">
                  <Mail className="w-5 h-5" />
                  <span className="text-lg" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 400
                  }}>hello@homely.com</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center pt-6 sm:pt-10 md:pt-14 lg:pt-18">
        {/* Background Image - Desktop */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 left-0 right-0 w-screen h-full hidden sm:block -z-10"
          style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
        >
          <Image
            src="/hero_background.avif"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Background Image - Mobile */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 left-0 right-0 w-screen h-full block sm:hidden -z-10"
          style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
        >
          <Image
            src="/hero_background_mobile.avif"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="w-full max-w-none mx-auto relative z-10">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight" 
              style={{
                fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                fontWeight: 600,
                letterSpacing: '-0.5px',
                lineHeight: '1.2'
              }}
            >
              {t.location}
            </motion.div>
            
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="font-bold text-white leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-[85px] xl:text-[85px]" 
              style={{
                fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                fontWeight: 600,
                letterSpacing: '-4px',
                lineHeight: '85px',
                fontSize: '85px',
                fontFeatureSettings: 'normal'
              }}
            >
              {language === 'en' ? (
                <>
                  <motion.span 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="block"
                  >
                    Futuristic
                  </motion.span>
                  <motion.span 
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="block"
                  >
                    Haven
                  </motion.span>
                </>
              ) : (
                <motion.span 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  {t.title}
                </motion.span>
              )}
            </motion.h1>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6"
            >
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="btn-primary bg-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 rounded-full shadow-lg"
              >
                <span className="text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight" style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif', color: 'rgb(23, 32, 35)'}}>{t.getInTouch}</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="btn-secondary border border-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 rounded-full"
              >
                <span className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight" style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>{t.viewDetails}</span>
              </motion.button>
            </motion.div>
            
          </div>
        </div>

        {/* Bottom Info Bar */}
        <motion.div
        

  initial={{ y: 100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
        className="absolute bottom-6 left-0 right-0 z-10"
      >
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%]">
          <div className="bg-white rounded-3xl shadow-2xl">

        <div className="flex flex-col sm:flex-row items-center justify-center w-full h-full px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10">
          {/* Mobile Layout - 2x2 Grid */}
          <div className="flex flex-col sm:hidden w-full gap-4">
            {/* First Row */}
            <div className="flex justify-between items-center gap-2">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center flex-1"
              >
                <Bed className="w-6 h-6 text-gray-700 mb-2" />
                <span className="text-gray-700 font-medium text-sm" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 500,
                  letterSpacing: '-0.25px'
                }}>4 Bedrooms</span>
              </motion.div>
              <div className="w-px h-10 bg-gray-300"></div>
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center flex-1"
              >
                <Bath className="w-6 h-6 text-gray-700 mb-2" />
                <span className="text-gray-700 font-medium text-sm" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 500,
                  letterSpacing: '-0.25px'
                }}>4 Bathrooms</span>
              </motion.div>
            </div>
            
            {/* Second Row */}
            <div className="flex justify-between items-center gap-2">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.2 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center flex-1"
              >
                <Car className="w-6 h-6 text-gray-700 mb-2" />
                <span className="text-gray-700 font-medium text-sm" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 500,
                  letterSpacing: '-0.25px'
                }}>Parking</span>
              </motion.div>
              <div className="w-px h-10 bg-gray-300"></div>
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.3 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center flex-1"
              >
                <div className="text-lg font-bold text-gray-800 mb-1" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '-0.5px'
                }}>$4,750,000</div>
                <div className="text-xs text-gray-500" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 400,
                  letterSpacing: '-0.25px'
                }}>For selling</div>
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden sm:flex flex-row items-center w-full gap-6 md:gap-8 lg:gap-10 xl:gap-[50px]">
            {/* Bedrooms */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.0 }}
              className="flex flex-col items-center text-center flex-1"
            >
              <Bed className="w-7 h-7 md:w-8 md:h-8 text-gray-700 mb-2" />
              <span className="text-gray-700 font-medium text-base md:text-lg" style={{
                fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                fontWeight: 500,
                letterSpacing: '-0.5px'
              }}>4 Bedrooms</span>
            </motion.div>
            
            {/* Divider */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 2.1 }}
              className="w-px h-8 md:h-10 lg:h-12 bg-gray-300"
            ></motion.div>
            
            {/* Bathrooms */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="flex flex-col items-center text-center flex-1"
            >
              <Bath className="w-7 h-7 md:w-8 md:h-8 text-gray-700 mb-2" />
              <span className="text-gray-700 font-medium text-base md:text-lg" style={{
                fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                fontWeight: 500,
                letterSpacing: '-0.5px'
              }}>4 Bathrooms</span>
            </motion.div>
            
            {/* Divider */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 2.3 }}
              className="w-px h-8 md:h-10 lg:h-12 bg-gray-300"
            ></motion.div>
            
            {/* Parking */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.4 }}
              className="flex flex-col items-center text-center flex-1"
            >
              <Car className="w-7 h-7 md:w-8 md:h-8 text-gray-700 mb-2" />
              <span className="text-gray-700 font-medium text-base md:text-lg" style={{
                fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                fontWeight: 500,
                letterSpacing: '-0.5px'
              }}>Parking space</span>
            </motion.div>
            
            {/* Divider */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="w-px h-8 md:h-10 lg:h-12 bg-gray-300"
            ></motion.div>
            
            {/* Price */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.6 }}
              className="flex flex-col items-center text-center flex-1"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 2.7 }}
                className="text-2xl md:text-3xl font-bold text-gray-800" 
                style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '-1px'
                }}
              >
                $4,750,000
              </motion.div>
              <div className="text-sm text-gray-500" style={{
                fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                fontWeight: 400,
                letterSpacing: '-0.25px'
              }}>For selling price</div>
            </motion.div>
          </div>
          </div>
        </div>
        </div>
      </motion.div>
      </main>
      </div>

      {/* Properties Section */}
<section className="relative w-full bg-white pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-24 overflow-hidden z-20">
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
          <span>Categories</span>
        </div>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
          style={{
            fontFamily:
              '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
            lineHeight: "1.2",
            letterSpacing: "-1px",
          }}
        >
          Explore best properties <br className="hidden sm:block" /> with expert
          services.
        </h2>

        <p
          className="text-base sm:text-lg text-gray-600 max-w-md"
          style={{
            fontFamily:
              '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
            lineHeight: "1.6",
          }}
        >
          Discover a diverse range of premium properties, from luxurious
          apartments to spacious villas, tailored to your needs.
        </p>

        <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-full shadow hover:bg-emerald-600 transition">
          View Properties
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
        <img
          src="/house_01.avif"
          alt="Modern Houses"
          className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover rounded-2xl"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-between p-6" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)'
        }}>
          {/* Top Right Button */}
          <div className="flex justify-end">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-6 h-6 text-black" />
            </div>
          </div>
          {/* Bottom Left Text */}
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-2" style={{
              fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
              fontWeight: 700
            }}>Luxury Villas</h3>
            <p className="text-sm opacity-90" style={{
              fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
              fontWeight: 400
            }}>Discover our curated collection of exceptional properties designed for modern living.</p>
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
        <img
          src="/house_01.avif"
          alt="Modern Villa"
          className="w-full h-[200px] sm:h-[230px] lg:h-[250px] object-cover rounded-2xl"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-between p-6" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)'
        }}>
          {/* Top Right Button */}
          <div className="flex justify-end">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-6 h-6 text-black" />
            </div>
          </div>
          {/* Bottom Left Text */}
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-2" style={{
              fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
              fontWeight: 700
            }}>Office Spaces</h3>
            <p className="text-sm opacity-90" style={{
              fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
              fontWeight: 400
            }}>Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.</p>
          </div>
        </div>
      </div>

      {/* Second Image */}
      <div className="sm:col-span-1 group relative cursor-pointer">
        <img
          src="/house_01.avif"
          alt="Apartment Building"
          className="w-full h-[200px] sm:h-[230px] lg:h-[250px] object-cover rounded-2xl"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-between p-6" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)'
        }}>
          {/* Top Right Button */}
          <div className="flex justify-end">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-6 h-6 text-black" />
            </div>
          </div>
          {/* Bottom Left Text */}
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-2" style={{
              fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
              fontWeight: 700
            }}>Apartments</h3>
            <p className="text-sm opacity-90" style={{
              fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
              fontWeight: 400
            }}>Discover contemporary urban living spaces with stunning views and premium amenities.</p>
          </div>
        </div>
      </div>

      {/* Third Image */}
      <div className="sm:col-span-1 group relative cursor-pointer">
        <img
          src="/house_01.avif"
          alt="Interior Office"
          className="w-full h-[200px] sm:h-[230px] lg:h-[250px] object-cover rounded-2xl"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-between p-6" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)'
        }}>
          {/* Top Right Button */}
          <div className="flex justify-end">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-6 h-6 text-black" />
            </div>
          </div>
          {/* Bottom Left Text */}
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-2" style={{
              fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
              fontWeight: 700
            }}>Residential Homes</h3>
            <p className="text-sm opacity-90" style={{
              fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
              fontWeight: 400
            }}>Sophisticated interiors and innovative design come together in our premium living spaces.</p>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>

      {/* Third Section - Property Cards */}
      <section className="relative w-full bg-white pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-24">
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
              <span>Properties</span>
            </div>
            
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{
                fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                lineHeight: "1.2",
                letterSpacing: "-1px",
              }}
            >
              Discover inspiring designed homes.
            </h2>
            
            <p
              className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
              style={{
                fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                lineHeight: "1.6",
              }}
            >
              Curated homes where elegance, style, and comfort unite.
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
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[500px] flex flex-col"
            >
              <img
                src="/house_01.avif"
                alt="Serenity height villas"
                className="w-full h-[320px] object-cover rounded-t-2xl"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2" style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                      fontWeight: 700
                    }}>Serenity height villas</h3>
                    <p className="text-sm text-gray-500" style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                      fontWeight: 400
                    }}>15 S Aurora Ave, Miami</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 600
                  }}>$570,000</div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>4 Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>3 Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Dot className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>120m²</span>
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
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[500px] flex flex-col"
            >
              <img
                src="/house_01.avif"
                alt="Mountain Retreat Villa"
                className="w-full h-[320px] object-cover rounded-t-2xl"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2" style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                      fontWeight: 700
                    }}>Mountain Retreat Villa</h3>
                    <p className="text-sm text-gray-500" style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                      fontWeight: 400
                    }}>18 S Aurora Ave, Miami</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 600
                  }}>$575,000</div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>5 Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>2 Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Dot className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>150m²</span>
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
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[500px] flex flex-col"
            >
              <img
                src="/house_01.avif"
                alt="Vista Grand"
                className="w-full h-[320px] object-cover rounded-t-2xl"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2" style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                      fontWeight: 700
                    }}>Vista Grand</h3>
                    <p className="text-sm text-gray-500" style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                      fontWeight: 400
                    }}>Modern Luxe Villa</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 600
                  }}>$580,000</div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>3 Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>4 Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Dot className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>180m²</span>
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
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[500px] flex flex-col"
            >
              <img
                src="/house_01.avif"
                alt="Maplewood Residence"
                className="w-full h-[320px] object-cover rounded-t-2xl"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2" style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                      fontWeight: 700
                    }}>Maplewood Residence</h3>
                    <p className="text-sm text-gray-500" style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                      fontWeight: 400
                    }}>12 Emerald Heights, Los Angeles</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 600
                  }}>$590,000</div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>6 Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>3 Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Dot className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>200m²</span>
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
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[500px] flex flex-col"
            >
              <img
                src="/house_01.avif"
                alt="Whispering Pines"
                className="w-full h-[320px] object-cover rounded-t-2xl"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2" style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                      fontWeight: 700
                    }}>Whispering Pines</h3>
                    <p className="text-sm text-gray-500" style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                      fontWeight: 400
                    }}>25 Skyline Boulevard, San Diego</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 600
                  }}>$710,000</div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>2 Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>1 Bathroom</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Dot className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>90m²</span>
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
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[500px] flex flex-col"
            >
              <img
                src="/house_01.avif"
                alt="The Catalyst Center"
                className="w-full h-[320px] object-cover rounded-t-2xl"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2" style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                      fontWeight: 700
                    }}>The Catalyst Center</h3>
                    <p className="text-sm text-gray-500" style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                      fontWeight: 400
                    }}>18 Sapphire Bay Road, Naples</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 600
                  }}>$630,000</div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>4 Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>2 Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Dot className="w-4 h-4" />
                    <span style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>130m²</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Property Section */}
      <section className="relative w-full bg-white pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-24">
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
              <img
                src="/house_01.avif"
                alt="Modern Luxe Villa"
                className="w-full h-[500px] lg:h-[600px] object-cover rounded-2xl"
              />
              {/* Pagination Dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
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
                <span>Featured property</span>
              </div>

              {/* Title */}
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
                style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  lineHeight: "1.2",
                  letterSpacing: "-1px",
                }}
              >
                Modern Luxe Villa
              </h2>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 400
                }}>20 S Aurora Ave, Miami</span>
              </div>

              {/* Description */}
              <p
                className="text-base sm:text-lg text-gray-600 leading-relaxed"
                style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  lineHeight: "1.6",
                }}
              >
                Experience luxury living at Modern Luxe Villa, located at 20 S Aurora Ave, Miami. Priced at $1,650,500, this 560 ft² smart home offers 4 bedrooms, 3 bathrooms, and spacious living areas. Enjoy energy efficiency, natural light, security systems, outdoor spaces, and 2 bar areas—perfect for 8+ guests. Built in 2025.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Bed className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 500
                  }}>4 Bedrooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bath className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 500
                  }}>3 Bathrooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 500
                  }}>Parking Space</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 font-medium" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 500
                  }}>2 Bar areas</span>
                </div>
              </div>

              {/* Call to Action and Price */}
              <div className="flex items-center justify-between pt-4">
                <button className="px-8 py-4 bg-emerald-500 text-white font-semibold rounded-full shadow-lg hover:bg-emerald-600 transition-colors duration-300" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 600
                }}>
                  Get in touch
                </button>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 700
                  }}>$1,650,500</div>
                  <div className="text-sm text-gray-500" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 400
                  }}>Discounted Price</div>
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
                <span className="text-white text-2xl font-semibold" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 400
                }}>Homely</span>
              </div>

              {/* Tagline */}
              <div className="space-y-2">
                <p className="text-white text-lg" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 400
                }}>Begin your path to success</p>
                <p className="text-white text-lg" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 400
                }}>contact us today.</p>
              </div>

              {/* CTA Button */}
              <button className="px-8 py-4 bg-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-600 transition-colors duration-300" style={{
                fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                fontWeight: 600
              }}>
                Get in touch
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
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email to subscribe"
                    className="flex-1 px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none"
                    style={{
                      fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'
                    }}
                  />
                  <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors duration-300" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 600
                  }}>
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-3">
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 400
                  }}>Luxury Villas</a>
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 400
                  }}>Residential Homes</a>
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 400
                  }}>Apartments</a>
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 400
                  }}>Contact Us</a>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 400
                  }}>Testimonials</a>
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 400
                  }}>Blog</a>
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 400
                  }}>FAQs</a>
                  <a href="#" className="block text-white hover:text-emerald-400 transition-colors duration-300" style={{
                    fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                    fontWeight: 400
                  }}>404 Page</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-white text-sm" style={{
                fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                fontWeight: 400
              }}>
                ©2025 Homely - Design & Developed by <span className="text-emerald-400">Elio Dev</span>
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-4">
                <a href="#" className="text-white hover:text-emerald-400 transition-colors duration-300 text-sm" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 400
                }}>Terms of service</a>
                <a href="#" className="text-white hover:text-emerald-400 transition-colors duration-300 text-sm" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 400
                }}>Privacy policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
