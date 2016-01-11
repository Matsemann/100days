import {Component, Input, OnInit} from 'angular2/core';
import {UserService} from "../user/user.service";
import {DayService} from "./day.service";

@Component({
    selector: 'log-day',
    templateUrl: 'app/log/logTemplate.html',
    directives: []
})
export class LogDayComponent implements OnInit{
    @Input() day:any;
    @Input() userid:number;

    editingValue = 0;
    isToday = false;
    isWaiting = false;


    constructor(
        private userService:UserService,
        private dayService:DayService
    ) {
    }

    ngOnInit() {
        this.isToday = this.dayService.dateIsYesterday(this.day.day);
        this.editingValue = this.day.minutes;
    }

    click(diff:string) {
        this.editingValue = this.editingValue + parseInt(diff, 10);
        if (this.editingValue < 0) {
            this.editingValue = 0;
        }

        // group and delay requests to avoid race condition when clicking fast..
        if (this.isWaiting) {
            return;
        }

        this.isWaiting = true;

        setTimeout(() => {
            this.isWaiting = false;

            this.userService.log(this.userid, this.day.day, this.editingValue)
            .subscribe(res => {
                this.day.minutes = res;
            });
        }, 1000)
    }
}