import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerMyProfileComponent } from './farmer-my-profile.component';

describe('FarmerMyProfileComponent', () => {
  let component: FarmerMyProfileComponent;
  let fixture: ComponentFixture<FarmerMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmerMyProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
