import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  response: any = null;

  constructor(private authservice: AuthService, private _route: Router){}
  
  loginUserData = {email: '', password: ''}

  loginUser() {
    //sends api login request and returns token, stores in local storage
    this.authservice.loginUser(this.loginUserData).subscribe({
      next: (res)=> {
        this.response = res.response;
        localStorage.setItem('token', res.token)
        
      },
      //otherwise display error message from backend
      error: (err) => {
        if (err.status === 401) {
          this.response = err.error; // Tdisplay error message returned from backend
        } else {
          this.response = 'An unexpected error occured. Please try again later.';
        }
      },
    })

  }

}
