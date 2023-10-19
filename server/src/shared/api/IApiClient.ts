import { IFetchHistoryDto } from "@modules/stock_market/dtos/IFetchHistoryDto";
import { Quote } from "@modules/stock_market/models/Quote";
import { timeSeriesDailyType } from "./apiClient";

export interface IApiClient {
    fetchStockByName(name:string): Promise<Quote | null>;
    fetchStockHistory(fetchHistory: IFetchHistoryDto): Promise<timeSeriesDailyType>;
}