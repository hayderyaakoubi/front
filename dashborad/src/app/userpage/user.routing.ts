import { Routes } from '@angular/router';

import { UserComponent } from './user.component';
import {SettingsComponent} from '../settings/settings.component';

export const UserRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'pages/user',
        component: UserComponent
    }]
},
    /*this is new updates worik*/
    {

        path: '',
        children: [ {
            path: 'user',
            component: UserComponent
        }]
    },/*{

        path: '',
        children: [ {
            path: 'settings',
            component: SettingsComponent
        }]
    }*/
];
