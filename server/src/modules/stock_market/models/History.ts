export type HistoryEntry  = {
    opening: number;
    low: number;
    high: number;
    closing: number;
    pricedAt: string;
    volume: number;
}

interface ICreateHistory {
    name: string;
    prices: HistoryEntry[];
}

export class History {
    name: string;
    prices: HistoryEntry[];

    constructor(history: ICreateHistory) {
        this.name = history.name;
        this.prices = history.prices;
    }
}