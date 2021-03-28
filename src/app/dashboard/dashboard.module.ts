import { OrderbookModule } from './../orderbook/orderbook.module';
import { DashboardComponentRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardColumnComponent } from './dashboard-column/dashboard-column.component';



@NgModule({
  declarations: [DashboardComponent, DashboardColumnComponent],
  imports: [
    CommonModule,
    // OrderbookModule,
    DashboardComponentRoutingModule,
    OrderbookModule
  ]
})
export class DashboardModule { }
