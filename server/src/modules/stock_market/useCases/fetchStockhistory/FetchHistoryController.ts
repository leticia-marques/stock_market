import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchHistoryService } from "./FetchHistoryService";

export class FetchHistoryController {
    async handle(req: Request, res: Response): Promise<Response> {
        const fetchHistoryService = container.resolve(FetchHistoryService);
        const stockName = req.params.stockName;
        const {from, to} = req.query as {from: string, to: string};
        const history = await fetchHistoryService.execute({stockName, from, to});
        return res.status(200).json(history);
    }
}