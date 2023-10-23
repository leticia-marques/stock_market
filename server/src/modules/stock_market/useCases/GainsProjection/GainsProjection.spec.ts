import { IApiClient } from "@shared/api/IApiClient";
import { GainsProjectionService } from "./GainsProjectionService";
import { AppError } from "@shared/errors/AppError";
import { FETCH_HISTORY_DATE } from "@__mocks__/fetchHistoryMock";
import sinon from "sinon";
import { container } from "tsyringe";
import request from "supertest";
import { app } from "@shared/infra/http/server";
import { MockApiClient } from "@__mocks__/apiClientMock";

let mockClientApi: IApiClient;
let gainsProjectionService: GainsProjectionService;
describe("Tests GainsProjection useCase", () => {
    beforeAll(() => {
        mockClientApi = new MockApiClient();
        gainsProjectionService = new GainsProjectionService(mockClientApi);

      });

    describe("Tests GainsProjectionService", () => {
        it ("shoud return a error for stock not found", async () => {
            mockClientApi.fetchStockHistory= jest.fn().mockResolvedValue(null);
            expect(() => gainsProjectionService
                    .execute({stockName:"Saticoy Steel", purchasedAt:"2022-10-08", purchasedAmount:"10"}))
                    .rejects.toEqual(new AppError("Stock not found", 404));
        })

        it ("should return a error for stock history not found", async () =>  {
          mockClientApi.fetchStockHistory = jest.fn().mockResolvedValue(FETCH_HISTORY_DATE);
          expect(() =>  gainsProjectionService
          .execute({stockName:"Saticoy Steel", purchasedAt:"2023-05-13", purchasedAmount:"10"}))
          .rejects.toEqual(new AppError("2023-05-13 history not found ", 404));
        })

        it ("should return a IStockGains object", async () => {
          mockClientApi.fetchStockHistory = jest.fn().mockResolvedValue(FETCH_HISTORY_DATE);
          const expectedStructure = {
            name: expect.any(String),
            lastPrice: expect.any(Number),
            priceAtDate:expect.any(Number),
            purchasedAmount: expect.any(Number),
            purchasedAt: expect.any(String),
            capitalGains: expect.any(Number),
          }
          const result = await gainsProjectionService.execute({
            stockName:"Saticoy Steel", 
            purchasedAt:"2023-05-15", 
            purchasedAmount:"10"
          });
          expect(result).toEqual(expect.objectContaining(expectedStructure));
        })
    })

    describe("Tests GainsProjectionController", () => {
      beforeAll(() => {
        sinon.stub(container, "resolve").returns(gainsProjectionService);
        gainsProjectionService.execute = jest.fn().mockResolvedValue(STOCK_GAINS);
      })

      it ("should return a 200 status", async () => {

        const result = await request(app).get("/stocks/saticoySteel/gains").query({
          purchasedAt: "2022-10-17",
          purchasedAmount: "10"
        });
        expect(result.status).toBe(200);
        expect(JSON.parse(result.text)).toEqual(STOCK_GAINS);
      })

      it ("Should return a 404 error query purchasedAt should be a date", async () => {
        const result = await request(app).get("/stocks/saticoySteel/gains").query({
          purchasedAt: "dois",
          purchasedAmount: "10"
        });
        expect(result.status).toEqual(404);
        expect(JSON.parse(result.text)["message"]).toEqual("purchasedAt should be a date");
      })

      it ("Should return a 404 error query purchasedAmount can't be empty", async () => {
        const result = await request(app).get("/stocks/saticoySteel/gains").query({
          purchasedAt: "2022-10-17",
        });
        expect(result.status).toEqual(404);
        expect(JSON.parse(result.text)["message"]).toEqual("purchasedAmount is a required field");
        
      })
    })
})

  const STOCK_GAINS = {
    "name": "Saticoy Steel",
    "lastPrice": 12.41,
    "priceAtDate": 13.28,
    "purchasedAmount": 10,
    "purchasedAt": "2022-10-17",
    "capitalGains": -8.7
  }