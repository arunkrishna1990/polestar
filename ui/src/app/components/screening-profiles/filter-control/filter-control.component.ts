import { Component, OnInit, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { CountryCheckSevirity } from 'src/app/core/store/screening-profiles';

@Component({
  selector: 'app-filter-control',
  templateUrl: './filter-control.component.html',
  styleUrls: ['./filter-control.component.scss']
})
export class FilterControlComponent implements AfterViewInit {
  @Output() filterByName = new EventEmitter<string>();
  @Output() filterByCountryCheckSeverity = new EventEmitter<CountryCheckSevirity>();

  showFilter = false;
  filters: CountryCheckSeverityFilterViewModel[] = [{
    id: 1,
    filterType: CountryCheckSevirity.CRITICAL,
    selected: false
  }, {
    id: 2,
    filterType: CountryCheckSevirity.WARNING,
    selected: false
  }, {
    id: 3,
    filterType: CountryCheckSevirity.UNKNOWN,
    selected: false
  }, {
    id: 4,
    filterType: CountryCheckSevirity.OK,
    selected: false
  }];
  selectedFilter: CountryCheckSevirity;

  constructor(private elementRef: ElementRef) {

  }

  ngAfterViewInit() {
    this.getFromEvent().pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(text => {
      this.filterByName.emit(text);
    });
  }

  private getFromEvent() {
    return fromEvent(this.elementRef.nativeElement, 'input');
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  toggleCountryCheckSeverityFilter(clickedFilter: CountryCheckSeverityFilterViewModel) {
    const indexOfSelected = this.filters.findIndex(item => item.selected);
    if (indexOfSelected >= 0 && this.filters[indexOfSelected].id !== clickedFilter.id) {
      this.filters[indexOfSelected].selected = false;
    }
    clickedFilter.selected = !clickedFilter.selected;
    this.filterByCountryCheckSeverity.emit(clickedFilter.selected ? clickedFilter.filterType : undefined);
  }
}

interface CountryCheckSeverityFilterViewModel {
  id: number;
  filterType: CountryCheckSevirity;
  selected: boolean;
}
