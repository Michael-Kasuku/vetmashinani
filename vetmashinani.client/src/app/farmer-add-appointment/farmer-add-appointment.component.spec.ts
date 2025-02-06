import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerAddAppointmentComponent } from './farmer-add-appointment.component';

describe('FarmerAddAppointmentComponent', () => {
  let component: FarmerAddAppointmentComponent;
  let fixture: ComponentFixture<FarmerAddAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmerAddAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerAddAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
