import { WebsocketService } from './../websocket.service';
import { WebSocketServiceSpy, mockData, mockDataWithZero } from './../websocket.service.spy';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderbookComponent } from './orderbook.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';

describe('OrderbookComponent', () => {
  let component: OrderbookComponent;
  let fixture: ComponentFixture<OrderbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderbookComponent],
      imports: [
        SharedModule,
        MatGridListModule,
        MatTableModule
      ],
      providers: [{ provide: WebsocketService, useClass: WebSocketServiceSpy }]
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
    // expect(component).toBeTruthy();
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
    // expect(component).toBeTruthy();

    // expect(component.title).toBe(conf.title);
    component.incomingData = mockData;

    expect(component.firstSell).toBe(54266.5);
    expect(component.maxAsk).toBe(530490);
    expect(component.firstBid).toBe(54235);
    expect(component.maxBid).toBe(226496);

  });

  it('should remove price with 0 quantity', () => {
    component.incomingData = mockData;
    expect(component.firstBid).toBe(54235);
    console.log(component.displayBids);
    component.incomingData = mockDataWithZero;
    console.log(component.displayBids);
    expect(component.firstBid).toBe(54221.5);
  });

  it('should truncate array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const resp = component.truncateArray(arr, 3);
    expect(resp).toEqual([1,2,3])
  });

  it('should truncate && reverse return array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const resp = component.truncateArray(arr, 3, true);
    expect(resp).toEqual([3,2,1])
  });
});