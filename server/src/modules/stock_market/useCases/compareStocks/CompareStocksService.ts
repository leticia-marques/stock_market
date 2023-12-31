import { Quote } from "@modules/stock_market/models/Quote";
import { filterDuplicates } from "@modules/stock_market/utils/helperFunctions";
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
        const stocksArrayWithoutDuplicates = filterDuplicates(stocks, stockName);
        if (stocksArrayWithoutDuplicates.length == 0) {
            throw new AppError("stocks must have different names", 400);
        }
        const stockToCompareHistory = await this.clientApi.fetchStockByName(stockName);
        if (!stockToCompareHistory) {
            throw new AppError(`${stockName} not found`, 404);
        }
        stocksHistory.push(stockToCompareHistory);

        for (const stock of stocksArrayWithoutDuplicates) {
            const stockLatestQuote = await this.clientApi.fetchStockByName(stock);
            if (stockLatestQuote) {
                stocksHistory.push(stockLatestQuote);
            }
        }
        if (stocksHistory.length == 1) {
            throw new AppError(`${stocks[0]} and ${stocks[1]} were not found`, 404);
        }
        return {lastPrices: stocksHistory};
    }
}
