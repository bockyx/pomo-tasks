import { TestBed } from '@angular/core/testing';

import { PomodoroTimerService } from './pomodoro-timer';

describe('PomodoroTimerService', () => {
  let service: PomodoroTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PomodoroTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
