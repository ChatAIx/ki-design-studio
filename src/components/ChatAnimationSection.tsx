import { useState, useEffect } from 'react';
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
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      const pauseTimer = setTimeout(() => {
        setIsResetting(true);
      }, 3000);
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
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div 
          className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center transition-opacity duration-500 ${
            isResetting ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Left Column - Bot Messages */}
          <div className="flex flex-col gap-3 items-end md:items-end">
            {botMessages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[280px] px-4 py-3 rounded-2xl rounded-br-md bg-muted text-foreground text-sm shadow-sm transition-all duration-500 ${
                  isBotMessageVisible(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-3'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Center - Image */}
          <div className="flex justify-center order-first md:order-none">
            <img
              src={chatImage}
              alt="Professional workspace"
              className="w-[200px] md:w-[240px] h-auto rounded-xl object-cover shadow-lg"
            />
          </div>

          {/* Right Column - User Messages */}
          <div className="flex flex-col gap-3 items-start md:items-start">
            {userMessages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[280px] px-4 py-3 rounded-2xl rounded-bl-md bg-primary text-primary-foreground text-sm transition-all duration-500 ${
                  isUserMessageVisible(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-3'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatAnimationSection;
