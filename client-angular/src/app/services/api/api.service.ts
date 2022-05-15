import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  AuthenticationResponse,
  DishData, FileUploadResponse,
  LoginData,
  SignInResponse,
  UserData,
  UsersResponse
} from 'src/app/shared/types';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  getData(): Observable<UserData[]> {
    return this.http.get<UserData[]>('/api/data/get').pipe(catchError(this.handleError));
  }

  getMenu(): Observable<DishData[]> {
    return this.http.get<DishData[]>('/api/menu/get').pipe(catchError(this.handleError));
  }

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>('/api/users/get').pipe(catchError(this.handleError));
  }

  sendSignInRequest(payload: LoginData): Observable<SignInResponse> {
    return this.http.post<SignInResponse>('/api/login/signIn', payload).pipe(catchError(this.handleError));
  }

  sendSignUpRequest(payload: LoginData): Observable<UsersResponse> {
    return this.http.post<UsersResponse>('/api/login/signUp', payload).pipe(catchError(this.handleError));
  }

  uploadFile(payload: FormData): Observable<FileUploadResponse> {
    return this.http.post<FileUploadResponse>('/api/file/upload', payload).pipe(catchError(this.handleError));
  }

  authenticateUser(): Observable<AuthenticationResponse> {
    return this.http.get<AuthenticationResponse>('/api/login/authenticate').pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
  }
}
