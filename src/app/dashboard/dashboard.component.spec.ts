import { DashboardService } from './dashboard.service';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { OrderbookModule } from '../orderbook/orderbook.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { Type } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [OrderbookModule, HttpClientTestingModule, RouterTestingModule],
      providers: [

        DashboardService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: from([{ id: 1 }])
            }
          },
        }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);

    fixture.detectChanges();
  });


  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should retrieve dashboard configuration for orderbook-single', fakeAsync(() => {

    const config = {
      "name": "orderbook-single",
      "layout": {
        "type": "row",
        "columns": [
          {
            "size": "md",
            "widgets": [
              {
                "type": "orderbook",
                "configuration": {
                  "event": "subscribe",
                  "feed": "book_ui_1",
                  "product_id": "PI_XBTUSD",
                  "title": "Bitcoin - USD"
                }
              }
            ]
          }
        ]
      }
    };
    component.dashboardName = "orderbook-single";
    component.getDashboardConfig();
    const req = httpMock.expectOne(`assets/orderbook-single.config.json`);
    req.flush(config);

    tick();
    expect(component.resp).toEqual(config);
    expect(req.request.method).toBe('GET');
  }));
});

