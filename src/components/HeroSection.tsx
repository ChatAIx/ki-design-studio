import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  return <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with blur */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover blur-[6px] scale-105">
          <source src="/videos/hero-new.mp4" type="video/mp4" />
        </video>
        
        {/* Soft neutral overlay - not white, not dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-500/25 via-neutral-600/20 to-neutral-700/30" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 text-center max-w-5xl">
        <div className="animate-fade-up text-center">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white" style={{
          textShadow: '0 2px 30px rgba(0,0,0,0.5), 0 4px 60px rgba(0,0,0,0.3)'
        }}>
            InnovaOne
          </h1>
          <p className="font-sans text-lg md:text-2xl lg:text-3xl font-medium tracking-[0.35em] text-neutral-200 mt-2" style={{
          textShadow: '0 2px 20px rgba(0,0,0,0.5)'
        }}>
            INTELLIGENCE
          </p>
        </div>
        
        <div className="w-24 h-px bg-white/80 mx-auto my-8 animate-line-grow origin-left" />
        
        <p className="text-lg md:text-xl lg:text-2xl font-medium text-white leading-relaxed animate-fade-up-delay-1 max-w-3xl mx-auto" style={{
        textShadow: '0 2px 20px rgba(0,0,0,0.4), 0 4px 40px rgba(0,0,0,0.2)'
      }}>KI-Chatbots, die eine Website strukturieren, Kunden entlasten und Prozesse vereinfachen.</p>
        
        <p className="mt-8 text-base md:text-lg text-white/95 leading-relaxed animate-fade-up-delay-2 max-w-2xl mx-auto" style={{
        textShadow: '0 1px 15px rgba(0,0,0,0.35)'
      }}>
          Ich entwickle KI-gestützte Chatbots, die Unternehmen dabei helfen, ihre Website übersichtlicher zu gestalten, Besucher gezielt zu führen und wiederkehrende Anfragen effizient zu automatisieren.
        </p>
      </div>

      {/* Scroll Indicator */}
      <button onClick={scrollToContent} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-scroll-indicator cursor-pointer group" aria-label="Nach unten scrollen">
        <div className="flex flex-col items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 group-hover:bg-white/20 transition-colors duration-300">
          <span className="text-xs tracking-[0.3em] uppercase font-medium">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
    </section>;
};
export default HeroSection;