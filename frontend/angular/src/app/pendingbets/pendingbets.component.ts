import { Component, OnInit } from '@angular/core';
import { BackendcallsService} from '../backendcalls.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-pendingbets',
  templateUrl: './pendingbets.component.html',
  styleUrls: ['./pendingbets.component.css']
})
export class PendingbetsComponent {
  SentBets: any[] = [];
  RecievedBets: any[] = [];
  homebettor: any = null;
  userid: any = null;
  response: any = null;
  cdr: any;
  constructor(private backendcalls : BackendcallsService ) { }

  //returns true if sender is home bettor otherwise false
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

  BetAccepted(bet: any){
    
    this.backendcalls.AcceptBet(bet).subscribe({
      next: (res) => {
        console.log(res.message)
        this.response = res.message
        this.RecievedBets = this.RecievedBets.filter(b => b !== bet)
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.response = err.error.errmsg
        console.log(err.error)
      }
    }
    );
  }

  BetDenied(bet:any){
    this.backendcalls.DenyBet(bet).subscribe({
      next: (res) => {
        console.log(res.message)
        this.response = res.message
        this.RecievedBets = this.RecievedBets.filter(b => b !== bet)
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err.error)
        this.response = err.error.errmsg
      }
    }
    );
  }


 

  ngOnInit() {
    const headers = new HttpHeaders({
      token:`${localStorage.getItem('token')}`
    })
    
    this.backendcalls.GetPendingBetsReceived(headers).subscribe(
      (data) => {
        this.RecievedBets = data; // Assign the data to the games property
      },
      (error) => {
        this.response = error.error.merrmsg;
      }

    );

    this.backendcalls.GetPendingBetsSent(headers).subscribe(
      (data) => {
        this.SentBets = data; // Assign the data to the games property
      },
      (error) => {
        this.response = error.error.errmsg;
      }
    )
    
    //check who the home/away bettor is
    
  }

}
