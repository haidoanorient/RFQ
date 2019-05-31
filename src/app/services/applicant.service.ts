import { Injectable } from '@angular/core';
import { Applicant } from '../models/applicant.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApplicantRequest } from '../models/applicant-request.model';

import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  public applicants: Applicant[];

  constructor(private http: HttpClient) {

    const isLogin = JSON.parse(localStorage.getItem('isLogin'));

    if (isLogin === true) {
      this.getApplicants();
    }
  }

  public async getApplicants() {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // get Applicants here, by subcrib
    await this.http.get<Applicant[]>(`${baseUrl}api/v1/Applicant/${currentUser.id}`, httpOptions)
      .subscribe(result => {
        this.applicants = result;
        console.log(result);
      }, error => console.error(error));
  }

  public getApplicantInfo(applicantId: string): any {
    return this.http.post<Applicant>(`${baseUrl}api/v1/Applicant/${applicantId}`, httpOptions).pipe(map(result => result));
  }

  public getApplicantInfoByUserId(userId: string): any {
    return this.http.post<Applicant>(`${baseUrl}api/v1/Applicant/ApplicantInfoByUserId/${userId}`, httpOptions).pipe(map(result => result));
  }

  public uploadFiles(applicantId: string, formData: FormData): any {

    return this.http.post<boolean>(`${baseUrl}api/v1/Applicant/${applicantId}/UploadFile`, formData, {
      reportProgress: true,
    })
      .pipe(map(result => result));
  }

  public getContents(applicantId: string): any {

    // return this.http.post<User>(`${baseUrl}api/v1/Auth/login`, user, httpOptions).pipe(map(result => { return result }));

    return null;
  }

  public acceptApplicant(applicantId: string): any {

    return this.http.post<boolean>(`${baseUrl}api/v1/Applicant/${applicantId}/accept`, httpOptions).pipe(map(result => result));
  }

  public refuseApplicant(applicantId: string): any {
    return this.http.post<boolean>(`${baseUrl}api/v1/Applicant/${applicantId}/refuse`, httpOptions).pipe(map(result => result));
  }

  public createApplicant(applicantRequest: ApplicantRequest): any {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    applicantRequest.agentId = currentUser.id;

    return this.http.post<Applicant>(`${baseUrl}api/v1/Applicant/Create`, applicantRequest, httpOptions).pipe(map(result => result));
  }

  public updateApplicant(applicantRequest: Applicant): any {
    return this.http.post<Applicant>(`${baseUrl}api/v1/Applicant/Update`, applicantRequest, httpOptions).pipe(map(result => result));
  }

}
