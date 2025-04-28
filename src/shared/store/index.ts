import { create } from "zustand";

interface CurrencyExchangeState {
  isKrw: boolean;
}

interface CurrencyExchangeSetState {
  setIsKrw: (isKrw: boolean) => void;
}

const useCurrencyExchangeStore = create<
  CurrencyExchangeState & CurrencyExchangeSetState
>((set) => ({
  isKrw: false,
  setIsKrw: (isKrw: boolean) => set({ isKrw }),
}));

export default useCurrencyExchangeStore;
