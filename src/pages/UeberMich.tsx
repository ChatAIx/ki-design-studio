import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useInView } from '@/hooks/useInView';

const UeberMich = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-24">
        <div ref={ref} className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium">Über mich</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-16">
              Wer ich bin
            </h1>
            
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <p className="text-foreground text-2xl md:text-3xl font-serif leading-relaxed">
                  Mein Name ist ///
                </p>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Ich bin 17 Jahre alt und absolviere eine Lehre als Plattforminformatiker mit Berufsmaturität (BM) und beschäftige mich intensiv mit modernen KI-Systemen und deren praktischem Einsatz im Web-Umfeld.
                  </p>
                  
                  <p>
                    Mein Fokus liegt auf der sinnvollen Integration von KI-Chatbots in Websites, um Inhalte übersichtlicher darzustellen und die Kommunikation zwischen Unternehmen und Kunden zu vereinfachen.
                  </p>
                  
                  <p>
                    Dabei lege ich grossen Wert auf klare Strukturen, saubere technische Umsetzung und zuverlässige Lösungen.
                  </p>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="card-elevated rounded-lg p-8">
                  <h3 className="font-serif text-xl text-foreground mb-6">Fokus</h3>
                  <ul className="space-y-4">
                    {[
                      'KI-Chatbot-Entwicklung',
                      'Website-Integration',
                      'Automatisierung',
                      'Technische Beratung',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UeberMich;
