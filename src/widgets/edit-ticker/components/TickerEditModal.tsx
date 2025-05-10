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
import useTickerApi from "@/shared/hooks/useTickerApi";
import { useMemo, useState } from "react";
import { MinusIcon } from "lucide-react";
import useBinanceSymbols from "@/widgets/edit-ticker/hooks/useBinanceSearch";

export default function TickerEditModal() {
  const { tickers, addTicker, removeTicker } = useTickerApi();
  const [value, setValue] = useState("");
  const { symbols } = useBinanceSymbols();
  const filtered = useMemo(() => {
    if (!value) return symbols;
    const q = value.toUpperCase();
    return symbols.filter(
      (s) => s.symbol.includes(q) || s.baseAsset.includes(q)
    );
  }, [symbols, value]);

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
      <DialogContent className="sm:max-w-[425px] max-h-[500px] bg-background-toss-secondary border-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-foreground-toss">
            종목 추가/삭제
          </DialogTitle>
        </DialogHeader>
        <div className="col gap-4">
          <div className="relative text-foreground-toss-tertiary">
            <SearchIcon className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-2" />
            <Input
              className="pl-8"
              placeholder="심볼명으로 검색하세요."
              value={value}
              onChange={(e) => setValue(e.target.value.toUpperCase())}
            />
          </div>
          <div className="max-h-[400px] overflow-auto pb-5">
            <div className="col gap-4">
              {value ? (
                filtered.length > 0 ? (
                  <TickerCard
                    src={commonUrl.upbitCoinImgUrl(value)}
                    ticker={value}
                  >
                    <div className="rounded-full bg-background-toss-tertiary flex-center w-6 h-6 hover:bg-background-toss-tertiary/50 cursor-pointer">
                      {tickers.find((ticker) => ticker.symbol === value) ? (
                        <MinusIcon
                          className="text-foreground-toss-bull w-5 h-5"
                          onClick={() =>
                            removeTicker(
                              tickers.find((ticker) => ticker.symbol === value)!
                                .id
                            )
                          }
                        />
                      ) : (
                        <PlusIcon
                          className="text-green-600 w-5 h-5"
                          onClick={() => addTicker(value)}
                        />
                      )}
                    </div>
                  </TickerCard>
                ) : (
                  <p className="text-center text-foreground-toss-secondary text-toss-md">
                    조회 결과가 없습니다.
                  </p>
                )
              ) : (
                tickers.map((ticker) => (
                  <TickerCard
                    src={commonUrl.upbitCoinImgUrl(ticker.symbol)}
                    ticker={ticker.symbol}
                    key={ticker.id}
                  >
                    <div className="rounded-full bg-background-toss-tertiary flex-center w-6 h-6 hover:bg-background-toss-tertiary/50 cursor-pointer">
                      <MinusIcon
                        className="text-foreground-toss-bull w-5 h-5"
                        onClick={() => removeTicker(ticker.id)}
                      />
                    </div>
                  </TickerCard>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
