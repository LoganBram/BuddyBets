import { Component,OnInit } from '@angular/core';
import { BackendcallsService } from '../backendcalls.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  frienduuid = ''
  usertoken = localStorage.getItem('token')
  
  constructor(private backendcalls: BackendcallsService) { }
  SendFriendRequest() {
    
    const headers = new HttpHeaders({
      token: `Bearer ${this.usertoken}`
    });

    this.backendcalls.SendFriendRequest(this.frienduuid, headers).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err)=>{
        console.log(err, 'error')
      }
    })
  }

  
}
