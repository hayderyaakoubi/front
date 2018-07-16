import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Configuration} from '../../shared/config';
import {RequestOptions} from '@angular/http';

/*const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }), data: {'Email':''}
};*/

@Injectable()
export class AccountslistService {
    private actionUrl: string;

    constructor(private http: HttpClient, private _configuration: Configuration) {
        this.actionUrl = this._configuration.ServerWithPort;
    }


    getIdentity(): any {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        console.log('identity', decoded.identity);
        return decoded.identity;
    }

    getCustomerId(): any {
        const email = this.getIdentity();
        // console.log('DBname',email);
        return this.http.get(`${this.actionUrl}/account/${email}`)
    }

    getAccountsList(id: any) {
        return this.http.get(`${this.actionUrl}/accounts/${id}`)
    }

    addnewAccount(id, account: any) {
        return this.http.post(`${this.actionUrl}/accounts/${id}`, account)
    }

    deleteAccount(id: any, email) {
  /*      let httpOptions = {
            headers: new HttpHeaders(
                {
                'Content-Type': 'application/json',
            }),
            data: {Email: email},
        };
*/
        // httpOptions.data.Email = email;
        // console.log(httpOptions.data);
        // return this.http.delete(`${this.actionUrl}/accounts/${id}`,email)
        return this.http.delete(`${this.actionUrl}/accounts/${id}/${email}`)
    }


}