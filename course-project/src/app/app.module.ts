import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import {NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import { StoreModule } from '@ngrx/store';
import {CoreModule} from "./core.module";
import {appReducers} from "./store/store.model";
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(appReducers, {}),
    EffectsModule.forRoot([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
