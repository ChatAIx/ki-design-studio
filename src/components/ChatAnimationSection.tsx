import { useState, useEffect } from 'react';
import chatBackground from '@/assets/chat-demo-background.jpg';

interface ChatMessage {
  sender: 'bot' | 'visitor';
  text: string;
}

const messages: ChatMessage[] = [
  { sender: 'bot', text: 'Hallo, wie kann ich Ihnen helfen?' },
  { sender: 'visitor', text: 'Ich möchte meine Website strukturieren und Anfragen automatisieren.' },
  { sender: 'bot', text: 'Ein Chatbot führt Besucher und beantwortet häufige Fragen automatisch.' },
  { sender: 'visitor', text: 'Ist die Integration kompliziert?' },
  { sender: 'bot', text: 'Nein. Er wird einfach integriert und an Ihre Website angepasst.' },
];

const ChatBubble = ({ 
  message, 
  isVisible 
}: { 
  message: ChatMessage; 
  isVisible: boolean;
}) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div 
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div 
        className={`max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl text-sm md:text-base ${
          isBot 
            ? 'bg-background/95 text-foreground rounded-bl-md shadow-sm' 
            : 'bg-primary/90 text-primary-foreground rounded-br-md'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

const ChatAnimationSection = () => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (isResetting) {
      const resetTimer = setTimeout(() => {
        setVisibleMessages(0);
        setIsResetting(false);
      }, 500);
      return () => clearTimeout(resetTimer);
    }

    if (visibleMessages < messages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Pause at the end, then reset
      const pauseTimer = setTimeout(() => {
        setIsResetting(true);
      }, 3000);
      return () => clearTimeout(pauseTimer);
    }
  }, [visibleMessages, isResetting]);

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image */}
      <img 
        src={chatBackground} 
        alt="Professional working on laptop" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/20 to-background/40" />
      
      {/* Chat Container */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div 
          className={`w-full max-w-md bg-background/10 backdrop-blur-md rounded-2xl border border-white/10 p-4 md:p-6 shadow-2xl transition-opacity duration-500 ${
            isResetting ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Chat Header */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-white/90">KI-Assistent</span>
          </div>
          
          {/* Messages */}
          <div className="flex flex-col gap-3 min-h-[280px] md:min-h-[320px]">
            {messages.map((message, index) => (
              <ChatBubble 
                key={index}
                message={message}
                isVisible={index < visibleMessages && !isResetting}
              />
            ))}
          </div>
          
          {/* Typing Indicator */}
          {visibleMessages < messages.length && !isResetting && (
            <div className="flex items-center gap-1 mt-3 px-4">
              <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatAnimationSection;
