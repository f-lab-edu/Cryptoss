import Dexie, { Table } from "dexie";

export interface Ticker {
  id: number;
  symbol: string;
}

class TickerDB extends Dexie {
  tickers!: Table<Ticker, number>;

  constructor() {
    super("TickerDB");
    this.version(1).stores({
      tickers: "&id, symbol",
    });
  }
}

export const db = new TickerDB();
