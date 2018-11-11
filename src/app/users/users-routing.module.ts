import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

const routes: Routes =[
  {path: 'user/:id/account', component: AccountComponent},
  {path: 'user/:id/dashboard', component: DashboardComponent},
  {path: 'user/:id/settings', component: ProfileSettingsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule],
  declarations: []
})
export class UsersRoutingModule { }
