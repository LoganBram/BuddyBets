import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerUserData = {email: '', password: ''};
  constructor(private authService: AuthService) { }

  registerUser(){
    console.log(this.registerUserData);
  }

}
