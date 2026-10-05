import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 shadow-sm border border-neutral-900 dark:border-white transition-all",
        destructive:
          "bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200",
        outline:
          "border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-100 shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-500",
        secondary:
          "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700",
        ghost:
          "hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 text-neutral-600 dark:text-neutral-400",
        link: "text-neutral-900 dark:text-neutral-100 underline-offset-4 hover:underline font-semibold",
        glass: "glass text-current hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
