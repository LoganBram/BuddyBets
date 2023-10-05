import { Component, OnInit } from '@angular/core';
import { BackendcallsService } from '../backendcalls.service';
@Component({
  selector: 'app-gamesdisplay',
  templateUrl: './gamesdisplay.component.html',
  styleUrls: ['./gamesdisplay.component.css']
})
export class GamesdisplayComponent {

  constructor(private backendcalls : BackendcallsService ) { }
  games: any[] = [];

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

  ngOnInit() {
    this.backendcalls.GetGames().subscribe(
      (data) => {
        this.games = data; // Assign the data to the games property
        console.log(this.games)
      },
      (error) => {
        console.error(error);
      }
    );
  }
}






