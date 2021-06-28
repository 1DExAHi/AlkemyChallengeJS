import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsAdminComponent } from '../OperationsAdmin/operations-admin.component'
 
describe('OperationsHomeComponent', () => {
  let component: OperationsAdminComponent;
  let fixture: ComponentFixture<OperationsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); 

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
