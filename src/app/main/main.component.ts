import { Component } from '@angular/core';
import { TopWidgetsComponent } from "../top-widgets/top-widgets.component";
import { MemberDetailsComponent } from "../member-details/member-details.component";
import { BookDetailsComponent } from "../book-details/book-details.component";
import { IssuseBooksComponent } from "../issuse-books/issuse-books.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TopWidgetsComponent, MemberDetailsComponent, BookDetailsComponent, IssuseBooksComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
