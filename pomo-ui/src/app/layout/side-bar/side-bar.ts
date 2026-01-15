import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'pou-side-bar',
  imports: [MatButtonModule, MatIconModule, NgClass],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {
  isExpanded = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
