import { RepositoryService, PlansService } from '../../domain/services';
import { Component, OnInit, Input } from '@angular/core';
import { Class } from '../../domain/models/class';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from '../../domain/models/plan';
import { SigninService } from '../../domain/services/signin.service';
import { Course } from '../../domain/models/course';
import { $ } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input()
  taken: string[] = []; // will be used to save ap credit taken by a student
  options: Class[]; // will be used for alternative classes
  plan: Plan; // actual plan object
  planList: Plan[]; // list of saved plans
  planName: string; // name of new plan to be saved
  allClasses: Course[]; // result of get courses back end route


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private plans: PlansService,
    private courses: PlansService,
    private signin: SigninService
  ) { }

  ngOnInit() {
    // maps an inputed ap credit to its corresponding 
    // satisfied UC requirements
    this.options = [
      { code: 'IIC1', name: 'American History' },
      { code: 'CA1', name: 'Art' },
      { code: 'HC1', name: 'Art History' },
      { code: 'PAS1 PAS2', name: 'Biology' },
      { code: 'PAS1', name: 'Chemistry' },
      { code: 'CA1', name: 'Computer Science A' },
      { code: 'QR', name: 'Economics: Macro' },
      { code: 'QR', name: 'Economics: Micro' },
      { code: 'DISC1 DISC2', name: 'English Lit/Lang' },
      { code: 'PAS1', name: 'Enviromental Science' },
      { code: 'HC1 HC2', name: 'European History' },
      { code: 'IIC1', name: 'Government: American' },
      { code: 'IIC1', name: 'Government: Comparative' },
      { code: 'None', name: 'Human Geography' },
      { code: 'SL1 SL2', name: 'Language/Lit - Chinese' },
      { code: 'SL1 SL2', name: 'Language/Lit - French' },
      { code: 'SL1 SL2', name: 'Language/Lit - German' },
      { code: 'SL1 SL2', name: 'Language/Lit - Italian' },
      { code: 'SL1 SL2', name: 'Language/Lit - Japanese Language & Culture' },
      { code: 'SL1 SL2', name: 'Language/Lit - Latin' },
      { code: 'SL1 SL2', name: 'Language/Lit - Spanish' },
      { code: 'QF', name: 'Math: Calculus AB' },
      { code: 'QF', name: 'Math: Calculus BC' },
      { code: 'None', name: 'Music Theory' },
      { code: 'SEB', name: 'Physics 1' },
      { code: 'SEB', name: 'Physics 2' },
      { code: 'PAS1', name: 'Physics C (Mech)' },
      { code: 'PAS2', name: 'Physics C (E&M)' },
      { code: 'IC1', name: 'Psychology' },
      { code: 'QF', name: 'Statistics' },
      { code: 'None', name: 'World History' }
    ];

    // retrieving all of the plans for x specific user
    this.plans.getPlans(this.signin.getId()).subscribe((plan) => {
        this.planList = plan;
    });
  }

  // this is used to track the changes via the generate form
  changed(e) {
    const temp = e.target.value;
    this.selected(temp);
  }

  name(e) {
    this.planName = e.target.value;
  }

  // this method is used to send the taken array to the backend
  // so that it can be saved with the appropriate user document
  save() {

    const id = this.signin.getId();

    const newTaken = [];
    let i;
    for (i = 0; i < this.taken.length; i++) {
        const uc = this.taken[i];

        if (uc.indexOf(' ') >= 0) {

          const ucs = uc.split(' ');
          let j;
          for (j = 0; j < ucs.length; j++) {
            newTaken.push(ucs[j]);
          }
        } else {
          newTaken.push(uc);
        }
    }

    this.taken = newTaken;
    console.log(this.taken + ' UCS SPLIT');


    this.plans.sendTaken(id, this.taken).subscribe((plan) => {
      console.log('Prev credit saved');
    });

    this.genPlan();
  }

  // called to actually calculate the 4 year plan
  // heart of the application is here
  genPlan() {
    this.plan = new Plan();
    this.plan.altCourses = [];

    // get all courses in array of objects from backend
    this.courses.getCourses().subscribe((courses) => {

      // sort courses according to order number ascending
      courses.sort(function compare(a, b) {
        if (a.order > b.order) {
          return 1;
        } else if (a.order < b.order) {
          return -1;
        } else {
          return 0;
        }
      }); // end sort

      // assign class variable 
      this.allClasses = courses;

      // index to keep track of position in allClasses array
      let allClassesIdx = 0;

      // index to keep track of posiion in 4 year plan
      let orderIdx = 1;

      // go through all 8 semesters
      for (let i = 0; i < 8; i++) {
        console.log('Calculating sem ' + (i + 1));

        // semester array
        const temp = [];

        // go through all 5 classes per semester
        while (temp.length < 5) {
          console.log('Calculating class number ' + orderIdx);

          // retrieve next course from array
          const currCourse = this.allClasses[allClassesIdx];

          // get array of requirements satisfied by this class
          const UC = currCourse.UC;
          console.log(currCourse.id + ' satisfies ' + UC);

          let takeClass = true;

          // tslint:disable-next-line:forin
          for (let j = 0; j < UC.length; j++) {

            if (this.taken.includes(UC[j])) {
              console.log('UC already satisfied, class not added');
              takeClass = false;
              orderIdx++;
            }
          } // end uc for loop

          // add to plan if it's a needed UC
          if (takeClass === true) {
            // if this is not an alternative option (first of its order in array)
            if (currCourse.order === orderIdx) {
              temp.push(currCourse.id);
              console.log(currCourse.id + ' added');
              orderIdx++;
            } else {
              this.plan.altCourses.push(currCourse.id);
            }
          }

          // increment position in allClasses array
          allClassesIdx++;
        }

        // add to plan obj with appropriate naming
        this.plan['sem' + (i + 1)] = temp;

      } // end semester for loop aka plan generated

    });
  }

  // this method is used to save the plan after it is generated
  savePlan() {
    this.plan.name = this.planName;
    this.plan.date = new Date();
    const id = this.signin.getId();
    this.plans.saveCurrentPlan(id, this.plan).subscribe((plan) => {
      // this.plan = plan;
      console.log(plan);
       this.plans.getPlans(this.signin.getId()).subscribe((plan2) => {
         this.planList = plan2;
         console.log(this.planList);
       });
    });
    // alert('successfully saved your plan!! check it out under saved plans tab ~');
  }

  // this methos is used to save the selected values to the taken array
  // don't include 'none' credits which are not counted for anything
  selected(code: string) {
    if (code !== 'None') {
      this.taken.push(code);
    }
  }

  // this method is used to redirect to the profile settings page
  updateProf() {
    const id = this.signin.getId();
    this.router.navigate(['/user', id, 'settings']);
  }

  // this method is used to redirect to the appropriate plan once selected from the saved plans tab
  goPlan(name: string) {
    // get appropriate plan
    let i;
    for (i = 0; i < this.planList.length; i++) {
      if (this.planList[i]['name'] === name) {
        this.plan = this.planList[i];
        console.log('the plan is equal to ' + name);
      }
    }
    const id = this.signin.getId();
    console.log(id);
    const temp = '/user/' + id + '/dashboard';
    this.router.navigateByUrl(temp);
    // location.reload();
  }

  // this function will log out a user
  logout() {
    this.signin.logOut();
    this.router.navigateByUrl('home');
  }
}
