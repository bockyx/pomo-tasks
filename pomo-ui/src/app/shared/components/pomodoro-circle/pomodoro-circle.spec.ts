import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroCircle } from './pomodoro-circle';

describe('PomodoroCircle', () => {
  let component: PomodoroCircle;
  let fixture: ComponentFixture<PomodoroCircle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PomodoroCircle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomodoroCircle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
