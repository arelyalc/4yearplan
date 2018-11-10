import { User } from './../domain/models/user';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent} from './account/account.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import {UsersRoutingModule} from './users-routing.module';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { Profile } from 'selenium-webdriver/firefox';
import { RepositoryService } from '../domain/services';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [AccountComponent, DashboardComponent, ProfileSettingsComponent],
  providers: [
    RepositoryService
  ]
})
export class UsersModule { }
