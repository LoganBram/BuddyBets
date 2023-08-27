import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedbetsComponent } from './completedbets.component';

describe('CompletedbetsComponent', () => {
  let component: CompletedbetsComponent;
  let fixture: ComponentFixture<CompletedbetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedbetsComponent]
    });
    fixture = TestBed.createComponent(CompletedbetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
