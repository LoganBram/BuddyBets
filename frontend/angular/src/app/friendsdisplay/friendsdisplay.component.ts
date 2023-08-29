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
  response: any = null;
  cdr: any;

  constructor(private backendcalls: BackendcallsService){}

  AcceptFriend(friend: any){
    
    try {
      this.backendcalls.AcceptFriend(friend).subscribe({
        next: (res) => {
          this.response = res.message
          },
        error: (err) => {
          this.response = err.error
        }
      })

      this.friends = this.friends.filter((f: any) => f !== friend);
      
    } catch (error) {
      this.response = error
      
    }
  }

  DenyFriend(friend: any){
    try {
      this.backendcalls.DenyFriend(friend).subscribe({
        next: (res) => {
          this.response = res.message
          console.log(res)
          },
        error: (err) => {
          this.response = err.error
        }
      })
    } catch (error) {
      this.response = error
      
    }
  }

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
