"use client";

import { useAdminUsers, useUpdateUserStatus } from "@/hooks/useAdmin";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  ShieldOff, 
  UserCog,
  Mail,
  Calendar
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function UserManagement() {
  const { data: users, isLoading } = useAdminUsers();
  const updateStatus = useUpdateUserStatus();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users?.filter((user: any) => 
    user.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      await updateStatus.mutateAsync({ 
        userId, 
        updates: { is_admin: !currentStatus } 
      });
      toast({
        title: "Success",
        description: `User admin status ${!currentStatus ? 'granted' : 'revoked'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update admin status.",
        variant: "destructive",
      });
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateStatus.mutateAsync({ 
        userId, 
        updates: { role: newRole } 
      });
      toast({
        title: "Success",
        description: `User role updated to ${newRole}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update role.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-1/3 bg-white/5 rounded-lg" />
        <div className="h-64 bg-white/5 rounded-2xl border border-white/10" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-zinc-500 mt-1">Oversee community members and manage access permissions.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input 
            placeholder="Search by name or ID..." 
            className="pl-10 bg-[#0F0F12] border-white/10 focus:border-blue-500/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="border-white/10 hover:bg-white/5 flex-1 sm:flex-none">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0F0F12] overflow-hidden">
        <Table>
          <TableHeader className="bg-white/[0.02]">
            <TableRow className="hover:bg-transparent border-white/5">
              <TableHead className="text-zinc-400">User</TableHead>
              <TableHead className="text-zinc-400">Role</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-zinc-400">Joined</TableHead>
              <TableHead className="text-right text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers?.map((user: any) => (
              <TableRow key={user.user_id} className="border-white/5 hover:bg-white/[0.01] transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border border-white/10">
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback className="bg-blue-600/20 text-blue-400">
                        {user.display_name?.substring(0, 2).toUpperCase() || "??"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.display_name || "Anonymous"}</div>
                      <div className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        {user.user_id.substring(0, 15)}...
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Badge 
                      className={cn(
                        "font-medium",
                        user.role === "mentor" 
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20" 
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      )}
                    >
                      {user.role || "learner"}
                    </Badge>
                    {user.is_admin && (
                      <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                        Admin
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/5">
                    Active
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-white/5 text-zinc-400"
                      onClick={() => handleToggleAdmin(user.user_id, user.is_admin)}
                      title={user.is_admin ? "Revoke Admin" : "Grant Admin"}
                    >
                      {user.is_admin ? <ShieldOff className="w-4 h-4 text-red-400" /> : <Shield className="w-4 h-4 text-emerald-400" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-white/5 text-zinc-400"
                      onClick={() => handleRoleChange(user.user_id, user.role === 'mentor' ? 'learner' : 'mentor')}
                      title="Toggle Mentor Role"
                    >
                      <UserCog className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredUsers?.length === 0 && (
          <div className="p-12 text-center text-zinc-500">
            No users found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
