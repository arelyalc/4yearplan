import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from '../domain/services/signin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public smuId: string;
  public password: string;
  constructor(private router: Router,
              private sigin: SigninService) { }

  ngOnInit() {
    this.smuId = ' ';
    this.password = ' ';

  }
  public login() {
    this.sigin.logIn(this.smuId, this.password).subscribe(x => {
      const name = 'user/' + x + '/dashboard';
      this.router.navigateByUrl(name);
      // console.log(x.studentID);
      // let idNum = x.id;
      // let name = 'user/'+ idNum;
      // console.log(name)
      // this.router.navigateByUrl(name);
    });
  }

}
