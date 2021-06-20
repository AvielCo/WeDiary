import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '@store/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'WeDiary';
  isLoggedIn = false;
  private storeSub?: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((res) => {
      const { isLoggedIn } = res;
      if (isLoggedIn !== undefined) {
        this.isLoggedIn = isLoggedIn;
      }
    });
  }

  ngOnDestroy() {
    this.storeSub?.unsubscribe();
  }
}
