import { TestBed } from '@angular/core/testing';

import { ZoomIntegrationService } from './zoom-integration.service';

describe('ZoomIntegrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZoomIntegrationService = TestBed.get(ZoomIntegrationService);
    expect(service).toBeTruthy();
  });
});
