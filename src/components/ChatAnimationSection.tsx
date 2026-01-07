import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import chatImage from '@/assets/chat-demo-background.jpg';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

const botMessages: ChatMessage[] = [
  { sender: 'bot', text: 'Hallo! Wie kann ich dir helfen?' },
  { sender: 'bot', text: 'Geht es um eine Bestellung oder eine allgemeine Frage?' },
  { sender: 'bot', text: 'Bitte gib deine Bestellnummer ein.' },
  { sender: 'bot', text: 'Danke! Ich prüfe den Status kurz …' },
  { sender: 'bot', text: 'Deine Bestellung ist unterwegs und kommt in 1–2 Werktagen 😊' },
];

const userMessages: ChatMessage[] = [
  { sender: 'user', text: 'Hallo, ich habe eine kurze Frage.' },
  { sender: 'user', text: 'Ich wollte wissen, wo meine Bestellung bleibt.' },
  { sender: 'user', text: 'Hier ist meine Bestellnummer:' },
  { sender: 'user', text: '17456983' },
  { sender: 'user', text: 'Super, danke für die schnelle Hilfe! ⭐⭐⭐⭐⭐' },
];

// Animation sequence: alternating bot and user messages
const messageSequence = [
  { side: 'bot', index: 0 },
  { side: 'user', index: 0 },
  { side: 'bot', index: 1 },
  { side: 'user', index: 1 },
  { side: 'bot', index: 2 },
  { side: 'user', index: 2 },
  { side: 'bot', index: 3 },
  { side: 'user', index: 3 },
  { side: 'bot', index: 4 },
  { side: 'user', index: 4 },
];

const ChatAnimationSection = () => {
  const [visibleStep, setVisibleStep] = useState<number>(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for 50% visibility
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Animation logic - only runs when in view
  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (isResetting) {
      const resetTimer = setTimeout(() => {
        setVisibleStep(0);
        setIsResetting(false);
      }, 600);
      return () => clearTimeout(resetTimer);
    }

    if (visibleStep < messageSequence.length) {
      const timer = setTimeout(() => {
        setVisibleStep(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      const pauseTimer = setTimeout(() => {
        setIsResetting(true);
      }, 3000);
      return () => clearTimeout(pauseTimer);
    }
  }, [visibleStep, isResetting, isInView]);

  // Reset animation when leaving view
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

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32">
      {/* Subtle vertical gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            180deg, 
            hsl(var(--background)) 0%, 
            hsl(var(--muted) / 0.2) 25%,
            hsl(var(--muted) / 0.3) 50%,
            hsl(var(--muted) / 0.2) 75%,
            hsl(var(--background)) 100%
          )`
        }}
      />
      
      <div className="container relative mx-auto px-6 lg:px-12 max-w-6xl">
        <div 
          className={`relative flex justify-center items-center transition-opacity duration-500 ${
            isResetting ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Central Image */}
          <div className="relative">
            <img
              src={chatImage}
              alt="Professional workspace"
              className="w-[280px] md:w-[340px] lg:w-[400px] h-auto rounded-2xl object-cover shadow-xl"
            />
            
            {/* Soft overlay for better contrast */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 via-transparent to-black/5" />
            
            {/* Bot Messages - Left Side with 10-20% Overlap */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[80%] md:-translate-x-[85%] flex flex-col gap-6 md:gap-8 items-end pr-2">
              {botMessages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[180px] md:max-w-[240px] lg:max-w-[280px] px-4 md:px-5 py-3 md:py-4 rounded-2xl rounded-br-md 
                    bg-white/85 backdrop-blur-sm text-foreground 
                    text-sm md:text-base font-medium
                    shadow-md shadow-black/5
                    border border-white/50
                    transition-all duration-500 ease-out ${
                    isBotMessageVisible(index) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-6'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            
            {/* User Messages - Right Side with 10-20% Overlap */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[80%] md:translate-x-[85%] flex flex-col gap-6 md:gap-8 items-start pl-2">
              {userMessages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[180px] md:max-w-[240px] lg:max-w-[280px] px-4 md:px-5 py-3 md:py-4 rounded-2xl rounded-bl-md 
                    bg-primary/90 backdrop-blur-sm text-primary-foreground 
                    text-sm md:text-base font-medium
                    shadow-md shadow-primary/15
                    border border-primary/30
                    transition-all duration-500 ease-out ${
                    isUserMessageVisible(index) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-6'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Link - Below the animated section */}
        <div className="mt-16 md:mt-20 text-center">
          <Link 
            to="/ueber-mich" 
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Mehr über mich erfahren
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChatAnimationSection;
