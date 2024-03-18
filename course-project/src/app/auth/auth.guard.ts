import {CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import {AuthServiceService} from "./auth-service.service";
import {map, take, tap} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService)
  const router = inject(Router)
  return authService.user.pipe(
    take(1),
    map(user => {
      const isAuth = !!user
      if (isAuth) {
        return true
      }
      return router.createUrlTree(['/auth'])
    })
  )
};
