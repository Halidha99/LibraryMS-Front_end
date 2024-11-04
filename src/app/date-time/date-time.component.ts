import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-date-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements OnInit, OnDestroy {
  currentDate: Date = new Date();
  timer: any;

  ngOnInit() {

    this.timer = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  ngOnDestroy() {

    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
