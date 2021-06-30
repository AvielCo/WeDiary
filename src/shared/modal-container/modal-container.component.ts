import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddComponent } from '@events/add/add.component';
import { GuestsComponent } from '@guests/guests.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-guests-modal-container',
  template: '',
})
export class ModalContainerComponent implements OnDestroy, OnInit {
  destroy = new Subject<any>();
  currentDialog?: NgbModalRef;
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.url.pipe(takeUntil(this.destroy)).subscribe((urlSegments) => {
      let fullPath = '';
      let redirectTo = '';
      for (const urlSegment of urlSegments) {
        fullPath += urlSegment.path + ' ';
      }
      if (fullPath.includes('event' && 'add')) {
        this.currentDialog = this.modalService.open(AddComponent, {
          centered: true,
          size: 'lg',
        });
        redirectTo = 'events';
      } else if (fullPath.includes('guests')) {
        const eventId = urlSegments[0].path;
        this.currentDialog = this.modalService.open(GuestsComponent, {
          centered: true,
          size: 'lg',
        });
        this.currentDialog.componentInstance.eventId = eventId;
        redirectTo = 'events';
      }
      this.currentDialog!.result.then(
        (_res) => {
          this.router.navigate([_res]);
        },
        (_reason) => {
          this.router.navigate([redirectTo]);
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
