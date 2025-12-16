import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navItems = [{
    path: '/',
    label: 'Startseite'
  }, {
    path: '/leistungen',
    label: 'Leistungen'
  }, {
    path: '/ueber-mich',
    label: 'Über mich'
  }, {
    path: '/kontakt',
    label: 'Kontakt'
  }];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="font-serif text-xl tracking-wide text-foreground hover:text-primary transition-colors">
            Mein Firmenname
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map(item => <Link key={item.path} to={item.path} className={`relative text-sm tracking-widest uppercase transition-colors duration-300 ${location.pathname === item.path ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                {item.label}
                {location.pathname === item.path && <span className="absolute -bottom-1 left-0 w-full h-px bg-primary" />}
              </Link>)}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>;
};
export default Navigation;