import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentStatusChipComponent } from './employment-status-chip.component';

describe('EmploymentStatusChipComponent', () => {
  let component: EmploymentStatusChipComponent;
  let fixture: ComponentFixture<EmploymentStatusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentStatusChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentStatusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
