import { getLatestStockData, getStockByDate} from "@modules/stock_market/utils/helperFunctions";
import { IApiClient } from "@shared/api/IApiClient";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  stockName: string;
  purchasedAt: string;
  purchasedAmount: string;
}

interface IStockGains {
  name: string;
  lastPrice: number;
  priceAtDate: number;
  purchasedAmount: number;
  purchasedAt: string;
  capitalGains: number;
}

@injectable()
export class GainsProjectionService {
  constructor(
    @inject("ClientApi") private clientApi: IApiClient) {}

  async execute(data: IRequest): Promise<IStockGains> {
    const latestDate = new Date().toISOString().split("T")[0];
    const history = await this.clientApi.fetchStockHistory({
      stockName: data.stockName,
      from: data.purchasedAt,
      to: latestDate,
    });
    if (!history) {
      throw new AppError("Stock not found", 404);
    }
    if (!history[data.purchasedAt]) {
      throw new AppError(`${data.purchasedAt} history not found `, 404);
    }

    const latestStockData = getLatestStockData(history);
    const stockOnPurchasedDate = getStockByDate(history, data.purchasedAt);
    const totalPaid =
      Number(data.purchasedAmount) * Number(stockOnPurchasedDate["4. close"]);
    const currentTotalValue =
      Number(data.purchasedAmount) * Number(latestStockData["4. close"]);
    const gains = currentTotalValue - totalPaid;

    return {
        name: data.stockName,
        lastPrice: Number(latestStockData["4. close"]),
        priceAtDate: Number(stockOnPurchasedDate["4. close"]),
        purchasedAmount: Number(data.purchasedAmount),
        purchasedAt: data.purchasedAt,
        capitalGains: Number(gains.toFixed(3))
    }
  }
}
