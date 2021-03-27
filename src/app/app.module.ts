import { SharedModule } from './shared/shared.module';
import { WebsocketService } from './websocket.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderbookModule } from './orderbook/orderbook.module';
import { OrderbookRowComponent } from './orderbook/orderbook-row/orderbook-row.component';
import { FunctionPipe } from './function.pipe';

@NgModule({
  declarations: [
    AppComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrderbookModule,
    SharedModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
