'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[18rem]", className)}>
      {children}
    </div>
  );
}

interface BentoItemProps {
  title: string;
  description: string;
  header?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function BentoItem({ title, description, header, icon, className }: BentoItemProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl glass-card premium-border p-6 transition-all hover:bg-white/10",
        className
      )}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex flex-col gap-2">
        {icon && <div className="mb-2 text-violet-400">{icon}</div>}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      
      {header && <div className="mt-4 flex-1">{header}</div>}
    </motion.div>
  );
}
