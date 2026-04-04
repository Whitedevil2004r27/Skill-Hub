"use client";

import { useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Star, MapPin, Calendar, Filter } from "lucide-react";

import { useMentors } from "@/hooks/useMentors";

export default function Explore() {
  const { data: mentors, isLoading } = useMentors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  const skills = ["React", "TypeScript", "Product Strategy", "UI/UX Design", "AWS", "System Design"];

  if (isLoading || !mentors) return null;

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSkill = !selectedSkill || mentor.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-16">
          <div className="w-full px-6 md:px-12 lg:px-8">
            <div className="w-full text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Find Your Perfect Mentor
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Connect with industry experts and accelerate your career growth
              </p>
              
              {/* Search Bar */}
              <div className="w-full relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by name, role, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg bg-white/95 border-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Results */}
        <section className="py-12 bg-background">
          <div className="w-full px-6 md:px-12 lg:px-8">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-white/80" />
                <span className="font-medium text-white">Filter by skill:</span>
              </div>
              <Button
                variant={selectedSkill === "" ? "default" : "outline"}
                onClick={() => setSelectedSkill("")}
                size="sm"
              >
                All
              </Button>
              {skills.map((skill) => (
                <Button
                  key={skill}
                  variant={selectedSkill === skill ? "default" : "outline"}
                  onClick={() => setSelectedSkill(skill)}
                  size="sm"
                >
                  {skill}
                </Button>
              ))}
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">
                {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''} found
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-white/80">Sort by:</span>
                <select className="px-3 py-1 border border-white/20 rounded-md bg-white/10 text-white">
                  <option>Rating</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Reviews</option>
                </select>
              </div>
            </div>

            {/* Mentor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="glass-card hover:shadow-purple-glow transition-all duration-300 hover-lift">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={mentor.avatar} alt={mentor.name} />
                          <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg text-white">{mentor.name}</h3>
                          <p className="text-white/70 text-sm">{mentor.title}</p>
                          <p className="text-accent text-sm font-medium">{mentor.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{mentor.rating}</span>
                        </div>
                        <p className="text-xs text-white/60">({mentor.reviews} reviews)</p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-white/70 text-sm mb-4">{mentor.bio}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{mentor.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-white/70">
                        <MapPin className="h-4 w-4 mr-2" />
                        {mentor.location}
                      </div>
                      <div className="flex items-center text-sm text-white/70">
                        <Calendar className="h-4 w-4 mr-2" />
                        {mentor.availability}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-white">${mentor.hourlyRate}</span>
                        <span className="text-white/70">/hour</span>
                      </div>
                      <Button className="bg-gradient-primary text-white hover-glow">
                        Book Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Mentors
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
