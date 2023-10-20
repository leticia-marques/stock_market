import { axios } from "./axiosConfig";
import { IApiClient } from "./IApiClient";
import { Quote } from "@modules/stock_market/models/Quote";
import { AppError } from "../errors/AppError";
import { IFetchHistoryDto } from "@modules/stock_market/dtos/IFetchHistoryDto";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../providers/dateProvider/IDateProvider";
import { historyDataStructure} from "@modules/stock_market/types/types";
import { getEntriesByDate } from "@modules/stock_market/utils/helperFunctions";

@injectable()
export class AlphaApiClient implements IApiClient {

    constructor(private readonly apiKey: string, @inject("DateProvider") private dateProvider: IDateProvider) {
        if (!this.apiKey) {
            throw new AppError("Alphavantage api key is missing. Make sure API_KEY var in set on you .env file", 404)
        }
    }
    
    async fetchStockByName(stockName: string): Promise<Quote | null> {
        const {data} = await axios.get(`query?function=GLOBAL_QUOTE&symbol=${stockName}&apikey=${process.env.API_KEY}`);
        const globalQuote = data["Global Quote"];
        if (Object.keys(globalQuote).length === 0) {
            return null
        }
        
        return new Quote({
            name: globalQuote["01. symbol"],
            lastPrice: Number(globalQuote["05. price"]),
            pricedAt: globalQuote["07. latest trading day"]
        })
    }

    async fetchStockHistory(fetchHistory: IFetchHistoryDto): Promise<historyDataStructure | null> {
        const {data} = await axios.get(`query?function=TIME_SERIES_DAILY&symbol=${fetchHistory.stockName}&outputsize=full&apikey=${process.env.API_KEY}`);
        const timesSeriesDaily = data["Time Series (Daily)"];
        if (!timesSeriesDaily) {
            return null
        }
        const filteredStockByDate = getEntriesByDate(timesSeriesDaily, fetchHistory.to, fetchHistory.from);
        return filteredStockByDate;
    }


}