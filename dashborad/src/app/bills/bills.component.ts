import {Component, OnInit, AfterViewInit} from '@angular/core';
import {TableData} from '../md/md-table/md-table.component';
import {BillsService} from './services/bills.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-bills',
    templateUrl: './bills.component.html',
    styleUrls: ['./bills.component.scss']
})

export class BillsComponent implements OnInit {
    public dataTable: DataTable;

    constructor(private BillService: BillsService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'approve-invoice',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/approve-invoice.svg'));
        iconRegistry.addSvgIcon(
            'notpaid',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/cross.svg'));
        iconRegistry.addSvgIcon(
            'check',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/check-mark.svg'));
    }
    ngOnInit() {
        var self = this;
     /*   this.dataTable = {
            headerRow: ['#', 'Amount', 'Created at', 'From', 'To', 'Payment Status', 'Payment Date', 'Actions'],
            footerRow: ['#', 'Amount', 'Created at', 'From', 'To', 'Payment Status', 'Payment Date', 'Actions'],
            dataRows: []
            };*/
        this.BillService.getCustomerId()
            .subscribe(
                res1 => {
                    console.log('this.BillService.getMonitorId', res1['Customer_id']);
                    this.BillService.getMonitorId(res1['Customer_id'])
                        .subscribe(
                            result => {

                                this.BillService.getBills(result['Monitor_id'])
                                    .subscribe(res => {
                                        console.log(res['result'][0]['Bills']);
                                        this.dataTable = {
                                            headerRow: ['#', 'Amount', 'Created at', 'From', 'To', 'Payment Status', 'Payment Date', 'Actions'],
                                            footerRow: ['#', 'Amount', 'Created at', 'From', 'To', 'Payment Status', 'Payment Date', 'Actions'],
                                            dataRows: res['result'][0]['Bills']
                                        };
                                        console.log(res['result'][0]['Bills'][0]['PaymentStatus'],
                                            typeof (res['result'][0]['Bills']['PaymentStatus']));

                                        setTimeout(function () {
                                            self.initTable();
                                        }, 10); });
                            });
                });

    }

    private initTable() {
        var table = $('#datatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search records',
            }

        });


        table = $('#datatables').DataTable();

        // Edit record
        table.on('click', '.edit', function () {
            var $tr = $(this).closest('tr');

            var data = table.row($tr).data();
            alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
        });

        // Delete a record
        table.on('click', '.remove', function (e) {
            var $tr = $(this).closest('tr');
            table.row($tr).remove().draw();
            e.preventDefault();
        });

        //Like record
        table.on('click', '.like', function () {
            alert('You clicked on Like button');
        });

        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
    }


/*
    ngAfterViewInit() {
        $('#datatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [
                [10, 25, 50, -1],
                [10, 25, 50, 'All']
            ],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search records',
            }

        });

        const table = $('#datatables').DataTable();

        // Edit record
        table.on('click', '.edit', function () {
            const $tr = $(this).closest('tr');

            const data = table.row($tr).data();
            alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
        });

        // Delete a record
        table.on('click', '.remove', function (e) {
            const $tr = $(this).closest('tr');
            table.row($tr).remove().draw();
            e.preventDefault();
        });

        //Like record
        table.on('click', '.like', function () {
            alert('You clicked on Like button');
        });

        $('.card .material-datatables label').addClass('form-group');
    }
*/

}
