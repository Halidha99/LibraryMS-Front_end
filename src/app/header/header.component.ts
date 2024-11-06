import { Component } from '@angular/core';
import { DateTimeComponent } from "../date-time/date-time.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DateTimeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
