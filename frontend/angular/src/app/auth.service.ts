import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = "http://localhost:3000/auth/register";
  private loginUrl = "http://localhost:3000/auth/login";
  constructor(private http: HttpClient) { }

  registerUser(user: any){
    return this.http.post<any>(this.registerUrl, user)
  }
  
  loginUser(user: any){
    return this.http.post<any>(this.loginUrl, user)
  }

  //returns true if token exists, false if not
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  
  getToken(){
    return localStorage.getItem('token')
  }
  
}
