import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedLandmarkComponent } from './featured-landmark.component';

describe('FeaturedLandmarkComponent', () => {
  let component: FeaturedLandmarkComponent;
  let fixture: ComponentFixture<FeaturedLandmarkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedLandmarkComponent]
    });
    fixture = TestBed.createComponent(FeaturedLandmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
