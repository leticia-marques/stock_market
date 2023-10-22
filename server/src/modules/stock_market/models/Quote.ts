interface ICreateQuote {
    name: string;
    lastPrice: number;
    pricedAt: string;
}

export class Quote {
  readonly name: string;
  readonly lastPrice: number;
  readonly pricedAt: string;

  constructor(quote: ICreateQuote) {
    this.name = quote.name;
    this.lastPrice = quote.lastPrice;
    this.pricedAt = quote.pricedAt;
  }
}
