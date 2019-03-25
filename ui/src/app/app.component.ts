import { Component } from '@angular/core';
import { State } from './reducers';
import { Store } from '@ngrx/store';
import { LoadScreeningProfiles } from './core/store/screening-profiles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store<State>) {
    this.store.dispatch(new LoadScreeningProfiles());
  }
}
