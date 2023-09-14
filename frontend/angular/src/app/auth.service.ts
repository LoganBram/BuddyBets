import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = "http://localhost:3000/auth/register";
  private loginUrl = "http://localhost:3000/auth/login";
  private verifytokenUrl = "http://localhost:3000/auth/is-verify";
  constructor(private http: HttpClient) { }

  //sends register request and returns JWT token
  registerUser(user: any){
    return this.http.post<any>(this.registerUrl, user)
  }
  //sends login http request and returns JWT token
  loginUser(user: any){
    return this.http.post<any>(this.loginUrl, user)
  }

  //sends verifytoken http request, which uses authorize middleware in backend and checks the token
  loggedIn(headers: any){
    return this.http.get<any>(this.verifytokenUrl, {headers})
  }

 
  
  
  
}
