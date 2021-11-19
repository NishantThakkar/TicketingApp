import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndexedDBService } from '../services/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly TicketURL = "http://hackathonvm.centralus.cloudapp.azure.com/ticketingapis/Ticket";


  constructor(private http: HttpClient,private indexedDBService:IndexedDBService) { }

  getTicketList(): Observable<any[]> {
    return this.http.get<any>(this.TicketURL);
  }

  getTicketDetails(id: any) {
    return this.indexedDBService.retrieveTicketById(id);
   
  }

  sendSyncData(){
    var url='http://hackathonvm.centralus.cloudapp.azure.com/ticketingapis/Ticket/Sync';
    
   
    this.indexedDBService.retriveSyncUpdate().then(data=>{
      console.log('put url',data);
      return this.http.put(url,data);
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
    var url='http://hackathonvm.centralus.cloudapp.azure.com/ticketingapis/Ticket/Update';
    console.log("editinggg",val);
    return this.http.put(url,val);
  }

  deleteTicket(id: number) {
    return this.http.delete<any>(this.TicketURL + "/deleteCategory/" + id);
  }
}