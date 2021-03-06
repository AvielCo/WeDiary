import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Event } from '@models/event.model';
import { Person } from '@models/person.model';
import * as FromEvents from '@store/reducers/event.reducer';
import * as EventsActions from '@store/actions/event.actions';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(private store: Store<FromEvents.AppState>) {}

  ngOnInit(): void {}

  onSubmit(newEventForm: NgForm) {
    const { date, location, fpname, fpgender, spname, spgender } =
      newEventForm.form.value;
    const firstPerson = new Person(fpname, fpgender);
    const secondPerson = new Person(spname, spgender);
    const newEvent = new Event(date, location, firstPerson, secondPerson);
    this.store.dispatch(new EventsActions.AddEventStart(newEvent));
    newEventForm.reset();
  }
}
