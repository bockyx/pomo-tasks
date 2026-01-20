import { Injectable, signal } from '@angular/core';
import { TimerType } from '../enums';

@Injectable({ providedIn: 'root' })
export class PomodoroTimerService {
  // Duration constants (in milliseconds)
  private readonly WORK_DURATION_MS = 25 * 60 * 1000;
  private readonly BREAK_DURATION_MS = 5 * 60 * 1000;

  private endTime = 0;
  private intervalId: number | null = null;
  private intervalExtra: number | null = null;
  private animationFrameId: number | null = null;

  remainingMs = signal(0);
  running = signal(false);

  progress = signal(0);
  completedPomos = signal(0);
  completedBreaks = signal(0);
  enableTransition = signal(false);
  shouldFade = signal(false);

  // Current timer type (work or break session)
  type = signal<TimerType>(TimerType.Work);

  /**
   * Get the duration in milliseconds based on current timer type
   */
  private get durationMs(): number {
    return this.type() === TimerType.Work ? this.WORK_DURATION_MS : this.BREAK_DURATION_MS;
  }

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

        // Trigger notification and sound when timer completes
        window.api?.pomodoroDone();

        this.intervalExtra = window.setTimeout(() => {
          this.enableTransition.set(false);
          this.progress.set(0);

          this.animationFrameId = requestAnimationFrame(() => {
            this.enableTransition.set(true);
            this.shouldFade.set(false);
            this.remainingMs.set(0);

            // Update counters and switch timer type
            if (this.type() === TimerType.Work) {
              this.completedPomos.update((count) => count + 1);
              this.type.set(TimerType.Break);
            } else {
              this.completedBreaks.update((count) => count + 1);
              this.type.set(TimerType.Work);
            }

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
