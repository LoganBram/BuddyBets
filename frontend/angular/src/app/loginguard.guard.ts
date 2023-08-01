import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.Authenticated()) {
      return true; // Allow access if authenticated
    } else {
      // Store the attempted URL to redirect the user back after successful login
      this.authService.setRedirectUrl(state.url);
      
      // Redirect to the login page if not authenticated
      this.router.navigate(['/login']);
      
      return false;
    }
  }
}