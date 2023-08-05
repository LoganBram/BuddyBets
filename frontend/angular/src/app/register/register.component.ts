import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  response : any = null;

  registerUserData = {name: '', email: '', password: ''};
  constructor(private authService: AuthService) { }

  registerUser() {
    this.authService.registerUser(this.registerUserData).subscribe({
      next: (res) => {
        //display success message
        this.response = res.response
      },
      error: (err) => {
        if (err.status === 401) {
          this.response = err.error; // Tdisplay error message returned from backend
        } else {
          this.response = 'An unexpected error occured. Please try again later.';
        }
      },
    });
  }
}
