import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Modal } from 'bootstrap';
import * as AuthActions from '@store/actions/auth.actions';
import * as fromApp from '@store/index';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  private modalElement?: Modal;
  authMode: string = 'login';
  isLoading: boolean = false;
  error?: string;
  isLoggedIn?: boolean;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      const { isModalOpen } = authState;
      if (isModalOpen) {
        this.modalElement!.show();
      }
      this.isLoading = authState.loading;
      this.error = authState.error;
    });
    this.modalElement = new Modal(document.getElementById('exampleModal')!);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const { email, password } = form.value;
    switch (this.authMode) {
      case 'register':
        this.store.dispatch(new AuthActions.RegisterStart({ email, password }));
        break;
      case 'login':
        this.store.dispatch(new AuthActions.LoginStart({ email, password }));
        break;
      default:
        return;
    }
  }

  switchAuthMode() {
    this.authMode = this.authMode == 'login' ? 'register' : 'login';
  }

  closeModal() {
    this.store.dispatch(new AuthActions.CloseModal());
  }
}
