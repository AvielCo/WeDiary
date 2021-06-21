import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/actions/auth.actions';
import * as fromApp from '@store/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'WeDiary';
  isLoggedIn: boolean = false;
  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.validateTokens();

    window.addEventListener(
      'storage',
      (storageEvent: StorageEvent) => {
        if (storageEvent.key === 'accessToken') {
          if (storageEvent.newValue) {
            this.validateTokens();
          }
        }
      },
      false
    );
    this.store.select('auth').subscribe((res) => {
      this.isLoggedIn = res.isLoggedIn;
    });
  }

  validateTokens() {
    this.authService.validateAccessToken().subscribe(
      (_res) => this.store.dispatch(new AuthActions.SetIsLoggedIn(true)),
      (_err) => this.store.dispatch(new AuthActions.SetIsLoggedIn(false))
    );
  }
}
