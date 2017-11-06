import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMapsComponent } from './modal-maps.component';

describe('ModalMapsComponent', () => {
  let component: ModalMapsComponent;
  let fixture: ComponentFixture<ModalMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
