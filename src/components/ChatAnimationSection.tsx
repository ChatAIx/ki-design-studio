import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import chatImage from '@/assets/chat-demo-background.jpg';
interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}
const botMessages: ChatMessage[] = [{
  sender: 'bot',
  text: 'Hallo! Wie kann ich dir helfen?'
}, {
  sender: 'bot',
  text: 'Geht es um eine Bestellung oder eine allgemeine Frage?'
}, {
  sender: 'bot',
  text: 'Bitte gib deine Bestellnummer ein.'
}, {
  sender: 'bot',
  text: 'Danke! Ich prüfe den Status kurz …'
}, {
  sender: 'bot',
  text: 'Deine Bestellung ist unterwegs und kommt in 1–2 Werktagen 😊'
}];
const userMessages: ChatMessage[] = [{
  sender: 'user',
  text: 'Hallo, ich habe eine kurze Frage.'
}, {
  sender: 'user',
  text: 'Ich wollte wissen, wo meine Bestellung bleibt.'
}, {
  sender: 'user',
  text: 'Hier ist meine Bestellnummer:'
}, {
  sender: 'user',
  text: '17456983'
}, {
  sender: 'user',
  text: 'Super, danke für die schnelle Hilfe! ⭐⭐⭐⭐⭐'
}];

// Animation sequence: alternating bot and user messages
const messageSequence = [{
  side: 'bot',
  index: 0
}, {
  side: 'user',
  index: 0
}, {
  side: 'bot',
  index: 1
}, {
  side: 'user',
  index: 1
}, {
  side: 'bot',
  index: 2
}, {
  side: 'user',
  index: 2
}, {
  side: 'bot',
  index: 3
}, {
  side: 'user',
  index: 3
}, {
  side: 'bot',
  index: 4
}, {
  side: 'user',
  index: 4
}];
const ChatAnimationSection = () => {
  const [visibleStep, setVisibleStep] = useState<number>(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for 50% visibility
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.5
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Animation logic - only runs when in view
  useEffect(() => {
    if (!isInView) {
      return;
    }
    if (isResetting) {
      // Fade out duration for chat bubbles, then restart
      const resetTimer = setTimeout(() => {
        setVisibleStep(0);
        setIsResetting(false);
      }, 800);
      return () => clearTimeout(resetTimer);
    }
    if (visibleStep < messageSequence.length) {
      // Slower timing: 1.1-1.4 seconds between messages
      const delay = visibleStep === messageSequence.length - 1 ? 1800 : 1250;
      const timer = setTimeout(() => {
        setVisibleStep(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Wait ~2.5 seconds after final message before fading out
      const pauseTimer = setTimeout(() => {
        setIsResetting(true);
      }, 2500);
      return () => clearTimeout(pauseTimer);
    }
  }, [visibleStep, isResetting, isInView]);

  // Reset animation when leaving view (restarts when scrolling back)
  useEffect(() => {
    if (!isInView) {
      setVisibleStep(0);
      setIsResetting(false);
    }
  }, [isInView]);
  const isBotMessageVisible = (index: number) => {
    if (isResetting) return false;
    const stepIndex = messageSequence.findIndex(s => s.side === 'bot' && s.index === index);
    return visibleStep > stepIndex;
  };
  const isUserMessageVisible = (index: number) => {
    if (isResetting) return false;
    const stepIndex = messageSequence.findIndex(s => s.side === 'user' && s.index === index);
    return visibleStep > stepIndex;
  };
  return <section ref={sectionRef} className="relative pt-16 md:pt-20 pb-20 md:pb-32">
      {/* Seamless gradient continuation from above section */}
      <div className="absolute inset-0 pointer-events-none" style={{
      background: `linear-gradient(
            180deg, 
            hsl(var(--background)) 0%,
            hsl(var(--muted) / 0.08) 15%,
            hsl(var(--muted) / 0.18) 35%,
            hsl(var(--muted) / 0.22) 55%,
            hsl(var(--muted) / 0.15) 80%,
            hsl(var(--background)) 100%
          )`
    }} />
      
      {/* Subtle radial glow behind the image for visual bridge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none" style={{
        background: `radial-gradient(ellipse at center top, hsl(var(--primary) / 0.04) 0%, transparent 70%)`
      }} />
      
      <div className="container relative mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="relative flex justify-center items-center">
          {/* Central Image */}
          <div className="relative">
            <img src={chatImage} alt="Professional workspace" className="w-[280px] md:w-[340px] lg:w-[400px] h-auto rounded-2xl object-cover shadow-xl" />
            
            {/* Soft overlay for better contrast */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 via-transparent to-black/5" />
            
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[80%] md:-translate-x-[85%] flex flex-col gap-6 md:gap-8 items-end pr-2">
              {botMessages.map((message, index) => <div key={index} className={`max-w-[180px] md:max-w-[240px] lg:max-w-[280px] px-4 md:px-5 py-3 md:py-4 rounded-2xl rounded-br-md 
                    bg-white/70 backdrop-blur-[2px] text-foreground/90
                    text-sm md:text-base font-medium
                    shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]
                    border border-white/30
                    transition-all duration-700 ease-out ${isBotMessageVisible(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}>
                  {message.text}
                </div>)}
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[80%] md:translate-x-[85%] flex flex-col gap-6 md:gap-8 items-start pl-2">
              {userMessages.map((message, index) => <div key={index} className={`max-w-[180px] md:max-w-[240px] lg:max-w-[280px] px-4 md:px-5 py-3 md:py-4 rounded-2xl rounded-bl-md 
                    bg-primary/75 backdrop-blur-[2px] text-primary-foreground/95
                    text-sm md:text-base font-medium
                    shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]
                    border border-primary/20
                    transition-all duration-700 ease-out ${isUserMessageVisible(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}`}>
                  {message.text}
                </div>)}
            </div>
          </div>
        </div>

        {/* CTA Link - Below the animated section */}
        <div className="mt-20 md:mt-28 text-center">
          <Link 
            to="/ueber-mich"
            className="inline-flex items-center gap-3 text-primary hover:text-foreground transition-colors duration-300 group"
          >
            <span className="text-lg tracking-wide">Mehr über mich erfahren</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>;
};
export default ChatAnimationSection;