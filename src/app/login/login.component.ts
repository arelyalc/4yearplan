import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from '../domain/services/signin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  constructor(private router: Router,
              private sigin: SigninService) { }

  ngOnInit() {
    this.email = ' ';
    this.password = ' ';

  }
  public login() {
    this.sigin.logIn(this.email, this.password).subscribe(x => {
      console.log(x);
      console.log(x.id);
      const name = 'user/' + x.id + '/account';
      this.router.navigateByUrl(name);
      // console.log(x.studentID);
      // let idNum = x.id;
      // let name = 'user/'+ idNum;
      // console.log(name)
      // this.router.navigateByUrl(name);
    });
  }

}
