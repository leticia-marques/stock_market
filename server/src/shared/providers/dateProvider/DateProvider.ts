import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { IDateProvider } from "./IDateProvider";

dayjs.extend(utc);

export class DateProvider implements IDateProvider {
    compareInDays(starDate: Date, endDate: Date): number {
        const startDateUtc = this.convertToUtc(starDate);
        const endDateUtc = this.convertToUtc(endDate);

        return dayjs(endDateUtc).diff(startDateUtc, "days");
    }
    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }

}