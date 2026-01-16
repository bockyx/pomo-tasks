import { TestBed } from '@angular/core/testing';

import { PomodoroTimerService } from './pomodoro.service';

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
