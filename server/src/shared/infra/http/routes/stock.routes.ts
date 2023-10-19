import { Router } from "express";
import { FetchStockByNameController } from "../../../../modules/stock_market/useCases/fetchStockByName/FetchStockByNameController";

const fetchStockByName = new FetchStockByNameController();
const stockRoutes = Router();

stockRoutes.get("/stock/:stockName/quote", fetchStockByName.handle);


export {stockRoutes};