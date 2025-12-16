import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link 
            to="/" 
            className="font-serif text-lg text-foreground hover:text-primary transition-colors"
          >
            Mein Firmenname
          </Link>
          
          <div className="flex items-center gap-8">
            <Link to="/leistungen" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Leistungen
            </Link>
            <Link to="/ueber-mich" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Über mich
            </Link>
            <Link to="/kontakt" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Kontakt
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
