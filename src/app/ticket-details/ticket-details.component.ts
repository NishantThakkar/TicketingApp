import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../Shared/shared.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IndexedDBService } from '../Shared/indexed-db.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  formValue!: FormGroup;
  private IndexedDBService!: IndexedDBService;
  ticket_details!: any;
  formbuilder: any;
  constructor(private activatedRoute: ActivatedRoute, private shared: SharedService,
    private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        this.ticket_details = shared.getTicketDetails(params.id);
    })
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Id: 0,
      email: [''],
      password: ['']
    })
  }
  postSync() {
    let obj = {
      name: 'Nileena'
    }
    this.shared.editTicket(obj).subscribe(res => { console.log(res); },
      err => {
        this.IndexedDBService.addUser(obj.name).then().catch(console.log);
        console.log(err);
      })
  }

  /*backgroundSync() {
    navigator.serviceWorker.ready.then((swRegistration) => 
    swRegistration.sync.register('post-data')).catch(console.log);
  }*/

}