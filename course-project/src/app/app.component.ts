import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Course project';
  activeSection = 'recipe'

  onClickedMenuItem($event) {
    switch ($event) {
      case 'Recipes':
        this.activeSection = 'recipe';
        break;
      case 'Shopping List':
        this.activeSection = 'shopping_list';
        break;
    }
  }
}
