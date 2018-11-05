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
      RouterModule.forRoot([
          {path: 'home', component: HomePageComponent},
          {path: 'login', component: LoginComponent},
          {path: 'registration', component: RegistrationComponent},
          {path: 'password', component: ForgotpasswordComponent},
          {path: '', redirectTo: DefaultRoute, pathMatch: 'full'},
          {path: '**', redirectTo: DefaultRoute, pathMatch: 'full'}
      ]),
      UsersModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
