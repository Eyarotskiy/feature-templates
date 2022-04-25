import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private isUserLoggedInSource = new BehaviorSubject(false);
  isUserLoggedIn = this.isUserLoggedInSource.asObservable();

  constructor() { }

  setIsUserLoggedIn(value: boolean) {
    this.isUserLoggedInSource.next(value);
  }
}
