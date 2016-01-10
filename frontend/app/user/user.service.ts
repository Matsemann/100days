import {Injectable} from 'angular2/core'
import {Http} from "angular2/http";
import {Headers} from "angular2/http";

@Injectable()
export class UserService {

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


}