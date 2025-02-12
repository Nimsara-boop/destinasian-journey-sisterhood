
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-semibold">
              DestinAsian
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#destinations" className="text-gray-800 hover:text-primary transition-colors">
              Destinations
            </a>
            <a href="#stories" className="text-gray-800 hover:text-primary transition-colors">
              Stories
            </a>
            <a href="#about" className="text-gray-800 hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-800 hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 animate-fade-in">
              <a
                href="#destinations"
                className="block px-3 py-2 text-gray-800 hover:text-primary transition-colors"
              >
                Destinations
              </a>
              <a
                href="#stories"
                className="block px-3 py-2 text-gray-800 hover:text-primary transition-colors"
              >
                Stories
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-gray-800 hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-800 hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
