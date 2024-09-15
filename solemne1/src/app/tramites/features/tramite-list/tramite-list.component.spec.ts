import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteListComponent } from './tramite-list.component';

describe('TramiteListComponent', () => {
  let component: TramiteListComponent;
  let fixture: ComponentFixture<TramiteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramiteListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
