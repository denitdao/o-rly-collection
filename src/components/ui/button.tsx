import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        rainbow: cn(
          "animate-rainbow bg-[length:200%] transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent]",

          // light mode colors
          "bg-[linear-gradient(#fff,#fff),linear-gradient(90deg,theme('colors.red.500'),theme('colors.purple.500'),theme('colors.blue.500'),theme('colors.cyan.500'),theme('colors.lime.500'),theme('colors.orange.500'))]",

          // dark mode colors
          "dark:bg-[linear-gradient(#121213,#121213),linear-gradient(90deg,theme('colors.red.500'),theme('colors.purple.500'),theme('colors.blue.500'),theme('colors.cyan.500'),theme('colors.lime.500'),theme('colors.orange.500'))]",
        ),
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const button = (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );

    if (variant === "rainbow") {
      return (
        <div className="group relative">
          <span
            className="absolute inset-0 animate-rainbow rounded-md bg-[linear-gradient(90deg,theme('colors.red.300'),theme('colors.purple.300'),theme('colors.blue.300'),theme('colors.cyan.300'),theme('colors.lime.300'),theme('colors.orange.300'))] bg-[length:200%] blur-[5px] group-hover:blur-[2px]"
            aria-hidden="true"
          ></span>
          {button}
        </div>
      );
    }

    return button;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
