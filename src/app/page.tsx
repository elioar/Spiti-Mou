import Image from "next/image";
import { Home as HomeIcon, Phone, Menu, Bed, Bath, Car, Dot } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen font-inter relative">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/hero_background.avif"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[5] h-[128px] flex items-center justify-center py-[5px] px-0">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 md:px-12 w-full md:px-5 md:py-5">
          {/* Left side - Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-white rounded-lg flex items-center justify-center">
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-base font-semibold tracking-tight leading-4" style={{fontFamily: '"Geist", "Geist Fallback", sans-serif'}}>Homely</span>
          </div>
          
          {/* Right side - Phone and Menu */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-white" />
              <span className="text-white text-base font-semibold tracking-tight leading-4" style={{fontFamily: '"Geist", "Geist Fallback", sans-serif'}}>+1-212-456-7890</span>
            </div>
            <div className="w-px h-6 bg-white"></div>
            <button className="flex items-center gap-3 bg-white rounded-full px-5 py-2 h-12 hover:bg-gray-100 transition-all duration-200">
              <Menu className="w-4 h-4 text-gray-800" />
              <span className="text-gray-800 text-base font-semibold tracking-tight leading-4" style={{fontFamily: '"Geist", "Geist Fallback", sans-serif'}}>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center px-6 md:px-12 pt-24">
        <div className="w-full max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-8">
            <div className="text-white text-base font-semibold tracking-tight leading-4" style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>Palm Springs, CA</div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block">Futuristic</span>
              <span className="block">Haven</span>
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg" style={{padding: '17px 32px'}}>
                <span className="text-gray-800 text-base font-semibold tracking-tight leading-4" style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif', color: 'rgb(23, 32, 35)'}}>Get in touch</span>
              </button>
              <button className="border border-white px-8 py-4 rounded-full hover:bg-white transition-all duration-200" style={{padding: '17px 32px', backgroundColor: 'rgba(0, 0, 0, 0)'}}>
                <span className="text-white text-base font-semibold tracking-tight leading-4" style={{fontFamily: '"Bricolage Grotesque", "Bricolage Grotesque Placeholder", sans-serif'}}>View Details</span>
              </button>
            </div>
            
            {/* Pagination dots */}
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 border border-white rounded-full"></div>
              <div className="w-2 h-2 border border-white rounded-full"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 right-0 bg-white rounded-t-2xl shadow-2xl w-[90%] h-[156px] flex flex-row items-center justify-start gap-8 px-[45px] py-[45px] z-10 xl:w-[60%] xl:gap-[50px] xl:px-[65px]">
        <div className="flex flex-row items-center w-full">
          {/* Bedrooms */}
          <div className="flex flex-col items-center text-center flex-1">
            <Bed className="w-8 h-8 text-gray-700 mb-2" />
            <span className="text-gray-700 font-medium">4 Bedrooms</span>
          </div>
          
          {/* Divider */}
          <div className="w-px h-12 bg-gray-300"></div>
          
          {/* Bathrooms */}
          <div className="flex flex-col items-center text-center flex-1">
            <Bath className="w-8 h-8 text-gray-700 mb-2" />
            <span className="text-gray-700 font-medium">4 Bathrooms</span>
          </div>
          
          {/* Divider */}
          <div className="w-px h-12 bg-gray-300"></div>
          
          {/* Parking */}
          <div className="flex flex-col items-center text-center flex-1">
            <Car className="w-8 h-8 text-gray-700 mb-2" />
            <span className="text-gray-700 font-medium">Parking space</span>
          </div>
          
          {/* Divider */}
          <div className="w-px h-12 bg-gray-300"></div>
          
          {/* Price */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="text-3xl font-bold text-gray-800">$4,750,000</div>
            <div className="text-sm text-gray-500">For selling price</div>
          </div>
        </div>
      </div>
    </div>
  );
}
