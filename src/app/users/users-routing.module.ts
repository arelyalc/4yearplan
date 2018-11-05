import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes =[
  {path: 'user/account', component: AccountComponent},
  {path: 'user/dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule],
  declarations: []
})
export class UsersRoutingModule { }
