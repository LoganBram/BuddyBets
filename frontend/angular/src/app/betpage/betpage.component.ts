import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, games } from '../games';
import { BackendcallsService } from '../backendcalls.service';
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-betpage',
  templateUrl: './betpage.component.html',
  styleUrls: ['./betpage.component.css']
})
export class BetpageComponent implements OnInit{
  response: any = null;
  game: any;
  games: any[] = [];
  betdata = {wager: null, gameid: null as number | null, user1odds: null, user2odds: null, user1: 'a7a1bb4c-d43a-4f18-aee9-2bf755ae6411', user2: '29e48e07-eb01-467a-8746-3b7729adfc96' }

  constructor(private route: ActivatedRoute, private backendcalls: BackendcallsService){}

  doubleornothing: false | true = false;

  validateNumber(event: any){
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    const isValidNumber = /^[-+]?\d*$/.test(value);

  if (!isValidNumber) {
    this.response = "Please Remove Non Numerical Values";
    
  }
  else{
    this.response = null;
  }
  
  }

  PlaceBet(){
    const token = localStorage.getItem('token');
    if(!token){
      this.response = 'You must be logged in to place a bet'
      return;
    }
    const isAnyValueNull = Object.values(this.betdata).some(value => value === null);
    if(isAnyValueNull){
      this.response = 'Please fill out all fields'
      return;
    }
    //set header so backend can authenticate token
    const headers = new HttpHeaders({
      token: `Bearer ${token}`
    });
    //once checked if token exists and all fields are filled out, send api request to place bet
    //with token in header to handle authentication error messages
    this.backendcalls.PlaceBet(this.betdata, headers).subscribe({
      next: (res) => {
        this.response = res.message;
      },
      error: (err) => {
        if(err.status === 403){
          this.response = err.error.errmsg
        }
        else{
          this.response = 'An unexpected error occured. Please try again later.';
        }
      }
    })
  }

  ToggleDouble(){
    this.doubleornothing = !this.doubleornothing;
  }

  get double(){
    return this.doubleornothing;
  }

  async ngOnInit(){
    //get gameid from the current route
    const routeParams = this.route.snapshot.paramMap;
    const gameIdFromRoute = Number(routeParams.get('gameid'));

  //get games from db
    this.games = await this.backendcalls.GetGames().toPromise();

  // Find game that matches the id from the route
    this.game = this.games.find(game => game.gameid === gameIdFromRoute);
    this.betdata.gameid = gameIdFromRoute;
  }
}
