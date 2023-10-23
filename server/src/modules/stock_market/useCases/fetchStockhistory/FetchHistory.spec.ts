import { IApiClient } from "@shared/api/IApiClient";
import { AppError } from "@shared/errors/AppError";
import { FetchHistoryService } from "./FetchHistoryService";
import { FetchHistoryController } from "./FetchHistoryController";;
import { DateProvider } from "@shared/providers/dateProvider/DateProvider";
import { IDateProvider } from "@shared/providers/dateProvider/IDateProvider";
import {FETCH_HISTORY_DATE} from "@__mocks__/fetchHistoryMock";
import { container } from "tsyringe";
import sinon from "sinon";
import request from "supertest";
import { app } from "@shared/infra/http/server";
import {HISTORY} from "@__mocks__/fetchHistoryServiceReturnMock";
import { MockApiClient } from "@__mocks__/apiClientMock";

let mockClientApi: IApiClient;
let fetchHistoryService: FetchHistoryService;
let fetchHistoryController: FetchHistoryController;
let dateProvider: IDateProvider;

describe("Tests FetchHistory useCase", () => {
    beforeAll(() => {
        mockClientApi = new MockApiClient();
        dateProvider = new DateProvider()
        fetchHistoryService = new FetchHistoryService(mockClientApi, dateProvider);
        fetchHistoryController = new FetchHistoryController();
      });

      describe("Tests fetchHistoryService", () => {
        it ("Should return an error for stock not found", async () => {
            mockClientApi.fetchStockHistory =  jest.fn().mockResolvedValue(null);
            expect(async () =>  await fetchHistoryService.execute({stockName:"Athlead", from: "2022-10-08", to: "2023-10-08"}))
                    .rejects.toEqual(new AppError("Stock not found", 404));
        })
        it ("Should return an error for wrong date range", async () => {
            mockClientApi.fetchStockHistory =  jest.fn().mockResolvedValue(null);
            expect(async () =>  await fetchHistoryService.execute({stockName:"Athlead", from:"2023-10-08" , to:"2022-10-08"}))
            .rejects.toEqual(new AppError("The final date needs to be greater than initial date", 400));
        })

        it ("should return an history object", async () => {
            mockClientApi.fetchStockHistory =  jest.fn().mockResolvedValue(FETCH_HISTORY_DATE);
            const result =  await fetchHistoryService.execute({stockName:"Athlead", from:"2022-10-08" , to:"2023-10-08"});
            expect(result).toHaveProperty('name');
            expect(result).toHaveProperty('prices');
            expect(result.prices).not.toBe(null);
        })
      })

      describe("Tests FetchHistoryController", () => {
        beforeAll(() => {
            sinon.stub(container, "resolve").returns(fetchHistoryService);
        })
        it ("should return a 200 status", async () => {
            fetchHistoryService.execute = jest.fn().mockResolvedValue(HISTORY)
            const result = await request(app).get("/stocks/athlead/history").query({
                from: "2022-10-08",
                to: "2023-10-08"
            })
            expect(result.status).toBe(200);
            expect(JSON.parse(result.text)).toEqual(HISTORY);
        })

        it ("should return a 404 status query FROM missing", async () => {
            fetchHistoryService.execute = jest.fn().mockResolvedValue(HISTORY)
            const result = await request(app).get("/stocks/athlead/history");
            expect(result.status).toBe(404);
            expect(JSON.parse(result.text)["message"]).toEqual("from is a required field");
        })

        it ("should return a 404 status query TO missing", async () => {
            fetchHistoryService.execute = jest.fn().mockResolvedValue(HISTORY)
            const result = await request(app).get("/stocks/athlead/history").query({
                from: "2022-10-08"
            });
            expect(result.status).toBe(404);
            expect(JSON.parse(result.text)["message"]).toEqual("to is a required field");
        })

        
      })
    
})