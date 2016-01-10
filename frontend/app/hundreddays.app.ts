import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {RegisterComponent} from "./register/register.component";

@Component({
    selector: 'hundred-days',
    templateUrl: 'app/hundreddaysTemplate.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path:'/register', name: 'Register', component: RegisterComponent}
])
export class HundreddaysApp {
    getData = function () {
        return "hhehee";
    }
}