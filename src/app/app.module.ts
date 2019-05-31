import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { LoginComponent } from './pages/login/login.component';
import { ReviewComponent } from './pages/review/review.component';
import { MessageComponent } from './components/message/message.component';
import { CreateApplicantComponent } from './pages/create-applicant/create-applicant.component';
import { ApplicantComponent } from './pages/applicant/applicant.component';
import { AgentComponent } from './pages/agent/agent.component';

import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ApplicantComponent,
    AgentComponent,
    LoginComponent,
    ReviewComponent,
    MessageComponent,
    CreateApplicantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
