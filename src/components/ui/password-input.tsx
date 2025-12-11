import * as React from "react"
import { EyeOff ,Eye} from 'lucide-react';

import { cn } from "@/lib/utils/tailwind-merge"

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {

const [showPassword , setShowPassword] = React.useState(false)


function handleShowPassword(){
  setShowPassword(true)
}

function handleHidePassword(){
  setShowPassword(false)
}

    return (
      <div className="relative w-full">
           <input
        type={showPassword?"text":"password"}
        className={cn(
          "flex h-10 w-full border border-input bg-background ps-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground placeholder:text-gray-400 focus-visible:outline-none  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
      {type === "password" && !showPassword && <EyeOff onClick={handleShowPassword} className="absolute end-2 cursor-pointer text-maincolor top-[50%] -translate-y-[50%]"/>}
            {type === "password" && showPassword && <Eye onClick={handleHidePassword} className="absolute end-2 cursor-pointer text-maincolor top-[50%] -translate-y-[50%]"/>}

      </div>
   
    )
  }
)
PasswordInput.displayName = "Input"

export { PasswordInput }
