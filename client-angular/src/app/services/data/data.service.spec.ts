import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    dataService = TestBed.inject(DataService);
  });

  describe('setIsUserLoggedIn', () => {
    it('should assign correct value to user login flag', () => {
      let isUserLoggedIn = false;
      dataService.isUserLoggedIn.subscribe((val: boolean) => isUserLoggedIn = val);

      dataService.setIsUserLoggedIn(true);

      expect(isUserLoggedIn).toBeTruthy();

      dataService.setIsUserLoggedIn(false);

      expect(isUserLoggedIn).toBeFalsy();
    });
  });
});
