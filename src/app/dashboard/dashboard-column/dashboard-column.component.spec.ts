import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardColumnComponent } from './dashboard-column.component';

describe('DashboardColumnComponent', () => {
  let component: DashboardColumnComponent;
  let fixture: ComponentFixture<DashboardColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
