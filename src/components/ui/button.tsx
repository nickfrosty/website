import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center border border-transparent gap-1 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-primary/80 hover:border-primary disabled:bg-primary/80",
        outline:
          "text-foreground border-border! bg-transparent hover:bg-primary hover:!border-primary hover:text-white disabled:bg-muted",
        secondary:
          "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] disabled:bg-foreground/80",
        muted: "bg-muted border-border text-foreground hover:bg-muted/70 disabled:bg-muted/80",
        tertiary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:bg-primary/80",
        ghost: "bg-transparent hover:bg-primary hover:text-white",
        link: "text-primary underline-offset-4 hover:underline",
        twitter: "bg-twitter text-white hover:bg-twitter/90 disabled:bg-twitter/80",
        success: "bg-success text-success-foreground hover:bg-success/90 disabled:bg-success/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:bg-destructive/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        link: "h-auto px-0 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-13 rounded-md px-10 text-lg",
        icon: "size-10 aspect-square",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, startIcon, endIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // When asChild is true, render children directly (icons not supported with asChild)
    if (asChild) {
      return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </Comp>
      );
    }

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {startIcon && <span className="mr-2">{startIcon}</span>}
        {children}
        {endIcon && <span className="ml-2">{endIcon}</span>}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
