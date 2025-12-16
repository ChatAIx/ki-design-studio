import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useInView } from '@/hooks/useInView';
import { Check } from 'lucide-react';

const Leistungen = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const services = [
    'KI-Chatbots für Websites',
    'Strukturierung von Website-Inhalten',
    'Automatisierte Beantwortung häufiger Fragen',
    'Unterstützung bei Lead-Generierung',
    'Individuelle Anpassung an bestehende Systeme',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div 
          ref={ref}
          className="container mx-auto px-6 lg:px-12 max-w-4xl"
        >
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-8">
              Leistungen
            </h1>
            
            <div className="w-16 h-px bg-primary mb-12" />
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-16">
              Ich biete individuelle KI-Chatbot-Lösungen für Unternehmen, die ihre Website optimieren und ihre Kundenkommunikation automatisieren möchten.
            </p>
            
            <ul className="space-y-6">
              {services.map((service, index) => (
                <li 
                  key={index}
                  className={`flex items-center gap-4 text-lg md:text-xl text-foreground transition-all duration-700`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leistungen;
