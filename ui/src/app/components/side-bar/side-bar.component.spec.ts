import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarComponent } from './side-bar.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SideBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the component is compiled', () => {
    it('should render the menu items', () => {
      const menuWrapper = fixture.debugElement.query(By.css('ul')).nativeElement.innerHTML;
      component.sidebarItems.forEach(item => {
        expect(menuWrapper).toContain(item.icon);
      });
    });

    [{
      desc: 'profile tab',
      expectedIconValue: 'fa-table',
      selectedItemId: 1
    }].forEach(testCase => {
      it(`should add the selected class to ${testCase.desc} if the selectedItemId is equal to ${testCase.selectedItemId}`, () => {
        component.selectedItemId = testCase.selectedItemId;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.selected')).nativeElement.innerHTML).toContain(testCase.expectedIconValue);
      });
    });
  });
});
