import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteAgendaComponent } from './tramite-agenda.component';

describe('TramiteAgendaComponent', () => {
  let component: TramiteAgendaComponent;
  let fixture: ComponentFixture<TramiteAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramiteAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramiteAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
