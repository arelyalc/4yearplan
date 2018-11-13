import { RepositoryService } from 'src/app/domain/services';
import { Component, OnInit, Input } from '@angular/core';
import { Class } from 'src/app/models/class';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/domain/models/plan';
import { SigninService } from 'src/app/domain/services/signin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input()
  taken: string[] = [];
  options: Class[];
  plan: Plan;
  planList: Plan[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private plans: RepositoryService<Plan>,
    private signin: SigninService
  ) { }

  ngOnInit() {
    this.options = [
      { code: 'IIC1' , name: 'American History'},
      { code: 'CA1', name: 'Art'},
      { code: 'HC1', name: 'Art History'},
      { code: 'PASI PASII', name: 'Biology'},
      { code: 'PASI', name: 'Chemistry'},
      { code: 'CA', name: 'Computer Science A'},
      { code: 'QR', name: 'Economics: Macro'},
      { code: 'QR', name: 'Economics: Micro'},
      { code: 'DISC1 DISC2', name: 'English Lit/Lang'},
      { code: 'PASI', name: 'Enviromental Science'},
      { code: 'HC1 HC2', name: 'European History'},
      { code: 'IIC1', name: 'Government: American'},
      { code: 'IIC1', name: 'Government: Comparative'},
      { code: 'None', name: 'Human Geography'},
      { code: 'SL1 SL2', name: 'Language/Lit - Chinese'},
      { code: 'SL1 SL2', name: 'Language/Lit - French'},
      { code: 'SL1 SL2', name: 'Language/Lit - German'},
      { code: 'SL1 SL2', name: 'Language/Lit - Italian'},
      { code: 'SL1 SL2', name: 'Language/Lit - Japanese Language & Culture'},
      { code: 'SL1 SL2', name: 'Language/Lit - Latin'},
      { code: 'SL1 SL2', name: 'Language/Lit - Spanish'},
      { code: 'QF', name: 'Math: Calculus AB'},
      { code: 'QF', name: 'Math: Calculus BC'},
      { code: 'None', name: 'Music Theory'},
      { code: 'SEB', name: 'Physics 1'},
      { code: 'SEB', name: 'Physics 2'},
      { code: 'PASI', name: 'Physics C (Mech)'},
      { code: 'PASII', name: 'Physics C (E&M)'},
      { code: 'IC1', name: 'Psychology'},
      { code: 'QF', name: 'Statistics'},
      { code: 'None', name: 'World History'}
    ];
    console.log(this.planList);
    // this.plans.getPlans(this.signin.getId()).subscribe((plan) => {
    //   this.planList = plan;
    // });
  }

  // this is used to track the changes via the generate form
  changed(e) {
    const temp = e.target.value;
    this.selected(temp);
  }

  // this method is used to send the taken array to the backend so that the 4yearplan is generated
  save() {
    console.log(this.taken);
    const id = this.signin.getId();
    this.plans.sendTaken(id, this.taken).subscribe((plan) => {
    });
  }

  // this method is used to save the plan after it is generated
  savePlan() {
    this.plan.name = '4 year plan ' + this.plan.id;
    this.plan.date = new Date();
    const id = this.signin.getId();
    this.plans.savePlan(id, this.plan).subscribe((plan) => {
    });
    this.planList.push(this.plan);
    alert('successfully saved your plan!! check it out under saved plans tab ~');
  }

  // this methos is used to save the selected values to the taken array
  selected(code: string) {
    this.taken.push(code);
    console.log(this.taken);
  }

  // this method is used to redirect to the profile settings page
  updateProf() {
    const id = this.signin.getId();
    this.router.navigate(['/user', id, 'settings']);
  }

  // this method is used to redirect to the appropriate plan once selected from the saved plans tab
  goPlan(name: string) {
    // get appropriate plan
    // this.plan = ;
    const id = this.signin.getId();
    this.router.navigate(['/user', id, 'dashboard']);
  }
}
