import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Guest } from '@guests/guest.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  @Input() guestsList?: Guest[];
  totalGuests: number = 0;
  totalGifts: number = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    for (const change in changes) {
      if (change === 'guestsList') {
        this.totalGuests = 0;
        this.totalGifts = 0;
        this.guestsList?.forEach((guest) => {
          this.totalGuests += guest.howMany.valueOf();
          if (guest.howMuch != undefined) {
            this.totalGifts += guest.howMuch.valueOf();
          }
        });
      }
    }
  }
}
