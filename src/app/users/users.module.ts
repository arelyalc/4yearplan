import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent} from './account/account.component'
import { DashboardComponent} from './dashboard/dashboard.component'
import {UsersRoutingModule} from './users-routing.module'


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [AccountComponent, DashboardComponent]
})
export class UsersModule { }
