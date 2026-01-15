import { Component } from '@angular/core';
import { PomodoroTimer } from '@pomo-ui/shared/components/pomodoro-timer/pomodoro-timer';

@Component({
  selector: 'pou-home',
  imports: [PomodoroTimer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
