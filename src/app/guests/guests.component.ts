import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Modal } from 'bootstrap';
import * as fromApp from '@store/index';
import { Event } from '@events/event.model';
import { GuestsService } from './guests.service';
import { Guest } from './guest.model';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css'],
})
export class GuestsComponent implements OnInit {
  private modalElement?: Modal;
  isLoading: boolean = true;
  guestsList?: Guest[];
  private event?: Event;

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
    this.modalElement!.toggle();
  }

  addNewGuest() {}

  getGuests(event: Event) {
    this.guestsService.fetchGuests(event).subscribe((guests) => {
      console.log(guests);
      this.guestsList = guests;
      this.isLoading = false;
    });
  }

  removeGuest(guest: Guest) {
    // TODO: implement DELETE in service
    // TODO: refresh list after delete
  }

  saveGuestChanges(edittedGuest: Guest, index: number) {
    const guest: Guest = this.guestsList![index];
    if (guest.equal(edittedGuest)) {
      this.toggleEditGuest(index);
      return;
    }
    // TODO: implement PUT in service
    // TODO: refresh list after edit
  }

  toggleEditGuest(index: number) {
    this.guestsList![index].editable = !this.guestsList![index].editable;
  }
}
