import { Router } from "express";
import { FetchStockByNameController } from "@modules/stock_market/useCases/fetchStockByName/FetchStockByNameController";
import { FetchHistoryController } from "@modules/stock_market/useCases/fetchStockhistory/FetchHistoryController";
import { fetchStockByNameValidation } from "@modules/stock_market/validators/fetchStockByName.schema";
import { fetchStockHistoryValidation } from "@modules/stock_market/validators/fetchStockHistory.schema";

const fetchStockByName = new FetchStockByNameController();
const fetchHistoryController = new FetchHistoryController();
const stockRoutes = Router();

stockRoutes.get("/stock/:stockName/quote", fetchStockByNameValidation,fetchStockByName.handle);
stockRoutes.get("/stocks/:stockName/history", fetchStockHistoryValidation,fetchHistoryController.handle);
// /stocks/${stockName}/gains?purchasedAt=${purchasedAtTxt}&purchasedAmount=${amount}
// stockRoutes.get("/stocks/:stockName/gains")

export {stockRoutes};