import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
  }

  noChat = true

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
        if(!data['chatRoomId']){
          console.log("No chat open")
          this.noChat = false
        }
       }
    )
  }

}
