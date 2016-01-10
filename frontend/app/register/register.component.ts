import {Component} from 'angular2/core';
import {UserService} from "../user/user.service";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    templateUrl: 'app/register/registerTemplate.html',
    directives: [ROUTER_DIRECTIVES]
})
export class RegisterComponent {
    name = "";
    hasCreated = false;

    constructor(private userService:UserService) {
    }

    register() {
        this.userService.createUser(this.name)
            .subscribe(() => {
                this.hasCreated = true;
            });
    }
}