import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuseBooksComponent } from './issuse-books.component';

describe('IssuseBooksComponent', () => {
  let component: IssuseBooksComponent;
  let fixture: ComponentFixture<IssuseBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuseBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuseBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
