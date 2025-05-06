import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import PlusIcon from "@/assets/icons/plus.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";
import TickerCard from "@/shared/components/common/TickerCard";
import { commonUrl } from "@/shared/api/api";

const symbols = ["BTC", "ETH"];

export default function TickerEditModal() {
  return (
    <Dialog>
      <DialogTrigger asChild role="button">
        <div className="flex gap-2 px-1 py-2 items-center cursor-pointer hover:bg-background-toss-hover rounded-[10px]">
          <div className="text-foreground-toss-bear w-[30px] h-[30px] rounded-full bg-background-toss-tertiary flex-center">
            <PlusIcon />
          </div>
          <p className="text-foreground-toss text-toss-lg font-semibold">
            추가하기
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background-toss-secondary border-0">
        <DialogHeader>
          <DialogTitle className="text-foreground-toss">
            종목 추가/삭제
          </DialogTitle>
        </DialogHeader>
        <div className="col gap-4">
          <div className="relative text-foreground-toss-tertiary">
            <SearchIcon className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-2" />
            <Input className="pl-8" placeholder="심볼명으로 검색하세요." />
          </div>
          {symbols.map((symbol) => (
            <TickerCard src={commonUrl.upbitCoinImgUrl(symbol)} ticker={symbol}>
              <div className="rounded-full bg-background-toss-tertiary flex-center w-6 h-6 hover:bg-background-toss-tertiary/50 cursor-pointer">
                <PlusIcon className="text-green-600 w-5 h-5" />
              </div>
            </TickerCard>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
