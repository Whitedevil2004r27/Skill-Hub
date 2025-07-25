import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Heart, Share2, Users, Calendar, TrendingUp } from "lucide-react";

const mockPosts = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "/placeholder.svg",
    role: "Senior Frontend Developer",
    time: "2 hours ago",
    content: "Just finished mentoring a fantastic student on React hooks! The 'aha' moment when they understood useEffect dependencies was priceless. Teaching really is the best way to learn. 💡",
    likes: 24,
    comments: 8,
    tags: ["React", "Mentoring", "WebDev"]
  },
  {
    id: 2,
    author: "Marcus Johnson",
    avatar: "/placeholder.svg",
    role: "Mobile App Developer",
    time: "5 hours ago",
    content: "Looking for feedback on my latest React Native project. Built a meditation app with custom animations. Would love to hear thoughts from the community!",
    likes: 18,
    comments: 12,
    tags: ["ReactNative", "Mobile", "Feedback"]
  },
  {
    id: 3,
    author: "Dr. Emily Watson",
    avatar: "/placeholder.svg",
    role: "Data Science Mentor",
    time: "1 day ago",
    content: "Excited to announce our new Data Science study group! We'll be covering machine learning fundamentals starting next week. DM me if you're interested in joining. 📊",
    likes: 45,
    comments: 23,
    tags: ["DataScience", "StudyGroup", "ML"]
  }
];

const mockEvents = [
  {
    id: 1,
    title: "Weekly Frontend Showcase",
    date: "Tomorrow, 7:00 PM",
    attendees: 127,
    type: "Virtual Meetup"
  },
  {
    id: 2,
    title: "Career Panel: Breaking into Tech",
    date: "Friday, 6:00 PM",
    attendees: 89,
    type: "Panel Discussion"
  },
  {
    id: 3,
    title: "Code Review Session",
    date: "Saturday, 10:00 AM",
    attendees: 34,
    type: "Workshop"
  }
];

const trendingTopics = [
  { name: "React Hooks", posts: 156 },
  { name: "Career Advice", posts: 134 },
  { name: "Web3", posts: 98 },
  { name: "AI/ML", posts: 87 },
  { name: "System Design", posts: 76 }
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Community Hub
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect with fellow learners and mentors. Share knowledge, celebrate wins, and grow together.
              </p>
              <Button className="bg-gradient-to-r from-primary to-purple-400 hover:shadow-lg hover:shadow-primary/25">
                Join the Conversation
              </Button>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Community Feed</h2>
                <Button variant="outline" className="border-primary/30">
                  Create Post
                </Button>
              </div>

              {mockPosts.map((post) => (
                <Card key={post.id} className="backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{post.author}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {post.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{post.time}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 leading-relaxed">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <Card className="backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockEvents.map((event) => (
                    <div key={event.id} className="border-l-2 border-primary/30 pl-4">
                      <h4 className="font-medium mb-1">{event.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{event.type}</span>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{event.attendees}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full text-sm">
                    View All Events
                  </Button>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <div key={topic.name} className="flex justify-between items-center">
                      <span className="text-sm font-medium">#{topic.name}</span>
                      <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card className="backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">2,847</div>
                    <div className="text-sm text-muted-foreground">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">156</div>
                    <div className="text-sm text-muted-foreground">Posts This Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">89</div>
                    <div className="text-sm text-muted-foreground">Events This Month</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;