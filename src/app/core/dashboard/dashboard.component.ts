import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IConfiguration } from '@interfaces/configuration.interface';
import { DashboardService } from '@services/dashboard-service/dashboard.service';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  config: IConfiguration;
  dashboardName: string = '';
  errorMessage: string = '';
  activeRouterSub: SubscriptionLike;

  constructor(private dashboardService: DashboardService, private actRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activeRouterSub = this.actRoute.params.subscribe((params) => {
      this.dashboardName = params?.dashboardName;
      if (this.dashboardName != null) {
        this.getDashboardConfig();
      }
      else {
        this.errorMessage = `Error while loading the dashboard page, dashboard name has not been defined!`
      }
    });
  }
  getDashboardConfig(): void {
    this.dashboardService.get(`assets/${this.dashboardName}.config.json`)
      .subscribe(
        (data: IConfiguration) => {
          this.config = data;
        },
        err => {
          this.errorMessage = `Error while retrieving config for dashboard '${this.dashboardName}': ${err?.body || err?.message}`
        }
      );
  }

  ngOnDestroy() {
    this.activeRouterSub?.unsubscribe();
  }
}
