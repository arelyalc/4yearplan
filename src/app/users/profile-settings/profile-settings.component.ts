import { User } from './../../domain/models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService, SigninService } from 'src/app/domain/services';

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
    private users: SigninService
  ) { }

  ngOnInit() {
    this.user = new User();
    //this.user.id = this.users.getId();
    //console.log(this.user.id)
    this.users.getById(this.users.getId()).subscribe((userBack)=>{
      this.user = (userBack)
      console.log(this.user)
    });
    console.log(this.user)
    
  }

  // this method is used to update a user's name upon change
  updateName(event) {
    const name = event.target.value;
    this.user.name = name;
    //console.log(this.user.id)
    this.users.updateInformation(this.user, this.users.getId()).subscribe((account) => {
      console.log(this.user);
    });
  }

  // this method is used to update a user's email address upon change
  updateEmail(event) {
    const email = event.target.value;
    this.user.email = email;
    this.users.updateInformation(this.user, this.users.getId()).subscribe((account) => {
      console.log(this.user);
    });
  }

  // this method is used to update a user's smu id upon change
  updateStudent(event) {
    const newId = +event.target.value;
    this.user.smuId = newId;
    this.users.updateInformation(this.user, this.users.getId()).subscribe((account) => {
      console.log(this.user);
    });
  }

}
