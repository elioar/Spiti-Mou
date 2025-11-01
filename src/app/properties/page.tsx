"use client";

import Image from "next/image";
import { Home as HomeIcon, Phone, Menu, Mail, X, Moon, Sun, MapPin, ArrowRight, Bed, Bath, Car, Square, Star, Search, SlidersHorizontal, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import enTranslations from "@/translations/en.json";
import esTranslations from "@/translations/es.json";
import frTranslations from "@/translations/fr.json";
import elTranslations from "@/translations/el.json";
import { useTheme } from "@/components/ThemeProvider";

export default function Properties() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es' | 'fr' | 'el'>('en');
  const [mounted, setMounted] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    bedrooms: '',
    bathrooms: '',
    minPrice: '',
    maxPrice: '',
    type: ''
  });

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
                  { label: t.propertiesNav, href: '/properties', active: true },
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
            src="/hero_background5.png"
            alt="All Properties"
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
              <span>{t.properties}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Discover Your Perfect Property
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
              Browse our curated collection of luxury properties in Athens, Greece. From modern apartments to spacious villas, find the home that matches your dreams.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Property Cards Section */}
      <section className="relative w-full bg-white dark:bg-gray-950 pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20 transition-colors duration-300">
        <div className="relative px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%]">
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties by location, name, or address..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-gray-900 dark:text-white transition-all duration-300"
              />
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:w-80 xl:w-96 lg:sticky lg:self-start lg:top-24"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-800 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Filter className="w-5 h-5 text-emerald-600" />
                    Filters
                  </h3>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({ bedrooms: '', bathrooms: '', minPrice: '', maxPrice: '', type: '' });
                    }}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Bedrooms Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Bedrooms
                    </label>
                    <div className="space-y-2">
                      {['All', '1', '2', '3', '4', '5+'].map((bed) => (
                        <button
                          key={bed}
                          onClick={() => setFilters({ ...filters, bedrooms: bed === 'All' ? '' : bed })}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                            filters.bedrooms === (bed === 'All' ? '' : bed)
                              ? 'bg-emerald-500 text-white'
                              : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                          }`}
                        >
                          {bed === 'All' ? 'All Bedrooms' : `${bed} Bedroom${bed !== '1' ? 's' : ''}`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bathrooms Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Bathrooms
                    </label>
                    <div className="space-y-2">
                      {['All', '1', '2', '3+'].map((bath) => (
                        <button
                          key={bath}
                          onClick={() => setFilters({ ...filters, bathrooms: bath === 'All' ? '' : bath })}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                            filters.bathrooms === (bath === 'All' ? '' : bath)
                              ? 'bg-emerald-500 text-white'
                              : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                          }`}
                        >
                          {bath === 'All' ? 'All Bathrooms' : `${bath} Bathroom${bath !== '1' ? 's' : ''}`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Price Range (€)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="number"
                          value={filters.minPrice}
                          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                          placeholder="Min"
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none text-gray-900 dark:text-white transition-all duration-300"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={filters.maxPrice}
                          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                          placeholder="Max"
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none text-gray-900 dark:text-white transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Property Type
                    </label>
                    <div className="space-y-2">
                      {['All', 'Villa', 'Apartment', 'Residence'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setFilters({ ...filters, type: type === 'All' ? '' : type.toLowerCase() })}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                            filters.type === (type === 'All' ? '' : type.toLowerCase())
                              ? 'bg-emerald-500 text-white'
                              : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Property Cards Grid */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
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
                <div className="absolute top-3 left-3 flex gap-2">
                  <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">For Sale</div>
                  <div className="bg-white/90 backdrop-blur-sm text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    4.8
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
          </div>
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
                    <a href="/properties" className="block text-white/80 hover:text-emerald-400 transition-colors duration-300">Properties</a>
                  </div>
                  <div className="space-y-2">
                    <a href="/about" className="block text-white/80 hover:text-emerald-400 transition-colors duration-300">About</a>
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

