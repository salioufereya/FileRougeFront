import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlanifierCoursRpComponent } from './planifier-cours-rp/planifier-cours-rp.component';
import { NavComponent } from './nav/nav.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { PlanifierSessionRpComponent } from './planifier-session-rp/planifier-session-rp.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AuthGuard } from './auth.guard';
import { hasRoleGuard } from './has-role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'planifierCours', component: PlanifierCoursRpComponent, canActivate: [AuthGuard, hasRoleGuard],
    data: {
      role: 'RP',
    }
  },
  { path: 'planifierSessions', component: PlanifierSessionRpComponent, canActivate: [AuthGuard, hasRoleGuard],
  data: {
    role: 'RP',
  } },
  { path: 'inscription', component: InscriptionComponent, canActivate: [AuthGuard, hasRoleGuard],
  data: {
    role: 'RP',
  } },
  { path: 'login', component: LoginComponent },
  { path: 'calendrier', component: CalendrierComponent, canActivate: [AuthGuard, hasRoleGuard],
  data: {
    role: 'RP',
  } },
  { path: 'appNav', component: NavComponent },
  { path: 'professeurs', loadChildren: () => import('./professeurs/professeurs.module').then(m => m.ProfesseursModule), canActivate: [AuthGuard, hasRoleGuard],
  data: {
    role: 'prof',
  } },
  { path: 'attach', loadChildren: () => import('./attach/attach.module').then(m => m.AttachModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
