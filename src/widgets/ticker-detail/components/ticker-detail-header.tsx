import CurrencySwitch from "@/shared/components/common/currency-switch";
import { Avatar } from "@/shared/components/ui/avatar";
import { DOLLAR, WON } from "@/shared/lib/constants";
import { homePageUrl } from "@/widgets/home/api/api";
import { STABLE_COIN } from "@/widgets/home/lib/constants";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface Props {
  ticker: string;
}

export default function TickerDetailHeader({ ticker }: Props) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-[10px] items-center">
        <Avatar className="rounded-[12px] w-12 h-12">
          <AvatarImage
            src={homePageUrl.upbitCoinImgUrl(
              ticker.replace(STABLE_COIN, "").toUpperCase()
            )}
            alt="coin-image"
            className="object-none"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="col">
          <div className="flex gap-1">
            <p className="text-foreground-toss">coin name</p>
            <p className="text-foreground-toss-ticker">ticker</p>
          </div>
          <div className="flex gap-2 text-toss-md font-semibold items-center">
            <p className="text-foreground-toss text-toss-xl font-bold">price</p>
            <div className="flex gap-1 text-foreground-toss-secondary flex-wrap">
              <p>dollar</p>
              <p>|</p>
              <p>어제보다</p>
              <p className="">changeRate</p>
            </div>
          </div>
        </div>
      </div>
      <CurrencySwitch leftText={DOLLAR} rightText={WON} />
    </div>
  );
}
