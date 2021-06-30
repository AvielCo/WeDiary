import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/actions/auth.actions';
import * as fromApp from '@store/index';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authMode: string = 'login';
  isLoading: boolean = false;
  error?: string;
  isLoggedIn?: boolean;
  public modal?: NgbModalRef;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {
      urlSegments.forEach((seg) => {
        const { path } = seg;
        this.authMode = path;
      });
    });
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.error;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const { email, password } = form.value;
    switch (this.authMode) {
      case 'register':
        this.store.dispatch(new AuthActions.RegisterStart({ email, password }));
        break;
      case 'login':
        this.store.dispatch(
          new AuthActions.LoginStart({ email, password, close })
        );
        break;
      default:
        return;
    }
  }

  switchAuthMode() {
    this.authMode = this.authMode == 'login' ? 'register' : 'login';
  }
}
