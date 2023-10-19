import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchStockByNameService} from "./FetchStockByNameService";
import { AppError } from "../../../../shared/errors/AppError";

export class FetchStockByNameController {
    async handle(req: Request, res: Response): Promise<Response> {
        const fetchStockByNameService = container.resolve(FetchStockByNameService);
        const stockName = req.params.stockName;
        if (!stockName) {
            throw new AppError("stock name is missing", 404);
        }
        const quote = await fetchStockByNameService.execute(stockName);
        return res.status(200).json(quote);
    }
}