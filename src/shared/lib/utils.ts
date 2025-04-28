import { ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const tossFontSizes = ["toss-xs", "toss-sm", "toss-md", "toss-lg", "toss-xl"];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: tossFontSizes }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
