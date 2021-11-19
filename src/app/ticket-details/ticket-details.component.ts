import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IndexedDBService } from '../services/indexed-db.service';
import { Subscription } from 'rxjs';
import { tick } from '@angular/core/testing';

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

  constructor(private route: ActivatedRoute, private shared: SharedService,
    private router: Router, private indexedDBService: IndexedDBService) {
  }
  private routeSub: Subscription = new Subscription;

  formDetails: any;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(async (params) => {
      if (params.id)
        var tickets = await this.shared.getTicketDetails(params['id']);
      this.ticket_details = tickets[0];
      console.log(this.ticket_details.id, "mainnnnnnn")
    });

    // window.addEventListener('online', this.handleConnection);
    // window.addEventListener('offline', this.handleConnection);
  }

  //  handleConnection() {
  //    console.log("onlineeeeeeeeee")
  //   if (navigator.onLine) {
  //    //online
  //    this.shared.editTicket(this.formDetails);

  //   } else {
  //     // handle offline status
  //     console.log('offline');
  //   }
  // }

  syncUpdate: any = [];

  async update(formData: any) {

    formData.id = this.ticket_details.id;
    formData.summary = this.ticket_details.summary;
    formData.details = this.ticket_details.details;
    formData.priority = this.ticket_details.priority;
    formData.createdDate = this.ticket_details.createdDate;
    formData.updatedDate = this.ticket_details.updatedDate;
    formData.assignedTo = this.ticket_details.assignedTo;

    console.log(formData, "form dataaa");

    this.formDetails = formData;

    var res = await this.shared.editTicket(this.formDetails).subscribe((result) => {

      console.log(result, "onlineee");



    },
      async (err) => {
        console.log("offline sync table store")
        this.syncUpdate = await this.indexedDBService.retriveSyncUpdate();
        if (this.syncUpdate == null)
          this.syncUpdate = [];
        console.log(this.syncUpdate, "sync data");
        this.syncUpdate.push(formData);
        this.indexedDBService.storeSyncUpdate(this.syncUpdate);


      }
    );



    this.indexedDBService.storeUpdateList(formData).then((data: any) => {
      this.indexedDBService.retrieveTicketList().then(data => {
        var ticketList = data;
        var objIndex = ticketList.findIndex(((obj: any) => obj.id == formData.id));
        ticketList[objIndex].status = formData.status;
        this.indexedDBService.storeTickets(ticketList).then((data: any) => {
          console.log(data);
          alert("Updated successfully");
          this.router.navigate(['/home']);
        });
      })


    });



  }



}