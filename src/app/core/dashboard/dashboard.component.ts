import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '@services/dashboard-service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  resp: any;
  dashboardName: string = '';
  errorMessage: string = '';

  constructor(private dashboardService: DashboardService, private actRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.dashboardName = this.actRoute.snapshot.params?.dashboardName;
    if (this.dashboardName != null) {
      this.getDashboardConfig();
    }
    else {
      this.errorMessage = `Error while loading the dashboard page, dashboard name has not been defined!`
    }

  }
  getDashboardConfig() {
    this.dashboardService.get(`assets/${this.dashboardName}.config.json`)
      .subscribe(
        (data: any) => {
          this.resp = data;
        },
        err => {
          this.errorMessage = `Error while retrieving config for dashboard '${this.dashboardName}': ${err?.body || err?.message}`
        }
      );
  }
}
