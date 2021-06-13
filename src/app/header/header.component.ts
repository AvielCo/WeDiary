import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { OpenAuthModal } from '../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<{ auth: { isModalOpen: boolean } }>) {}

  ngOnInit(): void {}

  openAuthModal() {
    console.log('clicked login');
    this.store.dispatch(new OpenAuthModal());
  }
}
