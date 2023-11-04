import { Component, OnInit } from '@angular/core';
import { BackendcallsService } from '../backendcalls.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-ongoingbets',
  templateUrl: './ongoingbets.component.html',
  styleUrls: ['./ongoingbets.component.css']
})
export class OngoingbetsComponent {
  ongoingbets : any[] = [];
  currentuser: any = null;
 constructor(private backendcalls : BackendcallsService){ } 

 CalculatePayout(wager: any, odds: any){
  if (odds > 0) {
    const winnings = ((wager * odds) / 100).toFixed(2);
    const x = (parseFloat(winnings) + wager).toFixed(2);
    return x;
  } else if (odds < 0) {
    const winnings = ((wager * 100) / Math.abs(odds)).toFixed(2);
    const x = (parseFloat(winnings) + wager).toFixed(2);
    return x;
  } else {
    return 0; // No profit or loss with even odds (odds = 0)
  }
}

//takes in bet and returns the current users ID
WhichUser = async (bet: any) => {
  const headers = new HttpHeaders({
    token:`${localStorage.getItem('token')}`
  });
  const userID = await this.backendcalls.GetUserId(headers)
  console.log(userID)
}

  ngOnInit (){
    
    const headers = new HttpHeaders({
      token:`${localStorage.getItem('token')}`
    })
    this.backendcalls.GetOngoingBets(headers).subscribe(
      (res) => {
       
        this.ongoingbets = res
      },
      (err)=>{
        console.log(err)
      }
    )

    this.backendcalls.GetUserId(headers).subscribe(
      (res) => {
        this.currentuser = res.user
        console.log(res)
      },
      (err)=>{
        console.log(err)
      }
    )

  }

}
