import { HistoryEntry } from "../types/types";

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