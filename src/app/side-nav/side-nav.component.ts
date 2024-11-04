import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faDashboard,
 faBook,
 faUsers,
 faBookOpenReader,
 faRotateLeft,
 faList,
faBookOpen,
faSignOutAlt
 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  faDashboard = faDashboard;
  faBook=faBook;
  faUsers=faUsers;
  faBookOpenReader= faBookOpenReader;
  faRotateLeft = faRotateLeft;
  faList=faList;
  faBookOpen=faBookOpen;
  faSignOutAlt =faSignOutAlt ;

}
