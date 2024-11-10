import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIssuedbooksComponent } from './view-issuedbooks.component';

describe('ViewIssuedbooksComponent', () => {
  let component: ViewIssuedbooksComponent;
  let fixture: ComponentFixture<ViewIssuedbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewIssuedbooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewIssuedbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
