import { IFetchHistoryDto } from "@modules/stock_market/dtos/IFetchHistoryDto";
import { Quote } from "@modules/stock_market/models/Quote";
import { IHistoryDataStructure } from "@modules/stock_market/types/types";
import { IApiClient } from "@shared/api/IApiClient";

export class MockApiClient implements IApiClient {
    fetchStockByName(name: string): Promise<Quote | null> {
      return null;
    }
    fetchStockHistory(
      fetchHistory: IFetchHistoryDto
    ): Promise<IHistoryDataStructure | null> {
      return null;
    }
  }
