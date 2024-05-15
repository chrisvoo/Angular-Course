import {createAction, props} from "@ngrx/store";
import {User} from "../user.model";


export const login = createAction(
  '[Auth] Login',
  props<{value: User}>(),
);

export const loginStart = createAction(
  '[Auth] Login start',
  props<{value: { email: string, password: string}}>(),
);

export const loginFailed = createAction(
  '[Auth] Login failed',
  props<{value: { message: string}}>(),
);

export const logout = createAction(
  '[Auth] Logout'
);
