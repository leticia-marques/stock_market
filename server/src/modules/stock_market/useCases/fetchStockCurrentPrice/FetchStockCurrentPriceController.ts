import { Request, Response } from "express";
import { container } from "tsyringe";
import {FetchStockCurrentPriceService } from "./FetchStockCurrentPriceService";

export class FetchStockCurrentPriceController {
  async handle(req: Request, res: Response): Promise<Response> {
    const fetchStockByNameService = container.resolve(FetchStockCurrentPriceService);
    const stockName = req.params.stockName;
    const quote = await fetchStockByNameService.execute(stockName);
    return res.status(200).json(quote);
  }
}
