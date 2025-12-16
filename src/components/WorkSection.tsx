import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const WorkSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section 
      ref={ref}
      className="py-32 md:py-40 bg-background"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-12">
            Meine Arbeit
          </h2>
          
          <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>
              Meine Arbeit konzentriert sich darauf, Unternehmen dabei zu unterstützen, ihre digitale Kommunikation klarer, strukturierter und effizienter zu gestalten.
            </p>
            
            <p>
              KI-Chatbots helfen Besuchern, schneller die richtigen Informationen zu finden, entlasten Support-Teams und verbessern die Nutzererfahrung auf Websites.
            </p>
            
            <p>
              Statt komplizierter Navigationen schaffen Chatbots Orientierung, beantworten Fragen in Echtzeit und führen potenzielle Kunden gezielt zu den richtigen Inhalten.
            </p>
          </div>
          
          <Link 
            to="/ueber-mich"
            className="inline-flex items-center gap-3 mt-12 text-primary hover:text-foreground transition-colors group"
          >
            <span className="text-lg tracking-wide">Mehr über mich</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
