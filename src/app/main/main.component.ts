import { Component } from '@angular/core';
import { TopWidgetsComponent } from "../top-widgets/top-widgets.component";
import { BookDetailsComponent } from "../book-details/book-details.component";
import { IssuseBookDetailsComponent } from "../issuse-book-details/issuse-book-details.component";
import { MemberDetailsComponent } from "../member-details/member-details.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TopWidgetsComponent, BookDetailsComponent, IssuseBookDetailsComponent, MemberDetailsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
