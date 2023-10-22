import 'reflect-metadata';
import express, { NextFunction, Request, Response} from 'express';
import "express-async-errors";
import 'dotenv/config';
import '@shared/container/index';
import { AppError } from '../../errors/AppError';
import { stockRoutes } from './routes/stock.routes';
import cors from "cors";
import swaggerDoc from "../../../swagger.json";;
import  swaggerUi from 'swagger-ui-express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(stockRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
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
export {app};

