export interface IHistoryEntry  {
  opening: number;
  low: number;
  high: number;
  closing: number;
  pricedAt: string;
  volume: number;
}

export interface IHistoryDataStructure  {
    [date: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    };
  };

  export interface IStockDataStructure  {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  }