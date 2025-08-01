import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Calendar, Star } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleBadgeColor = (role: string | null) => {
    switch (role) {
      case 'learner':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'mentor':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16">
              <AvatarImage src={profile?.avatar_url || ""} />
              <AvatarFallback className="text-lg">
                {getInitials(profile?.display_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {profile?.display_name || user?.email?.split('@')[0]}!
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getRoleBadgeColor(profile?.role)}>
                  {profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : 'No Role'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 border-white/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm font-medium">
                  {profile?.role === 'mentor' ? 'Students Mentored' : 'Courses Enrolled'}
                </CardTitle>
                <BookOpen className="w-4 h-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-white/60 mt-1">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm font-medium">
                  {profile?.role === 'mentor' ? 'Sessions Completed' : 'Learning Hours'}
                </CardTitle>
                <Calendar className="w-4 h-4 text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {profile?.role === 'mentor' ? '48' : '86'}
              </div>
              <p className="text-xs text-white/60 mt-1">+8 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm font-medium">
                  {profile?.role === 'mentor' ? 'Average Rating' : 'Achievements'}
                </CardTitle>
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {profile?.role === 'mentor' ? '4.9' : '7'}
              </div>
              <p className="text-xs text-white/60 mt-1">
                {profile?.role === 'mentor' ? 'Out of 5.0' : 'Badges earned'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm font-medium">Community</CardTitle>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">156</div>
              <p className="text-xs text-white/60 mt-1">Connections made</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">
                {profile?.role === 'mentor' ? 'Upcoming Sessions' : 'Continue Learning'}
              </CardTitle>
              <CardDescription className="text-white/70">
                {profile?.role === 'mentor' 
                  ? 'Your scheduled mentoring sessions'
                  : 'Pick up where you left off'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold">{item}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">
                        {profile?.role === 'mentor' 
                          ? `Session with Student ${item}`
                          : `Course ${item}: Advanced Topics`
                        }
                      </h4>
                      <p className="text-white/60 text-sm">
                        {profile?.role === 'mentor' 
                          ? 'Today at 2:00 PM'
                          : '3 modules remaining'
                        }
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-white border-white/20">
                      {profile?.role === 'mentor' ? 'Join Call' : 'Continue'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                {profile?.role === 'mentor' ? 'Schedule Session' : 'Browse Courses'}
              </Button>
              <Button variant="outline" className="w-full justify-start text-white border-white/20">
                {profile?.role === 'mentor' ? 'View Earnings' : 'Find Mentor'}
              </Button>
              <Button variant="outline" className="w-full justify-start text-white border-white/20">
                Join Community
              </Button>
              <Button variant="outline" className="w-full justify-start text-white border-white/20">
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;