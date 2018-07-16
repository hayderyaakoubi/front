import {Component} from '@angular/core';
import {RuleService} from '../settings/services/rule.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent {
    Goal: any;
    companyName;
    AccountType: string;
    FirstNameInfo: string;
    LastNameInfo: string;
    EmailInfo: string;
    private DoNotDisturbFrom: number;
    private DoNotDisturbTo: number;
    private Frequency: string;
    myform: FormGroup;
    FirstName: FormControl;
    LastName: FormControl;
    Email: FormControl;
    em = 'hh@gmail.com';
    public accountType: any;

    constructor(private rule: RuleService) {
    }

    ngOnInit() {
        
        /*this.rule.getInfoAccounts()
            .subscribe(res => {
                var result = res['result'][0];
                console.log(res['result']);
                this.AccountType = result.AccountType.toUpperCase();
                this.FirstName = result.FirstName;
                this.LastName = result.LastName;
                this.Email = result.Username;
            });*/
        this.rule.getCustomerId()
            .subscribe(
                result => {
                    this.rule.getRule(result['Customer_id'], result['Account_id'])
                        .subscribe(res => {
                            console.log('getRule', res);
                            this.DoNotDisturbFrom = res['result'].DoNotDisturbFrom;
                            this.DoNotDisturbTo = res['result'].DoNotDisturbTo;
                            this.Frequency = res['result'].Frequency;
                            this.Goal = res['result'].Goal;
                            console.log(this.DoNotDisturbFrom)
                        });
                });
        this.rule.getCustomerId()
            .subscribe(
                res1 => {
                    this.companyName = res1['Name'];
                    this.rule.getInfoAccount(res1['Account_id'])
                        .subscribe(result => {
                            console.log('info', result);
                            // this.AccountType = result.AccountType.toUpperCase();
                            this.FirstNameInfo = result['FirstName'];
                            this.LastNameInfo = result['LastName'];
                            this.EmailInfo = result['Email'];
                            this.accountType=result['AccountType'];
                            this.myform.patchValue({
                                    LastName: this.LastNameInfo,
                                    FirstName: this.FirstNameInfo,
                                    Email: this.EmailInfo
                                }
                            );
                        });
                });
        this.createFormControls();
        this.myform = new FormGroup({
            FirstName: this.FirstName,
            LastName: this.LastName,
            Email: this.Email
        });

    }

    createFormControls() {
        this.FirstName = new FormControl('', Validators.required);
        this.LastName = new FormControl('', Validators.required);
        this.Email = new FormControl(this.EmailInfo, [
            Validators.required,
            Validators.pattern('[^ @]*@[^ @]*')
        ]);

    }

    onSubmit() {
        if (this.myform.valid) {
            console.log('Form Submitted!', this.myform.value);
            this.rule.getCustomerId()
                .subscribe(
                    result => {
                        this.rule.updateAccount(result['Account_id'], this.myform.value)
                            .subscribe(res => console.log(res));
                    });
            // this.myform.reset();
        }
    }
}
