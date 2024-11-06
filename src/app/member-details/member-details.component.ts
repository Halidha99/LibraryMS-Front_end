import { Component, OnInit } from '@angular/core';
import Aos from 'aos';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit {
  ngOnInit() {
    Aos.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true 
    });
  }


}
