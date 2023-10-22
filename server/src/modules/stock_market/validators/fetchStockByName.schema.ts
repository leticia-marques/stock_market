import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

const fetchStockCurrentPriceSchema = Joi.object({
  stockName: Joi.string()
  .required()
  .messages({
    "any.required": "stockName is a required field",
    "string.base": "stockName should be a string",
    "string.empty": "stockName can't be an empty field"
  }),
});

export async function fetchStockCurrentPriceValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const stockName = req.params.stockName;

  const { error } = fetchStockCurrentPriceSchema.validate({
   stockName
  });

  if (error) throw new AppError(error.message, 404);
  return next();
}