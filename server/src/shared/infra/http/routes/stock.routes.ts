import { Router } from "express";
import { FetchStockByNameController } from "@modules/stock_market/useCases/fetchStockByName/FetchStockByNameController";
import { FetchHistoryController } from "@modules/stock_market/useCases/fetchStockhistory/FetchHistoryController";
import { fetchStockByNameValidation } from "@modules/stock_market/validators/fetchStockByName.schema";
import { fetchStockHistoryValidation } from "@modules/stock_market/validators/fetchStockHistory.schema";
import { GainsProjectionController } from "@modules/stock_market/useCases/GainsProjection/GainsProjectionController";
import { CompareStocksController } from "@modules/stock_market/useCases/compareStocks/CompareStocksController";

const fetchStockByName = new FetchStockByNameController();
const fetchHistoryController = new FetchHistoryController();
const gainsProjectionController = new GainsProjectionController();
const compareStocksController = new CompareStocksController();
const stockRoutes = Router();

stockRoutes.get("/stock/:stockName/quote", fetchStockByNameValidation,fetchStockByName.handle);
stockRoutes.get("/stocks/:stockName/history", fetchStockHistoryValidation,fetchHistoryController.handle);
stockRoutes.get("/stocks/:stockName/gains", gainsProjectionController.handle);
stockRoutes.get("/stocks/:stockName/compare", compareStocksController.handle);
export {stockRoutes};