import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'pou-pomodoro-circle',
  imports: [],
  templateUrl: './pomodoro-circle.html',
  styleUrl: './pomodoro-circle.scss',
})
export class PomodoroCircle {
  progress = input.required<number>();
  enableTransition = input<boolean>(true);
  shouldFade = input<boolean>(false);
  // Color for the progress circle stroke (hex format)
  color = input<string>('#0a66ff');
  
  dashOffset = computed(() => {
    return 283 - (283 * this.progress()) / 100;
  });
  opacity = computed(() => {
    // Only fade when shouldFade is true
    return this.shouldFade() ? 0 : 1;
  });
}
