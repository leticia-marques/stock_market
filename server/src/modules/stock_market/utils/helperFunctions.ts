import { historyDataStructure, stockDataStructure } from "../types/types";

export function getLatestStockData(
  history: historyDataStructure
): stockDataStructure {
  const historyArray = Object.entries(history);
  const latestStockData = historyArray[0][1];
  return latestStockData;
}

export function getStockByDate(
  history: historyDataStructure,
  date: string
): stockDataStructure {
  const stock = history[date];
  return stock;
}

export function getEntriesByDate(
  timesSeriesDaily: historyDataStructure,
  to: string,
  from: string
): historyDataStructure {
  const filteredData: { [key: string]: any } = {};

  for (const date in timesSeriesDaily) {
    if (date >= from && date <= to) {
      filteredData[date] = timesSeriesDaily[date];
    }
  }
  return filteredData;
}
