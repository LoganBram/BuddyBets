import { Component, OnInit } from '@angular/core';
import { BackendcallsService } from '../backendcalls.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-friendsdisplay',
  templateUrl: './friendsdisplay.component.html',
  styleUrls: ['./friendsdisplay.component.css']
})
export class FriendsdisplayComponent {
  usertoken = localStorage.getItem('token')
  friends: any = {};

  constructor(private backendcalls: BackendcallsService){}

  ngOnInit(){
    const headers = new HttpHeaders({
      token: `${this.usertoken}`
    })

    this.backendcalls.GetFriends(headers).subscribe({
      next: (res) => {
        this.friends = res;
      }
    })
  }

}
