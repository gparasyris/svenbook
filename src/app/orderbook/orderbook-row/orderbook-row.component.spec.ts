import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderbookRowComponent } from './orderbook-row.component';

describe('OrderbookRowComponent', () => {
  let component: OrderbookRowComponent;
  let fixture: ComponentFixture<OrderbookRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderbookRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderbookRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
