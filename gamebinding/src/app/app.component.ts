import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gamebinding';

  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onNumberAdded(event: number) {
    console.log(event)
    if (event % 2 === 0) {
      this.evenNumbers.push(event)
    } else {
      this.oddNumbers.push(event)
    }
  }
}
