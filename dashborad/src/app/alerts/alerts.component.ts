import {Component, OnInit} from '@angular/core';
import {ChatAlertsService} from './services/chat-alerts.service';

declare interface TableData {
    headerRow: string[];
    dataRows: any;
}

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
    public tableData1: TableData;

    constructor(public chatAlertsService: ChatAlertsService) {
    }

    ngOnInit() {
        this.chatAlertsService.getCustomerId()
            .subscribe(
                res1 => {
                    console.log('this.ChatAlertsService.getMonitorId',res1['Customer_id']);
                    this.chatAlertsService.getMonitorId(res1['Customer_id'])
                        .subscribe(
                            result => {
                                this.chatAlertsService.getAlerts(result['Monitor_id'])
                                    .subscribe(
                                        res => {
                                            console.log(res);
                                            this.tableData1 = {
                                                headerRow: ['#', 'Alert Text', 'Type', 'Received at'],
                                                dataRows: res['result']
                                            };

                                        }
                                    )
                            });
                });

    }

}
