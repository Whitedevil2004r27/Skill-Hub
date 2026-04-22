"use client";

import { useAdminStats } from "@/hooks/useAdmin";
import { 
  Users, 
  UserCheck, 
  BookOpen, 
  TrendingUp,
  Activity,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminOverview() {
  const { data: stats, isLoading } = useAdminStats();

  const statCards = [
    {
      title: "Total Community",
      value: stats?.totalUsers || 0,
      icon: Users,
      trend: "+12%",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Active Mentors",
      value: stats?.totalMentors || 0,
      icon: UserCheck,
      trend: "+5%",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Courses Live",
      value: stats?.totalCourses || 0,
      icon: BookOpen,
      trend: "+2",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Total Enrollments",
      value: stats?.totalEnrollments || 0,
      icon: Activity,
      trend: "+18%",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white/5 rounded-2xl border border-white/10" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
          <p className="text-zinc-500 mt-1">Real-time metrics for the SkillHub ecosystem.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/courses">
            <Button className="bg-blue-600 hover:bg-blue-500 flex items-center gap-2 px-6">
              <Plus className="w-4 h-4" />
              New Course
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-[#0F0F12] border-white/10 overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-zinc-400 font-medium text-sm">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              <div className="flex items-center mt-2">
                <span className="text-emerald-500 text-xs font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.trend}
                </span>
                <span className="text-zinc-600 text-xs ml-2">from last month</span>
              </div>
            </CardContent>
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Placeholder for future growth charts */}
        <Card className="bg-[#0F0F12] border-white/10 p-8 h-[300px] flex flex-col items-center justify-center text-center space-y-4">
          <Activity className="w-12 h-12 text-zinc-700" />
          <div>
            <h3 className="font-semibold text-lg">Activity Analytics</h3>
            <p className="text-zinc-500 text-sm max-w-xs">Detailed trends and engagement charts will appear here as more data is collected.</p>
          </div>
        </Card>

        {/* Quick Management Links */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Management Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/admin/users" className="block p-6 rounded-2xl bg-[#0F0F12] border border-white/10 hover:border-blue-500/50 transition-all group">
              <Users className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold">Manage Users</h3>
              <p className="text-zinc-500 text-sm mt-1">Review profiles, assign roles, and handle reports.</p>
            </Link>
            <Link href="/admin/courses" className="block p-6 rounded-2xl bg-[#0F0F12] border border-white/10 hover:border-blue-500/50 transition-all group">
              <BookOpen className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold">Manage Courses</h3>
              <p className="text-zinc-500 text-sm mt-1">Update syllabus, add lessons, and moderate content.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
