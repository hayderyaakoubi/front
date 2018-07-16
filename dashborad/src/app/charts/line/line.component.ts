import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {InfluxDataService} from './influx-data.service';

@Component({
    selector: 'app-line',
    templateUrl: './line.component.html',
    styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {
    Hourly = [];
    Daily = [];
    Monthly = [];
    private dataHourly: any;
    private dataDaily: any;
    private dataMonthly: any;

    constructor(private influx: InfluxDataService) {
    }

    ngOnInit() {
        this.influx.getDBNAME()
            .subscribe(
                result => {
        this.influx.getDaily(result['Name'])
            .subscribe(res => {
                this.dataDaily = res;
                var xdata = [];
                var ydata = [];
                for (var i = 0; i < this.dataDaily.length; i++) {
                    xdata.push(this.dataDaily[i].x);
                    ydata.push(this.dataDaily[i].y);
                }


                // console.log('this.dataDaily',this.dataDaily[1]['x']);
                this.Daily = new Chart('daily', {
                    type: 'bar',
                    data: {
                        datasets: [
                            {
                                label: 'Daily',
                                data: this.dataDaily,
                                borderWidth:1,
                                borderColor: 'rgb(75, 192, 192)',
                                fill: false,
                                backgroundColor:'rgba(75, 192, 192, 0.2)',

                            }
                        ]
                    },
                    options: {
                        layout: {
                            padding: {
                                left: 50,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        legend: {
                            position: 'right',
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                time: {unit: 'day'},

                                //ticks:{source: 'data'},
                                type: 'time',
                                displayFormats: {
                                    minute: 'h:mm a'
                                },
                                distribution: 'linear'
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'kWh'
                                },
                                displayFormats: {
                                    hour: 'h:mm a'
                                },
                                display: true
                            }],
                        }
                    }
                });
            });});
        this.influx.getDBNAME()
            .subscribe(
                result => {
        this.influx.getHourly(result['Name'])
            .subscribe(res1 => {
                this.dataHourly = res1;
                var xdata = [];
                var ydata = [];
                for (var i = 0; i < this.dataHourly.length; i++) {
                    xdata.push(this.dataHourly[i].x);
                    //xdata.push(new Date(this.dataHourly[i].x).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
                    ydata.push(this.dataHourly[i].y);
                    //console.log(xdata);
                }
                this.Hourly = new Chart('hourly', {
                    type: 'bar',
                    data: {
                        datasets: [
                            {
                                label: 'Hourly',
                                data: this.dataHourly,
                                // borderColor: '#ba000d',
                                borderWidth:1,
                                borderColor: 'rgb(75, 192, 192)',
                                fill: false,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',

                            }
                        ]
                    },
                    options: {
                        layout: {
                            padding: {
                                left: 50,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        legend: {
                            position: 'right',
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                time: {unit: 'hour'},

                                //ticks:{source: 'data'},
                                type: 'time',
                                displayFormats: {
                                    hour: 'h'
                                },
                                // distribution: 'series'
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Wh'
                                },
                                display: true
                            }],
                        },
                        ticks: {
                            source: 'data'
                        }
                    }
                });
            });});

        this.influx.getDBNAME()
            .subscribe(
                result => {
        this.influx.getMonthly(result['Name'])
            .subscribe(res1 => {
                this.dataMonthly = res1;
                console.log(res1);
                var xdata = [];
                var ydata = [];
                for (var i = 0; i < this.dataMonthly.length; i++) {
                    xdata.push(this.dataMonthly[i].x);
                    //xdata.push(new Date(this.dataHourly[i].x).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
                    ydata.push(this.dataMonthly[i].y);
                    //console.log(xdata);
                }
                this.Hourly = new Chart('monthly', {
                    type: 'bar',
                    data: {
                        datasets: [
                            {
                                label: 'Monthly',
                                data: this.dataMonthly,
                                // borderColor: '#ba000d',
                                borderWidth:1,
                                borderColor: 'rgb(75, 192, 192)',
                                fill: false,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',

                            }
                        ]
                    },
                    options: {
                        layout: {
                            padding: {
                                left: 50,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        legend: {
                            position: 'right',
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                time: {unit: 'day'},

                                ticks:{source: 'data'},
                                type: 'time',
                                displayFormats: {
                                    // month: 'h'
                                },
                                distribution: 'series'
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'kWh'
                                },
                                display: true
                            }],
                        },
                        ticks: {
                            source: 'data'
                        }
                    }
                });
            });});

   }


}
