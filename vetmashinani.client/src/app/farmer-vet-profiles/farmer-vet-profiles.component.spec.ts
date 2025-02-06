import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerVetProfilesComponent } from './farmer-vet-profiles.component';

describe('FarmerVetProfilesComponent', () => {
  let component: FarmerVetProfilesComponent;
  let fixture: ComponentFixture<FarmerVetProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmerVetProfilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerVetProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
