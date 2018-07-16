import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BillsComponent} from './bills.component';
import {RouterModule} from '@angular/router';
import {BillsRoutes} from './bills.routing';
import {MaterialModule} from '../app.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BillsService} from './services/bills.service';
import {BillFormComponent} from './bill-form/bill-form.component';
import {MatFormFieldModule} from '@angular/material';
import {ErrorDisplayComponent} from './validationforms/field-error-display/field-error-display.component';
import {Configuration} from '../shared/config';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(BillsRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatFormFieldModule,

    ],
    declarations: [BillsComponent, ErrorDisplayComponent, BillFormComponent],
    providers: [BillsService, Configuration]
})
export class BillsModule {
}
