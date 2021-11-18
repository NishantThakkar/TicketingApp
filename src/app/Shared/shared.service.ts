import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly TicketURL = "http://hackathonvm.centralus.cloudapp.azure.com/ticketingapis/ticket";


  constructor(private http: HttpClient) { }

  getTicketList(): Observable<any[]> {
    return this.http.get<any>(this.TicketURL);
  }

  getTicketDetails(id: any) {
    return this.http.get<any>(this.TicketURL + "/" + id);
  }

  editTicket(val: any) {
    return this.http.put<any>(this.TicketURL + "/updateCategory", val);
  }

  deleteTicket(id: number) {
    return this.http.delete<any>(this.TicketURL + "/deleteCategory/" + id);
  }
}