import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertsComponent} from './alerts.component';
import {RouterModule} from '@angular/router';
import {AlertsRoutes} from './alerts.routing';
import {HttpClientModule} from '@angular/common/http';
import {ChatAlertsService} from './services/chat-alerts.service';
import {Configuration} from '../shared/config';

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule
        , RouterModule.forChild(AlertsRoutes)
    ],
    declarations: [AlertsComponent],
    providers: [ChatAlertsService, Configuration]
})
export class AlertsModule {
}
