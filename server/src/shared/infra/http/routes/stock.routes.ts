import { Router } from "express";
import { FetchStockByNameController } from "../../../../modules/stock_market/useCases/fetchStockByName/FetchStockByNameController";
import { FetchHistoryController } from "../../../../modules/stock_market/useCases/fetchStockhistory/FetchHistoryController";

const fetchStockByName = new FetchStockByNameController();
const fetchHistoryController = new FetchHistoryController();
const stockRoutes = Router();

stockRoutes.get("/stock/:stockName/quote", fetchStockByName.handle);
stockRoutes.get("/stocks/:stockName/history", fetchHistoryController.handle);

export {stockRoutes};