import { Component, OnInit } from '@angular/core';
import { BackendcallsService } from '../backendcalls.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gamesdisplay',
  templateUrl: './gamesdisplay.component.html',
  styleUrls: ['./gamesdisplay.component.css']
})
export class GamesdisplayComponent {

  constructor(private backendcalls : BackendcallsService, private router: Router ) { }
  games: any[] = [];
  incomingbets: any[] = [];
  friends: any[] = [];
  betdata = {wager: 4, gameid: null as number | null, user1odds: null as number|null, user2odds: null as number|null, user1: localStorage.getItem('token'), user2: "86c9c420-3edb-4cf5-a310-9c66f98731b9", user1_onhome: true }
  homebetodds = 120;
  awaybetodds= 130;
  response="";
  wagers: { [gameId: number]: any } = {};
  errorMessages: { [gameId: number]: string } = {}; // Object to hold the error messages




  NavToBetPage(gameid: any) {
    this.router.navigate(['/betpage', gameid]);
  }

  //formats date in Tue, Aug 1
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  //formats time to 6:00 PM
  formatTime(timeString: string): string {
    const timeArray = timeString.split(":");
    const time = new Date(0);
    time.setUTCHours(Number(timeArray[0]));
    time.setUTCMinutes(Number(timeArray[1]));

    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  formatTeamName(teamName: string): string {
    let team = teamName.slice(0, -2);
    let lastSpaceIndex = team.lastIndexOf(' ');
    let slicedName = teamName.slice(0, lastSpaceIndex);
    return slicedName;
  }

  PlaceBet(game: any){
    this.betdata.wager = this.wagers[game.gameid];
    //check if user is logged in
    const token = localStorage.getItem('token');
    if(!token){
      console.log( 'You must be logged in to place a bet')
      return;
    }
    //makes sure all input fields have values
    const isAnyValueNull = Object.values(this.betdata).some(value => value === null);
    if(isAnyValueNull){
      console.log('Please fill out all fields');
     
      return;
    }
    //set header so backend can authenticate token
    const headers = new HttpHeaders({
      token:`${token}`
    });
    //once checked if token exists and all fields are filled out, send api request to place bet
    //with token in header to handle authentication error messages
    
    this.backendcalls.PlaceBet(this.betdata, headers).subscribe({
      next: (res) => {
        console.log(this.errorMessages)
        this.errorMessages[game.gameid] = "Bet Placed Successfully";
      },
      error: (err) => {
          this.errorMessages[game.gameid] = err.error.text;

      }
    })
  }

  validateNumber(event: any){
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    const isValidNumber = /^[-+]?\d*$/.test(value);

  if (!isValidNumber) {
    console.log("Please Remove Non Numerical Values");
    
  }
  else{
    this.response = "";
  
  }
  
  }

  ngOnInit() {

    const headers = new HttpHeaders({
      token:`${localStorage.getItem('token')}`
    })

    this.backendcalls.GetGamesForTheWeek().subscribe(
      (data) => {
        this.games = data; // Assign the data to the games property
        console.log(this.games)
      },
      (error) => {
        console.error(error);
      }
    );

    this.backendcalls.GetPendingBetsReceived(headers).subscribe(
      (data) => {
        this.incomingbets = data;
        console.log(this.incomingbets);
      },
      (error) => {
        console.error(error);
      }
    )

      this.backendcalls.GetFriends(headers).subscribe(
      (data) => {
        this.friends = data;
        console.log(this.friends);
      },
      (error) => {
        console.error(error);
      }
    )
  }
}






