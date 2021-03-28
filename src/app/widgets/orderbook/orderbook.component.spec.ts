import { WebsocketService } from '@services/websocket-service/websocket.service';
import { WebSocketServiceMock, mockData, mockDataWithZero, preccalculatedResults } from '@services/websocket-service/websocket.service.mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderbookComponent } from './orderbook.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@app/shared/shared.module';

describe('OrderbookComponent', () => {
  let component: OrderbookComponent;
  let fixture: ComponentFixture<OrderbookComponent>;
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderbookComponent],
      imports: [
        SharedModule,
        MatGridListModule,
        MatTableModule
      ],
      providers: [{ provide: WebsocketService, useClass: WebSocketServiceMock }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should connect to websocket', () => {
    const conf = {
      "event": "subscribe",
      "feed": "book_ui_1",
      "product_id": "PI_XBTUSD",
      "title": "Bitcoin - USD"
    };
    component.processConfiguration(conf);
    expect(component.title).toBe(conf.title);
  });

  it('should calculate bid & ask limit variables', () => {

    component.incomingData = mockData;

    expect(component.firstSell).toBe(preccalculatedResults.firstSell);
    expect(component.maxAsk).toBe(preccalculatedResults.maxASk);
    expect(component.firstBid).toBe(preccalculatedResults.firstBid);
    expect(component.maxBid).toBe(preccalculatedResults.maxBid);

  });

  it('should remove price with 0 quantity', () => {
    component.incomingData = mockData;
    expect(component.firstBid).toBe(preccalculatedResults.firstBid);
    console.log(component.displayBids);
    component.incomingData = mockDataWithZero;
    console.log(component.displayBids);
    expect(component.firstBid).toBe(preccalculatedResults.secondBid);
  });

  it('should truncate array', () => {
    const resp = component.truncateArray(arr, 3);
    expect(resp).toEqual([1, 2, 3])
  });

  it('should truncate & reverse return array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const resp = component.truncateArray(arr, 3, true);
    expect(resp).toEqual([3, 2, 1])
  });
});