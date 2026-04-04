"use client";

import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useSessions, useUpdateMeetingLink, useUpdateSessionStatus } from "@/hooks/useSessions";
import { useRecentChats } from "@/hooks/useMessages";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { ReviewModal } from "@/components/dashboard/ReviewModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { BookOpen, Users, Calendar, Star, MessageSquare, Trophy, Settings, Zap } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { data: enrollments, isLoading: enrollmentsLoading } = useEnrollments();
  const { data: sessions, isLoading: sessionsLoading } = useSessions();
  const { data: recentChats, isLoading: chatsLoading } = useRecentChats();
  const { mutate: updateLink, isPending: isUpdatingLink } = useUpdateMeetingLink();
  const { mutate: updateStatus } = useUpdateSessionStatus();
  
  const [activeChatUser, setActiveChatUser] = useState<{ id: string, name: string, avatar?: string } | null>(null);
  const [reviewSession, setReviewSession] = useState<{ id: string, mentorId: string, mentorName: string } | null>(null);

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
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
      
      <main className="w-full px-6 md:px-12 lg:px-8 py-24">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 border-2 border-white/10">
              <AvatarImage src={profile?.avatar_url || ""} />
              <AvatarFallback className="text-lg bg-blue-500/20 text-blue-300">
                {getInitials(profile?.display_name || null)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Welcome back, {profile?.display_name || user?.email?.split('@')[0]}!
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className={getRoleBadgeColor(profile?.role || null)}>
                  {profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : 'No Role'}
                </Badge>
                <span className="text-white/40 text-xs px-2 py-1 border border-white/5 rounded-full bg-white/5">
                  Phase 2 Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm font-medium">
                  {profile?.role === 'mentor' ? 'Upcoming Sessions' : 'Courses Enrolled'}
                </CardTitle>
                <BookOpen className="w-4 h-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {profile?.role === 'mentor' ? sessions?.length || 0 : enrollments?.length || 0}
              </div>
              <p className="text-xs text-white/40 mt-1">Real-time status</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm font-medium">
                  {profile?.role === 'mentor' ? 'Sessions Completed' : 'Completed Courses'}
                </CardTitle>
                <Calendar className="w-4 h-4 text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {profile?.role === 'mentor' 
                  ? '0' 
                  : enrollments?.filter(e => e.status === 'completed').length || 0
                }
              </div>
              <p className="text-xs text-white/40 mt-1">Based on records</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
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
              <p className="text-xs text-white/40 mt-1">
                {profile?.role === 'mentor' ? 'Out of 5.0' : 'Badges earned'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm font-medium">Community</CardTitle>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">156</div>
              <p className="text-xs text-white/40 mt-1">Connections made</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-md overflow-hidden">
            <CardContent className="pt-6">
              <div className="space-y-8">
                {/* Upcoming Sessions - For Everyone */}
                <div>
                  <h3 className="text-white/80 text-sm font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    Upcoming Sessions
                  </h3>
                  <div className="space-y-4">
                    {sessions && sessions.length > 0 ? (
                      sessions.map((session) => (
                        <div key={session.id} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/[0.08] transition-colors group">
                          {profile?.role === 'mentor' ? (
                            <Avatar className="w-12 h-12 border border-white/10">
                              <AvatarImage src={session.learner?.avatar_url || ""} />
                              <AvatarFallback className="bg-purple-500/20 text-purple-300">
                                {getInitials(session.learner?.display_name || null)}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <Avatar className="w-12 h-12 border border-white/10">
                              <AvatarImage src={session.mentor?.avatar_url || ""} />
                              <AvatarFallback className="bg-blue-500/20 text-blue-300">
                                {getInitials(session.mentor?.display_name || null)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium truncate">
                              {profile?.role === 'mentor' ? `Mentoring: ${session.learner?.display_name}` : `Session with ${session.mentor?.display_name}`}
                            </h4>
                            <p className="text-white/60 text-sm">
                              {new Date(session.start_time).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {session.status === 'completed' ? (
                              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                                Completed
                              </Badge>
                            ) : profile?.role === 'mentor' ? (
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-white border-white/10 hover:bg-blue-600 hover:border-blue-600 transition-colors"
                                  onClick={() => {
                                    const link = prompt("Enter meeting link (Zoom, GMeet, etc.):", session.meeting_link || "");
                                    if (link !== null) updateLink({ sessionId: session.id, meetingLink: link });
                                  }}
                                  disabled={isUpdatingLink}
                                >
                                  {session.meeting_link ? 'Update Link' : 'Set Link'}
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-white/40 hover:text-green-400 hover:bg-green-400/10"
                                  onClick={() => updateStatus({ sessionId: session.id, status: 'completed' })}
                                >
                                  Complete
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-white border-white/10 hover:bg-blue-600 hover:border-blue-600 disabled:opacity-30 disabled:hover:bg-transparent"
                                  disabled={!session.meeting_link}
                                  onClick={() => session.meeting_link && window.open(session.meeting_link, '_blank')}
                                >
                                  Join Call
                                </Button>
                                {session.status === 'completed' && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-yellow-400 hover:bg-yellow-400/10"
                                    onClick={() => setReviewSession({ 
                                      id: session.id, 
                                      mentorId: session.mentor_id, 
                                      mentorName: session.mentor?.display_name 
                                    })}
                                  >
                                    Rate Mentor
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 bg-white/5 border border-dashed border-white/10 rounded-xl">
                        <p className="text-white/30 text-xs italic">No upcoming sessions scheduled.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Courses - For Learners */}
                {profile?.role === 'learner' && (
                  <div>
                    <h3 className="text-white/80 text-sm font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      Continue Learning
                    </h3>
                    <div className="space-y-4">
                      {enrollments && enrollments.length > 0 ? (
                        enrollments.map((enrollment) => (
                          <div key={enrollment.id} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/[0.08] transition-colors">
                            <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-white/10">
                              <img 
                                src={enrollment.courses.image || "/api/placeholder/48/48"} 
                                alt={enrollment.courses.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium truncate">{enrollment.courses.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 transition-all shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                                    style={{ width: `${enrollment.progress}%` }}
                                  />
                                </div>
                                <span className="text-white/60 text-[10px] font-mono">{enrollment.progress}%</span>
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-white border-white/10 hover:bg-blue-600 hover:border-blue-600"
                              onClick={() => router.push(`/courses/${enrollment.course_id}/learn`)}
                            >
                              {enrollment.progress === 0 ? 'Start' : 'Continue'}
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 bg-white/5 border border-dashed border-white/10 rounded-xl">
                          <p className="text-white/40 italic text-xs">You haven't enrolled in any courses yet.</p>
                          <Button variant="link" className="text-blue-400 mt-2 text-xs h-auto p-0">Explore Catalog</Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {(enrollmentsLoading || sessionsLoading) && (
                   <p className="text-center text-white/40 text-xs italic py-4 animate-pulse">Syncing your Skill-Hub data...</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Messages Quick Access */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white text-lg">Messages</CardTitle>
                  <CardDescription className="text-white/40">Recent chats</CardDescription>
                </div>
                <MessageSquare className="w-5 h-5 text-blue-400" />
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-1">
                  {chatsLoading ? (
                    <div className="flex justify-center p-4">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : recentChats && recentChats.length > 0 ? (
                    recentChats.slice(0, 4).map((chat: any) => (
                      <div 
                        key={chat.id} 
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-all group"
                        onClick={() => setActiveChatUser({ id: chat.id, name: chat.display_name, avatar: chat.avatar_url })}
                      >
                        <div className="relative">
                          <Avatar className="w-10 h-10 border border-white/10">
                            <AvatarImage src={chat.avatar_url} />
                            <AvatarFallback className="bg-blue-500/20 text-blue-300">
                               {chat.display_name?.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-white truncate">{chat.display_name}</p>
                            {chat.unread && <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                          </div>
                          <p className="text-xs text-white/40 truncate mt-0.5">{chat.lastMessage}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                       <MessageSquare className="w-8 h-8 text-white/5 mx-auto mb-2" />
                       <p className="text-white/30 text-xs">No active conversations</p>
                    </div>
                  )}
                  <Button variant="ghost" className="w-full text-white/40 hover:text-white hover:bg-white/10 text-xs py-5 mt-2 border-t border-white/5 rounded-none">
                    Open Messenger
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
              <CardHeader className="pb-3 border-b border-white/5">
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 h-11 px-4 shadow-lg shadow-blue-900/20 group">
                  <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {profile?.role === 'mentor' ? 'Schedule Session' : 'Browse Courses'}
                </Button>
                <Button variant="outline" className="w-full justify-start text-white border-white/10 hover:bg-white/5 h-11 px-4">
                  <Users className="w-4 h-4 mr-2 text-purple-400" />
                  {profile?.role === 'mentor' ? 'View Earnings' : 'Find Mentor'}
                </Button>
                <Button variant="outline" className="w-full justify-start text-white border-white/10 hover:bg-white/5 h-11 px-4">
                  <Settings className="w-4 h-4 mr-2 text-gray-400" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Chat Sheet Overlay */}
      <Sheet open={!!activeChatUser} onOpenChange={(open: boolean) => !open && setActiveChatUser(null)}>
        <SheetContent side="right" className="p-0 bg-[#0a0a0b]/95 backdrop-blur-xl border-white/10 w-full sm:max-w-md">
          {activeChatUser && (
            <div className="h-full flex flex-col pt-12">
              <div className="px-6 pb-4 border-b border-white/5">
                <h2 className="text-lg font-semibold text-white">Chat with {activeChatUser.name}</h2>
              </div>
              <ChatWindow 
                otherUserId={activeChatUser.id}
                otherUserName={activeChatUser.name}
                otherUserAvatar={activeChatUser.avatar}
                className="flex-1 rounded-none border-none bg-transparent"
              />
            </div>
          )}
        </SheetContent>
      </Sheet>

      <ReviewModal 
        isOpen={!!reviewSession} 
        onClose={() => setReviewSession(null)}
        mentorId={reviewSession?.mentorId || ""}
        mentorName={reviewSession?.mentorName || ""}
        sessionId={reviewSession?.id || ""}
      />

      <Footer />
    </div>
  );
}
