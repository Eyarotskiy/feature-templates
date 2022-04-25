import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from 'src/app/http-interceptors/auth-interceptor';

describe('AuthInterceptorService', () => {
  let service: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
