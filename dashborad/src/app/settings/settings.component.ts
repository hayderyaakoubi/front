import {Component, OnInit, ElementRef} from '@angular/core';
import {DateAdapter} from '@angular/material';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {chatbotRule} from './services/rule.model';
import {RuleService} from './services/rule.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    form: FormGroup;
    touch: boolean;
    goal: number;
    selectedValue: string;
    currentCity: string[];

    selectTheme = 'primary';
    cities = [
        {value: 'paris-0', viewValue: 'Paris'},
        {value: 'miami-1', viewValue: 'Miami'},
        {value: 'bucharest-2', viewValue: 'Bucharest'},
        {value: 'new-york-3', viewValue: 'New York'},
        {value: 'london-4', viewValue: 'London'},
        {value: 'barcelona-5', viewValue: 'Barcelona'},
        {value: 'moscow-6', viewValue: 'Moscow'},
    ];
    freq = [
        {value: 'daily', viewValue: 'Daily'},
        {value: 'weekly', viewValue: 'Weekly'},
        {value: 'monthly', viewValue: 'Monthly'}
    ];
    public selectedTimeTo;
    public selectedTimeFrom;

    constructor(private atp: AmazingTimePickerService, private ruleservice: RuleService) {
    }

    openTo() {
        const amazingTimePicker = this.atp.open({
            theme: 'material-red',
            onlyHour: true,
        });
        amazingTimePicker.afterClose().subscribe(time => {
            this.selectedTimeTo = time;
        });
    }

    openFrom() {
        const amazingTimePicker = this.atp.open({
            theme: 'material-red',
            onlyHour: true,
        });
        amazingTimePicker.afterClose().subscribe(time => {
            this.selectedTimeFrom = time;
        });
    }

    onSubmit() {
        console.log('subb');
        console.log(this.form.value);
        this.ruleservice.getCustomerId()
            .subscribe(
                result => {
                    this.ruleservice.updateRule(result['Customer_id'], result['Account_id'], this.form.value)
                        .subscribe(res => console.log(res))
                });
        // this.for
    }

    ngOnInit() {
        var newrule = new chatbotRule;
        console.log('new', newrule.DoNotDisturbFrom = 14);
        this.ruleservice.getCustomerId()
            .subscribe(
                result => {
                    console.log('ruleservice.getRule',result);
                    this.ruleservice.getRule(result['Customer_id'], result['Account_id'])
                        .subscribe(res => {
                            console.log(res['result']);
                            this.selectedTimeTo = res['result'].DoNotDisturbFrom;
                            this.selectedTimeFrom = res['result'].DoNotDisturbTo;
                            this.selectedValue = res['result'].Frequency;
                            this.goal = res['result'].Goal;
                            this.form.patchValue({
                                DoNotDisturbFrom: this.selectedTimeFrom,
                                DoNotDisturbTo: this.selectedTimeTo,
                                Goal: this.goal,
                                Frequency: this.selectedValue
                            })
                        });
                });
        // console.log(rule);


        this.form = new FormGroup({
            'DoNotDisturbFrom': new FormControl(this.selectedTimeFrom, [
                Validators.required,
                // Validators.minLength(4),
            ]),
            'DoNotDisturbTo': new FormControl(this.selectedTimeTo),
            'Goal': new FormControl(this.goal),
            'Frequency': new FormControl(this.selectedValue)
        });
    }

    myFunc(val: any) {
        console.log('value is changed to ' + val);
    }
}
