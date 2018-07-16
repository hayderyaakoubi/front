import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { MatButtonModule } from '@angular/material';
import {AuthenticationService} from '../../pages/service/authentication.service';
@NgModule({
    imports: [ RouterModule, CommonModule, MatButtonModule ],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ],
    providers: [AuthenticationService]
})

export class NavbarModule {}
