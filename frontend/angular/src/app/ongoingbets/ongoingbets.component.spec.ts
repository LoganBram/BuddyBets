import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingbetsComponent } from './ongoingbets.component';

describe('OngoingbetsComponent', () => {
  let component: OngoingbetsComponent;
  let fixture: ComponentFixture<OngoingbetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OngoingbetsComponent]
    });
    fixture = TestBed.createComponent(OngoingbetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
