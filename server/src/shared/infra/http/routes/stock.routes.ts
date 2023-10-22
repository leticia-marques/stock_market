import { Router } from "express";
import { FetchHistoryController } from "@modules/stock_market/useCases/fetchStockhistory/FetchHistoryController";
import { fetchStockHistoryValidation } from "@modules/stock_market/validators/fetchStockHistory.schema";
import { GainsProjectionController } from "@modules/stock_market/useCases/GainsProjection/GainsProjectionController";
import { CompareStocksController } from "@modules/stock_market/useCases/compareStocks/CompareStocksController";
import { gainsProjectionValidation } from "@modules/stock_market/validators/gainsProjection.schema";
import { compareStocksValidation } from "@modules/stock_market/validators/compareStocks.schema";
import { FetchStockCurrentPriceController } from "@modules/stock_market/useCases/fetchStockCurrentPrice/FetchStockCurrentPriceController";
import { fetchStockCurrentPriceValidation } from "@modules/stock_market/validators/fetchStockByName.schema";

const fetchStockCurrentPrice = new FetchStockCurrentPriceController();
const fetchHistoryController = new FetchHistoryController();
const gainsProjectionController = new GainsProjectionController();
const compareStocksController = new CompareStocksController();
const stockRoutes = Router();

stockRoutes.get("/stock/:stockName/quote", fetchStockCurrentPriceValidation, fetchStockCurrentPrice.handle);
stockRoutes.get("/stocks/:stockName/history", fetchStockHistoryValidation,fetchHistoryController.handle);
stockRoutes.get("/stocks/:stockName/gains", gainsProjectionValidation, gainsProjectionController.handle);
stockRoutes.get("/stocks/:stockName/compare", compareStocksValidation,  compareStocksController.handle);

export { stockRoutes };
