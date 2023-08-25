import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingbetsComponent } from './pendingbets.component';

describe('PendingbetsComponent', () => {
  let component: PendingbetsComponent;
  let fixture: ComponentFixture<PendingbetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingbetsComponent]
    });
    fixture = TestBed.createComponent(PendingbetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
