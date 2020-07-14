import { TestBed } from '@angular/core/testing';

import { ToggleRightDrawerService } from './toggle-right-drawer.service';

describe('ToggleRightDrawerService', () => {
  let service: ToggleRightDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleRightDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
