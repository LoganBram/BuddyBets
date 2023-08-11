import { Component } from '@angular/core';
import {games} from '../games'
@Component({
  selector: 'app-gamesdisplay',
  templateUrl: './gamesdisplay.component.html',
  styleUrls: ['./gamesdisplay.component.css']
})
export class GamesdisplayComponent {

  games = [...games]
}
