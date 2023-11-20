import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-odd',
  template: '<li>{{ num }}</li>'
})
export class OddComponent {
  @Input() num: number
}
