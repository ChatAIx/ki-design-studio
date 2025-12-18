import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useInView } from '@/hooks/useInView';
const UeberMich = () => {
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
              Über mich
            </h1>
            
            <div className="w-16 h-px bg-primary mb-12" />
            
            <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
              <p className="text-foreground text-xl md:text-2xl">Mein Name ist ///</p>
              
              <p>Ich bin 17 Jahre alt und absolviere eine Lehre als Plattforminformatiker mit Berufsmaturität (BM) und beschäftige mich intensiv mit modernen KI-Systemen und deren praktischem Einsatz im Web-Umfeld.</p>
              
              <p>
                Mein Fokus liegt auf der sinnvollen Integration von KI-Chatbots in Websites, um Inhalte übersichtlicher darzustellen und die Kommunikation zwischen Unternehmen und Kunden zu vereinfachen.
              </p>
              
              <p>
                Dabei lege ich großen Wert auf klare Strukturen, saubere technische Umsetzung und zuverlässige Lösungen.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default UeberMich;