import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule, Router } from '@angular/router';
import {UsersRoutingModule} from './users/users-routing.module'
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UsersModule } from './users/users.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DomainModule } from './domain/domain.module';
import { RegistrationService } from './domain/services';

let DefaultRoute = 'home';

@NgModule({
   declarations: [
      AppComponent,
      HomePageComponent,
      LoginComponent,
      RegistrationComponent,
      ForgotpasswordComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      DomainModule,
      RouterModule.forRoot([
          {path: 'home', component: HomePageComponent},
          {path: 'login', component: LoginComponent},
          {path: 'registration', component: RegistrationComponent},
          {path: 'password', component: ForgotpasswordComponent},
          {path: '', redirectTo: DefaultRoute, pathMatch: 'full'},
          {path: '**', redirectTo: DefaultRoute, pathMatch: 'full'}
      ]),
      UsersModule,
      ReactiveFormsModule
   ],
   providers: [
       RegistrationService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
