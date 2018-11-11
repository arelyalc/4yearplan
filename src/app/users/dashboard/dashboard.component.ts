import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain';
import { Router } from '@angular/router';
import { UserService } from 'src/app/domain/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User
  constructor(private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    this.user = new User();
		this.userService.getById(this.user.id).subscribe(data => {
			this.user = this.user.deserialize(data);
			console.log(data);
			console.log(this.user);
		});
		console.log(this.user);
  }

}
