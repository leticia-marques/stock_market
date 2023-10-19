import { axios } from "./axiosConfig";
import { IApiClient } from "./IApiClient";
import { Quote } from "@modules/stock_market/models/Quote";
import { AppError } from "../errors/AppError";
import { IFetchHistoryDto } from "@modules/stock_market/dtos/IFetchHistoryDto";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../providers/dateProvider/IDateProvider";

export type timeSeriesDailyType = {
    [date: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    };
  };

@injectable()
export class AlphaApiClient implements IApiClient {

    constructor(private readonly apiKey: string, @inject("DateProvider") private dateProvider: IDateProvider) {
        if (!this.apiKey) {
            throw new AppError("Alphavantage key is missing. Make sure API_KEY var in set on you .env file", 404)
        }
    }
    
    async fetchStockByName(stockName: string): Promise<Quote | null> {
        const {data} = await axios.get(`query?function=GLOBAL_QUOTE&symbol=${stockName}&apikey=${process.env.API_KEY}`);
        const globalQuote = data["Global Quote"];

        if (Object.keys(globalQuote).length == 0) {
            return null
        }
        const quote = new Quote({
            name: globalQuote["01. symbol"],
            lastPrice: Number(globalQuote["05. price"]),
            pricedAt: new Date(globalQuote["07. latest trading day"])
        })
        return quote;
    }

    async fetchStockHistory(fetchHistory: IFetchHistoryDto): Promise<timeSeriesDailyType> {
        const {data} = await axios.get(`query?function=TIME_SERIES_DAILY&symbol=${fetchHistory.stockName}&outputsize=full&apikey=${process.env.API_KEY}`);
        const timesSeriesDaily = data["Time Series (Daily)"];
        const filteredStockByDate = this.getEntriesByDate(timesSeriesDaily, fetchHistory.to, fetchHistory.from);
        return filteredStockByDate;
    }

    getEntriesByDate(timesSeriesDaily:timeSeriesDailyType, to: string, from: string): timeSeriesDailyType {
        const filteredData: { [key: string]: any } = {};

        for (const date in timesSeriesDaily) {
            if (date >= from && date <= to) {
                filteredData[date]  = timesSeriesDaily[date];
            }
        }
        return filteredData;
    }

}