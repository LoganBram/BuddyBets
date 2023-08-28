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
  userid: any = null;

  constructor(private backendcalls: BackendcallsService){}

  ngOnInit() {
    const headers = new HttpHeaders({
      token: `${this.usertoken}`
    })

    this.backendcalls.GetFriends(headers).subscribe({
      next: (res) => {
        this.friends = res;
        console.log(res)
      }
    })

    this.backendcalls.GetUserId(headers).subscribe({
      next: (res) => {
        this.userid = res.user;
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
