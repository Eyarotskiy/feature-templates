import { TestBed } from '@angular/core/testing';

import { AboutInnerComponent } from './about-inner.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AboutInnerComponent', () => {
  const TEST_ID = 'testId';
  const TEST_NAME = 'testName';

  let component: AboutInnerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AboutInnerComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              id: TEST_ID,
              name: TEST_NAME,
            }),
          },
        },
      ],
    });

    component = TestBed.inject(AboutInnerComponent);
  });

  describe('ngOnInit', () => {
    it('should load route query parameters', () => {
      expect(component.id).toBeUndefined();
      expect(component.name).toBeUndefined();

      component.ngOnInit();

      expect(component.id).toBe(TEST_ID);
      expect(component.name).toBe(TEST_NAME);
    });
  });
});
