# Stock Market


## Description

A system to allow small investors to make better decisions about their portfolio. One of the  functionalities is to check the performance of a stock in the following scenarios:

- Current price
- Historical price
- Current price compared to other stocks
- Gain projection with a purchase on a specific date.

## Technologies

- NodeJS
- ExpressJs
- Jest
- Swagger
- Typescript
- Joi
- Tsyringe

## Getting Started

### Dependencies

- [NodeJS 18^](https://nodejs.org/en) 
- [Git](https://git-scm.com/)

### Installing

- in the server folder, run npm i

### Executing program

To run the app you'll need to get an [api key](https://www.alphavantage.co/support/#api-key) and set the API_KEY var on the .env file

then run the app
```
npm run dev
```
Rotas:

    Get Stock Quote
        Description: Returns the current price of a specified stock.
        Path: /stock/{stockName}/quote

    Get Stock History
        Description: Retrieves historical data for a stock within a specified date range.
        Path: /stocks/{stockName}/history?from={date}&to={date}

    Get Stock Gains Projection
        Description: Calculates and returns the projection gains for a stock based on purchase details.
        Path: /stocks/{stockName}/gains?purchasedAt={date}&purchasedAmount={amount}

    Compare Stocks
        Description: Compares a stock with other stocks based on name and provides insights.
        Path: /stocks/{stockName}/compare?stocksToCompare[]={stock}&stocksToCompare[]={stock}

You can try the app at http://localhost:3001/api-docs 



to run the tests
```
npm run test
```