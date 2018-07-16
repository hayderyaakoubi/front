import { AbstractControl } from '@angular/forms';
export class DateValidation {

    static CompareDate(AC: AbstractControl) {
        const from = AC.get('password').value; // to get value in input tag
        const to = AC.get('confirmPassword').value; // to get value in input tag
        if (new Date(from).getTime() < new Date(to).getTime()) {
            AC.get('To').setErrors( {CompareDate: true} );
        } else {
            return null;
        }
    }
}
