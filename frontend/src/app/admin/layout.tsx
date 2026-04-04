"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  ChevronRight,
  ShieldCheck,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Course Management", href: "/admin/courses", icon: BookOpen },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useProfile();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!profile || !profile.is_admin)) {
      router.push("/dashboard");
    }
  }, [profile, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If redirecting, don't show admin UI
  if (!profile || !profile.is_admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0F0F12] flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">Admin Central</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <link.icon className={cn(
                  "w-5 h-5 transition-transform group-hover:scale-110",
                  isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300"
                )} />
                <span className="font-medium">{link.name}</span>
                {isActive && <ChevronRight className="ml-auto w-4 h-4 opacity-50" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link 
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Exit Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
