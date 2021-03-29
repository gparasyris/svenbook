import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IConfiguration } from '@interfaces/configuration.interface';
import { DashboardService } from '@services/dashboard-service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  config: IConfiguration;
  dashboardName: string = '';
  errorMessage: string = '';

  constructor(private dashboardService: DashboardService, private actRoute: ActivatedRoute, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.dashboardName = this.actRoute.snapshot.params?.dashboardName;
    if (this.dashboardName != null) {
      this.getDashboardConfig();
    }
    else {
      this.errorMessage = `Error while loading the dashboard page, dashboard name has not been defined!`
    }

  }
  getDashboardConfig(): void {
    this.dashboardService.get(`assets/${this.dashboardName}.config.json`)
      .subscribe(
        (data: IConfiguration) => {
          this.config = data;
        },
        err => {
          this.errorMessage = `Error while retrieving config for dashboard '${this.dashboardName}': ${err?.body || err?.message}`
        },
        () => this.cdr.detectChanges()
      );
  }
}
