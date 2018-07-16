import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Configuration} from '../../shared/config';

@Injectable()
export class RuleService {

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


    getRule(id, accid: any) {
        return this.http.get(`${this.actionUrl}/rules/${id}/${accid}`)
    }

    getInfoAccount(accid: any) {
        return this.http.get(`${this.actionUrl}/account/${accid}`)
    }

    updateRule(id, accid, rule: any) {
        return this.http.put(`${this.actionUrl}/rules/${id}/${accid}`, rule);

    }

    updateAccount(id, acc: any) {
        return this.http.put(`${this.actionUrl}/account/${id}`, acc);
    }

}