import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Modal } from 'bootstrap';
import { Event } from 'src/models/event.model';
import { Person } from 'src/models/person.model';
import * as FromEvents from '@store/reducers/event.reducer';
import * as EventsActions from '@store/actions/event.actions';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  private modalElement?: Modal;

  constructor(private store: Store<FromEvents.AppState>) {}

  ngOnInit(): void {
    this.modalElement = new Modal(document.getElementById('addEventModal')!);
  }

  onSubmit(newEventForm: NgForm) {
    const { date, location, fpname, fpgender, spname, spgender } =
      newEventForm.form.value;
    const firstPerson = new Person(fpname, fpgender);
    const secondPerson = new Person(spname, spgender);
    const newEvent = new Event(date, location, firstPerson, secondPerson);
    this.store.dispatch(new EventsActions.AddEvent(newEvent));
    this.toggleModal();
    newEventForm.reset();
  }

  toggleModal() {
    this.modalElement!.toggle();
  }
}
