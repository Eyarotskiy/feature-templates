import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  const TEST_ID = 'testId';
  const TEST_NAME = 'testName';
  const TEST_USERNAME = 'testUsername';
  const TEST_WEBSITE = 'testWebsite';

  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the correct text content', () => {
    component.users = [{
      id: TEST_ID,
      name: TEST_NAME,
      username: TEST_USERNAME,
      website: TEST_WEBSITE,
    }];

    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain(TEST_ID);
    expect(content).toContain(TEST_NAME);
    expect(content).toContain(TEST_USERNAME);
    expect(content).toContain(TEST_WEBSITE);
  });
});
