import { IHistoryEntry } from "../types/types";

interface ICreateHistory {
    name: string;
    prices: IHistoryEntry[];
}

export class History {
    name: string;
    prices: IHistoryEntry[];

    constructor(history: ICreateHistory) {
        this.name = history.name;
        this.prices = history.prices;
    }
}