import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
 faBook,
 faUsers,
 faBookOpenReader,
 faBookOpen

 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-widgets',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './top-widgets.component.html',
  styleUrl: './top-widgets.component.css'
})
export class TopWidgetsComponent {
  faBook= faBook;
  faUsers=faUsers;
  faBookOpenReader=faBookOpenReader;
  faBookOpen=faBookOpen;

}
