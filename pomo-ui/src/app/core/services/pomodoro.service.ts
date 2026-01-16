import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PomodoroTimerService {
  readonly durationMs = 25 * 60 * 1000;

  private endTime = 0;
  private intervalId: number | null = null;
  private intervalExtra: number | null = null;
  private animationFrameId: number | null = null;

  remainingMs = signal(0);
  running = signal(false);

  progress = signal(0);
  completedPomos = signal(0);
  enableTransition = signal(false);
  shouldFade = signal(false);

  start() {
    this.endTime = Date.now() + this.durationMs;
    this.running.set(true);
    this.enableTransition.set(true);

    this.clear();

    this.intervalId = window.setInterval(() => {
      const remaining = this.endTime - Date.now();

      if (remaining <= 0 && this.running()) {
        this.progress.set(100);
        this.shouldFade.set(true);
        
        // Trigger notification and sound
        window.api?.pomodoroDone();
        
        this.intervalExtra = window.setTimeout(() => {
          this.enableTransition.set(false);
          this.progress.set(0);

          this.animationFrameId = requestAnimationFrame(() => {
            this.enableTransition.set(true);
            this.shouldFade.set(false);
            this.remainingMs.set(0);
            this.completedPomos.update((count) => count + 1);
            this.stop();
          });
        }, 350);
      } else {
        this.remainingMs.set(remaining);
        this.progress.set(((this.durationMs - remaining) / this.durationMs) * 100);
      }
    }, 500);
  }

  stop() {
    this.clear();
    this.running.set(false);
  }

  private clear() {
    if (this.intervalExtra !== null) {
      clearTimeout(this.intervalExtra);
      this.intervalExtra = null;
    }
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.intervalId !== null) {
      this.endTime = 0;
      this.remainingMs.set(0);
      this.progress.set(0);
      this.enableTransition.set(true);
      this.shouldFade.set(false);
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
