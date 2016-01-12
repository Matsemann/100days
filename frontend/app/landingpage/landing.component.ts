import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {User} from "../user/user";
import {UserSelectorComponent} from "../userselector/user-selector.component";
import {UserService} from "../user/user.service";
import {GraphComponent} from "../graph/graph.component";

@Component({
    templateUrl: 'app/landingpage/landingTemplate.html',
    directives: [ROUTER_DIRECTIVES, UserSelectorComponent, GraphComponent]

})
export class LandingComponent implements OnInit {
    users:Array<User>;

    constructor(private userService:UserService) {
    }

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(result => {
                this.users = result;
            });
    }
}