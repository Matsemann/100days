import {Component} from 'angular2/core';
import {UserService} from "../user/user.service";
import {OnInit} from "angular2/core";
import {User} from "../user/user";
import {RouteParams} from "angular2/router";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {DayService} from "./day.service";
import {LogDayComponent} from "./log-day.component";


@Component({
    template: `
        <h3>Loggfør for {{user?.name}}</h3>
        <p>Det logges i hele minutter ved å bruke knappene. <a (click)="goToToday()">Hopp til i dag</a>. </p>

        <p><a [routerLink]="['Landing']">Tilbake</a></p>

        <div *ngIf="user">
           <div *ngFor="#day of days">
                <log-day [day]="day" [userid]="user.id"></log-day>
            </div>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, LogDayComponent]
})
export class LogComponent implements OnInit {
    user:User;
    days:any[] = [];

    constructor(private userService:UserService,
                private dayService:DayService,
                private routeParams:RouteParams) {
    }

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(result => {
                this.user = result.filter(u => u.id == +this.routeParams.get('id'))[0];
                this.createLogDays();
            });
    }

    createLogDays() {
        let dayDates = this.dayService.getDays();

        dayDates.forEach(d => {
            this.days.push({
                dayNr: this.days.length+1,
                minutes: this.user.days[d] || 0,
                day: d
            });
        });
    }

    goToToday() {
        // hack fordi det er midnatt..
        let today:HTMLElement = <HTMLElement>document.getElementsByClassName('today')[0];
        today.scrollIntoView(false);
    }


}