import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerForgotPasswordComponent } from './farmer-forgot-password.component';

describe('FarmerForgotPasswordComponent', () => {
  let component: FarmerForgotPasswordComponent;
  let fixture: ComponentFixture<FarmerForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmerForgotPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
