import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../../services/applicant.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { ApplicantStatusDisplay } from '../../models/applicant.model';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  public applicantStatusDisplay: string[] = ApplicantStatusDisplay;

  constructor(private messageService: MessageService, public applicantService: ApplicantService, private router: Router) {

  }

  ngOnInit() {
  }

  reviewApplicant(applicantId: string) {
    this.router.navigate([`review/${applicantId}`]);
  }

  createApplicant() {
    this.router.navigate(['newapplicant']);
  }

  accept(applicantId: string): void {
    this.applicantService.acceptApplicant(applicantId);
  }

  refuse(applicantId: string): void {
    this.applicantService.refuseApplicant(applicantId);
  }

}
