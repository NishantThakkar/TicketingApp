import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IndexedDBService } from '../services/indexed-db.service';
import { Subscription } from 'rxjs';

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
    private router: Router,private indexedDBService:IndexedDBService) {

    
  }
  private routeSub: Subscription = new Subscription;
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(async(params) => {
      if(params.id)
        var tickets= await this.shared.getTicketDetails(params['id']);
        this.ticket_details=tickets[0];
        console.log(this.ticket_details.id,"mainnnnnnn")
    });
    // this.activatedRoute.params.subscribe(async(params) => {
    //   if(params.id)
    //     var tickets= await this.shared.getTicketDetails(params.id);
    //     this.ticket_details=tickets[0];
    //     console.log(this.ticket_details.id,"mainnnnnnn")
    // })
    // this.formValue = this.formbuilder.group({
    //   Id: 0,
    //   email: [''],
    //   password: ['']
    // })
  }
  update(formData:any){
    formData.id=this.ticket_details.id;
    formData.summary=this.ticket_details.summary;
    formData.details=this.ticket_details.details;
    console.log(formData,"form dataaa");
    this.indexedDBService.storeUpdateList(formData).then((data:any)=>{
      alert("Updated successfully");
    this.router.navigate(['/home']);

    });
    
    

  }
 


}