import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Modal } from 'bootstrap';
import { Observable } from 'rxjs';
import { CloseModal } from '@store/actions/auth.actions';
import * as fromApp from '@store/index';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authMode: string = 'login';
  private modalElement?: Modal;

  constructor(private store: Store<fromApp.AppState>) {}

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
    console.log(form.value);
    form.reset();
  }

  switchAuthMode() {
    this.authMode = this.authMode == 'login' ? 'register' : 'login';
  }

  closeModal() {
    this.store.dispatch(new CloseModal());
  }
}
