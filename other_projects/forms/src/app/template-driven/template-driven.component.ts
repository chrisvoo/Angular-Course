import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent {
  email?: string = undefined
  subscription?: string = undefined
  password?: string = undefined
  submitted: boolean = false

  onSubmit(form: NgForm) {
    this.submitted = true
    this.email = form.form.controls['email'].value
    this.subscription = form.form.controls['subscription'].value
    this.password = form.form.controls['password'].value
  }
}
