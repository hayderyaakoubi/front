import { Routes } from '@angular/router';
import {BillsComponent} from './bills.component';


export const BillsRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: BillsComponent
        }]
    }
];
