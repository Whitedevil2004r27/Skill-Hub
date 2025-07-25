import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Users, Star, Search } from "lucide-react";
import { useState } from "react";

const mockCourses = [
  {
    id: 1,
    title: "Full-Stack Web Development Masterclass",
    instructor: "Sarah Chen",
    rating: 4.9,
    students: 1240,
    duration: "12 weeks",
    level: "Beginner",
    price: "$299",
    category: "Web Development",
    image: "/placeholder.svg",
    description: "Learn modern web development with React, Node.js, and MongoDB from industry experts."
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    instructor: "Alex Rodriguez",
    rating: 4.8,
    students: 856,
    duration: "8 weeks",
    level: "Beginner",
    price: "$199",
    category: "Design",
    image: "/placeholder.svg",
    description: "Master the principles of user-centered design and create stunning digital experiences."
  },
  {
    id: 3,
    title: "Data Science & Machine Learning",
    instructor: "Dr. Emily Watson",
    rating: 4.9,
    students: 567,
    duration: "16 weeks",
    level: "Intermediate",
    price: "$399",
    category: "Data Science",
    image: "/placeholder.svg",
    description: "Dive deep into data analysis, machine learning algorithms, and AI applications."
  },
  {
    id: 4,
    title: "Mobile App Development with React Native",
    instructor: "Marcus Johnson",
    rating: 4.7,
    students: 423,
    duration: "10 weeks",
    level: "Intermediate",
    price: "$249",
    category: "Mobile Development",
    image: "/placeholder.svg",
    description: "Build cross-platform mobile apps using React Native and modern development practices."
  },
  {
    id: 5,
    title: "DevOps & Cloud Architecture",
    instructor: "Jennifer Park",
    rating: 4.8,
    students: 234,
    duration: "14 weeks",
    level: "Advanced",
    price: "$349",
    category: "DevOps",
    image: "/placeholder.svg",
    description: "Learn containerization, CI/CD, and cloud deployment strategies for modern applications."
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    instructor: "Robert Kim",
    rating: 4.6,
    students: 189,
    duration: "6 weeks",
    level: "Beginner",
    price: "$179",
    category: "Security",
    image: "/placeholder.svg",
    description: "Understand security fundamentals and protect applications from common vulnerabilities."
  }
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const categories = ["all", "Web Development", "Design", "Data Science", "Mobile Development", "DevOps", "Security"];
  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Discover Courses
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Learn from industry experts and advance your career with our comprehensive course library.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="pb-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level === "all" ? "All Levels" : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="backdrop-blur-sm border-white/10 hover:border-primary/30 transition-all duration-300 group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        {course.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{course.price}</span>
                      <Button className="bg-gradient-to-r from-primary to-purple-400 hover:shadow-lg hover:shadow-primary/25">
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No courses found matching your criteria.</p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;