import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css'],
})
export class GuestsComponent implements OnInit {
  private modalElement?: Modal;
  constructor() {}

  ngOnInit(): void {
    this.modalElement = new Modal(document.getElementById('guestsModal')!);
  }

  toggleModal() {
    this.modalElement!.toggle();
  }
}
