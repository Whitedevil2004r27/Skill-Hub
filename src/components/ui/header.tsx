import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, GraduationCap, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  return (
    <header className="fixed top-0 w-full glass border-b border-white/10 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SkillHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/explore" className="text-white/80 hover:text-white transition-colors">
              Find Mentors
            </Link>
            <Link to="/courses" className="text-white/80 hover:text-white transition-colors">
              Courses
            </Link>
            <Link to="/community" className="text-white/80 hover:text-white transition-colors">
              Community
            </Link>
            <Link to="/about" className="text-white/80 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-gradient-primary text-white text-xs">
                      {(profile?.display_name || user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-white/90">
                    {profile?.display_name || user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                <Link to="/dashboard">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-xs">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={() => signOut()}
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-primary text-white shadow-purple-glow hover-glow">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/explore" className="text-white/80 hover:text-white transition-colors">
                Find Mentors
              </Link>
              <Link to="/courses" className="text-white/80 hover:text-white transition-colors">
                Courses
              </Link>
              <Link to="/community" className="text-white/80 hover:text-white transition-colors">
                Community
              </Link>
              <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url || user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-gradient-primary text-white text-xs">
                          {(profile?.display_name || user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-white/90">
                        {profile?.display_name || user.user_metadata?.full_name || user.email}
                      </span>
                    </div>
                    <Link to="/dashboard">
                      <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => signOut()}
                      variant="outline" 
                      className="w-full border-white/30 text-white hover:bg-white/10"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">Sign In</Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full bg-gradient-primary text-white">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};