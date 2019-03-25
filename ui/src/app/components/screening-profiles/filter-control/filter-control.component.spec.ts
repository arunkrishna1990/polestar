import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterControlComponent } from './filter-control.component';
import { By } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/shared/material.module';
import { of } from 'rxjs';
import { CountryCheckSevirity } from 'src/app/core/store/screening-profiles';

describe('FilterControlComponent', () => {
  let component: FilterControlComponent;
  let fixture: ComponentFixture<FilterControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [FilterControlComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the component is compiled', () => {
    it('should not show the country check filter when showFilter is set to true', () => {
      expect(fixture.debugElement.query(By.css('.filter-container'))).toBeNull();
    });

    it('should show the country check filter when showFilter is set to true', () => {
      component.showFilter = true;

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.filter-container'))).not.toBeNull();
    });

    it('should list the country check severity filter buttons', () => {
      component.showFilter = true;

      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(component.filters.length);
    });
  });

  describe('ngAfterViewInit', () => {
    it('should emit the text', () => {
      spyOn(component.filterByName, 'emit');
      spyOn(component, <any>'getFromEvent').and.returnValue(of({ target: { value: 'DummyText' } }));

      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(component.filterByName.emit).toHaveBeenCalledWith('DummyText');
    });
  });

  describe('toggleFilter', () => {
    it('should not show the country check filter', () => {
      component.showFilter = true;

      component.toggleFilter();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.filter-container'))).toBeNull();
    });

    it('should show the country check filter', () => {
      component.showFilter = false;

      component.toggleFilter();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.filter-container'))).not.toBeNull();
    });
  });

  describe('toggleCountryCheckSeverityFilter', () => {
    describe('when no filters are selected', () => {
      beforeEach(() => {
        component.showFilter = true;
        fixture.detectChanges();
        spyOn(component.filterByCountryCheckSeverity, 'emit');

        component.toggleCountryCheckSeverityFilter(component.filters[1]);
        fixture.detectChanges();
      });

      it('should add the selected class for the clicked filter', () => {
        expect(fixture.debugElement.query(By.css(`.${component.filters[1].filterType}.selected`))).not.toBeNull();
      });

      it('should emit the selected filter type', () => {
        expect(component.filterByCountryCheckSeverity.emit).toHaveBeenCalledWith(CountryCheckSevirity.WARNING);
      });
    });

    describe('when clicked filter is already selected filter', () => {
      beforeEach(() => {
        component.showFilter = true;
        component.toggleCountryCheckSeverityFilter(component.filters[1]);
        fixture.detectChanges();
        spyOn(component.filterByCountryCheckSeverity, 'emit');

        component.toggleCountryCheckSeverityFilter(component.filters[1]);
        fixture.detectChanges();
      });

      it('should remove the selected class from the clicked filter', () => {
        expect(fixture.debugElement.query(By.css(`.${component.filters[1].filterType}.selected`))).toBeNull();
      });

      it('should emit filter type as undefined', () => {
        expect(component.filterByCountryCheckSeverity.emit).toHaveBeenCalledWith(undefined);
      });
    });

    describe('when some other filter is selected and a new filter is clicked', () => {
      beforeEach(() => {
        component.showFilter = true;
        component.toggleCountryCheckSeverityFilter(component.filters[1]);
        fixture.detectChanges();
        spyOn(component.filterByCountryCheckSeverity, 'emit');

        component.toggleCountryCheckSeverityFilter(component.filters[0]);
        fixture.detectChanges();
      });

      it('should remove the selected class from the clicked filter', () => {
        expect(fixture.debugElement.query(By.css(`.${component.filters[0].filterType}.selected`))).not.toBeNull();
        expect(fixture.debugElement.query(By.css(`.${component.filters[1].filterType}.selected`))).toBeNull();
      });

      it('should emit the selected filter type', () => {
        expect(component.filterByCountryCheckSeverity.emit).toHaveBeenCalledWith(component.filters[0].filterType);
      });
    });
  });
});
