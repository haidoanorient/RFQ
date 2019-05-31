import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { User, UserType } from '../models/user.model';
import { UserLogin } from '../models/userlogin.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogin = false;
  private user: User = new User();

  constructor(private router: Router, private http: HttpClient) { }

  public IsLogin(): boolean {

    const isLogin = JSON.parse(localStorage.getItem('isLogin'));

    if (isLogin != null && isLogin === true) {
      return true;
    } else {
      return false;
    }
  }

  public login(user: UserLogin): any {
    return this.http.post<User>(`${baseUrl}api/v1/user/login`, user, httpOptions).pipe(map(result => result));
  }

  public getCurrentUser(): User {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser != null) {
      this.user = currentUser;
    }
    return this.user;
  }

  public checkLogin(): void {
    const isLogin = JSON.parse(localStorage.getItem('isLogin'));

    if (isLogin != null) {
      this.isLogin = isLogin;
    }

    if (this.isLogin === true) {
      this.getCurrentUser();
      this.directUser(this.user);
    } else {
      this.router.navigate(['/login']);
    }

  }

  public directUser(user: User): void {
    if (user.userType === UserType.Applicant) { // type applicant
      this.router.navigate(['/applicant']);
    } else if (user.userType === UserType.Agent) {
      this.router.navigate(['/agent']);
    } else {
      this.router.navigate(['/']);
    }
  }

  public logout(): void {
    // Clear Session memory
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
