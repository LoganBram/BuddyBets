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

  GetGamesForTheWeek(){
    localStorage.getItem('token')
    return this.http.get<any>("http://localhost:3000/database/GetWeekGames")

  }

  SendFriendRequest(friendusername: any, headers: any){

    return this.http.post<any>("http://localhost:3000/auth/newfriendrequest", friendusername, {headers})  
  }

  GetFriends(headers: any){
    return this.http.get<any>("http://localhost:3000/auth/getfriends", {headers})
  }
  GetPendingBetsReceived(headers: any){
    return this.http.get<any>("http://localhost:3000/bets/getpendingbetsreceived", {headers})
  }

  GetPendingBetsSent(headers: any){
    return this.http.get<any>("http://localhost:3000/bets/getpendingbetssent", {headers})
  }

  AcceptBet(bet: any, headers: any){
    return this.http.post<any>("http://localhost:3000/bets/acceptbet", bet, {headers})
  }
  DenyBet(bet: any){
    return this.http.post<any>("http://localhost:3000/bets/denybet", bet)
  }

  GetOngoingBets(headers: any){
    return this.http.get<any>("http://localhost:3000/bets/getongoingbets", {headers})
  }

  GetUserId(headers: any){
    return this.http.get<any>("http://localhost:3000/auth/getuserid", {headers})
  }

  AcceptFriend(frienddata: any){
    return this.http.post<any>("http://localhost:3000/auth/acceptfriendrequest", frienddata)
  }

  DenyFriend(frienddata: any){
    return this.http.post<any>("http://localhost:3000/auth/denyfriendrequest", frienddata)
  }
 
  
}
