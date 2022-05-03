import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  const TEST_ID = 'testId';
  const TEST_NAME = 'testName';

  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render text content correctly', () => {
    component.menu = [{
      _id: TEST_ID,
      creation_date: new Date('10-12-2020'),
      name: TEST_NAME,
    }];

    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain(TEST_ID);
    expect(content).toContain('12-10-2020 00:00');
    expect(content).toContain(TEST_NAME);
  });
});
