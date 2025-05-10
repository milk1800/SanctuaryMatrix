
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
      className={cn(
        "fixed bottom-8 right-8 z-50 h-16 w-16 rounded-full shadow-xl fab-glow",
        "flex items-center justify-center",
        className
      )}
      aria-label="Open Matrix AI Assistant"
      size="icon"
    >
      <Bot className="h-8 w-8" />
    </Button>
  );
}
