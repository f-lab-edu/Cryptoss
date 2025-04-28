import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface ChangeBlinkProps {
  pctChange: number;
  children: ReactNode;
}

export default function Blink({ pctChange, children }: ChangeBlinkProps) {
  const refinedPct = parseFloat(pctChange.toFixed(1));
  const prevRef = useRef<number>(parseFloat(pctChange.toFixed(1)));
  const [flashCls, setFlashCls] = useState<string>("");

  useEffect(() => {
    if (prevRef.current !== parseFloat(pctChange.toFixed(1))) {
      const colorBg =
        pctChange < 0
          ? "bg-background-toss-bull/30"
          : "bg-background-toss-bear/30";

      setFlashCls(
        cn("animate__animated animate__flash animate__faster", colorBg)
      );
      prevRef.current = refinedPct;

      const id = setTimeout(() => setFlashCls(""), 500);
      return () => clearTimeout(id);
    }
  }, [pctChange, refinedPct]);

  return (
    <div className="flex w-full h-full justify-end">
      <div
        className={cn(
          "max-w-[80px] w-full h-full flex justify-end items-center rounded-[8px]",
          flashCls
        )}
      >
        {children}
      </div>
    </div>
  );
}
