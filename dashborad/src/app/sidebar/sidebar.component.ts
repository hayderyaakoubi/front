import {Component, OnInit} from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import {RuleService} from '../settings/services/rule.service';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [/*{
    path: '',
    title: 'Home',
    type: 'link',
    icontype: 'home'
},*/{
    path: '/charts',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
}, {
    path: '/bills',
    title: 'Bills Management',
    type: 'link',
    icontype: 'content_paste',
}, {
    path: '/accounts',
    title: 'Acccount Management',
    type: 'link',
    icontype: 'supervisor_account'

}, {
    path: '/alerts',
    title: 'Alerts History',
    type: 'link',
    icontype: 'notifications_none',
    },
    /*{
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            {path: 'buttons', title: 'Buttons', ab:'B'},
            {path: 'grid', title: 'Grid System', ab:'GS'},
            {path: 'panels', title: 'Panels', ab:'P'},
            {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
            {path: 'notifications', title: 'Notifications', ab:'N'},
            {path: 'icons', title: 'Icons', ab:'I'},
            {path: 'typography', title: 'Typography', ab:'T'}
        ]
    }*/
];

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public FirstNameInfo: any;
    public LastNameInfo: any;
    constructor(private rule: RuleService) {
    }
    public menuItems: any[];
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.rule.getCustomerId()
            .subscribe(
                res1 => {
                    this.rule.getInfoAccount(res1['Account_id'])
                        .subscribe(result => {
                            // this.AccountType = result.AccountType.toUpperCase();
                            this.FirstNameInfo = result['FirstName'];

                            this.LastNameInfo = result['LastName'];
                        });
                });
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, {wheelSpeed: 2, suppressScrollX: true});
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
