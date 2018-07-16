import { TestBed, inject } from '@angular/core/testing';

import { AccountslistService } from './accountslist.service';

describe('AccountslistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountslistService]
    });
  });

  it('should be created', inject([AccountslistService], (service: AccountslistService) => {
    expect(service).toBeTruthy();
  }));
});
