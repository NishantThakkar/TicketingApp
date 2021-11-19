import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {LoginService} from '../components/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  userName = '';
  networkStatus:any;
  onlineEvent!: Observable<Event>;
  offlineEvent!: Observable<Event>;
  subscriptions: Subscription[] = [];
  online:boolean=true;
  constructor(private loginService: LoginService, private route: Router) { 
    this.loginService.getUserName().subscribe(x => {
        this.userName = x;
    });
}
logout(){
  this.route.navigate(["login"]);
}
  ngOnInit(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(this.onlineEvent.subscribe(e => {
    
      console.log('Online............');
      this.online=true;
    

    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
     
    this.online=false;
      console.log('Offline.............');
    }));
  }
  name!: any;


}