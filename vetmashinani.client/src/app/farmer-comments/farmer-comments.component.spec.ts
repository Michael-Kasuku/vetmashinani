import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerCommentsComponent } from './farmer-comments.component';

describe('FarmerCommentsComponent', () => {
  let component: FarmerCommentsComponent;
  let fixture: ComponentFixture<FarmerCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmerCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
