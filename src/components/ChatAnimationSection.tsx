import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import chatImage from '@/assets/chat-demo-background.jpg';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

const botMessages: ChatMessage[] = [
  { sender: 'bot', text: 'Hello! How can I help?' },
  { sender: 'bot', text: 'Please enter your order number.' },
  { sender: 'bot', text: 'Your order will arrive in 1–2 business days 😊' },
];

const userMessages: ChatMessage[] = [
  { sender: 'user', text: 'Where is my order?' },
  { sender: 'user', text: '17456983' },
];

// Animation sequence: bot0, user0, bot1, user1, bot2
const messageSequence = [
  { side: 'bot', index: 0 },
  { side: 'user', index: 0 },
  { side: 'bot', index: 1 },
  { side: 'user', index: 1 },
  { side: 'bot', index: 2 },
];

const ChatAnimationSection = () => {
  const [visibleStep, setVisibleStep] = useState<number>(0);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (isResetting) {
      const resetTimer = setTimeout(() => {
        setVisibleStep(0);
        setIsResetting(false);
      }, 500);
      return () => clearTimeout(resetTimer);
    }

    if (visibleStep < messageSequence.length) {
      const timer = setTimeout(() => {
        setVisibleStep(prev => prev + 1);
      }, 1300);
      return () => clearTimeout(timer);
    } else {
      const pauseTimer = setTimeout(() => {
        setIsResetting(true);
      }, 2500);
      return () => clearTimeout(pauseTimer);
    }
  }, [visibleStep, isResetting]);

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
    <section className="relative py-20 md:py-32">
      {/* Subtle vertical gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            180deg, 
            hsl(var(--background)) 0%, 
            hsl(var(--muted) / 0.25) 30%,
            hsl(var(--muted) / 0.35) 50%,
            hsl(var(--muted) / 0.25) 70%,
            hsl(var(--background)) 100%
          )`
        }}
      />
      
      <div className="container relative mx-auto px-6 lg:px-12 max-w-5xl">
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
            
            {/* Soft overlay for better text readability */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 via-transparent to-black/5" />
            
            {/* Bot Messages - Left Side Overlay */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[55%] md:-translate-x-[60%] flex flex-col gap-3 items-end">
              {botMessages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[200px] md:max-w-[260px] px-5 py-3.5 rounded-2xl rounded-br-sm 
                    bg-white/90 backdrop-blur-md text-foreground 
                    text-sm md:text-base font-medium
                    shadow-lg shadow-black/5
                    transition-all duration-600 ease-out ${
                    isBotMessageVisible(index) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-4'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            
            {/* User Messages - Right Side Overlay */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[55%] md:translate-x-[60%] flex flex-col gap-3 items-start">
              {userMessages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[200px] md:max-w-[260px] px-5 py-3.5 rounded-2xl rounded-bl-sm 
                    bg-primary/95 backdrop-blur-md text-primary-foreground 
                    text-sm md:text-base font-medium
                    shadow-lg shadow-primary/20
                    transition-all duration-600 ease-out ${
                    isUserMessageVisible(index) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-4'
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
