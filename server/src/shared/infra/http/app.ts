import 'reflect-metadata';
import express, { NextFunction, Request, Response} from 'express';
import "express-async-errors";
import 'dotenv/config';
import '../../container/index';
import { AppError } from '../../errors/AppError';
import { stockRoutes } from './routes/stock.routes';
import cors from "cors";
const app = express();

app.use(cors())
app.use(express.json());
app.use(stockRoutes);
// app.get("/stock/:stockName/quote", async (req, res) => {
//     const stockName = req.params.stockName;
//     const data = await axios.get(`query?function=GLOBAL_QUOTE&symbol=${stockName}&apikey=${process.env.API_KEY}`)
//     return res.status(200).json(data.data);
// })

app.use((err: Error, _request: Request,response:Response, _next: NextFunction) => {
    if (err instanceof AppError)
    {
        return response.status(err.errorCode).json({
            message: err.message
        });
    }
    else 
    {
        return response.status(500).json({
            status: "error",
            message: `Internal server error ${err.message}`
        });
    }

})

app.listen(3001, () => {
    console.log("Listening on 3001");
})