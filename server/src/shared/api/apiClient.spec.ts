import { AppError } from "@shared/errors/AppError";
import { AlphaApiClient } from "./apiClient";
import axios from "axios";
import { GLOBAL_MARKET } from "../../__mocks__/globalMock";
import {HISTORY_MOCK} from "../../__mocks__/historyMock";
import { IApiClient } from "./IApiClient";
import { Quote } from "@modules/stock_market/models/Quote";

jest.mock("axios");

let apiClient: IApiClient;

describe("Tests AlphaApiClient", () => {
   beforeAll(() => {
      apiClient = new AlphaApiClient("testKey");
   })
   describe("tests fetchByName", () => {
      it("Should throw an error for missing apiKey", () => {
         expect(async () =>  new AlphaApiClient("")).rejects.toBeInstanceOf(AppError);
    })
 
    it ("Should return a  quote", async () => {
       axios.get = jest.fn().mockResolvedValue({data:GLOBAL_MARKET});
       const result = await apiClient.fetchStockByName("ShoeLaLa");
       expect(result).toEqual(new Quote({
          name: "Shoe La La",
          lastPrice: Number(GLOBAL_MARKET["Global Quote"]["05. price"]),
          pricedAt: GLOBAL_MARKET["Global Quote"]["07. latest trading day"]
       }));
    })
 
    it ("Should return null when stock is not found", async () => {
       const response = {
          data: {
             'Global Quote': {} 
          }
       };
       axios.get = jest.fn().mockResolvedValue(response);
       const result = await apiClient.fetchStockByName("ShoeLaLa");
       expect(result).toBe(null);
    })
   })

   describe("Tests fetchStockHistory", () => { 
      it("should return stocks history", async () => {
         axios.get = jest.fn().mockResolvedValue({data:HISTORY_MOCK});

         const result = await apiClient.fetchStockHistory({stockName:"Sabre", from: "2023-05-10", to:"2023-05-29"});
         const expectedStructure = {
              '1. open': expect.any(String),
              '2. high': expect.any(String),
              '3. low': expect.any(String),
              '4. close': expect.any(String),
              '5. volume': expect.any(String),
            }

         Object.keys(result).every(date => {
            expect(result[date]).toEqual(expect.objectContaining(expectedStructure));
         }) 

         expect(Object.keys(result).length).toEqual(13);
      })

      it ("should return null when stock is not found", async () => {
         const response = {
            data: {
               'Time Series (Daily)': {}
            }
         }
         axios.get = jest.fn().mockResolvedValue({data: response});

         const result = await apiClient.fetchStockHistory({stockName:"Michael Scott Paper Company", from: "2023-05-10", to:"2023-05-29"});

         expect(result).toBe(null);
      })
   })

})