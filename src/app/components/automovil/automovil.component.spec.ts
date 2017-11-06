import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomovilComponent } from './automovil.component';

describe('AutomovilComponent', () => {
  let component: AutomovilComponent;
  let fixture: ComponentFixture<AutomovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
