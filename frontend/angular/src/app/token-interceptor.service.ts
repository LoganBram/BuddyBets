import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements  HttpInterceptor{

  constructor(private _authservice: AuthService) { }

  intercept(req: { clone: (arg0: { setHeaders: { Authorization: string; }; }) => any; }, next: { handle: (arg0: any) => any; }){
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this._authservice.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
