import * as React from "react"

import { cn } from "@/lib/utils/tailwind-merge"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {




    return (
      <div className="relative w-full">
           <input
        className={cn(
          "flex h-10 w-full border border-input bg-background ps-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground placeholder:text-gray-400 focus-visible:outline-none  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
     
      </div>
   
    )
  }
)
Input.displayName = "Input"

export { Input }
