import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartArea } from './doughnut-chart-area.component';

describe('DoughnutChartAreaComponent', () => {
  let component: DoughnutChartArea;
  let fixture: ComponentFixture<DoughnutChartArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoughnutChartArea ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutChartArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
