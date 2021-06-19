import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Modal } from 'bootstrap';
import { Observable } from 'rxjs';
import { CloseModal } from '@store/actions/auth.actions';
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

  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((value) => {
      const { isModalOpen } = value;
      if (isModalOpen) {
        this.modalElement!.show();
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
          (res) => {
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
          (res) => {
            this.isLoading = false;
          },
          (errorResponse: HttpErrorResponse) => {
            const { status, message } = errorResponse.error.error;
            this.error = message;

            this.isLoading = false;
          }
        );

        break;
      default:
        return;
    }
    form.reset();
  }

  switchAuthMode() {
    this.authMode = this.authMode == 'login' ? 'register' : 'login';
  }

  closeModal() {
    this.store.dispatch(new CloseModal());
  }
}
