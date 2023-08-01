import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor( private router: Router) { }

  canActivate(): boolean{
    if(localStorage.getItem('token')){
      return true
    }
    this.router.navigate(['/login'])
    return false
  }
}