import { IApiClient } from "@shared/api/IApiClient";
import { IFetchHistoryDto } from "@modules/stock_market/dtos/IFetchHistoryDto";
import { Quote } from "@modules/stock_market/models/Quote";
import { IHistoryDataStructure } from "@modules/stock_market/types/types";
import sinon from "sinon";
import { container } from "tsyringe";
import { app } from "@shared/infra/http/server";
import request from "supertest";
import { AppError } from "@shared/errors/AppError";
import { FetchStockCurrentPriceService } from "./FetchStockCurrentPriceService";
import { FetchStockCurrentPriceController } from "./FetchStockCurrentPriceController";

let mockClientApi: IApiClient;
let fetchStockCurrentPriceService:FetchStockCurrentPriceService;
let fetchStockCurrentPriceController: FetchStockCurrentPriceController;
let quote: Quote;
describe("Tests fetchStockByName useCase", () => {
  beforeAll(() => {
    mockClientApi = new MockApiClient();
    fetchStockCurrentPriceService = new FetchStockCurrentPriceService(mockClientApi);
    fetchStockCurrentPriceController = new FetchStockCurrentPriceController();
    quote = new Quote({
      name: "Dunder Mifflin",
      lastPrice: 18.5,
      pricedAt: "2023-10-20",
    });
  });

  describe("test FetchByNameService", () => {
    it("Should return a Quote object", async () => {
      jest.spyOn(mockClientApi, "fetchStockByName").mockResolvedValue(quote);
      const result = await fetchStockCurrentPriceService.execute("Dunder Mifflin");
      expect(result).toEqual(quote);
    });

    it("Should return an error", async () => {
      jest.spyOn(mockClientApi, "fetchStockByName").mockResolvedValue(null);
      expect(() =>
        fetchStockCurrentPriceService.execute("Dunder Mifflin")
      ).rejects.toEqual(new AppError("Stock name not found", 404));
    });
  });

  describe("Tests FetchByNameController", () => {
    beforeAll(() => {
      sinon.stub(container, "resolve").returns(fetchStockCurrentPriceService);
    });

    it("should return a 200 status", async () => {
      fetchStockCurrentPriceService.execute = jest.fn().mockResolvedValue(quote);
      const response = await request(app).get("/stock/:stockName/quote");

      expect(response.status).toBe(200);
      expect(JSON.parse(response.text)).toEqual(quote);
    });
  });
});

class MockApiClient implements IApiClient {
  fetchStockByName(name: string): Promise<Quote | null> {
    return null;
  }
  fetchStockHistory(
    fetchHistory: IFetchHistoryDto
  ): Promise<IHistoryDataStructure | null> {
    return null;
  }
}
