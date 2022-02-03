import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated = false;
  constructor(
    private auth: AuthService,
    private router: Router
  ){}
  // canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   if(this.auth.IsLoggedIn()){
  //     return true;
  //   }
  //   this.router.navigate(['login']);
  //   return false;
  // }
  
    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.IsLoggedIn()){
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
  
}


