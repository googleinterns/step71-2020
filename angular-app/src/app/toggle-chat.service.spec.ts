import { TestBed } from '@angular/core/testing';

import { ToggleChatService } from './toggle-chat.service';

describe('ToggleChatService', () => {
  let service: ToggleChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
