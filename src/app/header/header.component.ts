import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../components/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    userName = '';
  constructor(private loginService: LoginService, private route: Router) { 
      this.loginService.getUserName().subscribe(x => {
          this.userName = x;
      });
  }
  logout(){
    this.route.navigate(["login"]);
  }
  ngOnInit(): void {
  }
  name!: any;


}