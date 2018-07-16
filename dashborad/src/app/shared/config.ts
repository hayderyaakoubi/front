import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'http://34.243.186.74:';
    defaultPort='5000';
    // public ApiUrl = 'api/';
    public ServerWithPort = this.Server + this.defaultPort;
}