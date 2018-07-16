import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UserComponent} from './user.component';
import {UserRoutes} from './user.routing';
import {SettingsComponent} from '../settings/settings.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {MaterialModule} from '../app.module';
import {HttpClientModule} from '@angular/common/http';
import {RuleService} from '../settings/services/rule.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AmazingTimePickerModule,
        HttpClientModule
            ],
    declarations: [UserComponent, SettingsComponent],
    providers:[RuleService]
})

export class UserModule {
}
