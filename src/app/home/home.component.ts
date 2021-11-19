import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { IndexedDBService } from '../services/indexed-db.service';
import { fromEvent, Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Ticket: any = [];
  category: any;

  constructor(private activatedRoute: ActivatedRoute, private shared: SharedService, private router: Router,private indexedDBService:IndexedDBService) {
    activatedRoute.params.subscribe((params) => {

      this.category = params.id;
    })
  }
 networkStatus:any;
 onlineEvent!: Observable<Event>;
 offlineEvent!: Observable<Event>;
 subscriptions: Subscription[] = [];

 connectionStatusMessage!: string;
 connectionStatus!: string;
  ngOnInit(): void {
    this.refreshList();
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Back to online';
      this.connectionStatus = 'online';
      console.log('Online............');
      this.shared.sendSyncData();
      this.indexedDBService.storeSyncUpdate(null);

    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Connection lost! You are not connected to internet';
      this.connectionStatus = 'offline';
      console.log('Offline.............');
    }));
  
  }



  refreshList() {
    this.shared.getTicketList().subscribe(
      (data: any) => {
      this.Ticket = data;
      
    },async (err:any)=>{
      
      this.Ticket=await this.indexedDBService.retrieveTicketList();
      console.log("heyyyyyyyyy",this.Ticket)

    })
  }

}