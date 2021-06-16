import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Event } from '@events/event.model';
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
  newEvent?: Event;
  eventList?: Event[];

  constructor(
    private store: Store<fromApp.AppState>,
    private eventSerivce: EventsService
  ) {}

  ngOnInit() {
    this.store.select('events').subscribe(async (stateData) => {
      if (stateData) {
        if (stateData.newEvent) {
          await this.addNewEvent(stateData.newEvent);
          this.getEvents();
        }
      }
    });
    this.getEvents();
  }

  async addNewEvent(event: Event) {
    await this.eventSerivce.postEvent(event);
    this.store.dispatch(new EventsActions.AddEvent(undefined));
  }

  getEvents() {
    this.eventSerivce
      .fetchEvents()
      .subscribe((events) => (this.eventList = events));
  }

  openGuestsModal(event: Event) {
    this.store.dispatch(
      new GuestsActions.OpenModal({ toOpen: true, event: event })
    );
  }
}
