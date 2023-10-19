import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

const fetchStockHistorySchema = Joi.object({
  stockName: Joi.string()
  .required()
  .messages({
    "any.required": "stockName is a required field",
    "string.base": "stockName should be a string",
    "string.empty": "stockName can't be an empty field"
  }),
  from: Joi.date()
  .required()
  .messages({
    "any.required": "from is a required field",
    "string.base": "from should be a date",
    "string.empty": "from can't be an empty field"
  }),
  to: Joi.date()
  .required()
  .messages({
    "any.required": "to is a required field",
    "string.base": "to should be a date",
    "string.empty": "to can't be an empty field"
  }),
});

export async function fetchStockHistoryValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const stockName = req.params.stockName;
  const {from, to} = req.query as {from: string, to: string};

  const { error } = fetchStockHistorySchema.validate({
   stockName,
   from, 
   to
  });

  if (error) throw new AppError(error.message, 404);
  return next();
}