import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuseBookDetailsComponent } from './issuse-book-details.component';

describe('IssuseBookDetailsComponent', () => {
  let component: IssuseBookDetailsComponent;
  let fixture: ComponentFixture<IssuseBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuseBookDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuseBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
