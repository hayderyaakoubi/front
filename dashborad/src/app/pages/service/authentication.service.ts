import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Configuration} from '../../shared/config';

@Injectable()
export class AuthenticationService {
    private actionUrl: string;

    constructor(public http: HttpClient, public router: Router,
                private _configuration: Configuration) {
        this.actionUrl = this._configuration.ServerWithPort;
    }

    verifylogin(cred: any) {
        return this.http.post(`${this.actionUrl}/auth`, cred)
    }

    isLoggedIn() {
        return !!localStorage.getItem('token')
    }

    logOut() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);

    }
}
