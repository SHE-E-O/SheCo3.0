import { TestBed } from '@angular/core/testing';

import { SHEcoShopFormService } from './sheco-shop-form.service';

describe('SHEcoShopFormService', () => {
  let service: SHEcoShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SHEcoShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
