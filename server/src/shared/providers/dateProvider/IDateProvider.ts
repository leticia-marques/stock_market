export interface IDateProvider {
    compareInDays(starDate: Date, endDate: Date): number;
}