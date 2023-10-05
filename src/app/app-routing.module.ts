import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { PlanifierCoursRpComponent } from './planifier-cours-rp/planifier-cours-rp.component';
import { PlanifierSessionRpComponent } from './planifier-session-rp/planifier-session-rp.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'planifierCours', component: PlanifierCoursRpComponent },
  { path: 'planifierComponents', component: PlanifierSessionRpComponent },
  { path: 'appNav', component: NavComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
