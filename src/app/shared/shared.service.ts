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

  editTicket(val: any) {
    return this.http.put<any>(this.TicketURL + "/updateCategory", val);
  }

  deleteTicket(id: number) {
    return this.http.delete<any>(this.TicketURL + "/deleteCategory/" + id);
  }
}