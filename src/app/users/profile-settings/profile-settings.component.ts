import { User } from './../../domain/models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from 'src/app/domain/services';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  user: User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private users: RepositoryService<User>
  ) { }

  ngOnInit() {
    const id = 1;
    this.users.getById(id).subscribe((account) => {
      this.user = account;
    });
  }

  // this method is used to update a user's name upon change
  updateName(event) {
    const name = event.target.value;
    this.user.name = name;
    this.users.update(this.user).subscribe((account) => {
      console.log(this.user);
    });
  }

  // this method is used to update a user's email address upon change
  updateEmail(event) {
    const email = event.target.value;
    this.user.email = email;
    this.users.update(this.user).subscribe((account) => {
      console.log(this.user);
    });
  }

  // this method is used to update a user's smu id upon change
  updateStudent(event) {
    const newId = +event.target.value;
    this.user.smuId = newId;
    this.users.update(this.user).subscribe((account) => {
      console.log(this.user);
    });
  }

}
