import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  resp: any;
  constructor(private http: HttpClient, private actRoute: ActivatedRoute) { }


  ngOnInit(): void {
    console.log(this.actRoute.snapshot.params.dashboardName)
    this.http.get(`assets/${this.actRoute.snapshot.params.dashboardName}.config.json`)
      .subscribe((data: any) => {
        this.resp = data;
      });
  }

}
