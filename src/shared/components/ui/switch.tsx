import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/shared/lib/utils";

interface Props {
  leftText?: string;
  rightText?: string;
}

function Switch({
  className,
  leftText,
  rightText,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "relative group peer cursor-pointer p-0.5 data-[state=checked]:bg-background-toss-secondary data-[state=unchecked]:bg-background-toss-secondary rounded-[6px] focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[26px] w-12 shrink-0 items-center border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 border-none m-0",
        className
      )}
      {...props}
    >
      {leftText && rightText && (
        <div className="flex text-toss-sm text-foreground-toss font-semibold absolute z-10">
          <p className="w-[22px] h-[22px] group-data-[state=checked]:text-foreground-toss-secondary flex-center">
            $
          </p>
          <p className="w-[22px] h-[22px] group-data-[state=unchecked]:text-foreground-toss-secondary flex-center">
            원
          </p>
        </div>
      )}
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background-toss-tertiary rounded-[4px] block size-[22px] ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
