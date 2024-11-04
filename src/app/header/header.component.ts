
import { Component, OnInit } from '@angular/core';
import { DateTimeComponent } from "../date-time/date-time.component";
import AOS from 'aos';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DateTimeComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      offset: 100,
      once: true,
    });
  }
}
