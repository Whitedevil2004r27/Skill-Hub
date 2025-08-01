import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Award, Clock, DollarSign, Star, ChevronRight, ChevronLeft, Crown, Code2, Sparkles, Trophy, Target, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const BecomeMentor = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [expertise, setExpertise] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [availability, setAvailability] = useState("");
  const [mentorshipStyle, setMentorshipStyle] = useState("");
  const [saving, setSaving] = useState(false);

  const skillOptions = [
    "JavaScript", "Python", "React", "Node.js", "TypeScript", "CSS", 
    "HTML", "SQL", "MongoDB", "AWS", "Docker", "Git", "Machine Learning",
    "Data Science", "UI/UX Design", "Mobile Development", "DevOps", "System Design",
    "Leadership", "Career Coaching", "Technical Interviews"
  ];

  const mentorshipStyles = [
    "Hands-on Coding", "Career Guidance", "Project Reviews", "Interview Prep", "Technical Deep-dives"
  ];

  const handleSkillToggle = (skill: string) => {
    setExpertise(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      // Update user profile with mentor role and information
      const { error } = await supabase
        .from('profiles')
        .update({
          role: 'mentor',
        })
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save your mentor profile. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Application Submitted!",
        description: "Your mentor application has been submitted for review. We'll contact you soon!",
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

  const progressPercentage = (currentStep / 3) * 100;

  const mentorTestimonials = [
    {
      name: "Alex Thompson",
      role: "Senior Engineering Manager at Meta",
      quote: "Mentoring on this platform has been incredibly rewarding. I've helped 50+ developers advance their careers.",
      rating: 5,
      earnings: "$15k+"
    },
    {
      name: "Priya Patel",
      role: "Principal Engineer at Google",
      quote: "The AI matching system connects me with the perfect mentees. It's efficient and meaningful.",
      rating: 5,
      earnings: "$22k+"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/30 to-green-900/20 relative overflow-hidden">
      {/* Neon glow elements */}
      <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      
      {/* Floating developer icons */}
      <motion.div 
        className="absolute top-16 left-16 text-green-400/30"
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Code2 className="w-10 h-10" />
      </motion.div>
      <motion.div 
        className="absolute top-32 right-24 text-purple-400/30"
        animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        <Crown className="w-8 h-8" />
      </motion.div>
      <motion.div 
        className="absolute bottom-24 left-32 text-blue-400/30"
        animate={{ y: [-20, 20, -20], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Sparkles className="w-12 h-12" />
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
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500/20 via-green-500/20 to-blue-500/20 rounded-full mb-6 backdrop-blur-sm border border-purple-500/30">
                <Users className="w-12 h-12 text-purple-400" />
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-green-400 to-blue-400 bg-clip-text text-transparent font-['Poppins']">
                👨‍🏫 Share Your Expertise. Inspire the Next Generation.
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-['Inter']">
                Join elite mentors earning $50k+ annually while shaping the future of tech
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
                <span className="text-sm text-gray-400">Step {currentStep} of 3</span>
                <span className="text-sm text-gray-400">{Math.round(progressPercentage)}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-gray-800" />
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
                  {/* Expertise Areas */}
                  <Card className="bg-gray-900/50 backdrop-blur-lg border border-green-500/30 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-2xl">
                        <Award className="w-6 h-6 text-green-400" />
                        Your Expertise Areas
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-lg">
                        Select technologies where you can provide world-class mentorship
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
                              variant={expertise.includes(skill) ? "default" : "outline"}
                              className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                                expertise.includes(skill)
                                  ? "bg-gradient-to-r from-green-500 to-purple-500 text-white shadow-lg shadow-green-500/25"
                                  : "border-gray-600 text-gray-300 hover:border-green-400 hover:text-green-400"
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

                  {/* Professional Bio */}
                  <Card className="bg-gray-900/50 backdrop-blur-lg border border-green-500/30 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-2xl">
                        <Star className="w-6 h-6 text-green-400" />
                        Professional Bio
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-lg">
                        Tell potential mentees about your experience and mentoring philosophy
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="e.g., I'm a Principal Engineer at Google with 10+ years building scalable systems. I've led teams of 50+ engineers and mentored hundreds of developers. My approach focuses on practical skills, career growth, and building confidence..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="min-h-[150px] bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 resize-none"
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
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Experience Level */}
                    <Card className="bg-gray-900/50 backdrop-blur-lg border border-green-500/30 shadow-2xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-white text-xl">
                          <Trophy className="w-5 h-5 text-green-400" />
                          Experience Level
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Years in your field
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Select value={experience} onValueChange={setExperience}>
                          <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="3-5" className="text-white">3-5 years</SelectItem>
                            <SelectItem value="5-10" className="text-white">5-10 years</SelectItem>
                            <SelectItem value="10-15" className="text-white">10-15 years</SelectItem>
                            <SelectItem value="15+" className="text-white">15+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </CardContent>
                    </Card>

                    {/* Hourly Rate */}
                    <Card className="bg-gray-900/50 backdrop-blur-lg border border-green-500/30 shadow-2xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-white text-xl">
                          <DollarSign className="w-5 h-5 text-green-400" />
                          Hourly Rate (USD)
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Premium mentors earn $100-300/hr
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Input
                          type="number"
                          placeholder="150"
                          value={hourlyRate}
                          onChange={(e) => setHourlyRate(e.target.value)}
                          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Mentorship Style */}
                  <Card className="bg-gray-900/50 backdrop-blur-lg border border-green-500/30 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-2xl">
                        <Target className="w-6 h-6 text-green-400" />
                        Mentorship Style
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-lg">
                        What type of mentorship do you excel at?
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Select value={mentorshipStyle} onValueChange={setMentorshipStyle}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select your mentorship style" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {mentorshipStyles.map((style) => (
                            <SelectItem key={style} value={style} className="text-white">
                              {style}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Availability */}
                  <Card className="bg-gray-900/50 backdrop-blur-lg border border-green-500/30 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-2xl">
                        <Clock className="w-6 h-6 text-green-400" />
                        Availability & Schedule
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-lg">
                        When can you provide mentorship sessions?
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="e.g., Weekday evenings (6-9 PM PST), Weekend mornings, Flexible for international mentees. Available for 10-15 hours per week..."
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="min-h-[120px] bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 resize-none"
                      />
                    </CardContent>
                  </Card>

                  {/* Badge Preview */}
                  <Card className="bg-gradient-to-r from-purple-600/20 to-green-600/20 backdrop-blur-lg border border-purple-500/30 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-2xl">
                        <Crown className="w-6 h-6 text-yellow-400" />
                        Your Mentor Profile Preview
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-lg">
                        This is how you'll appear to potential mentees
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center">
                            <Users className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-white">Expert Mentor</h3>
                              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                Top Mentor
                              </Badge>
                            </div>
                            <p className="text-gray-300 text-sm mb-2">
                              {experience} years • ${hourlyRate}/hr • {mentorshipStyle}
                            </p>
                            <div className="flex items-center gap-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                              <span className="text-gray-400 text-sm">(4.9)</span>
                            </div>
                          </div>
                        </div>
                      </div>
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
              
              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && (expertise.length === 0 || !bio)) ||
                    (currentStep === 2 && (!experience || !hourlyRate || !mentorshipStyle))
                  }
                  className="flex-1 bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white shadow-lg shadow-green-500/25"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!availability || saving}
                  className="flex-1 bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white shadow-lg shadow-green-500/25"
                >
                  {saving ? (
                    <div className="w-4 h-4 mr-2 border-2 border-white/20 border-t-white animate-spin rounded-full" />
                  ) : (
                    <Zap className="w-4 h-4 mr-2" />
                  )}
                  {saving ? 'Submitting...' : 'Start Mentoring'}
                </Button>
              )}
            </motion.div>
          </div>

          {/* Mentor Success Stories Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-['Poppins']">Mentor Success</h3>
              
              {mentorTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-lg border border-green-500/30 rounded-lg p-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Earned {testimonial.earnings}
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-green-400 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}

              {/* Mentor Benefits */}
              <div className="bg-gradient-to-r from-green-600/20 to-purple-600/20 backdrop-blur-lg border border-green-500/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Why Mentor With Us?</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Earn $50k-200k+ annually</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">Build your personal brand</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">AI-matched perfect mentees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Flexible schedule</span>
                  </div>
                </div>
              </div>

              {/* Review Process */}
              <div className="bg-gray-900/40 backdrop-blur-lg border border-purple-500/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-3">What happens next?</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>✅ Expert review (24-48 hours)</p>
                  <p>✅ Background verification</p>
                  <p>✅ Profile optimization session</p>
                  <p>✅ First mentee match guaranteed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeMentor;