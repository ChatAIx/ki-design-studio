import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import chatImage from '@/assets/chat-demo-background.jpg';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

const chatSequence: ChatMessage[] = [
  { sender: 'bot', text: 'Hallo! Wie kann ich dir helfen?' },
  { sender: 'user', text: 'Hallo, ich habe eine kurze Frage.' },
  { sender: 'user', text: 'Wo bleibt meine Bestellung?' },
  { sender: 'bot', text: 'Bitte gib deine Bestellnummer ein.' },
  { sender: 'user', text: '17456983' },
  { sender: 'bot', text: 'Deine Bestellung ist unterwegs und kommt in 1–2 Werktagen 😊' },
];

const ChatAnimationSection = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Animation logic
  useEffect(() => {
    if (!isInView) return;

    if (isResetting) {
      const resetTimer = setTimeout(() => {
        setVisibleCount(0);
        setIsResetting(false);
      }, 500);
      return () => clearTimeout(resetTimer);
    }

    if (visibleCount < chatSequence.length) {
      const delay = visibleCount === 0 ? 400 : 500;
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const pauseTimer = setTimeout(() => {
        setIsResetting(true);
      }, 2800);
      return () => clearTimeout(pauseTimer);
    }
  }, [visibleCount, isResetting, isInView]);

  // Reset when leaving view
  useEffect(() => {
    if (!isInView) {
      setVisibleCount(0);
      setIsResetting(false);
    }
  }, [isInView]);

  // Calculate vertical position for each message with proper gaps
  const getMessageStyle = (index: number) => {
    const baseGap = 28;
    const switchGap = 12;
    let offset = 0;
    
    for (let i = 0; i < index; i++) {
      offset += baseGap;
      if (chatSequence[i].sender !== chatSequence[i + 1]?.sender) {
        offset += switchGap;
      }
    }
    
    return { transform: `translateY(${offset}px)` };
  };

  const isMessageVisible = (index: number) => {
    if (isResetting) return false;
    return visibleCount > index;
  };

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32">
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            180deg, 
            hsl(var(--background)) 0%, 
            hsl(var(--muted) / 0.15) 30%,
            hsl(var(--muted) / 0.2) 50%,
            hsl(var(--muted) / 0.15) 70%,
            hsl(var(--background)) 100%
          )`
        }}
      />
      
      <div className="container relative mx-auto px-6 lg:px-12 max-w-6xl">
        {/* Image container with overlapping messages */}
        <div className="relative flex justify-center items-center min-h-[400px] md:min-h-[500px]">
          {/* Static centered image - always visible */}
          <img
            src={chatImage}
            alt="AI Chat Demo"
            className="w-[300px] md:w-[380px] lg:w-[440px] h-auto rounded-2xl object-cover shadow-lg"
          />
          
          {/* Bot Messages - Left, overlapping image */}
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+20px)] md:-translate-x-[calc(100%-30px)] lg:-translate-x-[calc(100%-60px)] flex flex-col items-end">
            {chatSequence
              .map((msg, idx) => ({ msg, idx }))
              .filter(({ msg }) => msg.sender === 'bot')
              .map(({ msg, idx }, displayIdx) => (
                <div
                  key={idx}
                  className={`max-w-[200px] md:max-w-[260px] lg:max-w-[300px] px-5 py-3.5 mb-7
                    rounded-2xl rounded-br-md 
                    bg-white/90 backdrop-blur-sm text-foreground 
                    text-sm md:text-base font-medium
                    shadow-md shadow-black/8
                    border border-white/60
                    transition-all duration-400 ease-out ${
                    isMessageVisible(idx) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-5'
                  }`}
                  style={{ transitionDelay: isMessageVisible(idx) ? '0ms' : '0ms' }}
                >
                  {msg.text}
                </div>
              ))}
          </div>
          
          {/* User Messages - Right, overlapping image */}
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[20px] md:translate-x-[-30px] lg:translate-x-[-60px] flex flex-col items-start">
            {chatSequence
              .map((msg, idx) => ({ msg, idx }))
              .filter(({ msg }) => msg.sender === 'user')
              .map(({ msg, idx }, displayIdx) => (
                <div
                  key={idx}
                  className={`max-w-[200px] md:max-w-[260px] lg:max-w-[300px] px-5 py-3.5 mb-7
                    rounded-2xl rounded-bl-md 
                    bg-primary/90 backdrop-blur-sm text-primary-foreground 
                    text-sm md:text-base font-medium
                    shadow-md shadow-primary/15
                    border border-primary/40
                    transition-all duration-400 ease-out ${
                    isMessageVisible(idx) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-5'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
          </div>
        </div>

        {/* CTA Link */}
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
