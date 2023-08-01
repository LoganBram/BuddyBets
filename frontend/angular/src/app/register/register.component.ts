import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService) { }

  // Function to toggle authentication status
  toggleAuth(): void {
    this.authService.setAuthenticated();
  }

  // Function to check if the user is authenticated
  isAuthenticated(): boolean {
    return this.authService.Authenticated();
}

}
