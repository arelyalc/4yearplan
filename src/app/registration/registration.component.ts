import { Component, OnInit } from '@angular/core';
import { User } from '../domain';
import { RegistrationService } from '../domain/services';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User;
  constructor(
    private signup: RegistrationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  // this is used to save a user to the database once they sign up for an account
  public save() {
    console.log(this.user);
    this.signup.add(this.user).subscribe(x => {
    });
  }
}
