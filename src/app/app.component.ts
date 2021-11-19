import { Component, OnInit } from '@angular/core';
import {LoginService} from './components/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TicketingApp';
  isLoginPage = true;
  constructor(private loginService: LoginService) {  
    this.loginService.getLan().subscribe(x => {
      this.isLoginPage = x;
      console.log(this.isLoginPage);
     });
  }  
  ngOnInit(): void {
     
  }
  
}
