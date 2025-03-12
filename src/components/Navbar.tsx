
import { useState, useEffect } from "react";
import { Menu, X, Calendar, Users, User, LogOut, Heart, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isFemale, setIsFemale] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [femaleExperience, setFemaleExperience] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check login status
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username") || "";
    const gender = localStorage.getItem("gender");
    const femaleExp = localStorage.getItem("femaleExperience") === "true";
    const verified = localStorage.getItem("verifiedFemale") === "true";
    
    setIsLoggedIn(loggedInStatus);
    setUsername(storedUsername);
    setIsFemale(gender === "female");
    setFemaleExperience(femaleExp);
    setIsVerified(verified);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("gender");
    localStorage.removeItem("femaleExperience");
    
    setIsLoggedIn(false);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    
    navigate("/login");
  };

  const toggleFemaleExperience = () => {
    const newValue = !femaleExperience;
    localStorage.setItem("femaleExperience", newValue.toString());
    
    toast({
      title: newValue ? "Female Experience Enabled" : "Standard Experience Enabled",
      description: newValue 
        ? "You'll now see content tailored for women travelers" 
        : "You've switched back to the standard experience",
    });
    
    // Reload the page to update the experience
    window.location.reload();
  };

  const navItems = [
    { label: "Events", href: "/events", icon: Calendar },
    { label: "Community", href: "/community", icon: Users },
    { label: "Messages", href: "/messages", icon: MessageSquare },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-cyan-600">Destin</span>
                <span className="text-pink-500">Asian</span>
                <span className="text-cyan-600">.travel</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn && navItems.map((item) => {
              const Icon = item.icon;
              const showVerifiedBadge = item.label === "Profile" && femaleExperience && isFemale && isVerified;
              
              return (
                <div key={item.label} className="relative">
                  <Link
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors 
                      ${femaleExperience 
                        ? 'bg-primary-feminine/30 hover:bg-primary-feminine/50 text-white shadow-md border border-primary-feminine/30' 
                        : 'bg-primary/30 hover:bg-primary/50 text-white shadow-md border border-primary/30'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                  
                  {showVerifiedBadge && (
                    <Badge 
                      className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-pink-500 text-white text-xs"
                      variant="default"
                    >
                      Verified
                    </Badge>
                  )}
                </div>
              );
            })}
            
            {/* Female Experience Toggle for female users */}
            {isLoggedIn && isFemale && (
              <div className="flex items-center">
                <button 
                  onClick={toggleFemaleExperience}
                  className={`female-experience-toggle ${femaleExperience ? 'bg-pink-500' : 'bg-gray-300'}`}
                >
                  <Heart className="w-4 h-4" />
                  {femaleExperience ? "Female Experience" : "Standard Mode"}
                </button>
              </div>
            )}
            
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                className={`flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 border-white/50 text-gray-800 shadow-md`}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Button 
                onClick={() => navigate("/login")} 
                className={`flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-gray-800 shadow-md`}
              >
                <User className="w-4 h-4" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md text-gray-800 hover:bg-white/90 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 animate-fade-in bg-white/90 backdrop-blur-md rounded-lg shadow-lg mt-2">
              {isLoggedIn && navItems.map((item) => {
                const Icon = item.icon;
                const showVerifiedBadge = item.label === "Profile" && femaleExperience && isFemale && isVerified;
                
                return (
                  <div key={item.label} className="relative">
                    <Link
                      to={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md w-full
                        ${femaleExperience 
                          ? 'bg-primary-feminine/30 hover:bg-primary-feminine/50 text-gray-800 shadow-sm border border-primary-feminine/30' 
                          : 'bg-primary/30 hover:bg-primary/50 text-gray-800 shadow-sm border border-primary/30'}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                    
                    {showVerifiedBadge && (
                      <Badge 
                        className="absolute -top-2 right-2 px-1.5 py-0.5 bg-pink-500 text-white text-xs"
                        variant="default"
                      >
                        Verified
                      </Badge>
                    )}
                  </div>
                );
              })}
              
              {/* Female Experience Toggle for mobile */}
              {isLoggedIn && isFemale && (
                <div className="flex items-center px-3 py-2">
                  <button 
                    onClick={toggleFemaleExperience}
                    className={`female-experience-toggle w-full text-center ${femaleExperience ? 'bg-pink-500' : 'bg-gray-300'}`}
                  >
                    <Heart className="w-4 h-4" />
                    {femaleExperience ? "Female Experience" : "Standard Mode"}
                  </button>
                </div>
              )}
              
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 w-full text-left text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
