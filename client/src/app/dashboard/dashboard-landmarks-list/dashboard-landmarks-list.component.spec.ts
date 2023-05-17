import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLandmarksListComponent } from './dashboard-landmarks-list.component';

describe('DashboardLandmarksListComponent', () => {
  let component: DashboardLandmarksListComponent;
  let fixture: ComponentFixture<DashboardLandmarksListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLandmarksListComponent]
    });
    fixture = TestBed.createComponent(DashboardLandmarksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
