import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        {/* Black overlay with 65% opacity */}
        <div className="absolute inset-0 bg-black/65 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%230a0a0a' width='1' height='1'/%3E%3C/svg%3E"
          className="w-full h-full object-cover blur-[2px] contrast-[0.85] saturate-[0.8]"
        >
          <source
            src="/videos/hero-background.mp4"
            type="video/mp4"
          />
        </video>
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
        <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
