"use client";

import { useState, useEffect, useRef } from "react";
import { useMessages, Message } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Loader2, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  otherUserId: string;
  otherUserName?: string;
  otherUserAvatar?: string;
  className?: string;
}

export function ChatWindow({ otherUserId, otherUserName, otherUserAvatar, className }: ChatWindowProps) {
  const { user } = useAuth();
  const { messages, isLoading, sendMessage, isSending } = useMessages(otherUserId);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim() || isSending) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className={cn("flex flex-col h-[500px] bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md", className)}>
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
        <Avatar className="w-8 h-8 border border-white/20">
          <AvatarImage src={otherUserAvatar} />
          <AvatarFallback className="bg-blue-500/20 text-blue-300 text-xs">
            {getInitials(otherUserName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-white font-medium text-sm">{otherUserName || "Chat"}</h3>
          <p className="text-[10px] text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-20">
              <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
            </div>
          ) : messages && messages.length > 0 ? (
            messages.map((msg: Message) => {
              const isMe = msg.sender_id === user?.id;
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    isMe ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2 rounded-2xl text-sm leading-relaxed",
                      isMe 
                        ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20" 
                        : "bg-white/10 text-white rounded-tl-none border border-white/10"
                    )}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-white/40 mt-1 px-1">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center px-4">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                 <User className="w-6 h-6 text-white/20" />
               </div>
               <p className="text-white/40 text-xs italic">
                 No messages yet. Start your conversation with {otherUserName}!
               </p>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-blue-500/50"
            disabled={isSending}
          />
          <Button 
            size="icon" 
            onClick={handleSend}
            disabled={!input.trim() || isSending}
            className="bg-blue-600 hover:bg-blue-500 text-white shrink-0 shadow-lg shadow-blue-900/20"
          >
            {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-[10px] text-white/30 mt-2 text-center">
          Messaging is encrypted and secure.
        </p>
      </div>
    </div>
  );
}
