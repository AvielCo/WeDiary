import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '@store/index';
import * as Actions from '@store/actions/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  storeSub?: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((res) => {
      const { isLoggedIn } = res;
      if (isLoggedIn !== undefined) {
        this.isLoggedIn = isLoggedIn;
      }
    });
  }

  ngOnDestroy() {}

  openAuthModal() {
    this.store.dispatch(new Actions.OpenModal());
  }

  logout() {
    this.store.dispatch(new Actions.Logout());
  }
}
