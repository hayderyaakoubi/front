import { TestBed, inject } from '@angular/core/testing';

import { ChatAlertsService } from './chat-alerts.service';

describe('ChatAlertsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatAlertsService]
    });
  });

  it('should be created', inject([ChatAlertsService], (service: ChatAlertsService) => {
    expect(service).toBeTruthy();
  }));
});
