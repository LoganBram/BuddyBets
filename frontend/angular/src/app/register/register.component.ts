import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  response : any = null;

  registerUserData = {name: '', email: '', password: '', username:''};
  constructor(private authService: AuthService, private _route: Router) { }

  registerUser() {
    //sends api request to register user and returns JWT token
    this.authService.registerUser(this.registerUserData).subscribe({
      next: (res) => {
        //display success message
        this.response = res.response
        localStorage.setItem('token', res.token)
        setTimeout(() => {
          this._route.navigate(['/gamesdisplay'])
        }, 1500)
        
      },
      //otherwise display error message from backend
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
