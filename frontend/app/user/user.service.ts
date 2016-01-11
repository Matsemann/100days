import {Injectable} from 'angular2/core'
import {Http} from "angular2/http";
import {Headers} from "angular2/http";
import {User} from "./user";
import {Observable} from "../../../node_modules/rxjs/Observable";

@Injectable()
export class UserService {
    private static KEY = 'selectedUser';

    constructor(private http:Http) {
    }

    createUser(name: string) {
        return this.http.post('/api/participant',
            JSON.stringify({name: name}),
            {
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .map(e => e.json());
    }

    getUsers():Observable<Array<User>> {
        return this.http.get('/api/participant')
        .map(u => u.json());
    }

    getSavedSelectedUserId() {
        return localStorage.getItem(UserService.KEY);
    }

    setSavedSelectedUserId(userId:any) {
        localStorage.setItem(UserService.KEY, userId);
    }

    log(userId:number, day:string, amount:number) {
        return this.http.post('/api/participant/' + userId + '/log',
            JSON.stringify({day: day, amount: amount}),
            {
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .map(e => e.json().amount);
    }


}