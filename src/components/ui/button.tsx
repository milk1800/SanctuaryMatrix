import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl hover:shadow-md", // Added rounded-xl and hover:shadow-md
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md", // Kept rounded-md for other variants or change to rounded-xl if all buttons should be xl
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md",
        link: "text-primary underline-offset-4 hover:underline", // No rounding for link
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3", // Default rounded-md will apply from base if not overridden by variant
        lg: "h-11 px-8", // Default rounded-md will apply
        icon: "h-10 w-10 rounded-md", // Default rounded-md for icon buttons
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    // If a variant like 'default' already specifies rounding, it takes precedence.
    // Otherwise, if size specifies rounding, it might.
    // If neither, the base CVA 'rounded-md' applies.
    // For full consistency, one might want to put rounded-xl in the base CVA string or ensure each variant/size explicitly defines its rounding.
    // The current setup specifically targets 'default' variant for 'rounded-xl'. Other buttons will use 'rounded-md'.
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
