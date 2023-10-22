import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

const compareStocksSchema = Joi.object({
  stockName: Joi.string()
  .required()
  .messages({
    "any.required": "stockName is a required field",
    "string.base": "stockName should be a string",
    "string.empty": "stockName can't be an empty field"
  }),
  stocks: Joi.array()
  .items(Joi.string())
  .required()
  .messages({
    "any.required": "stocksToCompare is a required field",
    "string.base": "stocksToCompare should be an array of strings",
    "string.empty": "stocksToCompare can't be an empty field"
  })
});

export async function compareStocksValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const stockName = req.params.stockName;
  const stocks = req.query.stocksToCompare as string[];  
  const { error } = compareStocksSchema.validate({
   stockName,
   stocks
  });

  if (error) throw new AppError(error.message, 404);
  return next();
}