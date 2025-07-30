import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Award, Clock, DollarSign, Star } from "lucide-react";

const BecomeMentor = () => {
  const navigate = useNavigate();
  const [expertise, setExpertise] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [availability, setAvailability] = useState("");

  const skillOptions = [
    "JavaScript", "Python", "React", "Node.js", "TypeScript", "CSS", 
    "HTML", "SQL", "MongoDB", "AWS", "Docker", "Git", "Machine Learning",
    "Data Science", "UI/UX Design", "Mobile Development", "DevOps", "System Design"
  ];

  const handleSkillToggle = (skill: string) => {
    setExpertise(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle mentor profile creation
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Become a Mentor</h1>
            <p className="text-muted-foreground text-lg">
              Share your expertise and help the next generation of developers grow
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Expertise Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Your Expertise Areas
                </CardTitle>
                <CardDescription>
                  Select the technologies and skills you can mentor others in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => (
                    <Badge
                      key={skill}
                      variant={expertise.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Professional Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Professional Background
                  </CardTitle>
                  <CardDescription>
                    Your years of experience in the field
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Hourly Rate */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Hourly Rate
                  </CardTitle>
                  <CardDescription>
                    Your preferred hourly rate (USD)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    type="number"
                    placeholder="50"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Bio</CardTitle>
                <CardDescription>
                  Tell potential mentees about yourself, your experience, and your mentoring style
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., I'm a senior full-stack developer with 8 years of experience at top tech companies. I specialize in React, Node.js, and system design. I love helping developers level up their skills and land their dream jobs..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[150px]"
                />
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Availability
                </CardTitle>
                <CardDescription>
                  When are you typically available for mentoring sessions?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., Weekday evenings (6-9 PM EST), Weekend mornings, Flexible schedule..."
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
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
                Save as Draft
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={expertise.length === 0 || !experience || !bio}
              >
                Submit for Review
              </Button>
            </div>
          </form>

          {/* Additional Info */}
          <Card className="mt-8 bg-muted/30">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <p className="text-sm text-muted-foreground">
                  Our team will review your application within 2-3 business days. 
                  Once approved, you'll be able to start accepting mentoring requests and 
                  building your reputation on the platform.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BecomeMentor;