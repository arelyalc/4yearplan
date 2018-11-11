import { RepositoryService } from 'src/app/domain/services';
import { Component, OnInit, Input } from '@angular/core';
import { Class } from 'src/app/models/class';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/domain/models/plan';

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
  planList: Plan[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private plans: RepositoryService<Plan>
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
    this.plans.getPlan(49490909).subscribe((plan) => {
      this.planList = plan;
      this.plan = plan[0];
    });
  }

  changed(e) {
    const temp = e.target.value;
    this.selected(temp);
   // this.taken.push(e.target.value);
  }

  save() {
    console.log(this.taken);
  }

  savePlan() {
    this.plan.name = '4 year plan ' + this.plan.id;
    this.plan.date = new Date();
    this.plans.updatePlan(this.plan).subscribe((plan) => {
    });
    this.planList.push(this.plan);
    alert('successfully saved your plan!! check it out under saved plans tab ~');
  }

  selected(code: string) {
    this.taken.push(code);
    console.log(this.taken);
  }
}
