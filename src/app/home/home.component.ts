import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../Shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Ticket: any = [];
  category: any;

  constructor(private activatedRoute: ActivatedRoute, private shared: SharedService, private router: Router) {
    activatedRoute.params.subscribe((params) => {

      this.category = params.id;
    })
  }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.shared.getTicketList().subscribe((data: any) => {
      this.Ticket = data.data;
    })
  }

}