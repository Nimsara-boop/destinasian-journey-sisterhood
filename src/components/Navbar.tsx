
import { useState, useEffect } from "react";
import { Menu, X, Calendar, Users, User, LogOut, ChevronDown, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          // Get username from user metadata or profile
          const userUsername = session.user.user_metadata?.username || 
                              session.user.email?.split('@')[0] || 
                              'User';
          setUsername(userUsername);
        } else {
          setUsername("");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const userUsername = session.user.user_metadata?.username || 
                            session.user.email?.split('@')[0] || 
                            'User';
        setUsername(userUsername);
      }
    });

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUsername("");
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      navigate("/auth");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };


  const navItems = [
    { label: "Events", href: "/events", icon: Calendar },
    { label: "Tours", href: "/tours", icon: MapPin },
    { label: "Community", href: "/community", icon: Users },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#43342c]/80 backdrop-blur-md shadow-sm" : "bg-transparent"
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
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors bg-primary-feminine/50 hover:bg-primary-feminine/80 text-white shadow-md border border-primary-feminine/30"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 border border-white/50 text-gray-800 shadow-md rounded-full p-1 transition-colors">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg" alt={username} />
                    <AvatarFallback className="bg-primary-feminine text-white text-sm">
                      {username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-md border border-white/20 shadow-lg">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 border border-white/50 text-gray-800 shadow-md rounded-full p-2 transition-colors">
                  <User className="w-6 h-6" />
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-md border border-white/20 shadow-lg">
                  <DropdownMenuItem asChild>
                    <Link to="/auth" className="flex items-center gap-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-md w-full bg-primary-feminine/30 hover:bg-primary-feminine/50 text-gray-800 shadow-sm border border-primary-feminine/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    View Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 w-full text-left text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center gap-2 px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Sign Up
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
