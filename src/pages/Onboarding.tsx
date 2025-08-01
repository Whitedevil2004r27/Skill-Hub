import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useProfile();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleRoleSelection = async (role: 'learner' | 'mentor') => {
    if (!user || !profile) {
      toast({
        title: "Error",
        description: "Please try logging in again",
        variant: "destructive",
      });
      return;
    }

    const { error } = await updateProfile({ role });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update your role. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Role Selected",
      description: `Welcome! You've joined as a ${role}.`,
    });

    // Navigate to the appropriate onboarding page
    if (role === 'learner') {
      navigate('/join-learner');
    } else {
      navigate('/become-mentor');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/30 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to the Platform!
          </h1>
          <p className="text-white/80 text-lg">
            Choose how you'd like to get started on your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <GraduationCap className="w-8 h-8 text-blue-400" />
              </div>
              <CardTitle className="text-white text-2xl">Join as Learner</CardTitle>
              <CardDescription className="text-white/70">
                Start your learning journey with expert mentors
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-white/60 space-y-2 mb-6">
                <li>• Access to expert mentors</li>
                <li>• Personalized learning paths</li>
                <li>• Interactive workshops</li>
                <li>• Progress tracking</li>
              </ul>
              <Button 
                onClick={() => handleRoleSelection('learner')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <CardTitle className="text-white text-2xl">Become a Mentor</CardTitle>
              <CardDescription className="text-white/70">
                Share your expertise and guide others
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-white/60 space-y-2 mb-6">
                <li>• Share your knowledge</li>
                <li>• Build your reputation</li>
                <li>• Flexible scheduling</li>
                <li>• Earn income</li>
              </ul>
              <Button 
                onClick={() => handleRoleSelection('mentor')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Start Mentoring
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;