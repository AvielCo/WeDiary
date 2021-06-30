import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Guest } from '@models/guest.model';
import * as fromApp from '@store/index';
import * as GuestsActions from '@store/actions/guest.actions';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css'],
})
export class GuestsComponent implements OnInit {
  private eventId?: string;
  private changes: {
    name?: string;
    howMany?: Number;
    howMuch?: Number;
    comment?: string;
  } = {};
  activeEditRow: number = -1;
  selectedRow: number = -1;
  addingMode: boolean = false;
  mode?: string;
  isLoading: boolean = true;
  guestsList?: Guest[];
  newGuest?: Guest;
  guestToDelete?: string;
  guestToUpdate?: string;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.getGuests();
    this.store.select('guests').subscribe((stateData) => {
      this.isLoading = stateData.loading;
      this.guestsList = stateData.guests;
      this.newGuest = stateData.newGuest;
      this.guestToDelete = stateData.guestToDelete;
      this.guestToUpdate = stateData.guestToUpdate;
    });
  }

  handleSubmit(index: number) {
    this.updateGuest(index);
  }

  openEditForRow(index: number) {
    if (index !== -1) {
      if (index === this.activeEditRow) {
        this.activeEditRow = -1;
        return;
      }
      //is editing
      this.activeEditRow = index;
      this.addingMode = false;
      return;
    }
    this.activeEditRow = -1;
    this.addingMode = true;
  }

  onChange(e: Event) {
    const { name, value } = e.target as HTMLInputElement;
    this.changes = {
      ...this.changes,
      [name]: value,
    };
  }

  addNewGuest() {
    const { name, howMany, howMuch, comment } = this.changes;
    const newGuest = new Guest(name!, howMany!, comment, howMuch);

    this.store.dispatch(
      new GuestsActions.AddGuestStart({
        guest: newGuest,
        eventId: this.eventId!,
      })
    );
  }

  getGuests() {
    this.store.dispatch(new GuestsActions.GetGuestsStart(this.eventId!));
  }

  removeGuest(index: number) {
    const guest = this.guestsList![index];
    this.store.dispatch(
      new GuestsActions.RemoveGuestStart({
        guestId: guest._id!,
        eventId: this.eventId!,
      })
    );
  }

  updateGuest(index: number) {
    const changes = { ...this.changes };
    this.changes = {};
    this.activeEditRow = -1;
    const { name, howMany } = changes;
    if (name?.length == 0 || howMany?.valueOf() == 0) {
      alert('Name and How many are required.');
      return;
    }

    const guest: Guest = this.guestsList![index];
    if (guest.equal(changes)) {
      return;
    }

    this.store.dispatch(
      new GuestsActions.UpdateGuestStart({
        guestId: guest._id!,
        eventId: this.eventId!,
        update: changes,
      })
    );
  }
}
