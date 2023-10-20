import { IFetchHistoryDto } from "@modules/stock_market/dtos/IFetchHistoryDto";
import { Quote } from "@modules/stock_market/models/Quote";
import { stockDataStructure } from "@modules/stock_market/types/types";

export interface IApiClient {
    fetchStockByName(name:string): Promise<Quote | null>;
    fetchStockHistory(fetchHistory: IFetchHistoryDto): Promise<stockDataStructure | null>;
}