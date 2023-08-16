import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './loginguard.guard';

import { BetpageComponent } from './betpage/betpage.component';
import { GamesdisplayComponent } from './gamesdisplay/gamesdisplay.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendsdisplayComponent } from './friendsdisplay/friendsdisplay.component';
import { OngoingbetsComponent } from './ongoingbets/ongoingbets.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    BetpageComponent,
    GamesdisplayComponent,
    FriendsComponent,
    FriendsdisplayComponent,
    OngoingbetsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component : RegisterComponent},
      {path: 'dashboard', component : DashboardComponent, canActivate: [AuthGuard]},
      {path: 'login', component : LoginComponent},
      {path: 'gamesdisplay', component : GamesdisplayComponent},
      {path: 'betpage/:gameid', component : BetpageComponent},
      {path: 'friends', component : FriendsComponent},
      {path: 'friendsdisplay', component : FriendsdisplayComponent},

    ])
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
