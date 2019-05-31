import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ReviewComponent } from './pages/review/review.component';
import { CreateApplicantComponent } from '../app/pages/create-applicant/create-applicant.component';
import { ApplicantComponent } from './pages/applicant/applicant.component';
import { AgentComponent } from './pages/agent/agent.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'applicant', component: ApplicantComponent },
  { path: 'agent', component: AgentComponent },
  { path: 'review/:id', component: ReviewComponent },
  { path: 'newapplicant', component: CreateApplicantComponent },
  // { path: 'org', loadChildren: './pages/organization/organization.module#OrganizationModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
