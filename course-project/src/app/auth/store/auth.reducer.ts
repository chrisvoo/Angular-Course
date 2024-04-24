import {User} from "../user.model";
import {createReducer, on} from "@ngrx/store";
import {login, logout} from "./auth.actions";

export interface AuthState {
  user: User
}

const initialState: AuthState = {
  user: null
}

export const authReducer = createReducer(
  initialState,
  on(login, (state, action) => {
    return {
      ...state,
      user: action.value
    }
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: null
    }
  })
)
