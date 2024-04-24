import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams
} from '@angular/common/http';
import {exhaustMap, map, Observable, take} from 'rxjs';
import {AuthServiceService} from "./auth-service.service";
import {AppStore} from "../store/store.model";
import {Store} from "@ngrx/store";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceService, private store: Store<AppStore>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select('auth').pipe
    (
      take(1),
      map(state => state.user),
      exhaustMap(user => {
        if (!user) {
          console.log('No user')
          return next.handle(request)
        }

        console.log('Modifying request for user: ', user)
        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', user.token)
        })
        return next.handle(modifiedRequest)
      })
    )
  }
}
