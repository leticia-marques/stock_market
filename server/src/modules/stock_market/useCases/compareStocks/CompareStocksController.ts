import { Request, Response } from "express";
import { container} from "tsyringe";
import { CompareStockService } from "./CompareStocksService";

export class CompareStocksController {
    async handle(req: Request, res: Response): Promise<Response> {
        const compareStocksService = container.resolve(CompareStockService);
        const stockName = req.params.stockName;
        const stocks = req.query.stocksToCompare as string[];
        const compareStocks = await compareStocksService.execute(stockName, stocks);
        return res.status(200).json(compareStocks);
    }
}