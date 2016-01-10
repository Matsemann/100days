import {Component} from 'angular2/core';
import {UserService} from "../user/user.service";
import {OnInit} from "angular2/core";
import {User} from "../user/user";

@Component({
    templateUrl: 'app/userselector/userSelectorTemplate.html',
    selector: 'user-selector'
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
                this.selectedUser = this.users.filter(u => u.id == this.selectedId);
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