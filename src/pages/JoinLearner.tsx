import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Target, Trophy, Users, Clock, Star, Zap, Brain, Code, Rocket, ChevronRight, ChevronLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const JoinLearner = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [goals, setGoals] = useState("");
  const [availability, setAvailability] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const [saving, setSaving] = useState(false);

  const skillOptions = [
    "JavaScript", "Python", "React", "Node.js", "TypeScript", "CSS", 
    "HTML", "SQL", "MongoDB", "AWS", "Docker", "Git", "Machine Learning",
    "Data Science", "UI/UX Design", "Mobile Development", "DevOps"
  ];

  const learningStyleOptions = [
    "Visual Learning", "Hands-on Projects", "Live Coding Sessions", "Theory & Concepts", "Problem Solving"
  ];

  const availabilityOptions = [
    "Weekday Mornings", "Weekday Evenings", "Weekend Mornings", "Weekend Evenings", "Flexible Schedule"
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      // Update user profile with learner role and preferences
      const { error } = await supabase
        .from('profiles')
        .update({
          role: 'learner',
        })
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save your profile. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Welcome!",
        description: "Your learner profile has been created successfully.",
        variant: "default",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const progressPercentage = (currentStep / 2) * 100;

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full-Stack Developer",
      quote: "My mentor helped me land my dream job at Google. The personalized guidance was incredible!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "React Developer",
      quote: "From zero to hero in 6 months. The AI matching found me the perfect mentor.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/30 relative overflow-hidden">
      {/* Neon glow elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Floating icons */}
      <motion.div 
        className="absolute top-20 left-20 text-purple-400/30"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Code className="w-8 h-8" />
      </motion.div>
      <motion.div 
        className="absolute top-40 right-32 text-blue-400/30"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Brain className="w-10 h-10" />
      </motion.div>
      <motion.div 
        className="absolute bottom-32 left-40 text-purple-400/30"
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        <Rocket className="w-6 h-6" />
      </motion.div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full mb-6 backdrop-blur-sm border border-purple-500/30">
                <BookOpen className="w-10 h-10 text-purple-400" />
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-['Poppins']">
                🎓 Your Learning Journey Starts Here
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-['Inter']">
                Join thousands of learners who've transformed their careers with AI-powered mentorship
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Step {currentStep} of 2</span>
                <span className="text-sm text-gray-400">{Math.round(progressPercentage)}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-gray-800" />
            </motion.div>

            {/* Form Steps */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Skills Selection */}
                  <Card className="bg-gray-900/40 backdrop-blur-lg border border-purple-500/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-2xl">
                        <Target className="w-6 h-6 text-purple-400" />
                        What skills do you want to master?
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-lg">
                        Select the technologies that excite you most
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {skillOptions.map((skill) => (
                          <motion.div
                            key={skill}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Badge
                              variant={selectedSkills.includes(skill) ? "default" : "outline"}
                              className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                                selectedSkills.includes(skill)
                                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                                  : "border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400"
                              }`}
                              onClick={() => handleSkillToggle(skill)}
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Learning Goals */}
                  <Card className="bg-gray-900/40 backdrop-blur-lg border border-purple-500/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-2xl">
                        <Trophy className="w-6 h-6 text-purple-400" />
                        What are your learning goals?
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-lg">
                        Share your dreams and aspirations with us
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="e.g., I want to become a full-stack developer, land my first tech job, build my own startup..."
                        value={goals}
                        onChange={(e) => setGoals(e.target.value)}
                        className="min-h-[120px] bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 resize-none"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Learning Style */}
                  <Card className="bg-gray-900/40 backdrop-blur-lg border border-purple-500/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-2xl">
                        <Brain className="w-6 h-6 text-purple-400" />
                        How do you learn best?
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-lg">
                        Choose your preferred learning style
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Select value={learningStyle} onValueChange={setLearningStyle}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select your learning style" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {learningStyleOptions.map((style) => (
                            <SelectItem key={style} value={style} className="text-white">
                              {style}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Availability */}
                  <Card className="bg-gray-900/40 backdrop-blur-lg border border-purple-500/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-2xl">
                        <Clock className="w-6 h-6 text-purple-400" />
                        When are you available?
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-lg">
                        Let us know your preferred mentoring times
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Select value={availability} onValueChange={setAvailability}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select your availability" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {availabilityOptions.map((time) => (
                            <SelectItem key={time} value={time} className="text-white">
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div 
              className="flex gap-4 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="flex-1 bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              {currentStep < 2 ? (
                <Button
                  onClick={handleNext}
                  disabled={selectedSkills.length === 0}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!learningStyle || !availability || saving}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25"
                >
                  {saving ? (
                    <div className="w-4 h-4 mr-2 border-2 border-white/20 border-t-white animate-spin rounded-full" />
                  ) : (
                    <Zap className="w-4 h-4 mr-2" />
                  )}
                  {saving ? 'Saving...' : 'Start Learning Journey'}
                </Button>
              )}
            </motion.div>
          </div>

          {/* Testimonials Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-['Poppins']">Success Stories</h3>
              
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900/40 backdrop-blur-lg border border-purple-500/20 rounded-lg p-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-purple-400 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}

              {/* Stats */}
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Platform Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Active Learners</span>
                    <span className="text-purple-400 font-bold">50,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Expert Mentors</span>
                    <span className="text-blue-400 font-bold">2,500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Success Rate</span>
                    <span className="text-green-400 font-bold">94%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinLearner;