import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html'
})
export class GameControlComponent implements OnDestroy {
  timeout: ReturnType<typeof setInterval> = null;
  @Output() numberCreated = new EventEmitter<number>();

  start() {
    this.timeout = setInterval(() => {
        this.numberCreated.emit(this.getRandomInt())
    }, 1000)
  }

  pause(): void {
    clearInterval(this.timeout)
  }

  private getRandomInt() {
    return Math.floor(Math.random() * 100);
  }

  ngOnDestroy(): void {
    if (this.timeout) {
      this.pause()
    }
  }
}
