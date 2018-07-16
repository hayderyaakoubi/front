import {Component, OnInit} from '@angular/core';
import {AccountslistService} from './service/accountslist.service';
import swal from 'sweetalert2';

declare var $: any;

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

declare interface TableWithCheckboxes {
    id?: number;
    ischecked?: boolean;
    name: string;
    type: string;
    email: number;
    CreatedAt: string;
}

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
    public tableData1: TableData;
    public currentrow;

    constructor(private accounts: AccountslistService) {
    }

    selectrow(event: any, item: any) {

        this.currentrow = item.Email;
        console.log(this.currentrow);
        this.showAccountAlert('warning-message-and-confirmation');
    }

    showAccountAlert(type) {
        if (type == 'warning-message-and-confirmation') {
            swal({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                confirmButtonText: 'Yes, delete it!',
                buttonsStyling: false
            }).then((result) => {
                if (result.value) {
                    console.log('will delete');
                    this.accounts.getCustomerId()
                        .subscribe(
                            res1 => {
                                this.accounts.deleteAccount(res1['Customer_id'],this.currentrow)
                                    .subscribe(res => {

                                        console.log(res);

                                    },
                                        error1 => console.log('error ya 7ajj',error1))
                            });
                    swal(
                        {
                            title: 'Deleted!',
                            text: 'Account has been deleted.',
                            type: 'success',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        }
                    )
                }
            })
        }
    }

    ngOnInit() {
        this.accounts.getCustomerId()
            .subscribe(
                result => {
                    this.accounts.getAccountsList(result['Customer_id'])
                        .subscribe(res => {
                            this.tableData1 = {
                                headerRow: ['#', 'Name', 'Account Type', 'Email', 'Created at', 'Actions'],
                                dataRows: res['result']['Accounts']
                            };
                            // console.log(res['result']);

                        })
                });
    }
}
