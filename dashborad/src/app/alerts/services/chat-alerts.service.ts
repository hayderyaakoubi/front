import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Configuration} from '../../shared/config';

@Injectable()
export class ChatAlertsService {
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
        // console.log('DBname',`${this.actionUrl}/account/${email}`);
        return this.http.get(`${this.actionUrl}/account/${email}`)
    }

    getMonitorId(custId: any) {
        return this.http.get(`${this.actionUrl}/monitor/${custId}`)
    }

    getAlerts(id: any) {
        return this.http.get(`${this.actionUrl}/alerts/${id}`)
    };
}
