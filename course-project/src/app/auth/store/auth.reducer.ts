import {User} from "../user.model";
import {createReducer, on} from "@ngrx/store";
import {login, loginFailed, loginStart, logout} from "./auth.actions";

export interface AuthState {
  user: User
  authError: string
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false
}

export const authReducer = createReducer(
  initialState,
  on(login, (state, action) => {
    return {
      ...state,
      user: action.value,
      authError: null,
      loading: false
    }
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: null
    }
  }),
  on(loginStart, (state) => {
    return {
      ...state,
      authError: null,
      loading: true
    }
  }),
  on(loginFailed, (state, action) => {
    return {
      ...state,
      authError: action.value.message,
      loading: false
    }
  })
)
