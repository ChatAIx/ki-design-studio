import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Preload video
    const video = document.querySelector('video');
    if (video) {
      video.addEventListener('loadeddata', () => setVideoLoaded(true));
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background - NO white overlays */}
      <div className="absolute inset-0 z-0">
        {/* Minimal overlay - only 5% opacity neutral gray for very subtle depth */}
        <div className="absolute inset-0 z-10 bg-neutral-900/5" />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`w-full h-full object-cover transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source
            src="/videos/hero-background.mp4"
            type="video/mp4"
          />
        </video>
        {/* Fallback background when video is loading */}
        <div className={`absolute inset-0 bg-neutral-100 transition-opacity duration-300 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`} />
      </div>

      {/* Content - text styled for readability without white overlay */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 text-center max-w-5xl">
        <h1 
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-neutral-800 animate-fade-up"
          style={{ textShadow: '0 2px 20px rgba(255,255,255,0.8), 0 1px 3px rgba(255,255,255,0.9)' }}
        >
          Mein Firmenname
        </h1>
        
        <div className="w-24 h-px bg-primary mx-auto my-8 animate-line-grow origin-left" />
        
        <p 
          className="text-lg md:text-xl lg:text-2xl font-light text-neutral-700 leading-relaxed animate-fade-up-delay-1 max-w-3xl mx-auto"
          style={{ textShadow: '0 1px 10px rgba(255,255,255,0.9), 0 1px 2px rgba(255,255,255,0.95)' }}
        >
          KI-Chatbots, die Websites strukturieren, Kunden entlasten und Prozesse vereinfachen.
        </p>
        
        <p 
          className="mt-8 text-base md:text-lg text-neutral-600 leading-relaxed animate-fade-up-delay-2 max-w-2xl mx-auto"
          style={{ textShadow: '0 1px 8px rgba(255,255,255,0.9), 0 1px 2px rgba(255,255,255,0.95)' }}
        >
          Ich entwickle KI-gestützte Chatbots, die Unternehmen dabei helfen, ihre Website übersichtlicher zu gestalten, Besucher gezielt zu führen und wiederkehrende Anfragen effizient zu automatisieren.
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-scroll-indicator cursor-pointer group"
        aria-label="Nach unten scrollen"
      >
        <div 
          className="flex flex-col items-center gap-2 text-neutral-600 group-hover:text-primary transition-colors duration-300"
          style={{ textShadow: '0 1px 6px rgba(255,255,255,0.9)' }}
        >
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
