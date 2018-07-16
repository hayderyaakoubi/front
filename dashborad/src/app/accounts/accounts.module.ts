import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountsComponent} from './accounts.component';
import {RouterModule} from '@angular/router';
import {AccountsRoutes} from './accounts.routing';
import {MaterialModule} from '../app.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NouisliderModule} from 'ng2-nouislider';
import {TagInputModule} from 'ngx-chips';
import {NewUserComponent} from './wizard/newUser.component';
import {AccountslistService} from './service/accountslist.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AccountsRoutes),
        FormsModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule,
        MaterialModule, SharedModule
    ],
    declarations: [AccountsComponent, NewUserComponent],
    exports: [NewUserComponent]
    ,providers: [AccountslistService],

})
export class AccountsModule {
}
