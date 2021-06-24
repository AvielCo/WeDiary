import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Modal } from 'bootstrap';
import * as fromApp from '@store/index';
import * as GuestsActions from '@store/actions/guest.actions';
import { Event as EventModel } from 'src/models/event.model';
import { GuestsService } from './guests.service';
import { Guest } from '../../models/guest.model';
import { multicast } from 'rxjs/operators';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css'],
})
export class GuestsComponent implements OnInit {
  private modalElement?: Modal;
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
    this.store.select('guests').subscribe((stateData) => {
      const { isModalOpen } = stateData;
      if (isModalOpen) {
        this.modalElement!.show();
      }
      this.isLoading = stateData.loading;
      this.eventId = stateData.eventId;
      this.guestsList = stateData.guests;
      this.newGuest = stateData.newGuest;
      this.guestToDelete = stateData.guestToDelete;
      this.guestToUpdate = stateData.guestToUpdate;
    });
    this.modalElement = new Modal(document.getElementById('guestsModal')!);
  }

  toggleModal() {
    this.selectedRow = -1;
    this.activeEditRow = -1;
    this.modalElement!.toggle();
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
    if (!name || !howMany) {
      alert('Name and How many are required.');
      return;
    }

    const newGuest = new Guest(name, howMany, comment, howMuch);

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
    const { name, howMany } = this.changes;
    if (name?.length == 0 || howMany?.valueOf() == 0) {
      alert('Name and How many are required.');
      return;
    }

    const guest: Guest = this.guestsList![index];
    if (guest.equal(this.changes)) {
      this.toggleEditGuest(-1);
      return;
    }

    this.store.dispatch(
      new GuestsActions.UpdateGuestStart({
        guestId: guest._id!,
        eventId: this.eventId!,
        update: this.changes,
      })
    );
  }

  changeMode(mode?: string, index?: number) {
    switch (mode) {
      case 'add':
        this.selectedRow = -1;
        this.activeEditRow = -1;
        this.toggleAddingMode();
        break;
      case 'edit':
        this.addingMode = false;
        this.toggleEditGuest(index!);
        break;
      case 'add-cancel':
        this.toggleAddingMode();
        break;
      case 'edit-cancel':
        this.changeSelectedRow(-1);
        break;
      default:
        this.changeMode('add-cancel');
        this.changeMode('edit-cancel');
        break;
    }
    this.changes = {};
  }

  changeSelectedRow(index: number) {
    this.selectedRow = index;
    this.toggleEditGuest(-1);
  }

  toggleEditGuest(index: number) {
    this.activeEditRow = index;
  }

  toggleAddingMode() {
    this.addingMode = !this.addingMode;
  }
}
