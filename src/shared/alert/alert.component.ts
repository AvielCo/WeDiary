import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Alert } from 'bootstrap';
import * as fromApp from '@store/index';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  alertElement?: Alert;
  message?: string;
  type?: string;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      const { actionType, error } = authState;
      if (actionType && error) {
        this.message = `[${actionType}] ${error}`;
      }
    });
    this.store.select('events').subscribe((eventsState) => {
      const { actionType, error } = eventsState;

      if (actionType && error) {
        this.message = `[${actionType}] ${error}`;
      }
    });
    this.store.select('guests').subscribe((guestsState) => {
      const { actionType, error } = guestsState;
      if (actionType && error) {
        this.message = `[${actionType}] ${error}`;
      }
    });
    this.type = 'danger';
  }

  dismissAlert() {
    this.message = '';
    this.type = '';
  }
}
