import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {EMPTY, switchMap} from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {login, loginStart} from "./auth.actions";
import {AuthResponseData, AuthServiceService} from "../auth-service.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthEffects {
  authLogin = this.actions$.pipe(
    ofType(loginStart),
    exhaustMap((action) => {
      const {email, password} = action.value

      return this.http.post<AuthResponseData>(environment.SIGN_IN_URL, {
        email,
        password,
        returnSecureToken: true
      })
        .pipe(
          catchError(() => EMPTY),
          map(resData => {

          })
        )
    })
  )


  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}
}
