import { container, inject, injectable } from "tsyringe";
import { IApiClient } from "../../../../shared/api/IApiClient";
import { Quote } from "../../models/Quote";
import { AppError } from "../../../../shared/errors/AppError";
import { AlphaApiClient } from "../../../../shared/api/apiClient";

@injectable()
export class FetchStockByNameService {
    constructor(@inject("ClientApi") private clientApi: IApiClient) {}

    async execute(stockName: string): Promise<Quote> {
        const quote = await this.clientApi.fetchStockByName(stockName);
        if (!quote) {
            throw new AppError("Stock name not found", 404)
        }
        return quote;
    }
}