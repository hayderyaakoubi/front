import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {BillsModule} from './bills/bills.module';
import {AuthGuard} from './pages/service/auth.guard';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'charts',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],/*new*/
        children: [
            {
                path: 'accounts',
                loadChildren: './accounts/accounts.module#AccountsModule'
            }, {
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            }, {
                path: 'bills',
                loadChildren: './bills/bills.module#BillsModule'
            }, {
                path: '',
                loadChildren: './userpage/user.module#UserModule'
            }, {
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule'
            }, {
                path: 'alerts',
                loadChildren: './alerts/alerts.module#AlertsModule'
            }
        ]
    }, {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'login',
            // path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
        }]
    }
];
