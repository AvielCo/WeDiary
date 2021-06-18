import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Modal } from 'bootstrap';
import * as fromApp from '@store/index';
import { Event as EventModel } from '@events/event.model';
import { GuestsService } from './guests.service';
import { Guest } from './guest.model';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css'],
})
export class GuestsComponent implements OnInit {
  private modalElement?: Modal;
  private event?: EventModel;
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

  constructor(
    private store: Store<fromApp.AppState>,
    private guestsService: GuestsService
  ) {}

  ngOnInit(): void {
    this.store.select('guests').subscribe((value) => {
      const { isModalOpen, event } = value;
      if (isModalOpen) {
        this.modalElement!.show();
        this.event = event;
        this.getGuests(event!);
      }
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

    this.guestsService.postGuest(this.event!, newGuest).then((_res) => {
      this.getGuests(this.event!);
      this.changeMode();
    });
  }

  getGuests(event: EventModel) {
    this.guestsService.fetchGuests(event).subscribe((guests) => {
      this.guestsList = guests;
      this.isLoading = false;
    });
  }

  removeGuest(index: number) {
    this.isLoading = true;
    const guest = this.guestsList![index];
    this.guestsService
      .deleteGuest(this.event!, guest)
      .then((_res) => {
        this.getGuests(this.event!);
        this.toggleEditGuest(-1);
      })
      .catch((_error) => {
        this.toggleEditGuest(-1);
        this.isLoading = false;
      });
  }

  saveGuestChanges(index: number) {
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
    this.isLoading = true;
    this.guestsService
      .updateGuest(this.event!, guest, this.changes)
      .then((_res) => {
        this.getGuests(this.event!);
        this.toggleEditGuest(-1);
      })
      .catch((_error) => {
        this.toggleEditGuest(-1);
        this.isLoading = false;
      });
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
