import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../../services/applicant.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApplicantRequest } from '../../models/applicant-request.model';

@Component({
  selector: 'app-create-applicant',
  templateUrl: './create-applicant.component.html',
  styleUrls: ['./create-applicant.component.css']
})
export class CreateApplicantComponent implements OnInit {

  applicantRequest: ApplicantRequest = new ApplicantRequest();
  canSubmit = true;

  constructor(private applicantService: ApplicantService, private router: Router) { }

  ngOnInit() {
  }

  emailInputChange() {
    if (this.applicantRequest.email.length > 0) {
      this.canSubmit = false;
    } else {
      this.canSubmit = true;
    }
  }

  onSubmit(): void {
    this.applicantService.createApplicant(this.applicantRequest).pipe(first())
      .subscribe(
        data => {
          alert('Created');

          // Reload Data
          this.applicantService.getApplicants();

          this.router.navigate(['/agent']);
        },
        error => {
          console.log(error);
        });
  }

}
