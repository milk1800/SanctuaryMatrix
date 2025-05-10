"use client";

import type * as React from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MatrixAiFabProps {
  onClick: () => void;
  className?: string;
}

export function MatrixAiFab({ onClick, className }: MatrixAiFabProps) {
  return (
    <Button
      onClick={onClick}
      variant="default" 
      className={cn(
        "fixed bottom-8 right-8 z-50 h-16 w-16 rounded-full shadow-xl fab-glow", 
        "flex items-center justify-center bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 text-primary-foreground", // Updated gradient
        className
      )}
      aria-label="Open Matrix AI Assistant"
      size="icon"
    >
      <Bot className="h-8 w-8" /> 
    </Button>
  );
}
