import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  authenticated: boolean  = false;
  usercredits: number = 0;

  Logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }

  constructor(private _authService: AuthService) { }
  ngOnInit(): void {

    const headers = new HttpHeaders({
      token:`${localStorage.getItem('token')}`
    });

    this._authService.loggedIn(headers).subscribe({
      next: (res) => {
        this.authenticated = res;
        console.log(res);
        console.log(this.authenticated)
      },
      error: (err) => {
        this.authenticated = false;
        console.log(err)
      }
    })

    




  }
}
