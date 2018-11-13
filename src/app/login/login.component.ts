import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from '../domain/services/signin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public smuId: number;
  public password: string;
  constructor(private router: Router,
              private sigin: SigninService) { }

  ngOnInit() {
    this.smuId = 0;
    this.password = ' ';

  }

  // this method is used to redirect the user to their dashboard once their credentials are authenticated
  public login() {
    this.sigin.logIn(this.smuId, this.password).subscribe(x => {
      const name = 'user/' + x + '/dashboard';
      this.router.navigateByUrl(name);
    });
  }

}
