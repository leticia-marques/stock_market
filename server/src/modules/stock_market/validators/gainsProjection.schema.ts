import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

const gainsProjectionSchema = Joi.object({
  stockName: Joi.string()
  .required()
  .messages({
    "any.required": "stockName is a required field",
    "string.base": "stockName should be a string",
    "string.empty": "stockName can't be an empty field"
  }),
  purchasedAt: Joi.date()
  .required()
  .messages({
    "any.required": "purchasedAt is a required field",
    "date.base": "purchasedAt should be a date",
    "date.empty": "purchasedAt can't be an empty field"
  }),
  purchasedAmount: Joi.number()
  .required()
  .messages({
    "any.required": "purchasedAmount is a required field",
    "string.base": "purchasedAmount should be a string",
    "string.empty": "purchasedAmount can't be an empty field"
  }),
});

export async function gainsProjectionValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const stockName = req.params.stockName;
  const {purchasedAt, purchasedAmount} = req.query as {purchasedAt: string, purchasedAmount: string};

  const { error } = gainsProjectionSchema.validate({
   stockName,
   purchasedAt, 
   purchasedAmount
  });

  if (error) throw new AppError(error.message, 404);
  return next();
}