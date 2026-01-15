import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PomodoroTimerService {
  readonly durationMs = 25 * 60 * 1000;

  private endTime = 0;
  private intervalId: number | null = null;

  remainingMs = signal(0);
  running = signal(false);

  progress = signal(0);
  completedPomos = signal(0);

  start() {
    this.endTime = Date.now() + this.durationMs;
    this.running.set(true);

    this.clear();

    this.intervalId = window.setInterval(() => {
      const remaining = this.endTime - Date.now();

      if (remaining <= 0 && this.running()) {
        this.progress.set(100);
        this.remainingMs.set(0);
        this.completedPomos.update((count) => count + 1);
        this.stop();
      } else {
        this.remainingMs.set(remaining);
        this.progress.set(((this.durationMs - remaining) / this.durationMs) * 100);
      }
    }, 250);
  }

  stop() {
    this.clear();
    this.running.set(false);
  }

  private clear() {
    if (this.intervalId !== null) {
      this.endTime = 0;
      this.remainingMs.set(0);
      this.progress.set(0);
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
