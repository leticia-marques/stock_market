import { IFetchHistoryDto } from "@modules/stock_market/dtos/IFetchHistoryDto";
import { Quote } from "@modules/stock_market/models/Quote";
import { IHistoryDataStructure} from "@modules/stock_market/types/types";

export interface IApiClient {
    fetchStockByName(name:string): Promise<Quote | null>;
    fetchStockHistory(fetchHistory: IFetchHistoryDto): Promise<IHistoryDataStructure | null>;
}