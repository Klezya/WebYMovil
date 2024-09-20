import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteFormCambioDatosComponent } from './tramite-form-cambio-datos.component';

describe('TramiteFormCambioDatosComponent', () => {
  let component: TramiteFormCambioDatosComponent;
  let fixture: ComponentFixture<TramiteFormCambioDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramiteFormCambioDatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramiteFormCambioDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
