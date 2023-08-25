import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendcallsService {

  constructor(private http: HttpClient) { }

  PlaceBet(betdata:any, headers:any){
    return this.http.post<any>("http://localhost:3000/bets/placebet", betdata, {headers})
  }

  GetGames(){
    localStorage.getItem('token')
    return this.http.get<any>("http://localhost:3000/database/GetGamesinDB")

  }

  SendFriendRequest(friendusername: any, headers: any){

    return this.http.post<any>("http://localhost:3000/auth/newfriendrequest", friendusername, {headers})  
  }

  GetFriends(headers: any){
    return this.http.get<any>("http://localhost:3000/auth/getfriends", {headers})
  }
  GetPendingBets(headers: any){
    return this.http.get<any>("http://localhost:3000/bets/getpendingbets", {headers})
  }
  
}
