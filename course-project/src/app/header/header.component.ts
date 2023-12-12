import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() pageRequested = new EventEmitter<string>();

  ngOnInit(): void {

  }

  sectionClicked($event) {
    this.pageRequested.emit($event.target.innerText)
  }

}
