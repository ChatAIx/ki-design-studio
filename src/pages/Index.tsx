import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import WorkSection from '@/components/WorkSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <TestimonialsSection />
      <WorkSection />
      <Footer />
    </div>
  );
};

export default Index;
