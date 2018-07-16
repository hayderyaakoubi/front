import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Configuration} from '../../shared/config';

@Injectable()
export class InfluxDataService {
    private DBNAME: any;
    // private identity;

    private actionUrl: string;

    constructor(private http: HttpClient, private _configuration: Configuration) {
        this.actionUrl = this._configuration.ServerWithPort;
    }


    getIdentity(): any {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        // console.log('identity', decoded.identity);
        // console.log("db",this.DBNAME,this.getDBNAME(decoded.identity));
        // .subscribe(res => console.log('Name', res['Name']));
        return decoded.identity;
    }

    getDBNAME(): any {
        const email = this.getIdentity();
        // console.log('DBname',email);
        return this.http.get(`${this.actionUrl}/account/${email}`)

    }

    getRealTime(db: any) {
        /*    // .pipe()
                .subscribe(res => {
                    this.DBNAME = res['Name'];
                    console.log('Name', res['Name']);

                });*/
        return this.http.get(`${this.actionUrl}/influx/${db}/realtime`);

    }

    getDaily(db: any) {
        return this.http.get(`${this.actionUrl}/influx/${db}/daily`);
    }

    getHourly(db: any) {
        return this.http.get(`${this.actionUrl}/influx/${db}/hourly`);
    }
    getMonthly(db: any) {
        return this.http.get(`${this.actionUrl}/influx/${db}/monthly`);
    }

    getConsum(db: any) {
        return this.http.get(`${this.actionUrl}/influx/${db}/monthconsum`);
    }
}
