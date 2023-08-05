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
        this.response = res.response
      },
      error: (err) => {
        if (err.status === 401) {
          this.response = err.error; // The API error message will be available in err.error
        } else {
          this.response = 'An error occurred. Please try again later.';
        }
      },
    });
  }
}

/*return this.http.post<any>(this.registerUrl, user)*/