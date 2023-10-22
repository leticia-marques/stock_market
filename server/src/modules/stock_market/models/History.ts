import { IHistoryEntry } from "../types/types";

interface ICreateHistory {
    name: string;
    prices: IHistoryEntry[];
}

export class History {
    readonly name: string;
    readonly prices: IHistoryEntry[];

    constructor(history: ICreateHistory) {
        this.name = history.name;
        this.prices = history.prices;
    }
}