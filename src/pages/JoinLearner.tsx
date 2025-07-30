import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Trophy, Users } from "lucide-react";

const JoinLearner = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [goals, setGoals] = useState("");
  const [experience, setExperience] = useState("");

  const skillOptions = [
    "JavaScript", "Python", "React", "Node.js", "TypeScript", "CSS", 
    "HTML", "SQL", "MongoDB", "AWS", "Docker", "Git", "Machine Learning",
    "Data Science", "UI/UX Design", "Mobile Development", "DevOps"
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle learner profile creation
    navigate("/courses");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome, Future Developer!</h1>
            <p className="text-muted-foreground text-lg">
              Let's set up your learning journey and find the perfect mentors for you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skills Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  What skills do you want to learn?
                </CardTitle>
                <CardDescription>
                  Select the technologies and skills you're interested in learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  What are your learning goals?
                </CardTitle>
                <CardDescription>
                  Tell us what you want to achieve in your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., I want to become a full-stack developer, land my first tech job, build my own startup..."
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  className="min-h-[120px]"
                />
              </CardContent>
            </Card>

            {/* Experience Level */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Tell us about your experience
                </CardTitle>
                <CardDescription>
                  What's your current level? Any previous projects or background?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., Complete beginner, some coding bootcamp experience, CS student, career changer..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1"
              >
                Skip for Now
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={selectedSkills.length === 0}
              >
                Start Learning Journey
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinLearner;