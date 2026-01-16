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
  
  dashOffset = computed(() => {
    return 283 - (283 * this.progress()) / 100;
  });
  opacity = computed(() => {
    // Solo se desvanece cuando shouldFade es true
    return this.shouldFade() ? 0 : 1;
  });
}
