import { TestBed } from '@angular/core/testing';

import { Service.MailService } from './service.mail.service';

describe('Service.MailService', () => {
  let service: Service.MailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service.MailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
