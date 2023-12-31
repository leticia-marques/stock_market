import { IHistoryDataStructure, IStockDataStructure } from "../types/types";

export function getLatestStockData(
  history: IHistoryDataStructure
): IStockDataStructure {
  const historyArray = Object.entries(history);
  const latestStockData = historyArray[0][1];
  return latestStockData;
}

export function getStockByDate(
  history: IHistoryDataStructure,
  date: string
): IStockDataStructure {
  const stock = history[date];
  return stock;
}

export function getEntriesByDate(
  timesSeriesDaily: IHistoryDataStructure,
  to: string,
  from: string
): IHistoryDataStructure {
  const filteredData: { [key: string]: any } = {};

  for (const date in timesSeriesDaily) {
    if (date >= from && date <= to) {
      filteredData[date] = timesSeriesDaily[date];
    }
  }
  return filteredData;
}


export function filterDuplicates(stocks: string[], stockName: string): string[]{
    let stocksArrayWithoutDuplicates = new Set();
    return stocks.filter(stock => {
      if (!stocksArrayWithoutDuplicates.has(stock.toLocaleLowerCase()) && stock.toLocaleLowerCase() !== stockName.toLocaleLowerCase()) {
          stocksArrayWithoutDuplicates.add(stock.toLocaleLowerCase);
          return true;
      }
      return false;
    })
}