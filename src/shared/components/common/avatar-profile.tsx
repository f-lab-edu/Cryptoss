import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/shared/lib/utils";

export interface AvatarProfileProps {
  src: string;
  avatarSize?: "sm" | "md";
  ticker: string;
  tickerSize?: "md" | "lg";
}

function AvatarProfile({
  src,
  avatarSize = "md",
  ticker,
  tickerSize = "lg",
}: AvatarProfileProps) {
  return (
    <div className="flex gap-2">
      <Avatar>
        <AvatarImage
          src={src}
          alt="@shadcn"
          className={cn(
            "rounded-full bg-background-toss-light",
            avatarSize === "md" ? "w-[30px] h-[30px]" : "w-6 h-6"
          )}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p
        className={cn(
          "flex-center font-semibold",
          tickerSize === "lg" ? "text-toss-lg" : "text-toss-md"
        )}
      >
        {ticker}
      </p>
    </div>
  );
}

export default AvatarProfile;
