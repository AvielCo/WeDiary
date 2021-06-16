import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OpenModal } from '@store/actions/auth.actions';

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
    this.store.dispatch(new OpenModal());
  }
}
