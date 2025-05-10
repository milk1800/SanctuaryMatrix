import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card/80 text-card-foreground shadow-lg backdrop-blur-sm", // Added shadow-lg, backdrop-blur, bg-card/80
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement, // Changed from HTMLParagraphElement
  React.HTMLAttributes<HTMLHeadingElement> // Changed from HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  // Changed from <p> to <h2> for semantic correctness, or use <h3>, <h4> etc. based on context
  // Keeping div as per original structure, but assuming it wraps a heading or is styled as one.
  // If this is meant to be the main title of the card, h2 or h3 is appropriate.
  // For now, sticking to div and applying styling.
  <div // Consider changing to h2, h3 etc. if semantically appropriate
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight", // Original classes
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"


const CardDescription = React.forwardRef<
  HTMLParagraphElement, // Corrected to HTMLParagraphElement
  React.HTMLAttributes<HTMLParagraphElement> // Corrected to HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p // Changed to <p> for semantic correctness
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"


const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
