import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedService } from './Shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TicketingApp';
  constructor(private http: HttpClient, private shared: SharedService) {

  }

}
