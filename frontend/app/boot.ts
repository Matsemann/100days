import {bootstrap}    from 'angular2/platform/browser'
import {HundreddaysApp} from './hundreddays.app'

import {ROUTER_PROVIDERS} from 'angular2/router';
import {UserService} from "./user/user.service";
import {HTTP_PROVIDERS} from "angular2/http";

import 'rxjs/add/operator/map';

bootstrap(HundreddaysApp, [
    UserService,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS
]);