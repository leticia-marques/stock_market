import { Request, Response } from "express";
import { container } from "tsyringe";
import { GainsProjectionService } from "./GainsProjectionService";

export class GainsProjectionController {
    async handle(req: Request, res: Response): Promise<Response> {
        const gainsProjectionService = container.resolve(GainsProjectionService);
        const stockName = req.params.stockName;
        const {purchasedAt, purchasedAmount} = req.query as {purchasedAt: string, purchasedAmount: string};
        const gains = await gainsProjectionService.execute({stockName, purchasedAt, purchasedAmount});
        return res.status(200).json(gains);
    }
}