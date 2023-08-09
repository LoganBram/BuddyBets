import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {


  constructor( private router: Router, private _authservice: AuthService) { }

  canActivate(): boolean{
    if(this._authservice.loggedIn()){
      return true
    }
    else{
    this.router.navigate(['/login'])
    return false
    }
  }
}