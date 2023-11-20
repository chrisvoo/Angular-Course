import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  template: '<li>{{ num }}</li>'
})
export class EvenComponent {
  @Input() num: number;
}
