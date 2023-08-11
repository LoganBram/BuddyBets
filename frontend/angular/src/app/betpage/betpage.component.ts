import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, games } from '../games';

@Component({
  selector: 'app-betpage',
  templateUrl: './betpage.component.html',
  styleUrls: ['./betpage.component.css']
})
export class BetpageComponent implements OnInit{

  game: any;

  constructor(private route: ActivatedRoute){}

  doubleornothing: false | true = false;

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
  }
}
