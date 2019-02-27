import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterLaunchesComponent } from './search-filter-launches.component';

describe('LauchesListComponent', () => {
  let component: SearchFilterLaunchesComponent;
  let fixture: ComponentFixture<SearchFilterLaunchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFilterLaunchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterLaunchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
