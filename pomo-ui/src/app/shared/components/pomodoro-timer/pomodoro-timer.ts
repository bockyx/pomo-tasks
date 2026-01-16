import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PomodoroTimerService } from '@pomo-ui/core/services/pomodoro.service';
import { PomodoroCircle } from '@pomo-ui/shared/components/pomodoro-circle/pomodoro-circle';

@Component({
  selector: 'pou-pomodoro-timer',
  imports: [MatProgressSpinnerModule, MatButtonModule, PomodoroCircle],
  templateUrl: './pomodoro-timer.html',
  styleUrl: './pomodoro-timer.scss',
})
export class PomodoroTimer {
  private timer: PomodoroTimerService = inject(PomodoroTimerService);

  remaining = this.timer.remainingMs;
  running = this.timer.running;
  progress = this.timer.progress;
  completedPomos = this.timer.completedPomos;
  enableTransition = this.timer.enableTransition;
  shouldFade = this.timer.shouldFade;

  formattedTime = computed(() => {
    const ms = this.remaining();
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

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
