import { Component, OnInit } from '@angular/core';
import { Applicant } from '../../models/applicant.model';
import { AuthService } from '../../services/auth.service';
import { ApplicantService } from '../../services/applicant.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {

  applicant: Applicant;
  submitted = false;
  formData: FormData;

  constructor(private authService: AuthService, private applicantService: ApplicantService) {
  }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.applicantService.getApplicantInfoByUserId(currentUser.id).pipe(first())
      .subscribe(
        data => {
          this.applicant = data;
        },
        error => {
          console.log(error);
        });
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);

      this.formData = formData;
    }
  }

  onSubmit() {
    this.applicantService.updateApplicant(this.applicant).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });

    if (this.formData != null) {
      this.applicantService.uploadFiles(this.applicant.id, this.formData).pipe(first())
        .subscribe(
          data => {
            console.log(data);
            this.submitted = true;
          },
          error => {
            console.log(error);
          });
    }
  }
}
