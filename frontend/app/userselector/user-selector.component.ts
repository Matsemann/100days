import {Component} from 'angular2/core';
import {UserService} from "../user/user.service";
import {OnInit} from "angular2/core";
import {User} from "../user/user";
import {ROUTER_DIRECTIVES} from "angular2/router";


@Component({
    templateUrl: 'app/userselector/userSelectorTemplate.html',
    selector: 'user-selector',
    directives: [ROUTER_DIRECTIVES]
})
export class UserSelectorComponent implements OnInit {
    users:Array<User>;
    selectedUser:User;
    selectedId = -1;

    constructor(private userService:UserService) {
    }

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(result => {
                this.users = result;

                this.selectedId = this.userService.getSavedSelectedUserId();
                this.selectedUser = this.users.filter(u => u.id == this.selectedId)[0];
            });
    }

    changed(id) {
        this.selectedId = id;
        if (id != "-1") {
            this.selectedUser = this.users.filter(u => u.id == id)[0];
        } else {
            this.selectedUser = null;
        }
        this.userService.setSavedSelectedUserId(id);
    }
}