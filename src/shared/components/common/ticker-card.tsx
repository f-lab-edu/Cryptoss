import { ReactElement } from "react";
import AvatarProfile, { AvatarProfileProps } from "./avatar-profile";

interface Props extends AvatarProfileProps {
  children: ReactElement;
}

function TickerCard({ src, ticker, children }: Props) {
  return (
    <div className="flex justify-between">
      <AvatarProfile src={src} ticker={ticker} />
      {children}
    </div>
  );
}

export default TickerCard;
