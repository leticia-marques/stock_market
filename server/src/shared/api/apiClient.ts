import { axios } from "./axiosConfig";
import { IApiClient } from "./IApiClient";
import { Quote } from "../../modules/stock_market/models/Quote";
import { AppError } from "../errors/AppError";

export class AlphaApiClient implements IApiClient {

    constructor(private readonly apiKey: string) {
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

}