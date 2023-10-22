import { IFetchHistoryDto } from "@modules/stock_market/dtos/IFetchHistoryDto";
import { Quote } from "@modules/stock_market/models/Quote";
import { IHistoryDataStructure } from "@modules/stock_market/types/types";
import { IApiClient } from "@shared/api/IApiClient";
import { CompareStockService } from "./CompareStocksService";
import { AppError } from "@shared/errors/AppError";
import { container } from "tsyringe";
import sinon from "sinon";
import request from "supertest";
import { app } from "@shared/infra/http/server";
import * as utils from "@modules/stock_market/utils/helperFunctions";

let mockClientApi: IApiClient;
let compareStocksService: CompareStockService;
describe("Tests compareStocks useCase", () => {
    beforeAll(() => {
        mockClientApi = new MockApiClient();
        compareStocksService = new CompareStockService(mockClientApi);
      });

      describe("Tests compareStocksService",  () => {
        it ("should return an error if stock to be compared to is not found", async () => {
            mockClientApi.fetchStockByName = jest.fn().mockResolvedValue(null);
            expect(() =>  compareStocksService.execute("Staples", ["ibm", "acer"]))
                .rejects.toEqual(new AppError(`Staples not found`, 404));
        })

        it ("should return an error if none of stocks to be compared are found", async () => {
            mockClientApi.fetchStockByName = jest.fn().mockResolvedValueOnce({
                "name": "Staples",
                "lastPrice": 12.41,
                "pricedAt": "2023-10-20"
            });

            expect(() =>  compareStocksService.execute("Staples", ["ShoeLala", "Michael Scott Paper Company"]))
                .rejects.toEqual(new AppError("ShoeLala and Michael Scott Paper Company were not found", 404));
        })

        it ("should return an error if none of stocks to be compared are found", async () => {
         const mockFilterDuplicates = jest.fn().mockReturnValue([])

         jest.spyOn(utils, "filterDuplicates").mockImplementation(mockFilterDuplicates);
          expect(() =>  compareStocksService.execute("Staples", ["Staples", "Staples"]))
              .rejects.toEqual(new AppError("stocks must have different names", 400));
      })
      })

      describe("Tests compareStocksController", () => {
        beforeAll(() =>{
            sinon.stub(container, "resolve").returns(compareStocksService);
        })

        it ("should return a 200 status", async () => {
            compareStocksService.execute = jest.fn().mockResolvedValue(COMPARISON_RESULT);
            const result = await request(app).get("/stocks/staples/compare").query({
                stocksToCompare: ["shoeLaLa", "Dunder Mifflin"]
            });
            expect(result.status).toBe(200);
            expect(JSON.parse(result.text)).toEqual(COMPARISON_RESULT);
        })

        it ("should return a 404 status stocksToCompare can't be empty", async () => {
            compareStocksService.execute = jest.fn().mockResolvedValue(COMPARISON_RESULT);
            const result = await request(app).get("/stocks/staples/compare").query({
            });
            expect(result.status).toBe(404);
            expect(JSON.parse(result.text)["message"]).toEqual("stocksToCompare is a required field");
        })
      })
})

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


const COMPARISON_RESULT = {
    "lastPrices": [
        {
            "name": "VALE",
            "lastPrice": 12.41,
            "pricedAt": "2023-10-20"
        },
        {
            "name": "ACER",
            "lastPrice": 0.8271,
            "pricedAt": "2023-10-20"
        }
    ]
}