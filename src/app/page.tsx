"use client";

import Image from "next/image";
import { Home as HomeIcon, Phone, Menu, Bed, Bath, Car, Dot, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen font-inter smooth-scroll">
      <div className="relative px-4 sm:px-8 md:px-16 lg:px-[10%] xl:px-[15%]">


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

        {/* Bottom Info Bar */}
        <motion.div
        

  initial={{ y: 100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
  className="
    absolute bottom-0
    left-1/2 -translate-x-1/2 w-full
    sm:left-0 sm:translate-x-0 sm:w-[90%]
    md:w-[85%]
    lg:left-auto lg:right-[60px] lg:translate-x-0 lg:w-[calc(100%-120px)]
    xl:right-[60px] xl:left-auto xl:translate-x-0 xl:w-[calc(100%-120px)]
    bg-white rounded-t-3xl sm:rounded-t-2xl sm:rounded-tr-none
    shadow-2xl h-auto min-h-[130px] sm:min-h-[140px] md:min-h-[156px] z-10
  "
>

        <div className="flex flex-col sm:flex-row items-center justify-center w-full h-full px-5 sm:px-6 md:px-8 lg:px-12 xl:px-[65px] py-6 sm:py-6 md:py-8 lg:py-10 xl:py-[45px]">
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
        

    </div>
  );
}
