
"use client";

import type * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, User, BotIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { matrixAiChat, type MatrixAiChatInput, type MatrixAiChatOutput } from '@/ai/flows/matrix-ai-flow';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'error';
  content: string;
  timestamp: Date;
}

interface MatrixAiPanelProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentTabName: string;
}

export function MatrixAiPanel({ isOpen, onOpenChange, currentTabName }: MatrixAiPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'initial-ai-message',
          type: 'ai',
          content: `Hello! I'm Matrix AI. How can I help you with your ${currentTabName} data today?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, currentTabName, messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: Message = {
      id: Date.now().toString() + '-user',
      type: 'user',
      content: userInput.trim(),
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const chatHistoryForFlow = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));
      
      const flowInput: MatrixAiChatInput = {
        query: newUserMessage.content,
        currentTab: currentTabName,
        chatHistory: chatHistoryForFlow,
      };
      
      const result: MatrixAiChatOutput = await matrixAiChat(flowInput);
      
      const newAiMessage: Message = {
        id: Date.now().toString() + '-ai',
        type: 'ai',
        content: result.response,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (error) {
      console.error('Error calling Matrix AI flow:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        type: 'error',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0"
        onPointerDownOutside={(e) => {
          // Allow interaction with elements that might be outside the sheet logically but part of the FAB
          if ((e.target as HTMLElement)?.closest('.fab-glow')) {
            e.preventDefault();
          }
        }}
        onInteractOutside={(e) => {
           if ((e.target as HTMLElement)?.closest('.fab-glow')) {
            e.preventDefault();
          }
        }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Matrix AI</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 mb-4",
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.type !== 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <BotIcon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "p-3 rounded-lg max-w-[75%]",
                  message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted',
                  message.type === 'error' && 'bg-destructive text-destructive-foreground'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs text-muted-foreground/70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.type === 'user' && (
                <Avatar className="h-8 w-8">
                   <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-start gap-3">
               <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <BotIcon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              <div className="p-3 rounded-lg bg-muted">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            </div>
          )}
        </ScrollArea>
        <SheetFooter className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              type="text"
              placeholder="Ask Matrix AI..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isLoading}
              className="flex-grow"
            />
            <Button type="submit" disabled={isLoading || !userInput.trim()} size="icon">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
