import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteFormComponent } from './tramite-form.component';

describe('TramiteFormComponent', () => {
  let component: TramiteFormComponent;
  let fixture: ComponentFixture<TramiteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramiteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramiteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
