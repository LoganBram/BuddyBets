import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor() { }

  // Call this method to set the user as authenticated after successful login
  setAuthenticated(status: boolean) {
    this.isAuthenticated = status;
  }

  // Call this method to check if the user is authenticated
  Authenticated(): boolean {
    return this.isAuthenticated;
  }

  // Call this method to clear the user's authentication status after logout
  clearAuthentication() {
    this.isAuthenticated = false;
  }
}
