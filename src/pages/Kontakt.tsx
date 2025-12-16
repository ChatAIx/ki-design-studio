import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useInView } from '@/hooks/useInView';
import { Mail } from 'lucide-react';
const Kontakt = () => {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.2
  });
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div ref={ref} className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-8">
              Kontakt
            </h1>
            
            <div className="w-16 h-px bg-primary mb-12" />
            
            <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
              <p>Sie möchten erfahren, wie ein KI-Chatbot Ihre Website übersichtlicher macht und Ihre Kundenkommunikation verbessern kann?</p>
              
              <p>Gerne können wir Ihr Anliegen gemeinsam besprechen.</p>
            </div>
            
            <a href="mailto:kontakt@mein-firmenname.de" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium tracking-wide transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
              <Mail className="w-5 h-5" />
              <span>Kontakt aufnehmen</span>
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Kontakt;