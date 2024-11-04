import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { MainComponent } from "./main/main.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DateTimeComponent } from './date-time/date-time.component';
import { BookDetailsComponent } from "./book-details/book-details.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SideNavComponent, MainComponent, FontAwesomeModule, BookDetailsComponent,DateTimeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'libraryMS-Front-End';
}
