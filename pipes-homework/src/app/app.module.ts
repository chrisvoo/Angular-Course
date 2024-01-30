import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { ReversePipe } from './reverse.pipe';
import { SortByPropPipe } from './sort-by-prop.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    SortByPropPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
