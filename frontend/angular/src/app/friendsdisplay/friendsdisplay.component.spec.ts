import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsdisplayComponent } from './friendsdisplay.component';

describe('FriendsdisplayComponent', () => {
  let component: FriendsdisplayComponent;
  let fixture: ComponentFixture<FriendsdisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendsdisplayComponent]
    });
    fixture = TestBed.createComponent(FriendsdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
