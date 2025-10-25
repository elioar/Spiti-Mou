"use client";

import Image from "next/image";
import { Home as HomeIcon, Phone, Menu, Bed, Bath, Car, Dot } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
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
          // Add any scroll-based animations here if needed
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen font-inter relative px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%] smooth-scroll"
    >
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/hero_background.avif"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>


      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[5] h-20 sm:h-24 md:h-28 lg:h-32 flex items-center justify-center py-2 sm:py-3 md:py-4 px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%]"
      >
        <div className="flex items-center justify-between max-w-none mx-auto w-full">
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
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-white rounded-lg flex items-center justify-center"
            >
              <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight" 
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
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              <span className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight" style={{
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
              className="hidden sm:block w-px h-6 md:h-8 bg-white"
            ></motion.div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="btn-menu flex items-center gap-2 sm:gap-3 md:gap-4 bg-white rounded-full px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 h-10 sm:h-12 md:h-14 lg:h-16"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
              <span className="text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight" style={{
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
      </motion.header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <div className="w-full max-w-none mx-auto">
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
              Palm Springs, CA
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
                <span className="text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight" style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif', color: 'rgb(23, 32, 35)'}}>Get in touch</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="btn-secondary border border-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 rounded-full"
              >
                <span className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight" style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>View Details</span>
              </motion.button>
            </motion.div>
            
            {/* Pagination dots */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex gap-2 sm:gap-3"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 1.6 }}
                className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"
              ></motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 1.7 }}
                className="w-2 h-2 sm:w-3 sm:h-3 border border-white rounded-full"
              ></motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 1.8 }}
                className="w-2 h-2 sm:w-3 sm:h-3 border border-white rounded-full"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Bottom Info Bar */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
        className="absolute bottom-0 right-0 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white rounded-t-xl sm:rounded-t-2xl shadow-2xl h-auto min-h-[100px] sm:min-h-[140px] md:min-h-[156px] z-10"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center w-full h-full px-3 sm:px-6 md:px-8 lg:px-12 xl:px-[65px] py-4 sm:py-6 md:py-8 lg:py-10 xl:py-[45px]">
          {/* Mobile Layout - 2x2 Grid */}
          <div className="flex flex-col sm:hidden w-full gap-3">
            {/* First Row */}
            <div className="flex justify-between items-center">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center flex-1"
              >
                <Bed className="w-5 h-5 text-gray-700 mb-1" />
                <span className="text-gray-700 font-medium text-xs" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 500,
                  letterSpacing: '-0.25px'
                }}>4 Bedrooms</span>
              </motion.div>
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center flex-1"
              >
                <Bath className="w-5 h-5 text-gray-700 mb-1" />
                <span className="text-gray-700 font-medium text-xs" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 500,
                  letterSpacing: '-0.25px'
                }}>4 Bathrooms</span>
              </motion.div>
            </div>
            
            {/* Second Row */}
            <div className="flex justify-between items-center">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.2 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center flex-1"
              >
                <Car className="w-5 h-5 text-gray-700 mb-1" />
                <span className="text-gray-700 font-medium text-xs" style={{
                  fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif',
                  fontWeight: 500,
                  letterSpacing: '-0.25px'
                }}>Parking</span>
              </motion.div>
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.3 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center flex-1"
              >
                <div className="text-base font-bold text-gray-800 mb-0.5" style={{
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
      </motion.div>
    </motion.div>
  );
}
