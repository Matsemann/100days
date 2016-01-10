import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {User} from "../user/user";
import {UserSelectorComponent} from "../userselector/user-selector.component";

@Component({
    templateUrl: 'app/landingpage/landingTemplate.html',
    directives: [ROUTER_DIRECTIVES, UserSelectorComponent]

})
export class LandingComponent {
    //selectedUser: User;

}