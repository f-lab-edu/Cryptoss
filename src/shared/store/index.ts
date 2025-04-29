import { create } from "zustand";

interface CurrencyExchangeState {
  isKrw: boolean;
  exchangeError: boolean;
}

interface CurrencyExchangeSetState {
  setIsKrw: (isKrw: boolean) => void;
  setExchangeError: (exchangeError: boolean) => void;
}

const useCurrencyExchangeStore = create<
  CurrencyExchangeState & CurrencyExchangeSetState
>((set) => ({
  isKrw: false,
  setIsKrw: (isKrw: boolean) => set({ isKrw }),
  exchangeError: false,
  setExchangeError: (exchangeError: boolean) => set({ exchangeError }),
}));

export default useCurrencyExchangeStore;
