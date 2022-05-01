import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private loginSubscription?: Subscription;
  isUserLoggedIn = false;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.loginSubscription =
      this.data.isUserLoggedIn.subscribe((value: boolean) => this.isUserLoggedIn = value);
  }

  ngOnDestroy() {
    this.loginSubscription?.unsubscribe();
  }
}
