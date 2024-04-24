import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {BehaviorSubject, Subject, tap} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppStore} from "../store/store.model";
import {login, logout} from "./store/auth.actions";

export interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user = new BehaviorSubject<User>(null)
  private tokenExpirationTimer: any

  constructor(private http: HttpClient, private router: Router, private store: Store<AppStore>) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.SIGN_UP_URL, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      tap(resData => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
    )
  }

  private handleAuth(email: string, id: string, token: string, expiresIn: number) {
    const user = new User(
      email,
      id,
      token,
      new Date(new Date().getTime() + expiresIn * 1000)
    )
    // this.user.next(user)
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  logout() {
    // this.user.next(null)
    this.store.dispatch(logout())
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
      this.tokenExpirationTimer = null
    }
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.SIGN_IN_URL, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      tap(resData => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        this.store.dispatch(login({
          value: new User(
            resData.email,
            resData.localId,
            resData.idToken,
            new Date(new Date().getTime() + +resData.expiresIn * 1000)
          )
        }))
      })
    )
  }

  autoLogin() {
    const userData: {
      email: string
      id: string
      _token: string
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )
    if (loadedUser.token) {
      // this.user.next(loadedUser)
      this.store.dispatch(login({ value: loadedUser }))
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }
}
