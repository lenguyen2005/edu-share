// "use client"

// import * as React from "react"
// import { Progress as ProgressPrimitive } from "radix-ui"

// import { cn } from "@/lib/utils"

// function Progress({
//   className,
//   value,
//   ...props
// }: React.ComponentProps<typeof ProgressPrimitive.Root>) {
//   return (
//     <ProgressPrimitive.Root
//       data-slot="progress"
//       className={cn(
//         "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
//         className
//       )}
//       {...props}
//     >
//       <ProgressPrimitive.Indicator
//         data-slot="progress-indicator"
//         className="size-full flex-1 bg-primary transition-all"
//         style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
//       />
//     </ProgressPrimitive.Root>
//   )
// }

// export { Progress }

"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

// Mở rộng props để nhận thêm class cho phần lõi (indicator)
interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
}

function Progress({
  className,
  value,
  indicatorClassName,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        // Tăng độ dày lên h-3, thêm shadow-inner để tạo chiều sâu
        "relative flex h-3 w-full items-center overflow-x-hidden rounded-full bg-slate-200/80 shadow-inner",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "size-full flex-1 bg-primary transition-all duration-500 ease-in-out",
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }