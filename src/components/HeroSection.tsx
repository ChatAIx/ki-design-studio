import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background - NO full-screen overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source
            src="/videos/hero-background.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Content with localized backdrop for readability */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 text-center max-w-5xl">
        {/* Subtle localized backdrop behind text only */}
        <div className="absolute inset-0 -mx-8 -my-12 bg-gradient-to-b from-white/60 via-white/70 to-white/60 backdrop-blur-[2px] rounded-3xl" />
        
        <div className="relative">
          <h1 
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-neutral-900 animate-fade-up"
          >
            Mein Firmenname
          </h1>
          
          <div className="w-24 h-px bg-primary mx-auto my-8 animate-line-grow origin-left" />
          
          <p 
            className="text-lg md:text-xl lg:text-2xl font-normal text-neutral-800 leading-relaxed animate-fade-up-delay-1 max-w-3xl mx-auto"
          >
            KI-Chatbots, die Websites strukturieren, Kunden entlasten und Prozesse vereinfachen.
          </p>
          
          <p 
            className="mt-8 text-base md:text-lg text-neutral-600 leading-relaxed animate-fade-up-delay-2 max-w-2xl mx-auto"
          >
            Ich entwickle KI-gestützte Chatbots, die Unternehmen dabei helfen, ihre Website übersichtlicher zu gestalten, Besucher gezielt zu führen und wiederkehrende Anfragen effizient zu automatisieren.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-scroll-indicator cursor-pointer group"
        aria-label="Nach unten scrollen"
      >
        <div className="flex flex-col items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm text-neutral-600 group-hover:text-primary transition-colors duration-300">
          <span className="text-xs tracking-[0.3em] uppercase font-medium">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
