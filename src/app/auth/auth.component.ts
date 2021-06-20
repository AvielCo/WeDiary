import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Modal } from 'bootstrap';
import { Observable } from 'rxjs';
import * as Action from '@store/actions/auth.actions';
import * as fromApp from '@store/index';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin().subscribe(
      (_res) => {
        this.store.dispatch(new Action.Login());
      },
      (_err: HttpErrorResponse) => {
        console.log(_err);
      }
    );

    this.store.select('auth').subscribe((value) => {
      const { isModalOpen, isLoggedIn } = value;
      if (isModalOpen) {
        this.modalElement!.show();
      }
      if (isLoggedIn !== undefined) {
        this.isLoggedIn = isLoggedIn;
      }
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
        this.authService.register(email, password).subscribe(
          (_res) => {
            this.isLoading = false;
          },
          (err: HttpErrorResponse) => {
            switch (err.status) {
              case 400:
                // BAD REQUEST
                break;
              case 404:
                break;
              case 409:
                this.error = 'Email already exists.';
                break;
              case 500:
                this.error = 'Internal server error';
                break;
              default:
                this.error = 'An error occurred.';
            }
            this.isLoading = false;
          }
        );
        break;
      case 'login':
        this.authService.login(email, password).subscribe(
          (_res) => {
            this.isLoading = false;
            this.store.dispatch(new Action.Login());
          },
          (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            const { status, message } = errorResponse.error.error;
            this.error = message;
            this.isLoading = false;
          }
        );

        break;
      default:
        return;
    }
  }

  switchAuthMode() {
    this.authMode = this.authMode == 'login' ? 'register' : 'login';
  }

  closeModal() {
    this.store.dispatch(new Action.CloseModal());
  }
}
