import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() bluePrintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

  @ViewChild('serverContentinput') newServerContent: ElementRef

  onAddServer(newServerName: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: newServerName.value,
      serverContent: this.newServerContent.nativeElement.value
    })
  }

  onAddBlueprint(newServerName: HTMLInputElement) {
    this.bluePrintCreated.emit({
      serverName: newServerName.value,
      serverContent: this.newServerContent.nativeElement.value
    })
  }
}
