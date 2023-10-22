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
To make requests go to http://localhost:3001/api-docs 

to run the tests
```
npm run test
```