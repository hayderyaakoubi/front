import { Routes } from '@angular/router';
import {AccountsComponent} from './accounts.component';


export const AccountsRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: AccountsComponent
        }]
    }
];
