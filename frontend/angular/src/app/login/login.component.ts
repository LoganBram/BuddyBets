import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  response: any = null;

  constructor(private authservice: AuthService){}
  
  loginUserData = {email: '', password: ''}

  loginUser() {
    this.authservice.loginUser(this.loginUserData).subscribe({
      next: (res)=> {
        this.response = res.response;
      },
      error: (err) => {
        
          this.response = err.error; // Tdisplay error message returned from backend
        
      },
    })

  }

}
