import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.SIGN_UP_URL, {
      email,
      password,
      returnSecureToken: true
    })
  }
}
