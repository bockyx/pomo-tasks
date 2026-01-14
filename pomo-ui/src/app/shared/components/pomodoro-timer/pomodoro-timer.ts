import { Component, computed, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PomodoroTimerService } from '@pomo-ui/core/services/pomodoro-timer';

@Component({
  selector: 'pou-pomodoro-timer',
  imports: [MatProgressSpinnerModule],
  templateUrl: './pomodoro-timer.html',
  styleUrl: './pomodoro-timer.scss',
})
export class PomodoroTimer {
  private timer: PomodoroTimerService = inject(PomodoroTimerService);

  remaining = this.timer.remainingMs;
  running = this.timer.running;
  progress = this.timer.progress;

  formattedTime = computed(() => {
    const ms = this.remaining();
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // return 25:00 when time is up or zero or at the start
    if (ms <= 0) {
      return '25:00';
    }

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  });

  start() {
    this.timer.start();
  }

  stop() {
    this.timer.stop();
  }
}
