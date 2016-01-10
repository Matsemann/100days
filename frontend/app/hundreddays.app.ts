import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {RegisterComponent} from "./register/register.component";
import {LandingComponent} from "./landingpage/landing.component";

@Component({
    selector: 'hundred-days',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path:'/', name: 'Landing', component: LandingComponent},
    {path:'/register', name: 'Register', component: RegisterComponent}
])
export class HundreddaysApp {
    getData = function () {
        return "hhehee";
    }
}