import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  sidebarItems = [{
    id: 1,
    path: 'screeningProfiles',
    icon: 'fa-table'
  }];
  selectedItemId: number;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.selectedItemId = this.sidebarItems.find(item => e.url.includes(item.path)
        || e.urlAfterRedirects.includes(item.path)).id;
    });
  }
}
