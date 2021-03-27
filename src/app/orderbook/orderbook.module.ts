import { OrderbookRowComponent } from './orderbook-row/orderbook-row.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderbookComponent } from './orderbook.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [OrderbookComponent, OrderbookRowComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [OrderbookComponent, OrderbookRowComponent],
})
export class OrderbookModule { }
