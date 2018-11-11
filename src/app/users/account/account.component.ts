import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain';
import { UserService } from 'src/app/domain/services/user.service';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/domain/services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private auth: SigninService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User();
    this.user.id = +this.auth.getId();
		this.userService.getById(this.user.id).subscribe(data => {
			this.user = this.user.deserialize(data);
			console.log(data);
			console.log(this.user);
		});
		console.log(this.user);
  }
  public delete()
	 {
		this.userService.delete(this.user.id).subscribe(x => {
			this.router.navigateByUrl('home');
		});
	 }

}
