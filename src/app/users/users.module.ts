import { SigninService } from './../domain/services/signin.service';
import { User } from './../domain/models/user';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent} from './dashboard/dashboard.component';
import {UsersRoutingModule} from './users-routing.module';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { Profile } from 'selenium-webdriver/firefox';
import { PlansService } from '../domain/services';



@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [ DashboardComponent, ProfileSettingsComponent],
  providers: [
    SigninService, PlansService
  ]
})
export class UsersModule { }
