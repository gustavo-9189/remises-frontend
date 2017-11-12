import { TestBed, inject } from '@angular/core/testing';

import { ViajeService } from './viaje.service';

describe('ViajeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViajeService]
    });
  });

  it('should be created', inject([ViajeService], (service: ViajeService) => {
    expect(service).toBeTruthy();
  }));
});
