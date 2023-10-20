interface ICreateQuote {
    name: string;
    lastPrice: number;
    pricedAt: string;
}

export class Quote {
  private readonly name: string;
  private readonly lastPrice: number;
  private readonly pricedAt: string;

  constructor(quote: ICreateQuote) {
    this.name = quote.name;
    this.lastPrice = quote.lastPrice;
    this.pricedAt = quote.pricedAt;
  }
}
