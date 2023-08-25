import { Component, OnInit } from '@angular/core';
import { BackendcallsService} from '../backendcalls.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-pendingbets',
  templateUrl: './pendingbets.component.html',
  styleUrls: ['./pendingbets.component.css']
})
export class PendingbetsComponent {
  pendingbets: any[] = [];
  homebettor: any = null;
  userid: any = null;

  //returns true if sender is home bettor otherwise false
  SideChecker(bet:any){
    if(bet.user1 === bet.homebettor){
      return true;
    }
    else{
      return false;
    }
    

  }


  constructor(private backendcalls : BackendcallsService ) { }

  ngOnInit() {
    const headers = new HttpHeaders({
      token:`${localStorage.getItem('token')}`
    })
    
    this.backendcalls.GetPendingBets(headers).subscribe(
      (data) => {
        this.pendingbets = data; // Assign the data to the games property
      },
      (error) => {
        console.error(error);
      }

    )

    this.backendcalls.TokenToID(headers).subscribe(
      (data) => {
        console.log(data)
      },
      {error} => {
        console.log(error)
      }
    )
    
    //check who the home/away bettor is
    
  }

}
