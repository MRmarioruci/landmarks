import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLandmarkEditComponent } from './dashboard-landmark-edit.component';

describe('DashboardLandmarkEditComponent', () => {
  let component: DashboardLandmarkEditComponent;
  let fixture: ComponentFixture<DashboardLandmarkEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLandmarkEditComponent]
    });
    fixture = TestBed.createComponent(DashboardLandmarkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
