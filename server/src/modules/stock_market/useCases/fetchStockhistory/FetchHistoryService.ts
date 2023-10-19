import { inject, injectable } from "tsyringe";
import { IApiClient } from "../../../../shared/api/IApiClient";
import { IDateProvider } from "../../../../shared/providers/dateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { HistoryEntry, History } from "../../models/History";

interface IRequest {
    stockName: string;
    from: string;
    to: string;
}
@injectable()
export class FetchHistoryService {
    constructor(@inject("ClientApi") private clientApi: IApiClient, @inject("DateProvider") private dateProvider: IDateProvider) {}

    async execute(fetchHistory: IRequest): Promise<History> {
       const compareInDays = this.dateProvider.compareInDays(new Date(fetchHistory.from), new Date(fetchHistory.to));
       if (compareInDays < 1) {
            throw new AppError("The final date needs to be greater than initial date", 400);
       }
       const stockHistoryByDate = await this.clientApi.fetchStockHistory(fetchHistory);
        const historyEntries: HistoryEntry[] = Object.entries(stockHistoryByDate).map(([date, data]) => {
        const { '1. open': opening, '3. low': low, '2. high': high, '4. close': closing, '5. volume': volume } = data;
        return {
          opening: Number(opening),
          low: Number(low),
          high: Number(high),
          closing: Number(closing),
          pricedAt: date,
          volume: Number(volume)
        };
      });
      
       return new History({name: fetchHistory.stockName, prices: historyEntries});
    }
}