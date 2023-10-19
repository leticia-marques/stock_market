import { Quote } from "../../modules/stock_market/models/Quote";

export interface IApiClient {
    fetchStockByName(name:string): Promise<Quote | null>;
}