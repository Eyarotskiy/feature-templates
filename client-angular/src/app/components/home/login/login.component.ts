import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import {
  AuthenticationResponse,
  ErrorResponse,
  LoginFormErrorFlags,
  SignInResponse,
  UsersResponse
} from 'src/app/shared/types';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginSubscription?: Subscription;
  users: string[] = [];
  isUserLoggedIn = false;
  fields = {login: 'test@test.com', password: '1'};
  errors: LoginFormErrorFlags = {
    commonError: false,
    emailConfirmationError: false,
    incorrectPasswordError: false,
    loginUserExistsError: false,
    registrationUserExistsError: false,
  };

  constructor(private api: ApiService, private data: DataService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) this.sendAuthenticationRequest();
    this.getUsers();
    this.loginSubscription = this.data.isUserLoggedIn.subscribe((value: boolean) => this.isUserLoggedIn = value);
  }

  ngOnDestroy() {
    this.loginSubscription?.unsubscribe();
  }

  getUsers() {
    this.api.getUsers().subscribe((response: UsersResponse) => {
      this.users = response.users;
    });
  }

  handleSignInClick() {
    this.resetErrorFlags();
    const payload = {login: this.fields.login, password: this.fields.password};

    this.api.sendSignInRequest(payload).subscribe(
      (response: SignInResponse) => {
        this.data.setIsUserLoggedIn(true);
        localStorage.setItem('token', response.token);
      },
      (error: ErrorResponse) => {
        this.errors.incorrectPasswordError = error.code === 401;
        this.errors.emailConfirmationError = error.code === 403;
        this.errors.loginUserExistsError = error.code === 404;
        this.errors.commonError = error.code === 500;
      });
  }

  handleSignUpClick() {
    this.resetErrorFlags();
    const payload = {login: this.fields.login, password: this.fields.password};

    this.api.sendSignUpRequest(payload).subscribe(
      (response: UsersResponse) => {
        this.users = response.users;
      },
      (error: ErrorResponse) => {
        if (error.code === 403) {
          this.errors.registrationUserExistsError = true;
        } else {
          this.errors.commonError = true;
        }
      });
  }

  handleSignOutClick() {
    this.data.setIsUserLoggedIn(false);
    localStorage.removeItem('token');
  }

  private sendAuthenticationRequest() {
    this.api.authenticateUser().subscribe((response: AuthenticationResponse) => {
      this.fields.login = response.login;
      this.data.setIsUserLoggedIn(true);
      localStorage.setItem('token', response.newToken);
    });
  }

  private resetErrorFlags() {
    for (let key in this.errors) {
      // @ts-ignore
      this.errors[key] = false;
    }
  }
}
