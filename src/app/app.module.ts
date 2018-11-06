import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {UsersRoutingModule} from './users/users-routing.module';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UsersModule } from './users/users.module';

const DefaultRoute = 'home';

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
      HttpModule,
      HttpClientModule,
      FormsModule,
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
   exports: [RouterModule],
   providers: [UsersRoutingModule],
   bootstrap: [AppComponent]
})
export class AppModule { }
