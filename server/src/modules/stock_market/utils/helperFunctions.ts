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
