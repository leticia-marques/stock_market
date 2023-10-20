export interface HistoryEntry  {
  opening: number;
  low: number;
  high: number;
  closing: number;
  pricedAt: string;
  volume: number;
}

export interface historyDataStructure  {
    [date: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    };
  };

  export interface stockDataStructure  {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  }