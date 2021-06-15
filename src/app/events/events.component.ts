import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Event } from './event.model';
import { EventsService } from './events.service';
import * as Actions from '../store/actions/event.actions';
import * as fromApp from '../store';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  newEvent?: Event;
  eventList?: [Event];

  constructor(
    private store: Store<fromApp.AppState>,
    private eventSerivce: EventsService
  ) {}

  ngOnInit(): void {
    this.store.select('events').subscribe((stateData) => {
      console.log(stateData);
      if (stateData) {
        if (stateData.newEvent) {
          this.addNewEvent(stateData.newEvent);
        }
        if (stateData.eventList) {
          this.eventList = stateData.eventList;
        }
      }
    });
  }

  addNewEvent(event: Event) {
    this.eventSerivce.postEvent(event);
    this.store.dispatch(new Actions.AddEvent(undefined));
  }
}
