import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeGridComponent } from './viaje-grid.component';

describe('ViajeGridComponent', () => {
  let component: ViajeGridComponent;
  let fixture: ComponentFixture<ViajeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
