import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldErrorDisplayComponent} from 'app/forms/validationforms/field-error-display/field-error-display.component';
import {SweetAlertComponent} from '../components/sweetalert/sweetalert.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [FieldErrorDisplayComponent, SweetAlertComponent],
    exports: [FieldErrorDisplayComponent, SweetAlertComponent]
})
export class SharedModule {
}
