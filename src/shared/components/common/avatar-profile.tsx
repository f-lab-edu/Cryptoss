import { cva } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/shared/lib/utils";

export interface AvatarProfileProps {
  src: string;
  avatarSize?: "sm" | "md";
  ticker: string;
  tickerSize?: "md" | "lg";
}

const avatarVariants = cva("rounded-full", {
  variants: {
    size: {
      sm: "w-6 h-6",
      md: "w-[30px] h-[30px]",
    },
    defaultVariants: {
      size: "sm",
    },
  },
});

const tickerVariants = cva("font-semibold", {
  variants: {
    size: {
      md: "text-toss-md",
      lg: "text-toss-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

function AvatarProfile({ src, avatarSize, ticker, tickerSize }: AvatarProfileProps) {
  return (
    <div className="flex gap-2">
      <Avatar>
        <AvatarImage
          src={src}
          alt="@shadcn"
          className={cn(avatarVariants({ size: avatarSize }))}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className={cn(tickerVariants({ size: tickerSize }))}>{ticker}</p>
    </div>
  );
}

export default AvatarProfile;
