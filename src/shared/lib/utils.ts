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

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};

export const formatToKrw = (price: number | string, krwRate: number | null) => {
  const refinedPrice = typeof price === "number" ? price : parseFloat(price);

  return Math.trunc(refinedPrice * (krwRate ?? 1)).toLocaleString("ko-KR");
};

export const formatToUsd = (price: number | string) => {
  const refinedPrice = typeof price === "number" ? price : parseFloat(price);

  return Number(refinedPrice.toFixed(2)).toLocaleString("en-US");
};
