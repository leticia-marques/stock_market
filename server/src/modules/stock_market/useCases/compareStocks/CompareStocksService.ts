import { Quote } from "@modules/stock_market/models/Quote";
import { IApiClient } from "@shared/api/IApiClient";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IComparisonResult {
    lastPrices: Quote[];
}

@injectable()
export class CompareStockService {
    constructor(@inject("ClientApi") private clientApi: IApiClient) {}

    async execute(stockName: string, stocks: string[]): Promise<IComparisonResult> {
        const stocksHistory: Quote[] = [];
        const stockToCompareHistory = await this.clientApi.fetchStockByName(stockName);
        if (!stockToCompareHistory) {
            throw new AppError(`${stockName} not found`, 404);
        }
        stocksHistory.push(stockToCompareHistory);

        for (const stock of stocks) {
            const stockLatestQuote = await this.clientApi.fetchStockByName(stock);
            if (stockLatestQuote) {
                stocksHistory.push(stockLatestQuote);
            }

        }
        return {lastPrices: stocksHistory};
    }
}