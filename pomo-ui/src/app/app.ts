import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleBar } from "./layout/title-bar/title-bar";

@Component({
  selector: 'pou-root',
  imports: [RouterOutlet, TitleBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pomo-ui');
}
