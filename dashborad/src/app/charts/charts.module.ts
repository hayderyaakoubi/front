import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';
import {NgxGaugeModule} from 'ngx-gauge';

import {ChartsComponent} from './charts.component';
import {ChartsRoutes} from './charts.routing';
import {LineComponent} from './line/line.component';
import {InfluxDataService} from './line/influx-data.service';
import {Configuration} from '../shared/config';
import {RuleService} from '../settings/services/rule.service';
import {MaterialModule} from '../app.module';

@NgModule({
    imports: [
        CommonModule,
        NgxGaugeModule,
        MaterialModule,

        RouterModule.forChild(ChartsRoutes),
        FormsModule
    ],
    declarations: [ChartsComponent, LineComponent],
    providers: [Configuration, InfluxDataService,RuleService],

})

export class ChartsModule {
}
