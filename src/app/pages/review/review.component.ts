import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../../services/applicant.service';
import { MessageService } from '../../services/message.service';
import { Applicant, ApplicantStatusDisplay } from '../../models/applicant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  applicant: Applicant;

  applicantStatusDisplay: string[] = ApplicantStatusDisplay;

  contentUri = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

  constructor(private messageService: MessageService,
              private router: Router,
              private applicantService: ApplicantService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    const applicantId = this.activatedRoute.snapshot.paramMap.get('id');

    this.applicantService.getApplicantInfo(applicantId).pipe(first())
      .subscribe(
        data => {
          this.applicant = data;
        },
        error => {
          console.log(error);
        });

    // this.getContents();
  }

  getContents(): void {
    this.applicantService.getContents(this.applicant.id);
  }

  accept(applicantId: string): void {
    this.applicantService.acceptApplicant(applicantId).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          // reload data
          this.applicantService.getApplicants();

          alert(`Accepted ApplicantId: ${applicantId}`);

          this.router.navigate(['/agent']);
        },
        error => {
          console.log(error);
        });
  }

  refuse(applicantId: string): void {
    this.applicantService.refuseApplicant(applicantId).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          // reload data
          this.applicantService.getApplicants();

          alert(`Refused ApplicantId: ${applicantId}`);

          this.router.navigate(['/agent']);
        },
        error => {
          console.log(error);
        });
  }

}
