import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndexedDBService } from '../services/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly TicketURL = "http://hackathonvm.centralus.cloudapp.azure.com/ticketingapis/Ticket";

  constructor(private http: HttpClient, private indexedDBService: IndexedDBService) { }

  getTicketList(): Observable<any[]> {
    var user = JSON.parse(sessionStorage.getItem("Access token") || "null");
    var option = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    };
    console.log(option, "Access token");
    return this.http.get<any>(this.TicketURL + '/mytickets', { headers: option });

  }

  getTicketDetails(id: any) {
    return this.indexedDBService.retrieveTicketById(id);

  }

  sendSyncData() {
    var url = 'http://hackathonvm.centralus.cloudapp.azure.com/ticketingapis/Ticket/Sync';


    this.indexedDBService.retriveSyncUpdate().then(data => {
      console.log(data, "retrieving.");
      this.http.put(url, data).subscribe(res => {
        console.log(res, "update");
        this.indexedDBService.storeSyncUpdate(null);
      }, err => {
        console.log(err);
      });
    });
  }

  editTicket(val: any) {
    // val={
    //   "id": 1,
    //   "summary": "Uncertain about printer 9CAAQ01 security",
    //   "details": "cartridge broken",
    //   "priority": "Medium",
    //   "status": "Resolved",
    //   "notes": "hey",
    //   "assignedTo": "Farhan",
    //   "createdDate": "2021-11-18T07:30:07.823",
    //   "updatedDate": "2021-11-18T11:07:57.03"
    // }
    var url = 'http://hackathonvm.centralus.cloudapp.azure.com/ticketingapis/Ticket/Update';
    console.log("editinggg", val);
    return this.http.put(url, val);
  }

  deleteTicket(id: number) {
    return this.http.delete<any>(this.TicketURL + "/deleteCategory/" + id);
  }
}