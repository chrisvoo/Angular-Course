import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayDetails = true
  clicks: Date[] = []

  onDisplayDetails() {
    this.displayDetails = !this.displayDetails
    this.clicks.push(new Date())
  }

  get totalClicks(): number {
    return this.clicks.length;
  }

  getClickStyle(index: number): string {
    return index >= 4 ? 'blue' : '';
  }

  getClickClass(index: number): string {
    return index >= 4 ? 'itemColor' : '';
  }
}
