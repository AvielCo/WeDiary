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

  addNewGuest() {}

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
      .then((res) => {
        this.getGuests(this.event!);
        this.toggleEditGuest(-1);
      })
      .catch((error) => {
        this.toggleEditGuest(-1);
        this.isLoading = false;
      });
    // TODO: refresh list after delete
  }

  saveGuestChanges(index: number) {
    const guest: Guest = this.guestsList![index];
    if (guest.equal(this.changes)) {
      this.toggleEditGuest(-1);
      return;
    }
    this.isLoading = true;
    this.guestsService
      .updateGuest(this.event!, guest, this.changes)
      .then((res) => {
        this.getGuests(this.event!);
        this.toggleEditGuest(-1);
      })
      .catch((error) => {
        this.toggleEditGuest(-1);
        this.isLoading = false;
      });
    // TODO: refresh list after edit
  }

  changeSelectedRow(index: number) {
    this.selectedRow = index;
    console.log(index);
  }

  toggleEditGuest(index: number) {
    this.activeEditRow = index;
    this.changes = {};
  }
}
