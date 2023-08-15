import { Component,OnInit } from '@angular/core';
import { BackendcallsService } from '../backendcalls.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  friendusername = ''
  usertoken = localStorage.getItem('token')
  
  constructor(private backendcalls: BackendcallsService) { }
  SendFriendRequest() {
    console.log(this.usertoken)

    const headers = new HttpHeaders({
      token: `${this.usertoken}`
    });

    this.backendcalls.SendFriendRequest(this.friendusername, headers).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err)=>{
        console.log(err, 'error')
      }
    })
  }

  
}
