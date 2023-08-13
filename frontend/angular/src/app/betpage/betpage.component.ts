import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, games } from '../games';
import { BackendcallsService } from '../backendcalls.service';

@Component({
  selector: 'app-betpage',
  templateUrl: './betpage.component.html',
  styleUrls: ['./betpage.component.css']
})
export class BetpageComponent implements OnInit{
  
  game: any;
  betdata = {wager: null, gameid: null as number | null, user1odds: null, user2odds: null, user1: 'a7a1bb4c-d43a-4f18-aee9-2bf755ae6411', user2: '29e48e07-eb01-467a-8746-3b7729adfc96' }

  constructor(private route: ActivatedRoute, private backendcalls: BackendcallsService){}

  doubleornothing: false | true = false;

  PlaceBet(){
    this.backendcalls.PlaceBet(this.betdata).subscribe({
      next: (res) => {
        alert(res.response.message);
      },
      error: (err) => {
        alert(err.error);
      }
    })
  }

  ToggleDouble(){
    this.doubleornothing = !this.doubleornothing;
  }

  get double(){
    return this.doubleornothing;
  }

  ngOnInit(){
    //get gameid from the current route
    const routeParams = this.route.snapshot.paramMap;
    const gameIdFromRoute = Number(routeParams.get('gameid'));

  //find game that matches the id from the route

    this.game = games.find(game => game.gameid === gameIdFromRoute);
    this.betdata.gameid = gameIdFromRoute;
  }
}
