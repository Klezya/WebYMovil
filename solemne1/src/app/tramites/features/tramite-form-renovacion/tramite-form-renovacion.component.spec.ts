import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteFormRenovacionComponent } from './tramite-form-renovacion.component';

describe('TramiteFormRenovacionComponent', () => {
  let component: TramiteFormRenovacionComponent;
  let fixture: ComponentFixture<TramiteFormRenovacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramiteFormRenovacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramiteFormRenovacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
