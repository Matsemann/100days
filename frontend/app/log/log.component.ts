import {Component} from 'angular2/core';
import {UserService} from "../user/user.service";
import {OnInit} from "angular2/core";
import {User} from "../user/user";
import {RouteParams} from "angular2/router";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {NgFor} from "angular2/common";


@Component({
    template: `
        <h3>Loggfør for {{user?.name}}</h3>

        <p><a [routerLink]="['Landing']">Tilbake</a></p>

        <div *ngIf="user">
           <div *ngFor="#day of user.days">
                <log-day day="#day" user="user"></log-day>
            </div>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, NgFor]
})
export class LogComponent implements OnInit {
    user:User;

    constructor(private userService:UserService,
                private routeParams:RouteParams) {
    }

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(result => {
                this.user = result.filter(u => u.id == +this.routeParams.get('id'))[0];
                console.log(this.user.days);
            });
    }


}