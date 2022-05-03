import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from 'src/app/http-interceptors/auth-interceptor';

describe('AuthInterceptor', () => {
  let authInterceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor],
    });
    authInterceptor = TestBed.inject(AuthInterceptor);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('intercept', () => {
    it('should trigger next method with req as an argument if no token is saved in localStorage', () => {
      localStorage.clear();
      const mockReq: any = {};

      const nextSpy: any = {handle: () => {}};
      spyOn(nextSpy, 'handle').and.returnValue(mockReq);

      authInterceptor.intercept(mockReq, nextSpy);

      expect(nextSpy.handle).toHaveBeenCalledWith(mockReq);
    });

    it('should trigger next method with auth-token as an argument if token is saved in localStorage', () => {
      const TEST_AUTH_TOKEN = 'testAuthToken';
      localStorage.setItem('token', TEST_AUTH_TOKEN);
      const reqSpy: any = {
        clone: () => {},
        headers: {set: () => {}},
      };
      const nextSpy: any = {handle: () => {}};
      spyOn(nextSpy, 'handle').and.returnValue(reqSpy);
      spyOn(reqSpy, 'clone');

      authInterceptor.intercept(reqSpy, nextSpy);

      expect(reqSpy.clone).toHaveBeenCalled();
      expect(nextSpy.handle).not.toHaveBeenCalledWith(reqSpy);
      expect(nextSpy.handle).toHaveBeenCalled();
    });
  });
});
