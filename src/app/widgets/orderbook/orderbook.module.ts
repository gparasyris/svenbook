import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderbookComponent } from './orderbook.component';
import { SharedModule } from '@app/shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [OrderbookComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatGridListModule,
    MatTableModule
  ],
  exports: [OrderbookComponent],
})
export class OrderbookModule { }
