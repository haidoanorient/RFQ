import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { UserLogin } from '../../models/userlogin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLogin = false;
  isLoading = true;
  loginStatus = '';
  submitted = false;

  user: UserLogin = {
    userName: '',
    passWord: '',
  };

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.authService.checkLogin) {
      this.authService.logout();
    }

    this.isLoading = false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.loginStatus = '';
    this.user.userName = this.f.username.value;
    this.user.passWord = this.f.password.value;

    if (this.user.userName !== '' && this.user.passWord !== '') {
      this.authService.login(this.user).pipe(first())
        .subscribe(
          data => {
            if (data !== null) {
              this.isLogin = true;

              localStorage.setItem('isLogin', JSON.stringify(this.isLogin));
              localStorage.setItem('currentUser', JSON.stringify(data));

              this.authService.directUser(data);
            } else {
              this.loginStatus = 'Invalid username or password';
            }
          },
          error => {
            console.log(error);
          });
    }

    this.submitted = true;
  }
}
