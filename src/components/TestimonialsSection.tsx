import { Star } from 'lucide-react';

const testimonials = [
  {
    rating: 5,
    comment: "Der Chatbot hat unsere Kundenanfragen um 60% reduziert. Absolut beeindruckend!",
    name: "Thomas M.",
    company: "Handwerksbetrieb"
  },
  {
    rating: 5,
    comment: "Endlich haben unsere Besucher sofort die Informationen, die sie brauchen. Sehr professionell umgesetzt.",
    name: "Sandra K.",
    company: "Beratungsagentur"
  },
  {
    rating: 5,
    comment: "Die Integration war unkompliziert und der Support hervorragend. Klare Empfehlung!",
    name: "Michael R.",
    company: "Online-Shop"
  },
  {
    rating: 5,
    comment: "Unsere Website wirkt jetzt viel moderner und unsere Kunden sind begeistert vom schnellen Service.",
    name: "Lisa W.",
    company: "Immobilienbüro"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-4">
            Kundenstimmen
          </h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#111111] border border-primary/20 rounded-lg p-8 hover:border-primary/40 transition-colors duration-300"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-foreground/90 text-base leading-relaxed mb-6 italic">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="border-t border-primary/10 pt-4">
                <p className="text-foreground font-medium">{testimonial.name}</p>
                {testimonial.company && (
                  <p className="text-muted-foreground text-sm">{testimonial.company}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
