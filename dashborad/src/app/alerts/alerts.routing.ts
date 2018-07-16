import { Routes } from '@angular/router';
import {AlertsComponent} from './alerts.component';


export const AlertsRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: AlertsComponent
        }]
    }
];
