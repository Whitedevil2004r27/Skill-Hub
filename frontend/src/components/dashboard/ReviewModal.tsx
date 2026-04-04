"use client";

import { useState } from "react";
import { useCreateReview } from "@/hooks/useReviews";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorId: string;
  mentorName: string;
  sessionId: string;
}

export function ReviewModal({ isOpen, onClose, mentorId, mentorName, sessionId }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const { mutate: submitReview, isPending } = useCreateReview();

  const handleSubmit = () => {
    if (rating === 0) return;
    submitReview({
      mentorId,
      sessionId,
      rating,
      comment
    }, {
      onSuccess: () => {
        onClose();
        setRating(0);
        setComment("");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0a0b]/95 backdrop-blur-xl border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">Rate your Session</DialogTitle>
          <DialogDescription className="text-white/40">
            How was your experience with <span className="text-blue-400 font-semibold">{mentorName}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform active:scale-95"
              >
                <Star 
                  className={cn(
                    "w-10 h-10 transition-colors duration-200",
                    (hoveredRating || rating) >= star 
                      ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" 
                      : "text-white/10"
                  )}
                />
              </button>
            ))}
          </div>

          <div className="w-full space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/20 ml-1">
              Feedback (Optional)
            </label>
            <Textarea 
              placeholder="What did you learn? How can they improve?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-white/5 border-white/10 focus:border-blue-500/50 min-h-[100px] resize-none text-sm placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="flex-1 text-white/40 hover:text-white hover:bg-white/5"
          >
            Skip
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={rating === 0 || isPending}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
