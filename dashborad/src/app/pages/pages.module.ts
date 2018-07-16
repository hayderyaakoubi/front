import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
// import { MdIconModule, MdCardModule, MdInputModule, MdCheckboxModule, MdButtonModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';

import {PagesRoutes} from './pages.routing';

import {RegisterComponent} from './register/register.component';
import {PricingComponent} from './pricing/pricing.component';
import {LockComponent} from './lock/lock.component';
import {LoginComponent} from './login/login.component';
import {Forms} from '../forms/forms.module';
// import {FieldErrorDisplayComponent} from '../forms/validationforms/field-error-display/field-error-display.component';
import {MaterialModule} from '../app.module';
import {AuthenticationService} from './service/authentication.service';
import {AuthGuard} from './service/auth.guard';
import {FieldErrorDisplayComponent} from '../forms/validationforms/field-error-display/field-error-display.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ],
    declarations: [
        // FieldErrorDisplayComponent,
        LoginComponent,
        RegisterComponent,
        PricingComponent,
        LockComponent,

    ],
    // providers: [/*AuthGuard*/, AuthenticationService]
    providers: [AuthGuard, AuthenticationService]
})

export class PagesModule {
}
