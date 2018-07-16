import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BillsService} from '../services/bills.service';
declare const $: any;

@Component({
    selector: 'app-bill-form',
    templateUrl: './bill-form.component.html',
    styleUrls: ['./bill-form.component.scss']
})
export class BillFormComponent implements OnInit {

    powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

    hero = {name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0]};

    BillForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private billservice: BillsService) {
    }

    ngOnInit(): void {
        this.BillForm = this.formBuilder.group({
            'Amount': [null, Validators.required],
            'From': [null, Validators.required],
            'To': [null, Validators.required],
            'PaymentDate': [null, /*Validators.required*/],
            'PaymentStatus': [null, Validators.required]
        });
    }

    setPaymentDateNull() {
        this.BillForm.patchValue({PaymentDate: null})
    }

    onSubmit() {
        var newBill = this.BillForm.value;
        newBill.CreatedAt = new Date();
        console.log(newBill);
        this.billservice.getCustomerId()
            .subscribe(
                res1 => {
                    console.log('this.BillService.getMonitorId', res1['Customer_id']);
                    this.billservice.getMonitorId(res1['Customer_id'])
                        .subscribe(
                            result => {
                                this.billservice.addBill(result['Monitor_id'], newBill)
                                    .subscribe(
                                        res => {console.log(res);
                                            if (res['result'] === 'Bill Added Successfully') {
                                                this.showNotification('bottom', 'right', 'success');
                                            }}
                                    );
                            });
                });
    }
    showNotification(from: any, align: any,color:any) {
        // const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
        const type = ['info', 'success', 'warning', 'danger', 'rose', 'primary'];

        // const color = Math.floor((Math.random() * 6) + 1);

        $.notify({
            icon: 'notifications',
            message: 'Your Bill was added <b>Successfully</b>'
        }, {
            type: type[color],
            timer: 3000,
            placement: {
                from: from,
                align: align
            }
        });
    }

}
