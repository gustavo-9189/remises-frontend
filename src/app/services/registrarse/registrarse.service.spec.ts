import { TestBed, inject } from '@angular/core/testing';

import { RegistrarseService } from './registrarse.service';

describe('RegistrarseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrarseService]
    });
  });

  it('should be created', inject([RegistrarseService], (service: RegistrarseService) => {
    expect(service).toBeTruthy();
  }));
});
