import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Subject, tap} from "rxjs";
import {User} from "./user.model";

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
  user = new Subject<User>()

  constructor(private http: HttpClient) { }

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
    this.user.next(user)
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.SIGN_IN_URL, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      tap(resData => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
    )
  }
}
