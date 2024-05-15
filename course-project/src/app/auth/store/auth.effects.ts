import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {EMPTY, of, switchMap, tap} from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {login, loginFailed, loginStart} from "./auth.actions";
import {AuthResponseData, AuthServiceService} from "../auth-service.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../user.model";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {

  authLogin = createEffect(() => this.actions$.pipe(
    ofType(loginStart),
    exhaustMap((action) => {
      const {email, password} = action.value

      return this.http.post<AuthResponseData>(environment.SIGN_IN_URL, {
        email,
        password,
        returnSecureToken: true
      })
        .pipe(
          map(resData =>
              login({
                value: new User(
                  resData.email,
                  resData.localId,
                  resData.idToken,
                  new Date(new Date().getTime() + +resData.expiresIn * 1000)
                )
              })
          ),
          catchError((e: Error) => of(loginFailed({
            value: { message: 'Login failed: ' + e.message }
          })))
        )
    })
  ))

  authSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      tap((action) => {
        this.router.navigate(['/'])
      })
    ), { dispatch: false }
  )


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
