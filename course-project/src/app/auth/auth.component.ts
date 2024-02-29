import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthServiceService} from "./auth-service.service";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false

  constructor(private authService: AuthServiceService) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true

    if (this.isLoginMode) {

    } else {
      this.authService.signup(email, password)
        .pipe(
          catchError((err, _) => {
            this.isLoading = false
            console.log(err)
            return throwError(() => new Error('Something bad happened'))
          })
        )
        .subscribe(
          /*
          email: "email@gmail.com",
          expiresIn: "3600"
          idToken: "eyJhbGciOiJSUzI1NiI",
          kind "identitytoolkit#SignupNewUserResponse",
          localId:"aueHbPVo4GNhpPHnEDUR988tqXy1",
          refreshToken: "AMf-vBw8ohO2p7EsWqs */
        (data) => {
            this.isLoading = false
            console.log(data)
          }
        )
    }

    form.reset()
  }
}
