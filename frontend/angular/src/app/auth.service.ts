import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = "http://localhost:3000/auth/register";
  constructor(private http: HttpClient) { }

  registerUser(user: any){
    return this.http.post<any>(this.registerUrl, user)
  }
  
  
}
