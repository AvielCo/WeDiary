import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
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

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    const accessToken = this.authService.autoLogin();
    if (accessToken) {
      this.store.dispatch(new AuthActions.SetIsLoggedIn(true));
    } else {
      this.validateTokens();
    }

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
  }

  validateTokens() {
    this.store.dispatch(new AuthActions.TokenValidationStart());
  }
}
