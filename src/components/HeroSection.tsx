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
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />
        {/* Subtle radial gradient for depth */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`w-full h-full object-cover brightness-[0.6] contrast-[0.9] saturate-[0.85] transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source
            src="/videos/hero-background.mp4"
            type="video/mp4"
          />
        </video>
        {/* Fallback background when video is loading */}
        <div className={`absolute inset-0 bg-background transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`} />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 text-center max-w-5xl">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground animate-fade-up">
          Mein Firmenname
        </h1>
        
        <div className="w-24 h-px bg-primary mx-auto my-8 animate-line-grow origin-left" />
        
        <p className="text-lg md:text-xl lg:text-2xl font-light text-foreground/90 leading-relaxed animate-fade-up-delay-1 max-w-3xl mx-auto">
          KI-Chatbots, die Websites strukturieren, Kunden entlasten und Prozesse vereinfachen.
        </p>
        
        <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-up-delay-2 max-w-2xl mx-auto">
          Ich entwickle KI-gestützte Chatbots, die Unternehmen dabei helfen, ihre Website übersichtlicher zu gestalten, Besucher gezielt zu führen und wiederkehrende Anfragen effizient zu automatisieren.
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-scroll-indicator cursor-pointer group"
        aria-label="Nach unten scrollen"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors duration-300">
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
