import { Injectable } from '@angular/core';
import { Emitters } from '../core/emitters/emitters';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated = false;
  constructor() {}
  IsLoggedIn() {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
      console.log('authemitter in auth service:', auth);
      return this.authenticated;
    });
    return this.authenticated;
  }
}
