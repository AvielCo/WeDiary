import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Event } from 'src/models/event.model';
import { EventsService } from '@events/events.service';
import * as EventsActions from '@store/actions/event.actions';
import * as GuestsActions from '@store/actions/guest.actions';
import * as fromApp from '@store/index';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  eventList?: Event[];
  newEvent?: Event;
  eventToDelete?: string;
  eventToUpdate?: string;

  isLoading: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.getEvents();
    this.store.select('events').subscribe(async (stateData) => {
      this.isLoading = stateData.loading;
      this.eventList = stateData.events;
      this.newEvent = stateData.newEvent;
      this.eventToDelete = stateData.eventToDelete;
      this.eventToUpdate = stateData.eventToUpdate;
    });
  }

  getEvents() {
    this.store.dispatch(new EventsActions.GetEventsStart());
  }

  openGuestsModal(eventId: string) {
    this.store.dispatch(
      new GuestsActions.OpenModalStart({ toOpen: true, eventId })
    );
  }
}
