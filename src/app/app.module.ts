import { SharedModule } from './shared/shared.module';
import { WebsocketService } from './websocket.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderbookModule } from './orderbook/orderbook.module';
import { OrderbookRowComponent } from './orderbook/orderbook-row/orderbook-row.component';
import { FunctionPipe } from './function.pipe';
import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { Num2arrayPipe } from './num2array.pipe';
import { ProgressbarDirective } from './progressbar.directive';
import { ProgressbarComponent } from './shared/progressbar/progressbar.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    Num2arrayPipe      ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    OrderbookModule,
    SharedModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
