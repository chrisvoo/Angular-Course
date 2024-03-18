import {Component, ComponentFactoryResolver} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthServiceService} from "./auth-service.service";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false
  error?: string = null;

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>

    this.isLoading = true

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)

    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs.pipe(
      catchError((err, _) => {
        this.isLoading = false
        this.error = 'An error occurred: ' + err.error.error.message
        this.showErrorAlert(this.error)
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
          this.router.navigate(['/recipes'])
        }
      )

    form.reset()
  }

  onHandleError() {
    this.error = null
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    // const hostViewContainerRef = this.alertHost.viewContainerRef;
    // hostViewContainerRef.clear();
    // hostViewContainerRef.createComponent(alertCmp);

    // const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
    //   AlertComponent
    // );
    // const hostViewContainerRef = this.alertHost.viewContainerRef;
    // hostViewContainerRef.clear();
    // const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    // componentRef.instance.message = message;
    // this.closeSub = componentRef.instance.close.subscribe(() => {
    //   this.closeSub.unsubscribe();
    //   hostViewContainerRef.clear();
    // })
  }
}
