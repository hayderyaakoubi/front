import {Component, OnInit} from '@angular/core';

import * as Chartist from 'chartist';
import {GaugueInfo} from './gauge';
import {InfluxDataService} from './line/influx-data.service';
import {RuleService} from '../settings/services/rule.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
    selector: 'app-charts-cmp',
    templateUrl: './charts.component.html'
})

export class ChartsComponent implements OnInit {
    public ConsmGoal = 300;
    public unitPrice = 0.35;

    maxsize;
    half;
    gaugeType = 'arch';
    gaugethick = 20;
    private realvalue: any;
    gaugeValue;
    gaugeLabel = '';
    // gaugeLabel = 'Consumption';
    gaugeAppendText = 'kWh';
    gaugesize = 220;
    gaugecap = 'round';
    // foregroundColor= rgba(0, 150, 136, 1);
    thresholdConfig = {
        /*    0: {color: 'blue'},
            half: {color: 'orange'},
            maxsize: {color: 'red'},
            // maxsize: {color: 'red'},*/
    };
    /*consumptionGauge details*/
    consumptionGaugecap = 'round';
    // consumptionGaugemax = parseFloat((this.Goal / this.unitPrice).toFixed(0));
    consumptionGaugemax;

    consumptionGaugeValue = 0;
    consumptionGaugeType = 'arch';
    consumptionGaugethick = 20;
    consumptionGaugeLabel = 'Consumption';
    consumptionGaugeAppendText = 'TND';
    consumptionGaugesize = 220;
    // foregroundColor= rgba(0, 150, 136, 1);
    consumptionGaugethresholdConfig ;


    public updated: any;
    interval: any;
    public realTimeValue: number;
    public Goal: number;
    /*interval for refreshing data*/

    /*This will return Monthly Consumption*/
    getConsumption() {
        this.influx.getDBNAME()
            .subscribe(
                result => {
                    this.influx.getConsum(result['Name'])
                        .subscribe(res => {
                            this.gaugeValue = res['somme'];
                            // this.gaugeValue = res['somme'].toFixed(2);
                            this.consumptionGaugeValue = parseFloat((this.gaugeValue * this.unitPrice).toFixed(2));
                            // this.consumptionGaugeValue = this.gaugeValue * this.unitPrice;
                            //this.updated= res['date'];
                            //console.log('somme', res['somme'].toFixed(2));
                        });
                });
    }

    gethalf(nb: number): number {
        return 0.5 * nb;

    }

    refreshData() {
        this.influx.getDBNAME()
            .subscribe(
                result => {
                    // console.log(result);
                    this.influx.getRealTime(result['Name'])
                        .subscribe(res => {
                            this.realTimeValue = res['value'].toFixed(2);
                            // this.gaugeValue = res['value'].toFixed(2);
                            this.updated = res['time'];
                            // console.log(res['value'].toFixed(2));
                        });
                });
        this.getConsumption();
    }

    constructor(private influx: InfluxDataService, private rule: RuleService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'renewable-energy',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/renewable-energy.svg'));

    }

    ngOnInit() {

        this.rule.getCustomerId()
            .subscribe(
                result => {
                    this.rule.getRule(result['Customer_id'], result['Account_id'])
                        .subscribe(res => {
                            // console.log('getRule', res);
                            this.Goal = res['result'].Goal;
                            var half = (this.maxsize * 0.5).toLocaleString();
                            this.consumptionGaugemax = this.Goal;
                            this.maxsize = parseFloat((this.Goal / this.unitPrice).toFixed(0));

                            console.log(this.half, 'half', typeof (this.half));
                            console.log(this.maxsize, 'maxsize', typeof (this.maxsize));
                            this.thresholdConfig = {
                                '0': {color: 'green'},
                                [half]: {color: 'orange'},
                                [this.maxsize]: {color: 'red'},
                                // maxsize: {color: 'red'},
                            };
                            this.consumptionGaugethresholdConfig = {
                                '0': {color: 'green'},
                                [this.gethalf(this.consumptionGaugemax)]: {color: 'orange'},
                                [this.consumptionGaugemax]: {color: 'red'}
                            };

                        });
                });
        // console.log(this.consumptionGaugemax);
        this.refreshData();
        this.interval = setInterval(() => {
            this.refreshData();
        }, 10000);
    }
}
