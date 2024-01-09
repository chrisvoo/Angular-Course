import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule, Router} from "@angular/router";
import {TemplateDrivenComponent} from "./template-driven/template-driven.component";
import {ReactiveComponent} from "./reactive/reactive.component";

const routes: Routes = [
  { path: 'template-driven', component: TemplateDrivenComponent },
  { path: 'reactive', component: ReactiveComponent },
  { path: '', redirectTo: 'template-driven', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
