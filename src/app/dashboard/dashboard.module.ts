import { OrderbookModule } from './../orderbook/orderbook.module';
import { DashboardComponentRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardComponentRoutingModule,
    OrderbookModule
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
