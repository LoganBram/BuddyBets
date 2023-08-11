import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesdisplayComponent } from './gamesdisplay.component';

describe('GamesdisplayComponent', () => {
  let component: GamesdisplayComponent;
  let fixture: ComponentFixture<GamesdisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamesdisplayComponent]
    });
    fixture = TestBed.createComponent(GamesdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
