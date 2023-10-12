import { Component,OnInit } from '@angular/core';
import { BackendcallsService } from '../backendcalls.service';
import { HttpHeaders } from '@angular/common/http';

//has friendsdisplay inherited from friends.component.html

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  friend = { friendusername : ''}
  response: any = null;
  usertoken = localStorage.getItem('token')
  
  constructor(private backendcalls: BackendcallsService) { }
  SendFriendRequest() {
    

    const headers = new HttpHeaders({
      token: `${this.usertoken}`
    });

    this.backendcalls.SendFriendRequest(this.friend, headers).subscribe({
      next: (res) => {
        this.response = res.message;
        
      },
      
    })
  }

  
}
