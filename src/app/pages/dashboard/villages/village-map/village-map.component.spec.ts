import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageMapComponent } from './village-map.component';

describe('VillageMapComponent', () => {
  let component: VillageMapComponent;
  let fixture: ComponentFixture<VillageMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillageMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillageMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
