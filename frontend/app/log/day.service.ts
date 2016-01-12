import {Injectable} from 'angular2/core'

@Injectable()
export class DayService {
    public static START_DATE = new Date(2016, 0, 11);
    public static NUM_DAYS= 100;

    dateIsYesterday(date:string) {
        let yesterDay = new Date();
        yesterDay.setDate(yesterDay.getDate() - 1);

        return date == this.dateToString(yesterDay);
    }

    dateToString(date:Date) {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    minutesToHoursAndMinutes(minutes:number) {
        let hours = Math.floor(minutes / 60);
        let remaining = minutes - hours * 60;

        return hours + 't' + remaining + 'min';
    }

    getDays() {
        let current = DayService.START_DATE;

        let days:Array<string> = [];

        for (let i = 0; i < DayService.NUM_DAYS; i++) {
            days.push(this.dateToString(current));
            current = new Date(current.toString());
            current.setDate(current.getDate() + 1);
        }

        return days;
    }

}