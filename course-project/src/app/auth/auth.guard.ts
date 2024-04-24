import {CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import {AuthServiceService} from "./auth-service.service";
import {map, take, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStore} from "../store/store.model";

export const authGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthServiceService)
  const router = inject(Router)
  const store: Store<AppStore> = inject(Store)
  return store.select('auth').pipe(
    take(1),
    map(authState => {
      const isAuth = !!authState.user
      if (isAuth) {
        return true
      }
      return router.createUrlTree(['/auth'])
    })
  )
};
